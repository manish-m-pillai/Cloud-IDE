import express from "express"
import http from "http"
import { Server as SocketServer } from "socket.io"
import pty from "node-pty"
import os from "os"

const app = express()
const server = http.createServer(app)
const port = 10000

const io = new SocketServer({
    cors: "*"
})

io.attach(server)


io.on('connection',(socket)=>{
    console.log(`Socket Connected `,socket.id)

    socket.on("terminal.write",(data)=>{
        ptyProcess.write(data)
    })
})

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
var ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD+"/user",
    env: process.env
  });

ptyProcess.onData((data)=>{
    io.emit("terminal.data", data)
})

server.listen(port,()=>{
    console.log(`Docker Server Started on Port ${port}`)
})