
const {Hocuspocus} = require('@hocuspocus/server')
import { Database } from "@hocuspocus/extension-database";
import { setData,getData } from "./firebase.js";

//Server to enable realtime editing
const server = new Hocuspocus({
    port:1234,
    async onLoadDocument({documentName}){
        console.log("Fetching data !!")
        getData(documentName)
        .then((snapshot)=>{
            
            if (snapshot.exists()){
                console.log("inserting dataa!!")
                
                return snapshot.val().data
                
            }
            
        })
        .catch((error)=>{
            console.log('Error')
        })
    },
    extensions:[
        new Database({
            store:async({documentName,state})=>{
                console.log("Storing")
                setData(documentName,state)
            }
        })
    ]
})

server.listen()