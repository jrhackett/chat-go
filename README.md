# GoChat

This is a simple chat app written in Go and React.js.

## Hacking

### Setup

1. Install Go, Go Dep, and Node.js
2. `cd $GOHOME/src`
3. `go get github.com/jrhackett/gochat`
4. `cd $GOHOME/src/github.com/jrhackett/gochat`
5. `dep ensure`
6. Create a `.env` file and add values for the following variables:
    * `SIGNING_SECRET` is the HMAC signing secret
    * `AUTH_TOKEN_NAME` is the name of the auth token cookie
    * `PORT` is the port to host the server on
7. `cd client`
8. `npm i`

### Running the server

1. `cd $GOHOME/src/github.com/jrhackett/gochat`
2. `go build -o main`
3. `./main`

### Running the client

1. `cd $GOHOME/src/github.com/jrhackett/gochat/client`
2. `npm start`

Note that the client will proxy API and WS requests to `localhost:8000` by default. If you need to change it, you can change it in `webpack.config.js`.
