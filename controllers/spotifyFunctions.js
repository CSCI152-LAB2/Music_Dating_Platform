//handles Spotify API, fetching users top genres upon sign in
var genreArr = [];

const getTopArtists = async () => {
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
