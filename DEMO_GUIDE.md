# Recorded Demo Script

A step-by-step script for recording the version control + CI/CD demo.
Each demo takes about 3–5 minutes. Do the one-time **Connect Vercel** step in the README before recording.

**Keep these open in browser tabs while recording:**
1. Your code editor (VS Code) with the terminal
2. GitHub repo → **Actions** tab
3. The live Vercel site
4. Vercel dashboard → your project → **Deployments**

---
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ahmadhussain-dev/ci-cd-demo.git
git push -u origin main

## Demo 1: Commit → push → live (the happy path)

**Goal:** show that a `git push` alone updates the live website.

1. Show the live site. Point at the **Current version** (for example v2.1.0) and the **Commit** hash.
2. In the editor, open `public/version.js` and add a new release at the top:
   ```js
   {
     version: "2.2.0",
     date: "2026-10-07",
     title: "Orange theme",
     changes: [
       "Changed the accent colour to orange",
     ],
   },
   ```
3. Open `public/style.css` and change the `--accent` colour to `#ea580c` (orange).
4. In the terminal:
   ```bash
   
   git add .
   git commit -m "Release v2.2.0: orange theme"
   git push
   ```
5. Switch to **GitHub → Actions**. Show the **CI - Test** run go green ✅.
6. Switch to **Vercel → Deployments**. A new deployment for your commit is building. Wait until it says **Ready**.
7. Refresh the live site. The version is now **v2.2.0**, the colour is orange, and the **Commit** hash matches the one on GitHub.
8. Click the commit hash on the site. It opens the exact commit on GitHub.

**Talking point:** "Nobody uploaded files to a server. The push did it."

---

## Demo 2: Branch → pull request → preview URL

**Goal:** show safe teamwork. Changes are reviewed on a preview before they reach production.

1. Create a branch:
   ```bash
   git checkout -b feature/new-heading
   ```
2. In `public/index.html`, change `Hello CI/CD 🚀` to `Hello DevOps Class 👋`.
   Add release `2.3.0` at the top of `public/version.js`.
3. Commit and push the branch:
   ```bash
   git add .
   git commit -m "Change heading for the class"
   git push -u origin feature/new-heading
   ```
4. On GitHub, click **Compare & pull request** → **Create pull request**.
5. Show the checks running on the PR: **CI - Test** from GitHub Actions and **Vercel** from Vercel.
   When they finish, the Vercel bot posts a comment with a **Preview** link. Open it.
6. On the preview site, point out **Environment: Preview** and the **Branch** name.
   The production site still shows the old version.
7. Click **Merge pull request**. The tests run again on `main` and Vercel deploys to **Production**.
8. Back on your machine:
   ```bash
   git checkout main
   git pull
   ```

**Talking point:** "Preview first, production after review. Each branch is its own sandbox."

---

## Demo 3: A broken change is blocked

**Goal:** show the "CI" in CI/CD protecting the live site.

1. In `public/version.js`, add a release with a bad version number:
   ```js
   {
     version: "2.4",          // ❌ not MAJOR.MINOR.PATCH
     date: "2026-10-07",
     title: "Oops",
     changes: ["Broken release"],
   },
   ```
2. Commit and push to `main`.
3. In **Actions**, **CI - Test** turns red ❌. Open the failed step and read the error aloud:
   `release "2.4": version must look like 1.2.3`
4. In **Vercel → Deployments**, the new deployment shows **Error**. Vercel runs the same tests before building, so it stopped.
5. Refresh the live site. It's unchanged and still working.
6. Fix the version to `2.4.0`, commit (`git commit -am "Fix version number"`), and push. It goes green and deploys.

**Talking point:** "The test failed, so the bad version never reached users."

---

## Demo 4: Roll back with Git

**Goal:** show that version control lets you undo a bad release safely.

1. Show the history:
   ```bash
   git log --oneline
   ```
2. Pick the commit you want to undo (for example, the purple colour change) and revert it:
   ```bash
   git revert <commit-hash>
   git push
   ```
   `git revert` makes a **new** commit that undoes the old one. History is kept, nothing is deleted.
3. The tests run again, Vercel redeploys, and the live site goes back to the previous look.
4. *(Optional)* Show the Vercel dashboard's **Deployments** list. Every deploy is kept there too.

**Talking point:** "Git remembers every version, so going back is just another commit."

---

## Handy Git commands to show on screen

| Command | What it does |
| --- | --- |
| `git status` | What has changed since the last commit? |
| `git diff` | Show the exact lines that changed |
| `git add <file>` | Stage changes for the next commit |
| `git commit -m "msg"` | Save a snapshot with a message |
| `git push` | Upload commits to GitHub (this triggers tests and deployment) |
| `git log --oneline` | List the commit history |
| `git checkout -b <name>` | Create and switch to a new branch |
| `git pull` | Download the latest commits from GitHub |
| `git revert <hash>` | Undo a commit by adding a new commit |
