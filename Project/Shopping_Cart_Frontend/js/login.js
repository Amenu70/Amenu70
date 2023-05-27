window.onload = function () {
    document.getElementById('loginBtn').onclick = function () {

        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({
                email: document.getElementById('username').value,
                password: document.getElementById('password').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('errorMsg').innerHTML = data.error;
                    document.getElementById('errorMsg').style.display = 'block'; // Display the error message
                } else {
                    sessionStorage.setItem('accessToken', data.accessToken);
                    window.location.href = 'index.html';
                }
            });
    }
}
