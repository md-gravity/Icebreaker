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

**Deployment:** [Docker](https://www.docker.com), [Kubernetes](https://kubernetes.io), [Skaffold](https://skaffold.dev), [Ingress NGINX](https://kubernetes.github.io/ingress-nginx/);


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

Pre-requirements:
- [Install Docker](https://docs.docker.com/engine/install/)
- [Enable Kubernetes](https://docs.docker.com/desktop/kubernetes/)
- [Install Skaffold](https://skaffold.dev/docs/install/)

```bash

# Install Ingress NGINX
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/cloud/deploy.yaml

# 📝 Update hosts
sudo cat deployment/k8s/hosts >> /etc/hosts

# Finally... 😭 Start Icebreaker. Congratulations 🎉 🎉 🎉
cd deployment/k8s
skaffold dev

# Visit http://gravity.io 🚀
```

## For Windows Users

🚨 Firstly install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

```powershell
# Install Windows Package Manager: For more info visit 🙄 https://chocolatey.org/install
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

choco install nvm

brew install nvm
nvm install 19

npm i --include-workspace-root

# 📝 Update hosts on yours local machine from "deployments/k8s/hosts"
# C:\Windows\System32\drivers\etc\hosts
```