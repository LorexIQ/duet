docker compose down
docker rmi duet-client
docker compose --env-file ".env" up -d
