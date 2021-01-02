
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

const c = console.log,
express= require('express'),
app= express(),
http = require('http').createServer(app),
io = require('socket.io')(http),
port = process.env.PORT || 3000, 
publicDir = express.static(`${__dirname}/public`)


app
.use(publicDir)
.get('/',(req, res)=> res.sendFile(`${__dirname}/index.html`))


http.listen(port,()=>c(`Iniciando Chat en el Localhost:${port}`))
io.on('connection', socket=>{
    socket.broadcast.emit('new user',{message:'Ha ingresado un usuario al Chat'})


socket.on('new message', message=>io.emit('user message',
message))
})