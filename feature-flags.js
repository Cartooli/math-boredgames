// MathBored Feature Flags
// ========================
// All growth features are behind flags. To "release" a bundle,
// set its flags to true and deploy. No backend needed.
//
// Optional: host this as /flags.json and fetch at load for
// remote flag flipping without a redeploy.

window.MATHBORED_FLAGS = {
    // ─── Bundle 1: Share & Brag (launch first) ────────────────────
    webShare: false,              // #3  Native Web Share API on mobile
    dailyChallenge: false,        // #1  Daily challenge with Wordle-style share
    challengeFriend: false,       // #2  Challenge-a-friend encoded URLs
    clipboardParentText: false,   // #4  One-tap "parent text" copy
    fixTheMistake: false,         // #5  Shareable "find the error" puzzles

    // ─── Bundle 2: Teacher Tools ──────────────────────────────────
    embeddableWidget: false,      // #11 Embeddable <iframe> quiz widget
    mathOfTheDay: false,          // #12 Embeddable daily problem snippet
    worksheetPrint: false,        // #13 Printable worksheets with branding
    qrPoster: false,              // #14 QR code classroom poster generator
    shareWithSchool: false,       // #15 Pre-written mailto share email
    classroomCode: false,         // #16 Classroom code system (URL + localStorage)

    // ─── Bundle 3: Streaks & Achievements ─────────────────────────
    practiceHeatmap: false,       // #6  GitHub-style practice heatmap
    badgeGenerator: false,        // #7  "I Survived [Topic]" badge generator
    streakBragCards: false,       // #8  Milestone brag card images
    certificates: false,          // #10 Printable achievement certificates

    // ─── Bundle 4: Competition & Proof ────────────────────────────
    speedRun: false,              // #9  Speed run mode with shareable times
    mathMinute: false,            // #30 60-second Math Minute challenge
    homeworkEvidence: false,      // #26 "Show Your Work" printable receipt
    // fixTheMistake already in Bundle 1

    // ─── Bundle 5: Classroom & Discovery ──────────────────────────
    // classroomCode already in Bundle 2
    referClassroom: false,        // #23 Refer-a-classroom tracking link
    schoolLeaderboard: false,     // #21 Anonymous school pseudo-leaderboard
    // mathOfTheDay already in Bundle 2

    // ─── Bundle 6: SEO & Seasonal ─────────────────────────────────
    seasonalChallenges: false,    // #20 Pi Day, Back to School, etc.
    parentGuides: false,          // #18 "How to Help Your Child" pages
    // FAQ schema expansion (#19) - handled in build scripts

    // ─── Bundle 7: Install & Offline ──────────────────────────────
    smartInstallPrompt: false,    // #25 Well-timed PWA install prompt
    offlineMode: false,           // #28 "Practice on the Bus" offline messaging
    deepLinks: false,             // #29 Auto-anchored deep links for assignments

    // ─── Bundle 8: Social Proof & Reports ─────────────────────────
    progressReport: false,        // #22 Parent progress report generator
    socialProof: false,           // #24 "Join X students" counter
    scavengerHunt: false,         // #27 "Scan the Room" scavenger hunt kit
};

// Helper: check a flag
window.flagEnabled = function(flagName) {
    return window.MATHBORED_FLAGS && window.MATHBORED_FLAGS[flagName] === true;
};
