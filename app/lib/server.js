// For demo just run this 
// npx @hocuspocus/cli --port 1234 --sqlite

const {Hocuspocus} = require('@hocuspocus/server')

const server = new Hocuspocus({
    port:1234
})

server.listen()