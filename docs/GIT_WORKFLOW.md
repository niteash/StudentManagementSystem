# Git and GitHub — exact two-person workflow

Run commands in the terminal from the **starter scaffold** directory, not the completed reference ZIP. Replace placeholders with actual details. Never commit real `.env` secrets.

## Student 1: create repository

```bash
git config --global user.name "Student One Real Name"
git config --global user.email "student1@example.com"
git init
git branch -M main
git add .
git commit -m "chore: initialize React TypeScript project scaffold"
# Create PUBLIC, empty GitHub repository in the GitHub website first.
git remote add origin https://github.com/STUDENT1/student-management-system.git
git push -u origin main
```

On GitHub: Settings → Collaborators → Add people → Student 2's GitHub username. Student 2 **must accept**.

## Student 2: clone repository

```bash
git config --global user.name "Student Two Real Name"
git config --global user.email "student2@example.com"
git clone https://github.com/STUDENT1/student-management-system.git
cd student-management-system
npm install
npm run dev
```

## Both students: independently implement work

Student 1:

```bash
git switch main
git pull --ff-only origin main
git switch -c feature-member1
# Implement actual Student 1 work, stage relevant files after each milestone:
git add src
 git commit -m "feat: create student registration form"
# Repeat for at least FOUR distinct, meaningful changes and commits.
git push -u origin feature-member1
```

Student 2:

```bash
git switch main
git pull --ff-only origin main
git switch -c feature-member2
# Implement actual Student 2 work, then:
git add src
 git commit -m "feat: implement student search"
# Repeat for at least FOUR distinct, meaningful changes and commits.
git push -u origin feature-member2
```

Open GitHub → Pull requests → New pull request → base `main` / compare your feature branch. Include description, feature screenshots and test steps. Ask your partner to **review** the PR. Review the partner's PR from GitHub's Files changed tab → Review changes; provide specific comments, and submit review. Apply the feedback and push a follow-up commit. Merge approved PRs in sequence. If the second branch has conflicts, resolve them collaboratively before merging.

After both PRs:

```bash
git switch main
git pull --ff-only origin main
npm install
npm run typecheck
npm run build
git log --oneline --graph --all
```

## Deliberate merge-conflict exercise (after main app PRs)

Use the **same line** of `docs/team-message.md`. This exercise is separate from both required feature branches.

Student 1:

```bash
git switch main
git pull --ff-only origin main
git switch -c practice-conflict-member1
# Edit the only line in docs/team-message.md to:
# Our project prioritizes a simple student registration workflow.
git add docs/team-message.md
git commit -m "docs: describe registration goal"
git push -u origin practice-conflict-member1
```

Student 2 (from their own clone, before Student 1's conflict PR is merged):

```bash
git switch main
git pull --ff-only origin main
git switch -c practice-conflict-member2
# Edit the only line in docs/team-message.md to:
# Our project prioritizes searchable attendance records.
git add docs/team-message.md
git commit -m "docs: describe attendance goal"
git push -u origin practice-conflict-member2
```

Student 2 reviews Student 1's practice PR. Merge Student 1's PR into `main` first. Student 2 then:

```bash
git switch practice-conflict-member2
git fetch origin
git merge origin/main
# Git reports CONFLICT (content): Merge conflict in docs/team-message.md
# Capture screenshot NOW, including git status and conflict markers.
```

The file will contain markers resembling:

```text
<<<<<<< HEAD
Our project prioritizes searchable attendance records.
=======
Our project prioritizes a simple student registration workflow.
>>>>>>> origin/main
```

Together choose and save the resolved **single** line:

```text
Our project prioritizes simple student registration and searchable attendance records.
```

Then Student 2:

```bash
git add docs/team-message.md
git commit -m "fix: resolve team-message merge conflict"
git push origin practice-conflict-member2
```

Student 1 reviews Student 2's final practice PR and merges it to `main`. Capture screenshots of conflict markers, resolved content, terminal success, and both partners' PR activity.

## Suggested evidence filenames

```text
screenshots/01-dashboard.png
screenshots/02-student-form.png
screenshots/03-branches.png
screenshots/04-member1-commits.png
screenshots/05-member2-commits.png
screenshots/06-pr-member1.png
screenshots/07-pr-member2.png
screenshots/08-reviews.png
screenshots/09-conflict-markers.png
screenshots/10-resolved-conflict.png
screenshots/11-git-graph.png
```
