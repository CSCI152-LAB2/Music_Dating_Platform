//import clientToken from '../config/spotifyClientToken.js';

const topGenres = [];

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

// Function used for taking the artist data

const usersTopGenre = (artistGenre) => {
    for (let i = 0; i < artistGenre.length; i++) {
        topGenres.push(artistGenre[i]);
    }
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
            console.log('Top Genres');
            for (let i = 0; i < data.items.length; i++) {
                const artistGenres = data.items[i].genres;
                usersTopGenre(artistGenres);
            }
            console.log(topGenres); //used for testing purposes, will delete in production
        })
        .catch(error => console.error('Error:', error));
}
