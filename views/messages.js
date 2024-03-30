let globalOtherUsername = "";   // this is ugly, I'm lazy

document.addEventListener('DOMContentLoaded', () => {
  let socket = io()
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');
  const otherUsername = document.getElementById('otherUsername').innerText;
  globalOtherUsername = otherUsername;
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
      method: 'POST',
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

const getOldMessages = async (req, res) => {
  console.log('getOldMessages ran');
  const getMessagesFromDB = await fetch(`http://localhost:5501/message?otheruser=${globalOtherUsername}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => { return response.json() })     //used for testing purposes
    .then(data => { console.log(data) })
    .catch(error => {
      console.log("Error retrieving older messages - ", error);
    })
}

const displayMessages = (chatsArray) => {
  let chat = document.getElementById('messages');
  for (let i = 0; i < chatsArray.length; i++) {
    //if (chatsArray[i].sentBy)
    let oldMessage = document.createElement('li');
    appendMessage.innerText = chatsArray[i].message;
    chat.appendChild(oldMessage);
    // need to add custom CSS for showing the messages sent by the currently logged in user
    // on the right and the user whose messages they're viewing on the left
  }

}