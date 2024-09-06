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

## build for win on osx

brew install mingw-w64
CGO_ENABLED=1 CC="i686-w64-mingw32-gcc" GOOS=windows GOARCH=386 go build -o gmd.exe server/app.go

cd ui
npx webpack --mode=production --config webpack.config.js

zip -r gmd-v002.zip ./gmd.exe ./dist
