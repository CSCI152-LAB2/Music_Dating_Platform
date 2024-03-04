const getSimilarUsers = async (req, res) => {
    console.log('getSimilarUsers has run from frontend');
    const baseURL = "http://localhost:5501/index";
    try {
        const getUsers = await fetch(baseURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (getUsers.ok) {
            console.log('retrieving users from backend...');
            let responseData = await getUsers.json();
            handleDisplayUsers(responseData[0]);
            /*responseData.forEach(element => {
                console.log(element.username, element.sex, element.topGenre, element.age, element.location, element.sexualPreference);
                handleDisplayUsers(element);
            });*/
            console.log('getSimilarUsers function finished');
            return responseData;
        }
    } catch (err) {
        console.log(err);
    }
}

const handleDisplayUsers = (userObj) => {
    const showUsername = document.getElementById('showUsername').innerText = userObj.username;
    const showSex = document.getElementById('showSex').innerText = userObj.sex;
    const showGenre = document.getElementById('showGenre').innerText = userObj.topGenre;
    const showAge = document.getElementById('showAge').innerText = userObj.age;
    const showLocation = document.getElementById('showLocation').innerText = userObj.location;
    const showSexualPreference = document.getElementById('showSexualPreference').innerText = userObj.sexualPreference;
    // will need one for displaying the respective user's profile pic
}


// need to run tests on this function once some of the styling for the main page is complete, buttons to like/dislike a user disappear after clicking 'search users' lol
const likeOrDislike = async (like_or_dislike) => {
    const otherUserUsername = document.getElementById('showUsername').innerText;
    switch (like_or_dislike) {
        case 'like':
            console.log('User liked: ', otherUserUsername);
            const sendLikedUser = await fetch('http://localhost:5501/index', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ otherUserUsername, "likedUser": true })
            })
            console.log('REQUEST FROM likeOrDislike FUNCTION - frontend:');
            console.log(sendLikedUser);
            break;
        case 'dislike':
            console.log('User disliked: ', otherUserUsername);
            const sendDislikedUser = await fetch('http://localhost:5501/index', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ otherUserUsername, "likedUser": false })
            })
            break;
    }
    // needs logic for adding user to liked / disliked arrays in user model in database
}

document.addEventListener('DOMContentLoaded', () => {
    const indexDriverFunction = async () => {
        let userArr = [];
        const showUsers = document.getElementById('search-button');
        const like_button = document.getElementById('like-button');
        const dislike_button = document.getElementById('next-button');
        let currIndex = 0;

        showUsers.addEventListener('click', async () => {
            userArr = await getSimilarUsers();
            console.log(userArr);
            if (userArr.length > 0) {
                handleDisplayUsers(userArr[currIndex]);
            } else {
                alert('Sorry, no users found');
            }
        })

        like_button.addEventListener('click', async () => {
            await likeOrDislike("like");
            currIndex++;
            if (currIndex < userArr.length) {
                handleDisplayUsers(userArr[currIndex]);
            } else {
                alert('Sorry, you have gone through all of the users. There are no more users to display')
            }
        })

        dislike_button.addEventListener('click', async () => {
            await likeOrDislike("dislike");
            currIndex++;
            if (currIndex < userArr.length) {
                handleDisplayUsers(userArr[currIndex]);
            } else {
                alert('Sorry, you have gone through all of the users. There are no more users to display')
            }
        })
    }

    indexDriverFunction();
})