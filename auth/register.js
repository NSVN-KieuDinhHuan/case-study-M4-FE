

function register() {
    let username = $('#username').val();
    let email=$('#email').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirm-password').val();
    let user = {
        name: username,
        email:email,
        passwordForm:{
        password: password,
            confirmPassword: confirmPassword
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/register',
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
<<<<<<< HEAD:auth/register.js
            location.href = 'wallet.html';
=======

            location.href = '/case-Study-M4-FE/login.html';

>>>>>>> 6d45c0864b1284242b660bba5ed56b77302da496:register.js
        },
        error: function () {

        }
    })


}


$().ready(function() {
    $("#registerForm").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            "username": {
                required: true,
                minlength:5,
                maxlength: 15
            },
            "password": {
                required: true,
                validatePassword: true,
            },
            "confirm-password": {
                equalTo: "#password",
            },
            "agree":{
                required:true
            },
            "email":{
                required: true,
                email:true

            }

        },


        messages: {
            "username": {
                required: "Bắt buộc",
                minlength:"nhập tối thiểu 5 ký tự ",
                maxlength: "nhập tối đa 15 ký tự"
            },
            "password": {
                required: "Bắt buộc",
            },
            "confirm-password": {
                equalTo: "Hai password phải giống nhau",
            },

            "agree":{
                required:"Bắt buộc"
            },
            "email":{
                required:"Bắt buộc",
                email:"Sai đinh dạng email"
            }
        }
    });
});

$.validator.addMethod("validatePassword", function (value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/i.test(value);
}, "Hãy nhập password từ 8 đến 16 ký tự bao gồm chữ hoa, chữ thường và ít nhất một chữ số");
