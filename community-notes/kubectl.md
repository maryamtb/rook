# kubectl quick reference

Commands for contexts, pods, deployments, debugging.

## Authentication

Getting a kubeconfig entry depends on where the cluster lives.

- **Local ([kind](https://kind.sigs.k8s.io)).** `kind create cluster` writes the entry automatically. Verify with `kubectl cluster-info --context kind-kind`.
- **AWS EKS.** `aws eks update-kubeconfig --name <cluster-name> --region <region>`.

## Contexts

Switch between clusters and namespaces.

```bash
kubectl config get-contexts
kubectl config use-context <name>
kubectl config current-context
kubectl config set-context --current --namespace=<namespace>   # set default namespace
```

Every namespaced command below accepts `-n <namespace>`. Set a default on your context (last command above) or pass `-n` explicitly.

## Pods

```bash
kubectl get pods -n <namespace>
kubectl get pods -n <namespace> -o wide                        # includes node + IP
kubectl describe pod <pod-name> -n <namespace>
kubectl logs <pod-name> -n <namespace> --tail=100 -f           # tail and follow
kubectl logs <pod-name> -n <namespace> -c <container>          # specific container
kubectl logs <pod-name> -n <namespace> --previous              # previous crashed container
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh
kubectl port-forward <pod-name> -n <namespace> 8080:80
kubectl cp <pod-name>:<remote-path> <local-path> -n <namespace>   # copy from pod to local
kubectl cp <local-path> <pod-name>:<remote-path> -n <namespace>   # copy from local to pod
```

## Watching

```bash
kubectl get pods -n <namespace> -w                             # watch pod state in real time
watch kubectl get pods -n <namespace>                          # equivalent, via the `watch` utility
```

## Deployments

```bash
kubectl get deployments -n <namespace>
kubectl rollout status deployment <name> -n <namespace>
kubectl rollout restart deployment <name> -n <namespace>
kubectl rollout undo deployment <name> -n <namespace>
kubectl scale deployment <name> -n <namespace> --replicas=3
kubectl set image deployment/<name> <container>=<image>:<tag> -n <namespace>
```

## Services & networking

```bash
kubectl get svc -n <namespace>
kubectl describe svc <name> -n <namespace>
kubectl get endpoints <name> -n <namespace>                    # what pods a service is routing to
kubectl port-forward svc/<name> -n <namespace> 8080:80
```

## ConfigMaps & Secrets

```bash
kubectl get configmap <name> -n <namespace> -o yaml
kubectl create configmap <name> -n <namespace> --from-file=./config.yaml
kubectl create secret generic <name> -n <namespace> --from-literal=key=value
kubectl get secret <name> -n <namespace> -o jsonpath='{.data.key}' | base64 -d
```

## Debugging

```bash
kubectl get events -n <namespace> --sort-by=.lastTimestamp
kubectl describe pod <pod-name> -n <namespace>                 # look at Events at the bottom
kubectl top pod -n <namespace>                                 # CPU/memory (requires metrics-server)
kubectl top node                                               # cluster-scoped, no -n
kubectl get pod <pod-name> -n <namespace> -o jsonpath='{.spec.containers[*].image}'

# Open a shell in a new pod on the same node as a target pod
kubectl debug <pod-name> -n <namespace> -it --image=busybox --target=<container>
```

## Delete things

```bash
kubectl delete pod <pod-name> -n <namespace>                   # pod controller will recreate if managed
kubectl delete pod <pod-name> -n <namespace> --grace-period=0 --force   # stuck pods only
kubectl delete deployment <name> -n <namespace>
kubectl delete -f manifest.yaml                                # namespace taken from the manifest
```

## Apply & diff

```bash
kubectl apply -f manifest.yaml
kubectl diff -f manifest.yaml                                  # preview changes before apply
kubectl apply -k ./overlays/prod                               # kustomize
```

## [kind](https://kind.sigs.k8s.io)

```bash
kind create cluster --name <name>
kind get clusters
kind delete cluster --name <name>
kind load docker-image <image>:<tag>                           # make a local Docker image available to the cluster
kind load docker-image <image>:<tag> --name <cluster-name>     # target a specific kind cluster
```

## [AWS EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html)

```bash
aws eks list-clusters --region <region>
aws eks describe-cluster --name <cluster> --region <region>
aws eks update-kubeconfig --name <cluster> --region <region>   # add or refresh the kubeconfig entry
aws eks list-nodegroups --cluster-name <cluster> --region <region>

# IAM Roles for Service Accounts (IRSA): pod-level AWS auth without mounting credentials
eksctl create iamserviceaccount \
  --cluster <cluster> \
  --namespace <namespace> \
  --name <sa-name> \
  --attach-policy-arn <policy-arn> \
  --approve
```
