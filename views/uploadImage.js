document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const formData = new FormData();
        const files = document.querySelector('[name=avatar]').files;
        if (files.length > 0) {
            formData.append('avatar', files[0]);
        }

        fetch('/profile/upload', {
            method: 'POST',
            body: formData,
            enctype: 'multipart/form-data'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Successfully uploaded photo');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
