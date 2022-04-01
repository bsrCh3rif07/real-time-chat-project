const socket = io()
const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btn')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')

let name;
do{
    name = prompt('Username ?')
}while(!name)

document.querySelector('#your-name').textContent = name
msgText.focus()

btnSend.addEventListener('click', (e)=>{
    e.preventDefault()
    sendMsg(msgText.value)
    msgText.value='';
    msgText.focus()
    chatBox.scrollTop = chatBox.scrollWidth
})

const sendMsg = message =>{
    let msg = {
        user: name,
        message: message.trim()
    }
    display(msg,'you-message')
    socket.emit('sendMessage',msg)
}

socket.on('sendToAll', msg=>{
    display(msg,'other-message')
})

const display = (msg,type) =>{
    const msgDiv = document.createElement('div')
    let ClassName = type
    msgDiv.classList.add(ClassName,'message-row')
    let times = new Date().toLocaleTimeString()
    let innerText = `
    <div class="message-title">
        👾<span>${msg.user}</span>
    </div>
    <div class="message-text">
        ${msg.message}
    </div>
    <div class="message-time">
        ${times}
    </div>
    `;
    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv)
}