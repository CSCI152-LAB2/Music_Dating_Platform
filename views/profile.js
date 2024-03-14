const getProfileData = async (req, res) => {
    const baseURL = "http://localhost:5501/profile";
    try {
        const userData = await fetch(baseURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (userData.ok) {
            console.log(userData);
            const userObject = await userData.json();
            console.log('User data received successfully\n', userObject);
            handleDisplayProfile(userObject);

        } else {
            console.log("user data unable to be fetched");
        }
    } catch (err) {
        console.log(err);
    }
}

const handleDisplayProfile = (user) => {                    //gonna come up with a better way to do some of this stuff than hard-coding every DOM manipulation
    document.getElementById('profile-name').innerText = user.username;
    document.getElementById('profile-age').innerText = user.age;
    document.getElementById('profile-sex').innerText = user.sex;
    document.getElementById('profile-genre').innerText = user.topGenre;
    document.getElementById('profile-location').innerText = user.location;
    document.getElementById('profile-sexualpreference').innerText = user.sexualPreference;
    document.getElementById('profile_pic').src = user.profilePic;
}
