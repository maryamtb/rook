# Contributing to Rook

Thanks for the interest. This repo accepts **community notes** contributions.

Notes are compact references for the tools, CLIs, and concepts you reach for regularly: kubectl, Docker, AWS, Git workflows, algorithm patterns. 

The macOS app and the landing page are closed to outside contributions. Bugs and feature requests for the app are welcome in [issues](../../issues).

---

## Contributing a community note

Community notes are plain Markdown files under [`community-notes/`](community-notes/).

### Format

```markdown
# Topic name

One sentence on what this is and who it's for.

## Section

Short prose explaining the group of commands.

```bash
command --flag value
command --other <placeholder>
```

### Guidelines

- **Practical.** Commands you use frequently.
- **Copy-paste ready.** Use `<placeholder>` for values the reader has to fill in.
- **Grouped by task, not by flag.** "Pods" and "Deployments" beats "`-n`" and "`-o`".
- **One topic per note.** If scope creeps, split it.
- **Tested.** If you haven't run it, don't include it.

### Checklist before opening a PR

- [ ] File is under `community-notes/` and named `<topic>.md` (lowercase, hyphens)
- [ ] Linked from `community-notes/README.md`
- [ ] Under ~150 lines (split into multiple notes if longer)
- [ ] Renders cleanly (preview it on GitHub)

## Reporting a bug in the macOS app

Open an [issue](../../issues/new) and include:
- macOS version
- Rook version (Rook → About)
- Steps to reproduce
- What you expected, what happened

## Filing a feature request

Also an [issue](../../issues/new). One per issue.
