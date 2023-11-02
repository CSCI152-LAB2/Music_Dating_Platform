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

    async function getTopArtists() {
        return (await fetchWebApi(
            'v1/me/top/artists?time_range=medium_term&limit=15', 'GET'
        )).items.forEach(function (attribute) {
            if (attribute == 'genres') {
                forEach(function (genre) {
                    console.log(`${genre} ,`);
                })
            }
        })
    }

    /*const topArtists = await getTopArtists();
    console.log(
        topArtists?.map(
            ({ name, artists }) =>
                `${name} by ${artists.map(artist => artist.name).join(', ')}`
        )
    );*/
}

const postTopGenre = (req, res) => {
    for (var i = 0; i < genreArr.length; i++) {

    }
}

module.exports = { getTopArtists, postTopGenre };