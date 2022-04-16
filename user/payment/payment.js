let currentUser = localStorage.getItem('currentUser'); // lay ra chuoi token
currentUser = JSON.parse(currentUser);
let user_id = currentUser.id;

function showAllPayment() {
    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();

    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/payments/user/${user_id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += ` <tr>
                                                <td>${i+1}</td>
                                                <td>${data[i].amount}</td>
                                                <td>${data[i].date}</td>
                                                <td><img src="http://localhost:8080/image/${data[i].image}" alt="ảnh hoá đơn"></td>
                                                <td>${data[i].paymentCategory == null ? "" : data[i].paymentCategory.name}</td>
                                                <td>${data[i].wallet == null ? "" : data[i].wallet.name}</td>
                                                <td class="align-right">
                                                    <button class="text-primary font-weight-bold text-xs" data-toggle="modal" data-target="#edit-payment" onclick="showEditForm(${data[i].id})">
                                                        <i class="fa fa-edit"></i>
                                                    </button> |
                                                    <button class="text-secondary font-weight-bold text-xs" data-toggle="modal" data-target="#delete-payment" onclick="showDeleteForm(${data[i].id})">
                                                        <i class="fa fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>`;
            }
            $('#payment-list').html(content);
        }
    })
// show payment by Date
    if(startDate != "" & endDate != ""){
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/payments/user/${user_id}?startDate=${startDate}&endDate=${endDate}`,
            headers: {
                'Authorization': 'Bearer ' + currentUser.token
            },
            success: function (data) {
                let content = "";
                for (let i = 0; i < data.length; i++) {
                    content += ` <tr>
                                                <td>${i+1}</td>
                                                <td>${data[i].amount}</td>
                                                <td>${data[i].date}</td>
                                                <td><img src="http://localhost:8080/image/${data[i].image}" alt="ảnh hoá đơn"></td>
                                                <td>${data[i].paymentCategory == null ? "" : data[i].paymentCategory.name}</td>
                                                <td>${data[i].wallet == null ? "" : data[i].wallet.name}</td>
                                                <td class="align-right">
                                                    <button class="text-primary font-weight-bold text-xs" data-toggle="modal" data-target="#edit-payment" onclick="showEditForm(${data[i].id})">
                                                        <i class="fa fa-edit"></i>
                                                    </button> |
                                                    <button class="text-secondary font-weight-bold text-xs" data-toggle="modal" data-target="#delete-payment" onclick="showDeleteForm(${data[i].id})">
                                                        <i class="fa fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>`;
                }
                $('#payment-list').html(content);
            }
        })
    }
}


function createPayment(){
    let amount = $('#amount').val();
    let date = $('#date').val();
    let wallet = $('#wallet').val();
    let category = $('#category').val();
    let image = $('#image');
    let payment = new FormData();
    payment.append('amount', amount);
    payment.append('date', date);
    payment.append('wallet', wallet);
    payment.append('paymentCategory',category);
    payment.append('image',image.prop('files')[0]);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/payments',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        data: payment,
        enctype:'multipart/form-data',
        processData: false,
        contentType: false,
        success: function (payment){
            console.log(payment);
            showAllPayment();
            showSuccessMessage('Tạo mới thành công!');
            console.log('Create successfully!');
            $('#amount').val(null);
            $('#date').val(null);
            $('#image').val(null);
            $('#wallet').val(null);
            $('#category').val(null);
        },
        error: function (){
            showErrorMessage('Tạo lỗi!');
            console.log('Created failed');
        }
    })
}

function editPayment(id){
    let amount = $('#amountEdit').val();
    let date = $('#dateEdit').val();
    let wallet = $('#walletEdit').val();
    let category = $('#categoryEdit').val();
    let payment = new FormData();
    let files = $('#imageEdit').prop('files');
    if(files.length != 0){
        let image = files[0];
        payment.append('image',image);
    }
    payment.append('amount',amount);
    payment.append('wallet',wallet);
    payment.append('paymentCategory',category);
    payment.append('date',date);
    $.ajax({
        type:'POST',
        url: `http://localhost:8080/payments/${id}`,
        headers:{
            'Authorization': 'Bearer ' + currentUser.token
        },
        data: payment,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function (payment){
            console.log(payment);
            showAllPayment();
            $('#imageEdit').val(null);
            console.log('edit successfully!');
            showSuccessMessage('Cập nhật thành công!')
        },
        error: function (){
            console.log('edit failed!');
            showErrorMessage('Cập nhật lỗi!')
        }
    })
}

function deletePayment(id){
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/payments/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (){
            console.log('deleted successfully');
            showSuccessMessage('Xoá thành công!')
            showAllPayment();
        },
        error: function (){
            console.log('deleted failed');
            showErrorMessage('Xoá lỗi!')
        }
    })
}

