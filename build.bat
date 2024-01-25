docker compose down
docker rmi moviegram-client
docker rmi moviegram-api
docker compose --env-file ".env" up -d

docker exec -d moviegram-api npm run db:push
