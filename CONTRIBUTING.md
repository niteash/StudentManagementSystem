# Contributing to CampusFlow

## Students and responsibilities

| Member | GitHub | Branch | Real work undertaken |
|---|---|---|---|
| Student 1 [NAME] | [USERNAME] | `feature-member1` | Add/delete student, directory UI, validations |
| Student 2 [NAME] | [USERNAME] | `feature-member2` | Edit student, search/filter, attendance, dashboard |

Update this table based on completed work (not intended contributions).

## Workflow

1. Student 1 creates a **public** repository, pushes the starter scaffold, and invites Student 2 with collaborator access.
2. Student 2 accepts the invitation and clones the repository.
3. Both run `npm install` and `npm run dev`.
4. Student 1 runs `git switch -c feature-member1`; Student 2 runs `git switch -c feature-member2`.
5. Both implement their OWN features, making **at least four meaningful commits each**.
6. Both push their branches and open separate pull requests against `main`.
7. Each student reviews the other's PR and provides actionable feedback; the author addresses it.
8. Merge reviewed PRs into `main`; capture screenshots of the commits/PRs/reviews.
9. Both students perform the merge-conflict exercise on designated practice branches and document the conflict plus resolution.
10. Run `npm run typecheck`, `npm run build`, and `git log --oneline --graph --all`.

## Example commit messages (use only for work actually done)

```text
feat: build student registration form
feat: implement add student validation
feat: render student directory
feat: add delete confirmation
feat: add student edit functionality
feat: implement text search and course filter
feat: add attendance status management
feat: calculate dashboard statistics
```

## Pull requests and reviews

| PR | Author | Reviewer | URL | Review summary | Merge commit |
|---|---|---|---|---|---|
| #1 | Student 1 | Student 2 | [actual link] | [actual feedback] | [hash] |
| #2 | Student 2 | Student 1 | [actual link] | [actual feedback] | [hash] |

Review for usability, data validation, types, accessibility, and successful build. Do not approve your own work. If GitHub doesn't allow an approval-style review due to repository permissions, submit a detailed **comment-based review**, and capture it.

## Merge-conflict demonstration

Both students independently modify the same line in `docs/team-message.md` on two **practice branches** and commit/push. Student 1's practice branch gets merged first; Student 2 merges `main` into their practice branch, sees conflict markers, captures a screenshot, edits a combined sentence, stages and commits resolution, and captures another screenshot. Both students discuss/approve the resolution. The complete commands are in `docs/GIT_WORKFLOW.md`.

## Proof and academic integrity

GitHub activity should show actual development by two distinct accounts. Do not share logins, impersonate your teammate, backdate/forge commits, or stage fabricated screenshots. Never commit passwords, keys, access tokens, or real personal records.
