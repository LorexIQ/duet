docker compose down
docker rmi moviegram-client
docker compose --env-file ".env" up -d
