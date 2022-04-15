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
            let  role=currentUser.roles[0].authority;
            if(role=="ROLE_ADMIN"){
                location.href = 'admin/index.html'
            }else {
                location.href = 'users/index.html'
            }
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