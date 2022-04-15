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
            let content = `<div class="form-group">
                    <label for="amountEdit">Số tiền</label>
                    <input type="number" class="form-control" id="amountEdit" value="${payment.amount}">
                </div>
                <div class="form-group">
                    <label for="dateEdit">Ngày tháng</label>
                    <input type="text" class="form-control" id="dateEdit" value="${payment.date}">
                </div>
                <div>
                    <img src="http://localhost:8080/image/${payment.image}" alt="anh hoa don">
                    </div>
                <div class="form-group">
                    <label for="imageEdit">Image</label>
                    <input type="file" class="form-control" id="imageEdit">
                </div>
                <div class="form-group">
                    <label for="walletEdit">Ví</label>
                    <select id="walletEdit">
                    </select>
                </div>
                <div class="form-group">
                    <label for="categoryEdit">Nhóm</label>
                    <select id="categoryEdit">
                    </select>
                </div>`;
            $('#edit-modal_body').html(content);

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