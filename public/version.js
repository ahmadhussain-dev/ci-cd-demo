/*
 * RELEASE HISTORY
 * ---------------
 * To publish a new version:
 *   1. Add a new entry at the TOP of this list (newest first).
 *   2. Use a higher version number: MAJOR.MINOR.PATCH (e.g. 2.1.0).
 *   3. Commit and push. The tests check this file, then Vercel deploys it.
 *
 * The automated tests (tests/version.test.js) fail if the version number
 * is badly formatted, is not higher than the previous one, or a field is missing.
 * A failing test stops the deployment, so a broken release never goes live.
 */
window.RELEASES = [
  {
     version: "4.0.0",
     date: "2026-10-07",
     title: "Green theme/ Light Theme",
     changes: [
       "Changed the accent colour to green",
     ],
   },
  {
  version: "2.2.0",
  date: "2026-10-07",
  title: "New colour theme",
  changes: [
    "Changed the accent colour",
  ],
},
  {
    version: "2.0.0",
    date: "2026-10-06",
    title: "Release history and live deployment info",
    changes: [
      "Show the current version and full release history",
      "Show which Git commit is live, written by the pipeline",
      "Automated tests run before every deployment",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-10-06",
    title: "Hello CI/CD",
    changes: [
      "First version of the website",
    ],
  },
];
