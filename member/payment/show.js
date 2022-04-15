function showAllCategoriesAndWallets(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/paymentCategories',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data){
            let content =  `
                        <option>Chọn nhóm</option>`;
            for (let category of data) {
                content += `
                        <option value="${category.id}">${category.name}</option>`;
            }
            $('#category').html(content);
        }
    })

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/wallets',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data){
            let content =  `
                        <option>Chọn ví</option>`;
            for (let wallet of data) {
                content += `
                        <option value="${wallet.id}">${wallet.name}</option>`;
            }
            $('#wallet').html(content);
        }
    })

}

function showAllCategoriesAndWalletsForEdit(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/paymentCategories',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data){
            let content =  `
                        <option>Chọn nhóm</option>`;
            for (let category of data) {
                content += `
                        <option value="${category.id}">${category.name}</option>`;
            }
            $('#categoryEdit').html(content);
        }
    })

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/wallets',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data){
            let content =  `
                        <option>Chọn ví</option>`;
            for (let wallet of data) {
                content += `
                        <option value="${wallet.id}">${wallet.name}</option>`;
            }
            $('#walletEdit').html(content);
        }
    })

}

function showEditForm(id){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/payments/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (payment){
            $('#amountEdit').val(payment.amount);
            $('#dateEdit').val(payment.date);
            // $('#imageEdit').val(payment.image);
            $('#walletEdit').val(payment.wallet);
            $('#categoryEdit').val(payment.paymentCategory);

            showAllCategoriesAndWalletsForEdit();

            $('#edit-modal-footer').html(
                `
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="editPayment(${id})" data-dismiss="modal">Update</button>`
            )
        }
    })
}

$(document).ready(function (){
    showAllPayment();
})