
import {Hocuspocus} from '@hocuspocus/server'
import { Database } from "@hocuspocus/extension-database";
import { setData,getData } from "./firebase.js";


const server = new Hocuspocus({
    port:1234,
    async onLoadDocument({documentName}){
        console.log("Fetching data !!")
        getData(documentName)
        .then(async (snapshot)=>{
            
            if (snapshot.exists()){
                console.log("inserting dataa!!")
                const data = await snapshot.val().data
                console.log(data)
                return data
                
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