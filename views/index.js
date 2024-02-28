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
            let responseData = await getUsers.json();
            responseData.forEach(element => {
                console.log(element.username, element.sex, element.topGenre);
                handleDisplayUsers(element.username, element.sex, element.topGenre);
            });
        }
        console.log('getSimilarUsers function finished');
    } catch (err) {
        console.log(err);
    }
}

const handleDisplayUsers = (username, sex, topGenre) => {
    // this function will be used to target HTML tags to display relevant data for users, will probably have to wait for some frontend stuff to be done before implementing
}

const likeOrDislike = async (req, res, like_or_dislike) => {
    const token = jwt.verify(document.cookie.token, process.env.SECRET_STR);
    const { username } = token;
    switch (like_or_dislike) {
        case "like":
            console.log(username, ' liked this user');
            break;
        case "dislike":
            console.log(username, ' disliked this user');
            break;
    }
}