document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append('photo', document.getElementById('profilePic').files[0]);

    // Note: Include credentials: 'include' if your API is on a different origin
    fetch('/profile/upload', {
        method: 'POST',
        credentials: 'same-origin', // Ensures cookies are sent with the request on the same origin
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Profile picture uploaded successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error uploading profile picture');
    });
});
