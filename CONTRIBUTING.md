# Contributing to CampusFlow

This document describes the team responsibilities and GitHub workflow followed during the development of CampusFlow.

## Team Members and Responsibilities

| Member | GitHub Username | Branch | Contributions |
|---|---|---|---|
| Student 1 | niteash | `feature-member1` | Student registration, directory, deletion, and assigned features. |
| Student 2 | abhinsane | `feature-member2` | Student editing, search, filtering, sorting, pagination, attendance management, and attendance statistics. |

## Development Workflow

1. Student 1 created the public GitHub repository and invited Student 2 as a collaborator.
2. Student 2 accepted the invitation and cloned the repository.
3. Both members installed dependencies using `npm install`.
4. Each member worked on a separate feature branch.
5. Each member implemented their assigned features and created meaningful commits.
6. Both members pushed their branches to GitHub.
7. Pull requests were created to propose changes to the `main` branch.
8. Team members reviewed each other's changes.
9. Reviewed changes were merged into the main branch.

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Integrated project code. |
| `feature-member1` | Student 1's development work. |
| `feature-member2` | Student 2's development work. |

## Commit Guidelines

Commits should describe the changes made.

Examples:

```text
feat: add student editing modal with validation
feat: add student search filter and pagination
feat: add attendance management and stats view
```

Only use commit messages that accurately represent the work completed.

## Pull Requests and Code Reviews

Each student creates a pull request from their feature branch into `main`.

The other student reviews the proposed changes for:

- Correct functionality.
- Input validation.
- TypeScript correctness.
- Code readability.
- Application build success.

Review feedback should be addressed before merging.

## Merge Conflict Resolution

The team uses a designated practice exercise to demonstrate merge-conflict handling.

The exercise involves:

1. Creating separate practice branches.
2. Editing the same line in a shared file.
3. Merging one branch into the other.
4. Identifying the resulting conflict.
5. Resolving the conflict by combining the intended changes.
6. Committing the resolution.

Screenshots of the conflict and its resolution are included in the project report.

## Running the Project

```bash
npm install
npm run dev
```

To verify the production build:

```bash
npm run build
```

## Academic Integrity

Each student must use their own GitHub account and make commits representing their actual contributions.

Passwords, API keys, access tokens, and real student personal records must not be committed to the repository.

