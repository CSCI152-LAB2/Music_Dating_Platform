let globalOtherUsername = "";   // this is ugly, I'm lazy
let token = "";
let socket = io()
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

document.addEventListener('DOMContentLoaded', () => {
  const otherUsername = document.getElementById('otherUsername').innerText;
  globalOtherUsername = otherUsername;
  //const clickedUser = globalOtherUsername;  // this variable will be set to the user that the currently logged in user wants to chat to
  token = document.cookie.split('; ')
    .find(row => row.startsWith('token='))
    .split('=')[1];

  /*if (clickedUser) {
    const getOtherUserObject = await fetch('http://localhost:5501/message', {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => { return response.json() })
      .then(data => { console.log(data) })
      .catch(err => { console.log('Error getting other user object', err) })
  }*/

  socket.on('connect', () => {
    console.log('frontend connection has run. Token = ', token);
    socket.emit('auth', token);
    console.log('Connected to the server');
  })

  // need to add logic for 'rooms' (see https://socket.io/docs/v4/tutorial/api-overview for more details)

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
})

const chatWithUser = async () => {
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
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        console.log(input.value);
        socket.on('chat message', async () => {
          const sendMsgToDB = await fetch('http://localhost:5501/message', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              otherUser: globalOtherUsername,
              chatMessage: input.value
              //sentBy:       <-- need to figure out how I'm gonna implement this
            })
          }).catch(error => {
            console.log('Error sending message to DB: ', error);
          })
          console.log('other user offline - msg sent to db');
          const item = document.createElement('li');
          item.textContent = input.value;
          messages.appendChild(item);
          window.scrollTo(0, document.body.scrollHeight);
        })
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
      console.log('other user online - msg sent to user and db');
      const item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    })
  }
}

/*const getOldMessages = async (req, res) => {
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
}*/

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