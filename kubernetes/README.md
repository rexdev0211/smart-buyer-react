# Deploy

> **NOTE** The sb-products-files config map will be currently deployed only from the `release/<environment>/` folder

## Prepare Environment variables
### DEV Environment

> * Currently the DEV environment is on the same cluster with production
>
> Prepare all variables
> ```bash
> ENV=dev
> CLUSTER_NAME="sb-eu-prod"
> LINODE_REGION="eu-central"
> KUBE_CONFIG_PATH=$(readlink -f ~/.kube/${CLUSTER_NAME})
> KUBE_CMD="kubectl --kubeconfig=$KUBE_CONFIG_PATH"
> KUBE_NAMESPACE=dev
> SB_REGISTRY=registry.smartbuyer.me
> SB_REPOSITORY=sb-web
> IMAGE_TAG=0f4166cfd92cb43e9114e3e60001e7d5955073d9
> ```
### PROD Environment

> Prepare all variables
> ```bash
> ENV=prod
> CLUSTER_NAME="sb-eu-prod"
> LINODE_REGION="eu-central"
> KUBE_CONFIG_PATH=$(readlink -f ~/.kube/${CLUSTER_NAME})
> KUBE_CMD="kubectl --kubeconfig=$KUBE_CONFIG_PATH"
> KUBE_NAMESPACE=prod
> SB_REGISTRY=registry.smartbuyer.me
> SB_REPOSITORY=sb-web
> IMAGE_TAG=aa1fd518ac2568946825c4e068b38694efade9e7
> ```

## Prepare release folder
```bash
mkdir -p release/$ENV
$KUBE_CMD create configmap ${SB_REPOSITORY}-files --from-file=configmap_files/ -o yaml --dry-run=client > release/${ENV}/${SB_REPOSITORY}-files.configmap.yaml
sed -e "s/{{TAG}}/$IMAGE_TAG/g" \
    ${SB_REPOSITORY}.deployment.tpl.yaml > release/${ENV}/${SB_REPOSITORY}.deployment.yaml
cp ${SB_REPOSITORY}.service.yaml release/${ENV}/
```

## Deploy
```bash
$KUBE_CMD apply --namespace $KUBE_NAMESPACE -f release/$ENV
```

## Build and deploy first image to registry

```bash
cd ../
sudo rm -rf ../node_modules
docker-compose up --build sb-web-build
docker build -t $SB_REGISTRY/$SB_REPOSITORY:$IMAGE_TAG -f ./Dockerfile ./
docker push $SB_REGISTRY/$SB_REPOSITORY:$IMAGE_TAG
```
