<h1 align="center">Icebreaker</h1>
<p align="center">
    ð <i>Video Chat Application based on WebRTC & JS & NodeJS & Kubernetes</i>
</p>
<br />
<p align="center">
    <img src="https://cdn.dribbble.com/users/673247/screenshots/3929270/media/5134ca6144669a782ad63a6daea1d3cb.gif" alt="Icebreaker">
</p>

<br />

### Technologies Stack
- PNPM & Monorepo & Turbopack
- TypeScript
- NodeJS & tRPC & Prisma
- PostgresSQL Database
- NextJS
- Docker & Kubernetes

<br />

## Starting Point
It will be a steep climb, but step by step we will get there.
<br />
It's better to set it up once than every time. Good luck and have fun ðª
```bash
# ð¨ Windows before start install WSL ð¨
# https://learn.microsoft.com/en-us/windows/wsl/install

# ð Install Package Manager
## Unix; For more info visit ð https://brew.sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
## Windows: For more info visit ð https://chocolatey.org/install
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node Version Manager
## Unix
brew install nvm
## Windows
choco install nvm

# ð± Install NodeJS
nvm install 19

# Install Package Manager
## Unix
brew install pnpm
## Windows
choco install pnpm

## ð Install Dependencies
pnpm i

# Install Development Environment Dependencies
## ð Install Docker & Enable Kubernetes: ð¬https://docs.docker.com/engine/install/
## ð¶ Install Skaffold: https://skaffold.dev/docs/install/
## ð«  Install Ingress NGINX
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml

# ð Update hosts for yours local machine
## Copy body of deployments/k8s/hosts
## And put in yours. 
## ð¨ You will need root access for it.
## Windows: C:\Windows\System32\drivers\etc\hosts
## Unix: /etc/hosts

## Finally... ð­ Start Icebreaker. Congratulations ð ð ð
cd deployment/k8s
skaffold dev 

## Visit gravity.io ð
```