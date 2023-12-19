# Kubernetes

## Requirements
- Kubernetes cluster
- Installed load balancer controller

## Setup
```bash
kubectl apply -f ./config.yaml
kubectl apply -f ./secret.yaml
kubectl apply -f ./volume.yaml
kubectl apply -f ./redis.yaml
kubectl apply -f ./postgres.yaml
```

If your server uses ARM-based architecture:
```bash
kubectl apply -f ./app-arm.yaml
```
Otherwise:
```bash
kubectl apply -f ./app-amd64.yaml
```

And the final:
```bash
kubectl apply -f ./ingress.yaml
```

# Install load balancer into cluster (optional)
```bash
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.10.2/manifests/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.10.2/manifests/metallb.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.4.0/deploy/static/provider/baremetal/deploy.yaml
```