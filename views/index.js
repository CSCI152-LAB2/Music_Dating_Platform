userArray = []

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
            responseData.forEach(element => {
                console.log(element.username, element.sex, element.topGenre, element.age, element.location, element.sexualPreference);
                handleDisplayUsers(element.username, element.sex, element.topGenre, element.age, element.location, element.sexualPreference);
            });
        }
        console.log('getSimilarUsers function finished');
    } catch (err) {
        console.log(err);
    }
}

const handleDisplayUsers = (username, sex, topGenre, age, location, sexualPreference) => {
    const showUsername = document.getElementById('showUsername').innerText = username;
    const showSex = document.getElementById('showSex').innerText = sex;
    const showGenre = document.getElementById('showGenre').innerText = topGenre;
    const showAge = document.getElementById('showAge').innerText = age;
    const showLocation = document.getElementById('showLocation').innerText = location;
    const showSexualPreference = document.getElementById('showSexualPreference').innerText = sexualPreference;
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
                body: JSON.stringify({ otherUserName, "likedUser": false })
            })
            break;
    }
    // needs logic for adding user to liked / disliked arrays in user model in database
}