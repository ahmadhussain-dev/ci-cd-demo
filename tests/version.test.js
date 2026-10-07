// Automated checks the CI pipeline runs before every deployment.
// Run locally with: npm test
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const publicDir = path.join(__dirname, "..", "public");

function loadReleases() {
  const code = fs.readFileSync(path.join(publicDir, "version.js"), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window.RELEASES;
}

const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

function compareVersions(a, b) {
  const pa = a.match(SEMVER).slice(1).map(Number);
  const pb = b.match(SEMVER).slice(1).map(Number);
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  return 0;
}

test("website files exist", () => {
  for (const file of ["index.html", "style.css", "app.js", "version.js"]) {
    assert.ok(fs.existsSync(path.join(publicDir, file)), `public/${file} is missing`);
  }
});

test("index.html loads the scripts the page needs", () => {
  const html = fs.readFileSync(path.join(publicDir, "index.html"), "utf8");
  for (const script of ["version.js", "build-info.js", "app.js"]) {
    assert.ok(html.includes(`src="${script}"`), `index.html does not load ${script}`);
  }
});

test("there is at least one release", () => {
  const releases = loadReleases();
  assert.ok(Array.isArray(releases), "window.RELEASES must be an array");
  assert.ok(releases.length > 0, "window.RELEASES must not be empty");
});

test("every release is complete and well formatted", () => {
  for (const release of loadReleases()) {
    const label = `release ${JSON.stringify(release.version)}`;
    assert.match(release.version, SEMVER, `${label}: version must look like 1.2.3`);
    assert.match(release.date, /^\d{4}-\d{2}-\d{2}$/, `${label}: date must look like 2026-10-06`);
    assert.ok(!Number.isNaN(Date.parse(release.date)), `${label}: date is not a real date`);
    assert.ok(release.title && release.title.trim(), `${label}: title is missing`);
    assert.ok(Array.isArray(release.changes) && release.changes.length > 0, `${label}: list at least one change`);
  }
});

test("releases are newest first and each version is higher than the last", () => {
  const releases = loadReleases();
  for (let i = 0; i < releases.length - 1; i++) {
    const newer = releases[i].version;
    const older = releases[i + 1].version;
    assert.ok(
      compareVersions(newer, older) > 0,
      `v${newer} must be higher than v${older} (put the newest release at the top)`
    );
  }
});
