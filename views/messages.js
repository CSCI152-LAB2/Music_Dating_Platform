document.addEventListener('DOMContentLoaded', () => {
    let socket = io()
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');
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

    socket.on('chat message', (msg) => {
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

