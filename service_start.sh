#!/bin/bash
serviceName=sb-web

# if [ ! "$(docker ps -q -f name=sb-pg)" ]; then
#   cd ../sb-devops/db
#   ./service_start.sh
#   # Let waint some sec, until rabitmq starts well
#   sleep 5
#   cd -
# fi

../sb-devops/docker-clear-log.sh $serviceName

if [ $(docker ps -q -f name="${serviceName}") ]; then
  docker-compose stop $serviceName
fi

docker-compose up -d $serviceName

echo "You can access the service by: localhost:7004"

./service_log.sh
