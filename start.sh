# start docker for database
docker-compose up

# start client
npm start --prefix ./client &

# start server
npm start --prefix ./server &
