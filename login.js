function login(){
    let username = $('#username').val();
    let password = $('#password').val();
    let user = {
        name: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/login',
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                location.href = '/case-study-M4-FE/user/index.html'
        },
        error: function () {
            showErrorMessage(' sai mật khẩu hoặc tên đăng nhập');
        }
    });
}

function logout(){
    localStorage.removeItem('currentUser');
    location.href = '/case-study-M4-FE/login.html';
}

