# install
npm install -g npx

# run server
go run ./server/app.go

# compile js
cd ui
npx webpack --config webpack.config.js --watch

# format js
npx prettier . --write

# TODO
- account union (select 2 accounts, move all transactions from second to first, delete second)