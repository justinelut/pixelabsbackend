import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "https://frontend.verixr.com"
    }
});

export default async function LiveChat({doc,req, previousDoc, operation,}){
    
    io.to(doc.chatid).emit('message', 'Hello, specific client!');
    return doc;
}