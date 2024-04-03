// This is the messiest file I've ever written, I'm sorry if you try to read all of this code lol

const displayOldMessages = (chatsArray) => {
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

// START OF - this was also a part of the old code and chat gpt's

let token = "";
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
let socket = io()
const buttons = document.querySelectorAll(".usernameButton");
let otherUsername = "";
let otherUserObject = "";                 // new
let otherUserSocket = "";                 // new
let messageCache = [];
//const clickedUser = globalOtherUsername;  // this variable will be set to the user that the currently logged in user wants to chat to
token = document.cookie.split('; ')
  .find(row => row.startsWith('token='))
  .split('=')[1];

const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode the payload

const username = tokenPayload.username; // Extract the username from the payload

socket.on('connect', () => {
  console.log('frontend connection has run. Token = ', token);
  socket.emit('auth', token);
  displayMessage(`Connected to the server with id: ${socket.id}`);
})

// END OF - this was also a part of the old code and chat gpt's
// The code below is the third attempt to get this working. I will try to build around the real time messaging

socket.on('receive message', (msg) => {
  displayMessage(msg);

})

form.addEventListener('submit', e => {
  e.preventDefault();
  const msg = input.value;
  if (msg === "") return;
  if (otherUserSocket === null) {
    const messageObject = {
      to: otherUsername,
      chatMessage: msg,
      sentBy: username
    }
    messageCache.push(messageObject);
  } else {
    const room = otherUserSocket;
    console.log(`${msg} sent to ${room}`)
    if (msg === "") return;
    displayMessage(msg);
    socket.emit('chat message', msg, room);
    input.value = "";
  }
})

const displayMessage = (message) => {
  const li = document.createElement("li");
  li.textContent = message;
  document.getElementById('messages').append(li);
}

buttons.forEach(button => {
  button.addEventListener("click", async function () {
    let currentlyChattingWith = this.innerText;
    if (currentlyChattingWith !== otherUsername && currentlyChattingWith !== "") {
      socket.emit('disconnect', otherUserSocket);
    } else {
      otherUsername = this.innerText;
      currentlyChattingWith = otherUsername;
      const getMessagesAndOtherUserFromDB = await fetch(`http://localhost:5501/message?otheruser=${otherUsername}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => { return response.json() })     //used for testing purposes
        .then(data => {
          otherUserObject = data.otherUserObject;
          chats = data.chats;
          console.log(otherUserObject, chats);
          otherUserSocket = otherUserObject.currentSocketID;
          console.log(`otherUserSocket equal to = ${otherUserSocket}`)
        })
        .catch(error => {
          console.log("Error retrieving older messages - ", error);
        })
    }
  });
});

// old code

/*const getUserAndMessageData = async () => {
  let otherUserObject = 0;
  let chats = 0;
  console.log('chatWithUser ran');
  const getMessagesAndOtherUserFromDB = await fetch(`http://localhost:5501/message?otheruser=${otherUsername}`, {
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
          console.log('otherUser = ', otherUsername);
          console.log('chatMessage = ', input.value)
          const sendMsgToDB = await fetch('http://localhost:5501/message', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              otherUser: otherUsername,
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
      console.log('both users online');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
          //socket.emit('chat message', input.value);
          let room = otherUserObject.currentSocketID
          console.log(`${input.value} sent to room name = `, room);
          socket.emit('chat message', input.value, room);
          input.value = '';
        }
      });
      //let room = otherUserObject.currentSocketID
      //console.log('room name = ', room);
      //socket.emit('join room', room)

      //socket.on('chat message', async (room, msg) => {
      const sendMsgToDB = await fetch('http://localhost:5501/message', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          otherUser: otherUsername,
          chatMessage: input.value,
          sentBy: username // <-- need to figure out how I'm gonna implement this
        })
      }).catch(error => {
        console.log('Error sending message to DB: ', error);
      })
      console.log('msg sent to user and db');
      const item = document.createElement('li');
      item.textContent = input.value;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
      //})
    }
  } * /

// chat gpt's "fix"

/*const getUserAndMessageData = async () => {
  let otherUserObject = 0;
  let chats = 0;
  console.log('chatWithUser ran');
  const getMessagesAndOtherUserFromDB = await fetch(`http://localhost:5501/message?otheruser=${otherUsername}`, {
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
    form.removeEventListener('submit', onSubmitForm);
    form.addEventListener('submit', onSubmitForm);
  } else {
    console.log('both users online');
    form.removeEventListener('submit', onSubmitForm);
    form.addEventListener('submit', onSubmitForm);
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    if (input.value) {
      if (otherUserObject.currentSocketID == null) {
        console.log('otherUser = ', otherUsername);
        console.log('chatMessage = ', input.value)
        const sendMsgToDB = await fetch('http://localhost:5501/message', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            otherUser: otherUsername,
            chatMessage: input.value,
            sentBy: username
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
      } else {
        let room = otherUserObject.currentSocketID;
        console.log(`${input.value} sent to room name = `, room);
        socket.emit('chat message', input.value, room);
        input.value = '';
      }
    }
  }
};


buttons.forEach(button => {
  button.addEventListener("click", function () {
    otherUsername = this.innerText;
    getUserAndMessageData();
  });
});

*/


