const socket  = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (event) => {
    if(event.key == 'Enter') {
        sendMessage(event.target.value)
        textarea.value = ''
    }
})

function sendMessage(msg){
    let message = {
        user: name,
        text: msg.trim()
    }
    // Append message 
    appendMessage(message, 'outgoing')
    // Send to server
    socket.emit('message', message)
}

function appendMessage(message, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markUp = `
        <h4>${message.user}</h4>
        <p>${message.text}</p>
    `
    mainDiv.innerHTML = markUp
    messageArea.appendChild(mainDiv)
    scrollToBottum()
}

// Recieve Message

socket.on('message', (message) => {
    appendMessage(message, 'incoming')
})

function scrollToBottum() {
    messageArea.scrollTop = messageArea.scrollHeight
}