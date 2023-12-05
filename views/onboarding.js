const form = document.getElementById("onboardingForm");
const submit_button = document.getElementById('submit');

const baseURL = 'http://localhost:5501/onboarding';
submit_button.addEventListener('click', postInfo);

async function postInfo(e) {
    e.preventDefault();
    try {
        const res = await fetch(baseURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                email: email.value
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



