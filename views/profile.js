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
            let data = await userData.json();
            console.log(data);
        } else {
            console.log("user data unable to be fetched");
        }
    } catch (err) {
        console.log(err);
    }
}