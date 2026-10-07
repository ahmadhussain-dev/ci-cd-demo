// Renders the version badge, deployment info and release history.
// Uses textContent everywhere so commit messages can't inject HTML.
(function () {
  const releases = window.RELEASES || [];
  const build = window.BUILD_INFO || null;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function link(href, text) {
    const a = el("a", null, text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  // ---------- Version badge ----------
  const current = releases[0];
  if (current) {
    document.getElementById("current-version").textContent = "v" + current.version;
    document.getElementById("current-title").textContent = current.title;
    document.title = "CI/CD Demo · v" + current.version;
  }

  // ---------- Live deployment info ----------
  const info = document.getElementById("build-info");

  function row(label, value) {
    info.appendChild(el("dt", null, label));
    const dd = el("dd");
    if (value instanceof Node) dd.appendChild(value);
    else dd.textContent = value;
    info.appendChild(dd);
  }

  if (build) {
    const env = build.environment === "production" ? "production" : "preview";
    row("Environment", el("span", "pill pill-" + env, env === "production" ? "Production" : "Preview"));
    row("Commit", link(build.repoUrl + "/commit/" + build.commitSha, build.commitSha.slice(0, 7)));
    row("Message", build.commitMessage);
    row("Author", build.commitAuthor);
    row("Branch", build.branch);
    if (build.pullRequest) {
      row("Pull request", link(build.repoUrl + "/pull/" + build.pullRequest, "#" + build.pullRequest));
    }
    row("Deployed at", new Date(build.deployedAt).toLocaleString());
  } else {
    row("Environment", el("span", "pill pill-local", "Local"));
    row("Note", "Running on your computer. Deployment info appears once Vercel deploys the site.");
  }

  // ---------- Release history ----------
  const list = document.getElementById("release-list");
  releases.forEach(function (release, index) {
    const item = el("li", "release" + (index === 0 ? " is-current" : ""));
    const head = el("div", "release-head");
    head.appendChild(el("span", "release-version", "v" + release.version));
    head.appendChild(el("span", "release-date", release.date + (index === 0 ? " · live now" : "")));
    item.appendChild(head);
    item.appendChild(el("p", "release-title", release.title));

    const changes = el("ul");
    release.changes.forEach(function (change) {
      changes.appendChild(el("li", null, change));
    });
    item.appendChild(changes);
    list.appendChild(item);
  });
})();
