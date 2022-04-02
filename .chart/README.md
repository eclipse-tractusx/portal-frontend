# cx-portal helm charts

Helm chart to deploy the Catena-X frontend webapp to Kubernetes.

steps

    helm install -f values-dev003.yaml portal cx-portal --namespace portal
    helm list --all-namespaces
    helm uninstall portal --namespace portal
