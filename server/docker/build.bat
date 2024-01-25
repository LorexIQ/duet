docker compose down
docker rmi moviegram-api
docker compose --env-file ".env" up -d
