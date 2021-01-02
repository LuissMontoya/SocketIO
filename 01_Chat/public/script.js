;
((d, io) => {
    const chatForm = d.getElementById('chat-form'),
        chatMessage = d.getElementById('chat-message'),
        chat = d.getElementById('chat')

        chatForm.addEventListener('submit', e=> {
            e.preventDefault()

            io.emit('new message',chatMessage.value)
            chatMessage.value=null
            return false
        })

io.on('new user',newUser=>alert(newUser.message))
io.on('user message', userMessage=> chat.insertAdjacentHTML('beforeend',`<li>${userMessage}</li>`))
io.on('bye user', bayUser=>alert(bayUser.message))
})(document, io());

//lado del cliente