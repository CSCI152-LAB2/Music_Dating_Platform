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

/*socket.on('chat message', async (msg) => {
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
})*/

let globalOtherUsername = "";   // this is ugly, I'm lazy
let token = "";
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
let socket = io()
const otherUsername = document.getElementById('otherUsername').innerText;
globalOtherUsername = otherUsername;
//const clickedUser = globalOtherUsername;  // this variable will be set to the user that the currently logged in user wants to chat to
token = document.cookie.split('; ')
  .find(row => row.startsWith('token='))
  .split('=')[1];

const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode the payload

const username = tokenPayload.username; // Extract the username from the payload

socket.on('connect', () => {
  console.log('frontend connection has run. Token = ', token);
  socket.emit('auth', token);
  console.log('Connected to the server');
})

const getUserAndMessageData = async () => {
  let otherUserObject = 0;
  let chats = 0;
  console.log('chatWithUser ran');
  const getMessagesAndOtherUserFromDB = await fetch(`http://localhost:5501/message?otheruser=${globalOtherUsername}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => { return response.json() })     //used for testing purposes
    .then(data => {
      otherUserObject = data.otherUserObject;
      chats = data.chats;
      console.log(otherUserObject, chats);
    })
    .catch(error => {
      console.log("Error retrieving older messages - ", error);
    })

  //displayMessages(chats.chats)                             the stuff above this line definitely works
  if (otherUserObject.currentSocketID == null) {
    console.log('other user offline');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (input.value) {
        console.log('otherUser = ', globalOtherUsername);
        console.log('chatMessage = ', input.value)
        const sendMsgToDB = await fetch('http://localhost:5501/message', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            otherUser: globalOtherUsername,
            chatMessage: input.value,
            sentBy: username       // <--need to figure out how I'm gonna implement this
          })
        }).catch(error => {
          console.log('Error sending message to DB: ', error);
        })
        console.log('other user offline - msg sent to db');
        const item = document.createElement('li');
        item.textContent = input.value;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
        input.value = '';
      }
    })
  } else {
    // need to add more stuff here for rooms
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });
    let room = otherUserObject.currentSocketID + username;
    socket.emit('join room', room)

    socket.on('chat message', async (room, msg) => {
      const sendMsgToDB = await fetch('http://localhost:5501/message', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          otherUser: otherUsername,
          chatMessage: msg,
          sentBy: username // <-- need to figure out how I'm gonna implement this
        })
      }).catch(error => {
        console.log('Error sending message to DB: ', error);
      })
      console.log('other user online - msg sent to user and db');
      const item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    })
  }
}

const button = document.getElementById('otherUsername');
button.addEventListener('click', getUserAndMessageData);

// need to add logic for 'rooms' (see https://socket.io/docs/v4/tutorial/api-overview for more details)

