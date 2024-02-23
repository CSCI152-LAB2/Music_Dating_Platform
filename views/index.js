const getSimilarUsers = async (req, res) => {
    console.log('getSimilarUsers has run from frontend');
    const baseURL = "http://localhost:5501/onboarding";
    const getUsers = await fetch(baseURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
}