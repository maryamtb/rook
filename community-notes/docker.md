# docker quick reference

Commands for building, running, debugging, and managing containers.

## Images

```bash
docker pull <image>:<tag>
docker images                                           # list local images
docker build -t <name>:<tag> .                          # build from ./Dockerfile
docker build -t <name>:<tag> -f <path/to/Dockerfile> .  # custom Dockerfile path
docker tag <image> <registry>/<name>:<tag>              # retag for a registry
docker rmi <image>:<tag>                                # delete image
docker history <image>:<tag>                            # inspect layers
docker save <image>:<tag> -o image.tar                  # export image to tar
docker load -i image.tar                                # import image from tar
```

## Containers

```bash
docker run <image>                                      # run once, foreground
docker run -d <image>                                   # detached
docker run -it <image> /bin/sh                          # interactive shell
docker run --name <name> -p 8080:80 -d <image>          # named, port-mapped
docker run --rm <image>                                 # remove after exit
docker run -e KEY=value <image>                         # env vars
docker run -v $(pwd):/app <image>                       # mount current dir
docker ps                                               # running containers
docker ps -a                                            # all containers, including exited
docker stop <container>
docker start <container>
docker restart <container>
docker rm <container>
docker rm -f <container>                                # force remove running
```

## Logs & debugging

```bash
docker logs <container>
docker logs <container> -f                              # follow
docker logs <container> --tail=100
docker exec -it <container> /bin/sh                     # shell into running container
docker exec <container> <cmd>                           # run a one-off command
docker inspect <container>                              # full JSON metadata
docker inspect <container> --format '{{.State.Status}}' # specific field
docker stats                                            # live CPU/mem/net for all
docker events                                           # stream docker daemon events
docker top <container>                                  # running processes
docker port <container>                                 # mapped ports
```

## Copying

```bash
docker cp <container>:<remote-path> <local-path>
docker cp <local-path> <container>:<remote-path>
```

## Networking

```bash
docker network ls
docker network create <name>
docker network inspect <name>
docker network connect <network> <container>
docker run --network <name> <image>
docker run -p <host>:<container> <image>                # port forward
docker run --network host <image>                       # use host network (Linux only)
```

## Volumes

```bash
docker volume ls
docker volume create <name>
docker volume inspect <name>
docker volume rm <name>
docker run -v <volume>:/data <image>                    # named volume
docker run -v /host/path:/container/path <image>        # bind mount
docker run --mount type=bind,source=$(pwd),target=/app <image>
```

## Docker Compose

```bash
docker compose up                                       # foreground, build if needed
docker compose up -d                                    # detached
docker compose up --build                               # force rebuild
docker compose down                                     # stop + remove
docker compose down -v                                  # also remove volumes
docker compose logs -f
docker compose logs -f <service>
docker compose ps
docker compose exec <service> <cmd>
docker compose restart <service>
docker compose build <service>
docker compose pull
```

## Registries & auth

```bash
docker login                                            # Docker Hub
docker login <registry>                                 # custom registry
docker push <registry>/<name>:<tag>
docker pull <registry>/<name>:<tag>
docker logout
```

## Cleanup

```bash
docker system df                                        # show disk usage
docker system prune                                     # stopped containers, unused networks, dangling images
docker system prune -a                                  # also remove unused images
docker system prune -a --volumes                        # also remove unused volumes
docker image prune
docker image prune -a                                   # all unused, not just dangling
docker container prune
docker volume prune
docker network prune
```

## Dockerfile essentials

```dockerfile
FROM node:22-alpine                     # base image, pinned and small
WORKDIR /app                            # default dir for RUN/CMD/COPY
COPY package*.json ./                   # copy first for layer caching
RUN npm ci --omit=dev                   # cachable install step
COPY . .                                # copy source after deps
EXPOSE 3000                             # documentation, not actually opened
CMD ["node", "server.js"]               # default process
```

### Multi-stage build (smaller final image)

```dockerfile
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
CMD ["node", "dist/server.js"]
```

### `.dockerignore`

```
node_modules
.git
.env
*.log
dist
```
