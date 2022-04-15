let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);

function getAllPaymentCategory() {
    $.ajax({
        url: `http://localhost:8080/paymentCategories`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (paymentCategories) {
            let content = '';
            for (let i = 0; i < paymentCategories.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${paymentCategories[i].name}</td>
        <td><button class="btn btn-primary"><i data-target="#create-product" data-toggle="modal"
                                        type="button" onclick=""></i>Xem</button></td>
        <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-product" data-toggle="modal"
                                        type="button" onclick="showEditPaymentCategory(${paymentCategories[i].id})"></i></button>edit</td>
        <td><button class="btn btn-danger" data-target="#delete-product" data-toggle="modal"
                                        type="button" onclick="showDeletePaymentCategory(${paymentCategories[i].id})"><i class="fa fa-trash"></i></button>delete</td>
    </tr>`
            }
            $('#paymentCategory-list-content').html(content);
        }
    })
}


$(document).ready(function () {
    getAllPaymentCategory();
})