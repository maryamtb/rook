# Git quick reference

Commands for branches, undoing, rebase, remote, log.

## Branches

```bash
git branch                     # list
git branch <name>              # create
git switch <name>              # switch (modern replacement for checkout)
git switch -c <name>           # create and switch
git branch -d <name>           # delete (only if merged)
git branch -D <name>           # force delete
git merge <name>               # merge <name> into current branch
```

## Undoing things

```bash
git restore <file>             # discard unstaged changes to a file
git restore --staged <file>    # unstage (keeps the file changes)
git reset HEAD~1               # undo last commit, keep changes staged
git reset --hard HEAD~1        # undo last commit, discard changes (destructive)
git revert <sha>               # create a new commit that undoes <sha>
git reflog                     # every HEAD move you've made; use this when you think you lost a commit
git reset --hard <sha>         # rescue a commit from reflog
```

## Stash

```bash
git stash                      # shelve work-in-progress
git stash pop                  # restore most recent stash
git stash list
git stash apply stash@{2}      # apply a specific stash without dropping it
```

## Rebase and history

```bash
git rebase <branch>            # replay current branch on top of <branch>
git rebase -i HEAD~5           # interactive: reorder, squash, edit last 5 commits
git cherry-pick <sha>          # apply a single commit to current branch
git commit --amend             # edit the last commit (message or add staged changes)
git commit --amend --no-edit   # add staged changes to last commit, keep message
```

## Remote

```bash
git remote -v                  # list remotes and URLs
git remote add <name> <url>
git remote set-url origin <new-url>
git fetch                      # update refs without merging
git push -u origin <branch>    # first push, sets upstream tracking
git push --force-with-lease    # safer force-push (fails if remote moved)
```

## Log

```bash
git log --oneline
git log --graph --oneline --all    # visual tree of all branches
git log -p <file>                  # diffs for a specific file over time
git log --author="name"
```
