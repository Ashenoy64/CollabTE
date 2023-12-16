
const {Hocuspocus} = require('@hocuspocus/server')
// import { Database } from "@hocuspocus/extension-database";
// import { setData,getData } from "./firebase.js";

//Server to enable realtime editing
const server = new Hocuspocus({
    port:1234,
})

server.listen()