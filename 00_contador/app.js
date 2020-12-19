/*
socketIO(eventos):
1. Eventos connection y disconnect.
2. Puedes crear tus propios eventos.
3. emit():  cuando se comunica un mensaje a todos los clientes conectados
4. nroadcast emit():cuando se comunica un mensaje a todos los clientes
excepto al que lo origina
5. todos los puntos anteriores aplican para el servidor y para 
el cliente.
*/

const { Socket } = require('dgram')
const { userInfo } = require('os')

const c = console.log,
http = require('http').createServer(server),
fs= require('fs'),
io= require('socket.io')(http)

let connections = 0

function server(req, res){
fs.readFile('index.html',(err,data)=>{
    if(err){
        res.writeHead(500,{'Content-Type':'text/html'})
        return res.end('<h1>Error Interno del Servidor </h1>')
    }else{
        res.writeHead(200,{'Content-Type':'text/html'})
        return res.end(data,'utf-8')
    }
})
}

http.listen(3000, c('Servidor corriendo en el puerto 3000'));


io.on('connection', socket=>{
    socket.emit('hello',{message:'Hola Mundo con Scoket.IO'})

    socket.on('otro evento',data=>c(data))

    connections++

    c(`Conexiones Activas: ${connections}`)

    socket.emit('connect users',{connections})  
    //detectar el cambio   
    socket.broadcast.emit('connect users',{connections})


    socket.on('disconnect',()=>{
        connections--
        //detectar el cambio 
        socket.broadcast.emit('connect users',{connections})
        c(`Conexiones activas: ${connections}`)
    })

    
    
})