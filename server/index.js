
import  express  from "express";
import morgan from "morgan";
import { Server as socketServer} from "socket.io";
import http from 'http';
import cors from 'cors';

const port = 4000;
const app = express();
const server = http.createServer(app)
const io = new socketServer(server,{
    cors: {
        origin: 'http://localhost:3000'
    }
});

app.use(cors());
app.use(morgan('dev'));

io.on('connection',(socket)=>{
    console.log(socket.id)
    console.log('user conected');
    socket.on('message', (message)=>{
        socket.broadcast.emit('message',{
            body: message,
            from: socket.id
        });
    })
})
server.listen(port, ()=>{
    console.log('Server starting at port: '+ port);
});

