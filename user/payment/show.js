function showAllCategoriesAndWallets(user_id){
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
        url: `http://localhost:8080/wallets/user/${user_id}`,
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

function showAllCategoriesAndWalletsForEdit(user_id){
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
        url: `http://localhost:8080/wallets/user/${user_id}`,
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
            let parts=payment.date.split('-');
            let paymentdate=parts[2]+"-"+parts[1]+"-"+ parts[0]
            console.log(paymentdate)
            $('#amountEdit').val(payment.amount);
            $('#dateEdit').val(paymentdate);
            $('#oldImage').html(`<img src="http://localhost:8080/image/${payment.image}" alt="img">`);
            showAllCategoriesAndWalletsForEdit(user_id);

            // $.ajax({
            //     type:'GET',
            //     url: 'http://localhost:8080/paymentCategories',
            //     success: function (data){
            //         let content1 =  `<option>Chọn nhóm</option>`;
            //         for (let category of data) {
            //             if(payment.paymentCategory.id == category.id){
            //                 content1 += `
            //             <option value="${category.id}" selected>${category.name}</option>`;
            //             } else {
            //                 content1 += `
            //             <option value="${category.id}">${category.name}</option>`;
            //             }
            //         }
            //         $('#categoryEdit').html(content1);
            //     }
            // })
            //
            // $.ajax({
            //     type:'GET',
            //     url: `http://localhost:8080/wallets/user/${user_id}`,
            //     success: function (data){
            //         let content2 =  `
            //             <option>Chọn ví</option>`;
            //         for (let wallet of data) {
            //             if(payment.wallet.id == wallet.id){
            //                 content2 += `
            //             <option value="${wallet.id}" selected>${wallet.name}</option>`;
            //             } else{
            //                 content2 += `
            //             <option value="${wallet.id}">${wallet.name}</option>`;}
            //         }
            //         $('#walletEdit').html(content2);
            //     }
            // })
            $('#edit-modal-footer').html(
                `<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="editPayment(${id})" data-dismiss="modal">Update</button>`
            )
        }
    })
}

function showDeleteForm(id){
    let content = `
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="deletePayment(${id})" data-dismiss="modal">Delete</button>`;
    $('#delete-modal-footer').html(content);
}



$(document).ready(function (){
    showAllPayment();
    $('#create-button').html(`<button class="btn btn-sm btn-success" data-toggle="modal" data-target="#create-payment" onclick="showAllCategoriesAndWallets(${user_id})"><i class="fa fa-fw fa-plus"></i> Thêm mục chi tiêu</button>`)
})