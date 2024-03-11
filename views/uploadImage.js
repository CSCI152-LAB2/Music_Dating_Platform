
document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');

    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Fetch user's profile data to get userId
        fetchUserProfile().then(userData => {
            console.log(userData._id);
            if (userData._id) {
                uploadPhoto(userData._id);
            } else {
                alert('Could not fetch user data or userId missing');
            }
        }).catch(error => {
            console.error('Fetching user profile failed:', error);
            alert('Error fetching user profile.');
        });
    });
});

// Function to fetch user's profile and return the user data
async function fetchUserProfile() {
    const baseURL = "http://localhost:5501/profile"; // Adjust as needed
    try {
        const response = await fetch(baseURL, {
            method: 'GET',
            credentials: 'same-origin', // Ensures cookies are sent with the request
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        console.log('User data received successfully:', userData);
        return userData;
    } catch (err) {
        console.error('Error fetching user data:', err);
        throw err; // Rethrow to handle it in the calling function
    }
}

// Function to upload the photo using the userId
function uploadPhoto(userId) {
    const formData = new FormData();
    formData.append('photo', document.getElementById('profilePic').files[0]);

    fetch(`../routes/imageupload.js/upload/:${userId}`, {
        method: 'POST',
        credentials: 'same-origin', // Ensures cookies are sent with the request
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
}
