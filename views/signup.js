// This is the signup function that will be called when the user submits their form
function signup(username, email, password) {
    // Replace 'YOUR_ENDPOINT_URL' with the URL to which you want to post the data
    const endpoint = 'YOUR_ENDPOINT_URL';

    // Create the data object with the username and password
    const data = {
        username: username,
        email: email,
        password: password
    };

    // Use the fetch API to post the data to the server
    fetch(endpoint, {
        method: 'POST', // Specify the method to use
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Convert the response to JSON
    })
    .then(data => {
        console.log(data); // Log the response data
    })
    .catch((error) => {
        console.error('Error during signup:', error);
    });
}
