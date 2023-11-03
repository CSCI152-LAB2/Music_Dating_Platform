//import clientToken from '../config/spotifyClientToken.js';

function getTopArtists() {
    const clientId = 'f77cef6b629d48bbb0ba6bbbbff7d7d8';
    const redirectUri = 'http://localhost:5501/onboarding';

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=user-top-read`;

    window.location = authUrl;
}

// Function to extract access token from the URL hash
function getAccessToken() {
    const hashParams = window.location.hash.substring(1).split('&');
    for (let i = 0; i < hashParams.length; i++) {
        const p = hashParams[i].split('=');
        if (p[0] === 'access_token') {
            return p[1];
        }
    }
    return null;
}

// After the user grants permission, you can use the access token to make API requests
const accessToken = getAccessToken();
if (accessToken) {
    fetch('https://api.spotify.com/v1/me/top/artists', {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Top Artists:', data.items);
        })
        .catch(error => console.error('Error:', error));
}
