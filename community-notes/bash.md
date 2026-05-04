> Part of [Rook](https://userook.app), a notes app made for code. Download free at [userook.app](https://userook.app).

# bash quick reference

Navigation, files, text, pipes, processes, ports, env. macOS and Linux.

## Navigation

```bash
pwd                                     # current directory
cd <path>                               # change directory
cd                                      # back to home
cd -                                    # back to previous directory
ls                                      # list current dir
ls -la                                  # long format, includes hidden
ls -lh                                  # human-readable sizes
ls -lt                                  # sorted by modified, newest first
```

## Finding files

```bash
find . -name "*.md"                     # by name pattern
find . -iname "*.md"                    # case-insensitive
find . -type f -name "*.log"            # files only
find . -type d -name "node_modules"     # directories only
find . -mtime -1                        # modified in last 24h
find . -size +10M                       # larger than 10 MB

# fd (modern alternative, brew install fd): regex by default, gitignore-aware
fd "\.md$"
fd -t f -e log
```

## File operations

```bash
mkdir <name>
mkdir -p path/to/nested                 # create parents as needed
touch <file>                            # create empty file or update mtime
cp <src> <dst>
cp -r <src-dir> <dst-dir>               # recursive
mv <src> <dst>                          # move or rename
rm <file>
rm -r <dir>                             # recursive
rm -rf <dir>                            # force, no prompts (destructive)
```

## Permissions

```bash
chmod +x <file>                         # add execute
chmod -x <file>                         # remove execute
chmod 644 <file>                        # owner rw, group r, other r
chmod 755 <file>                        # owner rwx, group rx, other rx
chmod -R 755 <dir>                      # recursive
chown <user>:<group> <file>             # change owner and group
chown -R <user> <dir>                   # recursive
ls -l <file>                            # see current permissions
```

## Reading and comparing files

```bash
cat <file>
head -n 20 <file>                       # first 20 lines
tail -n 50 <file>                       # last 50 lines
tail -f <file>                          # follow appended writes
less <file>                             # pager (q to quit, / to search)
wc -l <file>                            # line count
diff <file1> <file2>                    # line-by-line diff
diff -r <dir1> <dir2>                   # recursive directory diff
```

## grep

```bash
grep "<pattern>" <file>
grep -r "<pattern>" <dir>               # recursive
grep -i "<pattern>" <file>              # case-insensitive
grep -n "<pattern>" <file>              # show line numbers
grep -v "<pattern>" <file>              # lines NOT matching
grep -E "<regex>" <file>                # extended regex
grep -A 3 "<pattern>" <file>            # 3 lines after each match
grep -B 3 "<pattern>" <file>            # 3 lines before each match
grep -C 3 "<pattern>" <file>            # 3 lines around (before + after)
```

### grep as a filter

Pipe any command into grep to keep only matching lines. The most common bash one-liner shape.

```bash
ps aux | grep <name>                    # running processes matching name
ls -la | grep "\.md"                    # entries with .md in the name
docker ps | grep <name>                 # running containers matching name
env | grep PATH                         # env vars containing PATH
git log --oneline | grep "<pattern>"    # commits whose subject matches
history | grep "<pattern>"              # past commands matching pattern

# grep -v inverts: keep lines NOT matching
ps aux | grep python | grep -v grep     # the "exclude grep itself" trick
```

### ripgrep

Faster, recursive and gitignore-aware by default. `brew install ripgrep`.

```bash
rg "<pattern>"
rg -i "<pattern>"
rg --type py "<pattern>"
```

## sed, awk, cut

```bash
# sed: stream substitution
sed 's/<from>/<to>/g' <file>            # replace all on each line, print result
sed -i '' 's/<from>/<to>/g' <file>      # in-place edit (macOS)
sed -i 's/<from>/<to>/g' <file>         # in-place edit (Linux)

# cut: column extraction
cut -d',' -f2 <file>                    # 2nd CSV column
cut -c1-10 <file>                       # first 10 characters per line

# awk: programmable text processing
awk '{print $2}' <file>                 # 2nd whitespace-separated field
awk -F',' '{print $2}' <file>           # 2nd CSV field
awk '$3 > 100 {print $1}' <file>        # rows where col 3 > 100, print col 1
```

## sort, uniq

```bash
sort <file>
sort -u <file>                          # unique only
sort -n <file>                          # numeric sort
sort -r <file>                          # reverse

uniq <sorted-file>                      # adjacent dedup (input must be sorted)
uniq -c <sorted-file>                   # count occurrences

sort <file> | uniq -c | sort -rn        # top items by frequency
```

## Pipes and redirects

```bash
<cmd1> | <cmd2>                         # stdout of cmd1 to stdin of cmd2
<cmd> > <file>                          # write stdout (overwrite)
<cmd> >> <file>                         # append stdout
<cmd> 2> <file>                         # write stderr
<cmd> &> <file>                         # write both stdout and stderr
<cmd> 2>&1                              # redirect stderr to current stdout
<cmd> > /dev/null                       # discard stdout
<cmd> < <file>                          # read stdin from file
```

## tee and watch

```bash
<cmd> | tee <file>                      # write to file AND pass through to stdout
<cmd> | tee -a <file>                   # append instead of overwrite
watch -n 2 <cmd>                        # re-run cmd every 2 seconds (brew install watch)
```

## xargs

```bash
echo "a b c" | xargs <cmd>              # runs: <cmd> a b c
find . -name "*.log" | xargs rm         # apply cmd to each match
find . -name "*.log" -print0 | xargs -0 rm   # safer when filenames contain spaces
ls *.txt | xargs -n 1 <cmd>             # one arg per call
ls *.txt | xargs -I {} mv {} /tmp/      # {} as explicit placeholder
```

## Background jobs

```bash
<cmd> &                                 # run in background
jobs                                    # list jobs in current shell
fg                                      # bring last background job to foreground
fg %1                                   # specific job by number
bg %1                                   # resume in background
nohup <cmd> &                           # detach from terminal, survive logout
```

## Processes

```bash
ps aux                                  # all processes, all users
ps aux | grep <name>                    # filter by name
pgrep <name>                            # PIDs by name
pkill <name>                            # kill by name
kill <pid>                              # SIGTERM (graceful)
kill -9 <pid>                           # SIGKILL (force)
killall <name>                          # kill all by name

top                                     # built-in process view
htop                                    # nicer (brew install htop)
```

## Ports and open files

```bash
lsof -i :<port>                         # what's listening on a port
lsof -i -P -n                           # all open network sockets, no DNS lookup
lsof -p <pid>                           # all files (incl. sockets) opened by a pid
lsof <file>                             # which process has this file open

# Linux only
ss -tulpn                               # listening TCP/UDP ports + owning process
netstat -tulpn                          # same, older tool
```

## HTTP from the terminal

```bash
curl <url>                              # GET, print body
curl -i <url>                           # include response headers
curl -I <url>                           # HEAD only (headers, no body)
curl -L <url>                           # follow redirects
curl -X POST <url> -d "key=value"       # form POST
curl -X POST <url> -H "Content-Type: application/json" -d '{"k":"v"}'
curl -o <file> <url>                    # save body to file
curl -O <url>                           # save with the URL's filename

wget <url>                              # download to current dir (brew install wget on macOS)
wget -c <url>                           # continue a partial download
```

## Disk and memory

```bash
df -h                                   # disk free, all mounts, human readable
du -sh <path>                           # size of a path
du -sh * | sort -rh | head -20          # top entries in current dir by size

free -h                                 # memory (Linux)
vm_stat                                 # memory (macOS)
```

## Archives

```bash
tar -czf <archive>.tar.gz <dir>         # create gzipped tar
tar -xzf <archive>.tar.gz               # extract gzipped tar
tar -tzf <archive>.tar.gz               # list contents without extracting

zip -r <archive>.zip <dir>              # create zip
unzip <archive>.zip                     # extract
unzip -l <archive>.zip                  # list contents
```

## Environment

```bash
env                                     # all env vars
echo $<VAR>                             # value of one var
export <VAR>=<value>                    # set for current shell + child processes
export PATH="$PATH:<new-path>"          # append to PATH
unset <VAR>                             # remove a var

which <cmd>                             # path of an executable on PATH
type <cmd>                              # what the name resolves to (alias, function, builtin, file)
command -v <cmd>                        # cleanest "does this exist" check (exits non-zero if not)
```

## History and aliases

```bash
history                                 # numbered list of past commands
!!                                      # re-run last command
!<n>                                    # re-run command N from history
!$                                      # last argument of previous command (handy after mkdir)

alias <name>='<cmd>'                    # create alias for current shell
alias                                   # list current aliases

# Persist by adding to ~/.bashrc or ~/.zshrc
```

## Globs and brace expansion

```bash
ls *.md                                 # any name ending in .md
ls ?.md                                 # single character before .md
ls [abc].md                             # a.md, b.md, or c.md
ls **/*.md                              # recursive (needs shopt -s globstar in bash)

cp file.txt{,.bak}                      # cp file.txt file.txt.bak
mkdir -p project/{src,tests,docs}       # create three subdirs at once
echo {1..5}                             # 1 2 3 4 5
```
