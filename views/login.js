const submit_button = document.getElementById('submit-button');
const username      = document.getElementById('username');
const password      = document.getElementById('password');

const baseURL = 'http://localhost:8383/';
submit_button.addEventListener('click' , postInfo);
async function postInfo(e) {
    if (username.value == '' || password.value == '') { return; }
    e.preventDefault();
    const res = await fetch(baseURL, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({
            parcel: username.value
        })
    })

}
