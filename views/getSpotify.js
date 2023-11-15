//import clientToken from '../config/spotifyClientToken.js';

const totalGenres = [];
const mostFrequentGenre = [];

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
    fetch('https://api.spotify.com/v1/me/top/artists?limit=15', {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
    })
        .then(response => response.json())
        .then(data => {
            //console.log('Top Genres');
            for (let i = 0; i < data.items.length; i++) {
                const artistGenres = data.items[i].genres;
                totalGenres.push(artistGenres);
            }
            usersTopGenre();
        })
        .catch(error => console.error('Error:', error));
}

// Function used for taking the artist data
const usersTopGenre = () => {
    function calculateGenreFrequency(totalGenres) {
        const frequencyMap = {};


        for (const genre of totalGenres.flat()) {
            if (frequencyMap.hasOwnProperty(genre)) {
                frequencyMap[genre]++;
            } else {
                frequencyMap[genre] = 1;
            }
        }

        return frequencyMap;
    }

    function findMostFrequentGenres(frequencyMap, count) {
        const sortedGenres = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);
        return sortedGenres.slice(0, count);
    }

    const genreFrequency = calculateGenreFrequency(totalGenres);

    mostFrequentGenre = findMostFrequentGenres(genreFrequency, 1);
    console.log('Most Frequent Genre:', mostFrequentGenre);
    sendDataToServer(mostFrequentGenre);
}

//
const sendDataToServer = (mostFrequentGenre) => {
    const topGenre = mostFrequentGenre;
    fetch('/onboarding', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { topGenre } })
        //body: JSON.stringify({ data: { topGenre, username, password, firstname, lastname, dob, location, sex, sexualPreference } })
    })
        .then(response => response.text())
        .then(responseText => {
            console.log(responseText);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}