if [ "$#" -eq 0 ];
  then
  echo "HELP:"
  echo "init - first initial project"
  echo "start - up all containers"
  echo "restart - restart docker containers"
  echo "rebuild - rebuild client and server containers"
  echo "rebuild nginx - rebuild only nginx container"
  echo "rebuild client - rebuild only client container"
  echo "rebuild server - rebuild only server container"
  echo "rebuild full - rebuild full app with remove db volume"
  echo "logs nginx - nginx container logs"
  echo "logs client - client container logs"
  echo "logs server - server container logs"
  echo "logs db - db container logs"
fi


if [ "$1" == "init" ];
  then
  docker-compose up -d
  docker exec -d moviegram-api npm run db:push
fi
if [ "$1" == "start" ];
  then
  docker-compose up -d
fi
if [ "$1" == "restart" ];
  then
  docker-compose restart
fi
if [ "$1" == "rebuild" ];
  then
  if [ "$2" == "" ];
    then
    docker-compose build api
    docker-compose build client
    docker-compose up -d api
    docker-compose up -d client
  fi
  if [ "$2" == "nginx" ];
    then
    docker-compose restart nginx
  fi
  if [ "$2" == "client" ];
    then
    docker-compose build client
    docker-compose up -d client
  fi
  if [ "$2" == "server" ];
    then
    docker-compose build api
    docker-compose up -d api
  fi
  if [ "$2" == "soft" ];
    then
    docker-compose down
    docker rmi moviegram-api
    docker rmi moviegram-client
    docker-compose up -d
  fi
  if [ "$2" == "full" ];
    then
    docker-compose down
    docker rmi moviegram-api
    docker rmi moviegram-client
    docker volume rm moviegram-db
    docker-compose up -d
  fi
fi
if [ "$1" == "logs" ];
  then
  if [ "$2" == "nginx" ];
    then
    docker logs moviegram-nginx
  fi
  if [ "$2" == "client" ];
    then
    docker logs moviegram-client
  fi
  if [ "$2" == "server" ];
    then
    docker logs moviegram-api
  fi
  if [ "$2" == "db" ];
    then
    docker logs moviegram-db
  fi
fi

