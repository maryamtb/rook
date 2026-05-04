# Contributing to Rook

Thanks for the interest. This repo accepts **community notes** contributions.

Notes are compact references for the tools, CLIs, and concepts you reach for regularly: kubectl, Docker, AWS, Git workflows, algorithm patterns. 

The macOS app and the landing page are closed to outside contributions. Bugs and feature requests for the app are welcome in [issues](../../issues).

---

## Contributing a community note

Community notes are plain Markdown files under [`community-notes/`](community-notes/).

### Format

````markdown
<!-- ROOK:HEADER -->
<!-- /ROOK:HEADER -->

# Topic name

One sentence on what this is and who it's for.

## Section

Short prose explaining the group of commands.

```bash
command --flag value
command --other <placeholder>
```

<!-- ROOK:FOOTER -->
<!-- /ROOK:FOOTER -->
````

The `<!-- ROOK:HEADER -->` and `<!-- ROOK:FOOTER -->` blocks are filled in automatically — leave them empty and run `pnpm sync` from `community-notes/` before pushing. If your note is part of a series (lives in a subdirectory next to a `README.md`), also add `<!-- ROOK:SERIES --><!-- /ROOK:SERIES -->` between the content and the footer; sync builds the cross-links from sibling files.

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
- [ ] Marker blocks present (header, footer, plus series for subdirectory notes)
- [ ] Ran `pnpm sync` from `community-notes/`
- [ ] Renders cleanly (preview it on GitHub)

## Bugs and feature requests for the macOS app

Both go in [issues](../../issues/new/choose). Pick the **Bug** or **Feature request** template and fill in the prompts. One topic per issue.
