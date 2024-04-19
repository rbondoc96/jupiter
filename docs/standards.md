# Repo Standards

## 📜 Table of Contents
- [Commit Standards](#commit-standards)

---

## 🫱🏽‍🫲🏿 Commit Standards
<a id="commit-standards"></a>

### Structure of a Commit Message

```
git commit -m "<tag>(scope): <message>"

my commit message body

---

my commit message footer
```

### Tag Types

- `build`: Changes that affect how the repo/workspace is built or changes its dependencies
- `chore`: Changes that affect the developer experience (code formatting configs, IDE configs, etc.)
- `feat`: Introduces a new feature or completes of a new feature. Used for more meaningful commits
- `update`: Any work that leads to completion of a task, finding a solution to a bug, etc. Used for less meaningful commits
- `docs`: Updates to documentation, such as comments, Markdown files, etc.
- `fix`: Bug fixes
- `refactor`: A code change that does not change how the code works (file renaming, cleanup, etc.)
- `perf`: Changes that improve the efficiency or performance of the code
- `style`: Code style changes, such as white-space, formatting, lint fixes, type fixes, etc.
- `test`: Addition/deletion of automated tests or updating existing tests

### Commit Scopes

The commit scope should match a folder name in one of the PNPM workspaces. Every folder name should be unique.

#### Docker Containers for Helpers

- `mailpit`
- `postgres`

#### JavaScript Apps

- `codercooks`
- `next-template`
- `react-resume`
- `react-template`
- `www`
- `www-solid`

#### JavaScript Packages

- `react-resume`
- `ui-react`
