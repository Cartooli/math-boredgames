#!/usr/bin/env node

/**
 * GitHub Discussions Creator
 * 
 * This script reads DISCUSSION_TEMPLATES.md and creates all 9 discussion threads
 * on GitHub using the GitHub GraphQL API.
 * 
 * Requirements:
 * - Node.js (v14+)
 * - GitHub Personal Access Token with 'public_repo' scope
 * - Discussions must be enabled on the repository
 * 
 * Usage:
 *   GITHUB_TOKEN=your_token_here node create-discussions.js
 * 
 * Or set token in .env file:
 *   GITHUB_TOKEN=your_token_here
 *   node create-discussions.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const REPO_OWNER = 'Cartooli';
const REPO_NAME = 'math-boredgames';
const CATEGORY_SLUG = 'feature-requests'; // Will try to find this category

// Get GitHub token from environment
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!GITHUB_TOKEN) {
    console.error('❌ Error: GITHUB_TOKEN environment variable is required');
    console.error('\nTo create a token:');
    console.error('1. Go to https://github.com/settings/tokens');
    console.error('2. Click "Generate new token (classic)"');
    console.error('3. Select scope: "public_repo"');
    console.error('4. Copy the token');
    console.error('\nThen run:');
    console.error('  GITHUB_TOKEN=your_token_here node create-discussions.js');
    process.exit(1);
}

// Read and parse DISCUSSION_TEMPLATES.md
function parseTemplates() {
    const templateFile = path.join(__dirname, 'DISCUSSION_TEMPLATES.md');
    
    if (!fs.existsSync(templateFile)) {
        throw new Error(`Template file not found: ${templateFile}`);
    }
    
    const content = fs.readFileSync(templateFile, 'utf8');
    const discussions = [];
    
    // Split by discussion markers
    const discussionBlocks = content.split(/^## Discussion #(\d+):/m);
    
    for (let i = 1; i < discussionBlocks.length; i += 2) {
        const number = parseInt(discussionBlocks[i]);
        const block = discussionBlocks[i + 1];
        
        // Extract category
        const categoryMatch = block.match(/\*\*Category:\*\*\s*(.+?)\s*\n/);
        const category = categoryMatch ? categoryMatch[1].trim() : 'Feature Requests';
        
        // Extract title
        const titleMatch = block.match(/\*\*Title:\*\*\s*(.+?)\s*\n/);
        const title = titleMatch ? titleMatch[1].trim() : '';
        
        // Extract body (markdown code block)
        const bodyMatch = block.match(/```markdown\n([\s\S]*?)```/);
        const body = bodyMatch ? bodyMatch[1].trim() : '';
        
        if (title && body) {
            discussions.push({
                number,
                category,
                title,
                body
            });
        }
    }
    
    return discussions.sort((a, b) => a.number - b.number);
}

// Make GraphQL request to GitHub
function graphqlRequest(query, variables = {}) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ query, variables });
        
        const options = {
            hostname: 'api.github.com',
            path: '/graphql',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'User-Agent': 'MathBored-Discussion-Creator',
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };
        
        const req = https.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const json = JSON.parse(responseData);
                    
                    if (json.errors) {
                        reject(new Error(`GraphQL Error: ${JSON.stringify(json.errors, null, 2)}`));
                    } else {
                        resolve(json.data);
                    }
                } catch (e) {
                    reject(new Error(`Parse Error: ${e.message}\nResponse: ${responseData}`));
                }
            });
        });
        
        req.on('error', (e) => {
            reject(e);
        });
        
        req.write(data);
        req.end();
    });
}

// Get repository ID and category ID
async function getRepositoryInfo() {
    const query = `
        query($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
                id
                discussionCategories(first: 20) {
                    nodes {
                        id
                        slug
                        name
                    }
                }
            }
        }
    `;
    
    const data = await graphqlRequest(query, {
        owner: REPO_OWNER,
        name: REPO_NAME
    });
    
    if (!data.repository) {
        throw new Error(`Repository not found: ${REPO_OWNER}/${REPO_NAME}`);
    }
    
    const repoId = data.repository.id;
    const categories = data.repository.discussionCategories.nodes;
    
    // Try to find Feature Requests category
    let categoryId = categories.find(c => 
        c.slug === CATEGORY_SLUG || 
        c.slug === 'feature-requests' ||
        c.name.toLowerCase().includes('feature')
    )?.id;
    
    // Fallback to first available category
    if (!categoryId && categories.length > 0) {
        categoryId = categories[0].id;
        console.warn(`⚠️  Warning: Using category "${categories[0].name}" instead of "Feature Requests"`);
    }
    
    if (!categoryId) {
        throw new Error('No discussion categories found. Please create a category first in GitHub.');
    }
    
    return { repoId, categoryId };
}

// Create a discussion
async function createDiscussion(repoId, categoryId, title, body) {
    const mutation = `
        mutation($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
            createDiscussion(input: {
                repositoryId: $repositoryId
                categoryId: $categoryId
                title: $title
                body: $body
            }) {
                discussion {
                    id
                    number
                    url
                    title
                }
            }
        }
    `;
    
    const data = await graphqlRequest(mutation, {
        repositoryId: repoId,
        categoryId: categoryId,
        title: title,
        body: body
    });
    
    return data.createDiscussion.discussion;
}

// Main function
async function main() {
    console.log('🚀 Starting GitHub Discussions Creator\n');
    
    try {
        // Parse templates
        console.log('📖 Parsing DISCUSSION_TEMPLATES.md...');
        const discussions = parseTemplates();
        console.log(`✅ Found ${discussions.length} discussion templates\n`);
        
        // Get repository info
        console.log(`🔍 Getting repository information for ${REPO_OWNER}/${REPO_NAME}...`);
        const { repoId, categoryId } = await getRepositoryInfo();
        console.log('✅ Repository found\n');
        
        // Create discussions in order
        console.log('📝 Creating discussions...\n');
        const results = [];
        
        for (const discussion of discussions) {
            console.log(`Creating #${discussion.number}: ${discussion.title}`);
            
            try {
                const created = await createDiscussion(
                    repoId,
                    categoryId,
                    discussion.title,
                    discussion.body
                );
                
                results.push({
                    number: discussion.number,
                    success: true,
                    url: created.url,
                    githubNumber: created.number
                });
                
                console.log(`  ✅ Created: ${created.url}\n`);
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (error) {
                results.push({
                    number: discussion.number,
                    success: false,
                    error: error.message
                });
                
                console.log(`  ❌ Failed: ${error.message}\n`);
            }
        }
        
        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 Summary');
        console.log('='.repeat(60));
        
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);
        
        console.log(`✅ Successfully created: ${successful.length}/${discussions.length}`);
        console.log(`❌ Failed: ${failed.length}/${discussions.length}\n`);
        
        if (successful.length > 0) {
            console.log('Created discussions:');
            successful.forEach(r => {
                console.log(`  #${r.number} → ${r.url} (GitHub #${r.githubNumber})`);
            });
        }
        
        if (failed.length > 0) {
            console.log('\nFailed discussions:');
            failed.forEach(r => {
                console.log(`  #${r.number}: ${r.error}`);
            });
        }
        
        // Check if numbers match
        console.log('\n' + '='.repeat(60));
        console.log('⚠️  Important Note');
        console.log('='.repeat(60));
        console.log('The GitHub discussion numbers may not match 1-9 if:');
        console.log('- Discussions already exist in the repository');
        console.log('- You create them in a different order');
        console.log('\nIf numbers don\'t match, you\'ll need to update roadmap.html');
        console.log('with the actual discussion numbers from the URLs above.');
        
    } catch (error) {
        console.error('\n❌ Fatal Error:', error.message);
        console.error('\nTroubleshooting:');
        console.error('1. Make sure Discussions are enabled on the repository');
        console.error('2. Verify your GitHub token has "public_repo" scope');
        console.error('3. Check that the repository name is correct');
        console.error('4. Ensure at least one discussion category exists');
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('Unhandled error:', error);
        process.exit(1);
    });
}

module.exports = { parseTemplates, createDiscussion };













