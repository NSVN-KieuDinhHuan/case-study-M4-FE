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
            location.href = 'user/category/paymentCategory.html'
        }
    });
}

function logout(){
    localStorage.removeItem('currentUser');
    location.href = '/case-study-M4-FE/index.html';
}

$('#logout').on( "click", function() {
    logout();
});