const submit_button = document.getElementById('submit-button');
const username = document.getElementById('username');
const password = document.getElementById('password');

const baseURL = 'http://localhost:5501/login';
submit_button.addEventListener('click', postInfo);

async function postInfo(e) {
    e.preventDefault();
    if (username.value === '' || password.value === '') {
        alert('Username or password incorrect.');
        return;
    }

    try {
        const res = await fetch(baseURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        window.location.href = "index.html";
        // Do something with the response data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}