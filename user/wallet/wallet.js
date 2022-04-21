let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
function getAllWallet() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/wallets',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (wallets) {
            let content = '';
            for (let i = 0; i < wallets.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${wallets[i].name}</td>
        <td>${wallets[i].currentAmount}</td>
        <td><img src="http://localhost:8080/icon/${wallets[i].icon}" width="100" height="100"></td>
        <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#edit-wallet" data-toggle="modal"
                                        type="button" onclick="showEditWallet(${wallets[i].id})"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-wallet" data-toggle="modal"
                                        type="button" onclick="showDeleteWallet(${wallets[i].id})"><i class="fa fa-trash"></i></button></td>
    </tr>`
            }
            $('#wallet-list-content').html(content);
        }
    })
}

function showCreateWallet(){
    $('#createName').val(null);
    $('#inputBalance').val(null);
    $('#createIcon').val(null);
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/users',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token,
        },
        success: function (users) {
            let content = `<option>Chọn người dùng</option>`
            for (let user of users) {
                content += `<option value="${user.id}">${user.name}</option>`
            }
            $('#selectUser').html(content);
        }
    })

}
function createNewWallet() {
    let name = $('#createName').val();
    let currentAmount = $('#inputBalance').val();
    let icon = $('#createIcon');
    let user_id = currentUser.id;
    let wallet = new FormData();
    wallet.append('name', name);
    wallet.append('currentAmount', currentAmount);
    wallet.append('icon', icon.prop('files')[0]);
    wallet.append('user', user_id);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/wallets',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        data: wallet,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            showSuccessMessage('Tạo thành công!');
            getAllWallet();
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }
    })
}

function showSuccessMessage(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        Toast.fire({
            icon: 'success',
            title: message
        })
    });
}

function showErrorMessage(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        Toast.fire({
            icon: 'error',
            title: message
        })
    });
}

function deleteWallet(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/wallets/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllWallet();
            showSuccessMessage('Xóa thành công!');
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteWallet(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteWallet(${id})" type="button">Xóa</button>`;
    $('#footer-delete').html(content);
}

function showEditWallet(id) {
    let title = 'Chỉnh sửa thông tin ví';
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" data-dismiss="modal" onclick="editWallet(${id})" type="button">Cập nhật</button>`;
    $('#edit-wallet-title').html(title);
    $('#edit-wallet-footer').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/wallets/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (wallet) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/wallets',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.token,
                },
                success: function (users) {
                    let content = `<option></option>`
                    for (let user of users) {
                        content += `<option value="${user.id}">${user.name}</option>`
                    }
                    // $('#selectUser').html(content);
                    $('#editName').val(wallet.name);
                    $('#editBalance').val(wallet.currentAmount);
                    $('#editImage').val(wallet.icon);
                }
            })
        }
    })
}

function editWallet(id) {
    let name = $('#editName').val();
    let currentAmount = $('#editBalance').val();
    let icon = $('#editImage').val();
    let wallet = {
        name: name,
        currentAmount: currentAmount,
        icon: icon,
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/wallets/${id}`,
        data: JSON.stringify(wallet),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            showSuccessMessage('Chỉnh sửa thành công!');
            getAllWallet();
        },
        error: function () {
            showErrorMessage('Xảy ra lỗi!');
        }
    })
}


$(document).ready(function () {
    if(currentUser!=null){
        getAllWallet();
    } else {
        location.href='../../login.html'
    }
})