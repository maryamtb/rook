# k9s quick reference

Terminal UI for Kubernetes. Browse, filter, debug, and operate on cluster resources without typing `kubectl` for every action.

## Install

```bash
brew install derailed/k9s/k9s        # macOS, official tap
brew install k9s                     # macOS, if available in core
curl -sS https://webinstall.dev/k9s | bash   # cross-platform binary
```

## Launch

```bash
k9s                                  # default kubeconfig + context
k9s -n <namespace>                   # start in a specific namespace
k9s -c <resource>                    # start in a specific resource view (e.g. k9s -c pods)
k9s --kubeconfig <path>              # use a specific kubeconfig
k9s --context <name>                 # use a specific context from kubeconfig
k9s --readonly                       # disable destructive actions
k9s --headless                       # hide top header for more screen space
```

## Switching resource views

Type `:` then a resource name. Tab-completes.

```
:pod          pods                   :node          nodes
:deploy       deployments            :ing           ingresses
:svc          services               :pvc           persistent volume claims
:ns           namespaces             :hpa           horizontal pod autoscalers
:ctx          contexts               :sa            service accounts
:cm           configmaps             :rb            role bindings
:secret       secrets                :crd           custom resource definitions
```

## Universal keys

| Key | Action |
|-----|--------|
| `?` | Show all keybindings for the current view |
| `:` | Command mode (resource switcher) |
| `/` | Filter the current view |
| `esc` | Exit current mode, clear filter |
| `q` | Quit |
| `space` | Mark a row (multi-select) |
| `ctrl-d` | Delete marked or focused resource |
| `ctrl-r` | Refresh view |
| `enter` | Drill into focused resource |

## Pod operations (in `:pod`)

| Key | Action |
|-----|--------|
| `l` | View logs |
| `p` | Show previous logs (last container restart) |
| `s` | Shell into pod |
| `d` | Describe |
| `e` | Edit YAML |
| `y` | View YAML |
| `f` | Show port-forwards |
| `shift-f` | Open port-forward dialog |
| `ctrl-k` | Kill pod (deletes; the controller reschedules) |

## Filter syntax

```
/<text>            # name match (regex supported)
/!<text>           # inverse filter
/-l <selector>     # label selector (e.g. /-l app=nginx,tier=web)
/<phase>           # status (e.g. /Running, /Pending, /CrashLoopBackOff)
/Failed            # quick filter for failed phase
```

## Logs view

| Key | Action |
|-----|--------|
| `0` | Toggle full log mode |
| `f` | Toggle follow |
| `p` | Pause |
| `c` | Clear |
| `s` | Save logs to file |
| `m` | Mark line |
| `/` | Filter log lines |

## Context and namespace

```
:ctx                # list contexts; enter to switch
:ns                 # list namespaces; enter to set the active namespace
0                   # show resources across all namespaces in current view
1-9                 # quick-switch to first N namespaces
```

## Sort

```
shift-<column key>     # sort by column (e.g. shift-a for AGE)
shift-<column key>     # press again to reverse direction
```

## Skin (theme)

Edit `~/.config/k9s/skins/<name>.yaml`, then in `~/.config/k9s/config.yaml`:

```yaml
k9s:
  ui:
    skin: <name>
```

A few popular skins live in the [k9s skins gallery](https://k9scli.io/topics/skins/).

## Plugins

Drop YAML at `~/.config/k9s/plugins.yaml`:

```yaml
plugins:
  jq-pod:
    shortCut: Shift-J
    description: Pretty-print pod as JSON via jq
    scopes:
      - po
    command: bash
    background: false
    args:
      - -c
      - "kubectl get pod $NAME -n $NAMESPACE -o json | jq | less"
```

Restart k9s. Press `?` in the pod view to confirm the binding appears.

## Common workflows

```
# Find and inspect a crashing pod
:pod                       # switch to pod view
/CrashLoopBackOff          # filter by status
enter                      # drill in
l                          # view current logs
p                          # see previous container's logs (often where the crash is)
```

```
# Port-forward a service to localhost
:svc                       # service view
/<service-name>            # filter
enter
shift-f                    # port-forward dialog
```

```
# Bulk-delete failed pods in a namespace
:pod -n <namespace>
/Failed                    # filter
space                      # mark a row; repeat to mark more
ctrl-d                     # delete all marked
```

## Read-only mode

Useful for shadowing teammates or running on production.

```bash
k9s --readonly
```

Or set permanently in `~/.config/k9s/config.yaml`:

```yaml
k9s:
  readOnly: true
```

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
