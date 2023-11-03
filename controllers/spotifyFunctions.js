//handles Spotify API, fetching users top genres upon sign in
var genreArr = [];

const getTopArtists = async () => {
    /*const token = 'f77cef6b629d48bbb0ba6bbbbff7d7d8';

    async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        return await res.json();
    }

    try {
        const response = await fetchWebApi('me/top/artists?time_range=medium_term&limit=15', 'GET');

        const topArtists = response.items;
        topArtists.forEach(artist => {
            genreArr.push(...artist.genres);
        });

        // Now genreArr should contain all the genres of the top artists
        console.log('Genre Array:', genreArr);
    } catch (error) {
        console.error('Error fetching top artists:', error);
    }*/

    const token = 'f77cef6b629d48bbb0ba6bbbbff7d7d8';
    async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        return await res.json();
    }

    async function getTopTracks() {
        // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
        return (await fetchWebApi(
            'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
        )).items;
    }

    const topTracks = await getTopTracks();
    console.log(
        topTracks?.map(
            ({ name, artists }) =>
                `${name} by ${artists.map(artist => artist.name).join(', ')}`
        )
    );
};

module.exports = getTopArtists;
