document.addEventListener('DOMContentLoaded', () => {
    const onboardingForm = document.getElementById("onboardingForm");
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const spotifyGenre = document.getElementById('mostFrequentGenreDisplay')
    const submit_button = document.getElementById('submit');
    const selectedRadio = document.querySelector('input[name="Music Genre"]:checked');

    const baseURL = 'http://localhost:5501/onboarding';
    submit_button.addEventListener('click', postInfo);

    async function postInfo(e) {
        e.preventDefault();
        try {
            const topGenre = "";
            if (!spotifyGenre.textContent === "") {
                topGenre = selectedRadio.value;
            } else {
                topGenre = spotifyGenre.textContent.substring(39);
            }
            const res = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                    topGenre: topGenre
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
            window.location.href = "onboarding.html";
            // Do something with the response data
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
});