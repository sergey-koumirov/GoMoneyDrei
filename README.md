npm install -g npx

go run ./server/app.go

cd ui
npx webpack --config webpack.config.js --watch

npx prettier . --write