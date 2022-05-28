const socket = io('http://localhost:8000');

//Get DoM elements in respective JS variables

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//function which will "append" event info to the container
const append = (message, position)=>{
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);     
}

//Ask new user for his/her name and let the serverknow
const name = prompt ("Enter Your name to Join");
socket.emit('new-user-joined', name); 

//if a new user joins recive the server
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right')
})

//if server sends a message, receive it
socket.on('receive', data=>{
    append(`${data.name}:${data.message}`, 'left')
})

//if a user leaves the chat append the info to the container
socket.on('left', name=>{
    append(`${name} Left the chat`, 'right')
})

//if the form gets submitted, send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you : ${message}`,'right');
    socket.emit('send', message)
    messageInput.value =''
})