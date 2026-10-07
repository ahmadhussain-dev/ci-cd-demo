// Writes public/build-info.js so the live site can show which commit is deployed.
// Vercel runs this during every build (see vercel.json) and provides the
// VERCEL_* environment variables automatically.
const fs = require("node:fs");
const path = require("node:path");

const env = process.env;

const info = {
  environment: env.VERCEL_ENV === "production" ? "production" : "preview",
  commitSha: env.VERCEL_GIT_COMMIT_SHA || "unknown",
  commitMessage: (env.VERCEL_GIT_COMMIT_MESSAGE || "").split("\n")[0],
  commitAuthor: env.VERCEL_GIT_COMMIT_AUTHOR_NAME || env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN || "",
  branch: env.VERCEL_GIT_COMMIT_REF || "unknown",
  pullRequest: env.VERCEL_GIT_PULL_REQUEST_ID || null,
  deployedAt: new Date().toISOString(),
  repoUrl: `https://github.com/${env.VERCEL_GIT_REPO_OWNER}/${env.VERCEL_GIT_REPO_SLUG}`,
};

const outFile = path.join(__dirname, "..", "public", "build-info.js");
fs.writeFileSync(outFile, "window.BUILD_INFO = " + JSON.stringify(info, null, 2) + ";\n");

console.log("Wrote public/build-info.js");
console.log(info);
