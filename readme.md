<h1 align="center">Icebreaker</h1>
<p align="center">
    💘 <i>Video Chat Application based on WebRTC & JavaScript & Kubernetes</i>
</p>
<br />
<p align="center">
    <img src="https://cdn.dribbble.com/users/673247/screenshots/3929270/media/5134ca6144669a782ad63a6daea1d3cb.gif" alt="Icebreaker">
</p>

<br />

### Technologies Stack
**Build Pack:** [NPM & Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces?v=true), [TypeScript](https://www.typescriptlang.org/docs/), [Turborepo](https://turbo.build/pack);

**Backend:** [NodeJS](https://nodejs.dev/en/), [tRPC](https://trpc.io), [Prisma](https://www.prisma.io), [PostgreSQL](https://www.postgresql.org);

**Frontend:** [NextJS](https://nextjs.org), [React](https://react.dev), [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API);

**Deployment:** [Docker](https://www.docker.com), [Kubernetes](https://kubernetes.io), [Skaffold](https://skaffold.dev), [Minikube](https://minikube.sigs.k8s.io/docs/start/), [Ingress NGINX](https://kubernetes.github.io/ingress-nginx/);


## Starting Point
It will be a steep climb, but step by step we will get there.

It's better to set it up once than every time. Good luck and have fun 🪖

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install nvm
nvm install 19

npm i --include-workspace-root
```

So, you have the necessary packages installed, but now you're wondering how to connect them to external services like databases. 🤔 
Not to worry, you can accomplish this using tools like Docker, Kubernetes, and Skaffold.

With these tools, you can automate the installation and building of all the necessary dependencies, making the process feel almost magical 🪄. 
For example, you can easily install and connect PostgreSQL, NATS Streaming service, and other services to your API services.

```bash
brew  install --cask docker
brew install skaffold
brew install minikube

minikube start
minikube addons enable metrics-server
minikube addons enable ingress

# Add to /etc/hosts
127.0.0.1 gravity.io

# Build and Deploy Containers
cd deployment/k8s
skaffold dev

# Finally... In new terminal window 😭 Release Icebreaker 🎉 🎉 🎉
sudo minikube tunnel

# Visit http://gravity.io 🚀
```