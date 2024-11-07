# create-pr-action

Github action to create a PR

## Inputs

### `head`

**Required** The head ref.

### `base`

**Optional** The base branch of the PR. Defaults to main.

### `draft`

**Optional** Draft PR or not. Defaults to true.

### `title`

**Optional** The title of the PR. Defaults to head.

### `body`

**Optional** The body of the PR. Defaults to head.

### `repository`

**Optional** The owner/repo in which the PR shall be created. Defaults to current repo.

### `lables`

**Optional** A comma-separated list of labels to be set on this PR. Defaults to WIP.

### `assignees`

**Optional** A comma-separated list of GitHub logins that should be assigned to this PR.

### `reviewers`

**Optional** A comma-separated list of GitHub logins that should review this PR.

### `team_reviewers`

**Optional** A comma-separated list of GitHub team slugs that should review this PR.

## Outputs

### `number`

**String** PR number.

### `url`

**String** PR link.

### `created`

**String** 'true': branch created, 'false': branch exists.

## Example usage

```yaml
uses: s4mli/create-pr-action@v1.0.0
env:
  GITHUB_TOKEN: xxx
with:
  head: test
```
