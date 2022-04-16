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
<<<<<<< HEAD
            let  role=currentUser.roles[0].authority;
            if(role=="ROLE_ADMIN"){
                location.href = 'admin/index.html'
            }else {
                location.href = 'users/index.html'
            }
=======
            location.href = 'user/paymentCategory.html'
>>>>>>> 009a773a136984705f6837f3590ad929dd2b3ef6
        }
    });
}

function logout(){
    localStorage.removeItem('currentUser');
    location.href = '/login.html';
}

// $('#logout').on( "click", function() {
//     logout();
// });