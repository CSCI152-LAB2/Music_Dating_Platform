document.addEventListener('DOMContentLoaded', () => {
  let socket = io()
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');
  const otherUsername = document.getElementById('otherUsername').innerText;
  socket.on('connection', () => {
    console.log('Connected to the server');
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  // need to add logic for 'rooms' (see https://socket.io/docs/v4/tutorial/api-overview for more details)

  socket.on('chat message', async (msg) => {
    const sendMsgToDB = await fetch('http://localhost:5501/message', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        otherUser: otherUsername,
        chatMessage: msg
        //sentBy:       <-- need to figure out how I'm gonna implement this
      })
    }).catch(error => {
      console.log('Error sending message to DB: ', error);
    })
    console.log('msg sent to db');
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  })
})

const storeMessageInDB = () => {
  // To-Do
}

const getOldMesssages = () => {
  // To-Do
}

//might need more functions but this should be good for now

