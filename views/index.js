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
        console.log('getSimilarUsers function finished');
    } catch (err) {
        console.log(err);
    }
}