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
        <td><button class="btn btn-primary"><i data-target="" data-toggle="modal"
                                        type="button" onclick=""></i>Xem</button></td>
        <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-paymentCategory" data-toggle="modal"
                                        type="button" onclick="showEditPaymentCategory(${paymentCategories[i].id})"></i></button>edit</td>
        <td><button class="btn btn-danger" data-target="#delete-paymentCategory" data-toggle="modal"
                                        type="button" onclick="showDeletePaymentCategory(${paymentCategories[i].id})"><i class="fa fa-trash"></i></button>delete</td>
    </tr>`
            }
            $('#paymentCategory-list').html(content);
        }
    })
}

function createNewPaymentCategory() {
    let name = $('#name').val();
    let paymentCategory = {
        name: name
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/paymentCategories',
        data: JSON.stringify(paymentCategory),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        success: function () {
            getAllPaymentCategory();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }
    })
}

function deletePaymentCategory(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/paymentCategories/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllPaymentCategory();
            showSuccessMessage('Xóa thành công!');
            // $('#delete-product').hide();
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}
function showDeletePaymentCategory(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deletePaymentCategory(${id})" type="button">Xóa</button>`;
    $('#delete-modal-footer').html(content);
}

$(document).ready(function () {
    getAllPaymentCategory();
})