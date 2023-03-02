## Readme Sketch
```bash
# Pre-configuration
## Install NodeJS
## Install PNPM
## Install Docker & Enable Kubernetes
## Install Skaffold
## Install Ingress NGINX
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml

# Development
## Install Packages
pnpm i
## Run Dev Environment
cd deployment/k8s
skaffold dev 
```