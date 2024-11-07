const core = require("@actions/core");
const github = require("@actions/github");

module.exports = async ({
  owner,
  repo,
  head,
  base,
  draft,
  title,
  body,
  labels,
  assignees,
  reviewers,
  team_reviewers,
}) => {
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  let { number, html_url, created } = {};
  try {
    const { data } = await octokit.rest.pulls.list({
      owner,
      repo,
      base,
      head: `${owner}:${head}`,
    });
    if (data.length > 0) {
      ({ number, html_url, created } = { ...data[0], create: false });
      core.info(`PR ${number} exists: ${html_url}`);
    } else {
      const { data } = await octokit.rest.pulls.create({
        owner,
        repo,
        head,
        base,
        draft,
        title,
        body,
      });
      ({ number, html_url, created } = { ...data, created: true });
      core.info(`PR ${number} created: ${html_url}`);
    }
    if (reviewers.length > 0 || team_reviewers.length > 0) {
      await octokit.rest.pulls.requestReviewers({
        owner,
        repo,
        reviewers,
        team_reviewers,
        pull_number: number,
      });
      core.info(`PR ${number} add reviews: ${reviewers} ${team_reviewers}`);
    }
    if (assignees.length > 0) {
      await octokit.rest.issues.addAssignees({
        owner,
        repo,
        assignees,
        issue_number: number,
      });
      core.info(`PR ${number} add assignees: ${assignees}`);
    }
    if (labels.length > 0) {
      await octokit.rest.issues.addLabels({
        owner,
        repo,
        labels,
        issue_number: number,
      });
      core.info(`PR ${number} add labels: ${labels}`);
    }
    return { number, html_url, created };
  } catch (error) {
    throw error;
  }
};
