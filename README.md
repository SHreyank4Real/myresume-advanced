# Interactive DevOps Resume

Terminal-themed interactive resume — scrollable sections plus a live command shell, with real visitor counts backed by Redis (Docker today, Kubernetes-ready).

## Stack

- Next.js (App Router) + TypeScript
- IBM Plex Mono / phosphor terminal UI
- Redis (`ioredis`) for pageview + unique visitor counters
- Docker Compose locally; Kubernetes manifests under [`deploy/k8s`](deploy/k8s)

## Environment variables

Prepared for Docker / Kubernetes (ConfigMap + Secret):

| Variable | Required | Description |
|----------|----------|-------------|
| `REDIS_URL` | preferred | Full URL, e.g. `redis://redis:6379/0` |
| `REDIS_HOST` | alt | Hostname when `REDIS_URL` is unset |
| `REDIS_PORT` | alt | Default `6379` |
| `REDIS_PASSWORD` | optional | From K8s Secret if Redis auth is enabled |
| `REDIS_DB` | optional | Default `0` |
| `PORT` | optional | App listen port (default `3000`) |
| `HOSTNAME` | optional | Bind address in containers (`0.0.0.0`) |
| `NODE_ENV` | optional | `development` / `production` |

Copy the example file:

```bash
cp .env.example .env.local
```

## Local development (Redis in Docker)

```bash
# start Redis only
docker compose up -d redis

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Footer should show live pageviews.

## Full stack in Docker

```bash
docker compose up --build
```

App: http://localhost:3000 · Redis: `redis://redis:6379/0` inside the compose network.

## Visit counting

- `POST /api/visit` — increments `visits:total`, tracks anonymous `vid` cookie in `visits:unique`
- `GET /api/stats` — returns `{ total, unique, configured }`
- Terminal: `stats` / `uptime`

Without Redis reachable, the UI still loads; counter shows offline.

## Kubernetes (later)

Manifests are ready under [`deploy/k8s`](deploy/k8s):

```bash
# build & load image into your cluster (kind/minikube/etc.)
docker build -t resume-app:latest .
kubectl apply -f deploy/k8s/
```

Same env contract as Compose:

- ConfigMap → `REDIS_URL=redis://redis.resume.svc.cluster.local:6379/0`
- Optional Secret → `REDIS_PASSWORD`

## Terminal commands

`help`, `whoami`, `cat about.txt`, `experience`, `skills`, `certs`, `edu`, `contact`, `kubectl get pods`, `ps aux`, `stats`, `clear`, `theme`

## Content

Edit [`src/data/resume.ts`](src/data/resume.ts) to update experience, skills, and contact info.
