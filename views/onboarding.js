// onboarding.js
const onboardingSubmit = () => {
    console.log('onborading submit button clicked')
    //document.addEventListener('DOMContentLoaded', function () {
    const onboardingFormAnswer = document.querySelector('input[name="Music Genre"]:checked');
    const username = document.cookie.token;
    const spotifyGenre = document.getElementById('mostFrequentGenreDisplay');
    const getUsersSex = document.getElementById('usersSex').value;
    const getUsersSexualPreference = document.getElementById('usersSexualPreference').value;
    const getUsersAge = document.getElementById('onboardingAge').value;
    const userLocation = document.getElementById('onboardingLocation').value;

    // Log each element to check if it's found - testing only
    if (onboardingFormAnswer) {
        console.log('onboardingForm:', onboardingFormAnswer.value);
    }
    console.log('userLocation = ', userLocation);
    console.log('age = ', getUsersAge);
    console.log('spotifyGenre:', spotifyGenre.textContent.substring(39));

    if (!onboardingFormAnswer && !username || !spotifyGenre && !username) {
        console.log('items missing')
        //return;
    }

    // Log for debugging purposes
    console.log(getUsersSex);
    console.log(getUsersSexualPreference);
    console.log('All elements found. Adding event listener.');

    //submit_button.addEventListener('click', postInfo);
    const baseURL = 'http://localhost:5501/onboarding';

    //async function postInfo(e) {
    async function postInfo() {
        console.log("postInfo function run")            // used for testing purposes
        //e.preventDefault();
        try {
            let topGenre = "";
            if (spotifyGenre.textContent === "") {
                topGenre = onboardingFormAnswer.value;
            } else {
                topGenre = spotifyGenre.textContent.substring(40);
            }
            console.log('topGenre is equal to: ', topGenre)          // used for testing purposes
            const res = await fetch(baseURL, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    topGenre: topGenre,
                    sex: getUsersSex,
                    sexualPreference: getUsersSexualPreference,
                    age: getUsersAge,
                    location: userLocation
                })
            });

            if (!res.ok) {
                console.log(`An error occurred in postInfo() at onboarding.js: ${res.status}`);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
            //window.location.href = "/";
            // Do something with the response data
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    postInfo();
}

