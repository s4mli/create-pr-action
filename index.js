const core = require("@actions/core");
const github = require("@actions/github");
const createPR = require("./createPR");

(async () => {
  try {
    let { owner, repo } = github.context.repo;
    const repository = core.getInput("repository");
    if (repository) {
      [owner, repo] = repository.split("/");
    }
    const head = core.getInput("head");
    const base = core.getInput("base") || "main";
    const assignees = core.getInput("assignees");
    const reviewers = core.getInput("reviewers");
    const labels = core.getInput("labels") || "WIP";
    const team_reviewers = core.getInput("team_reviewers");
    const { number, html_url, created } = await createPR({
      owner,
      repo,
      base,
      head,
      body: core.getInput("body") || head,
      title: core.getInput("title") || head,
      draft: "false" === core.getInput("draft") ? false : true,
      labels: labels ? labels.split(",").map((l) => l.trim()) : [],
      assignees: assignees ? assignees.split(",").map((a) => a.trim()) : [],
      reviewers: reviewers ? reviewers.split(",").map((r) => r.trim()) : [],
      team_reviewers: team_reviewers
        ? team_reviewers.split(",").map((t) => t.trim())
        : [],
    });
    core.setOutput("url", html_url);
    core.setOutput("number", number.toString());
    core.setOutput("created", created ? "true" : "false");
  } catch (error) {
    core.setFailed(error.message);
  }
})();
