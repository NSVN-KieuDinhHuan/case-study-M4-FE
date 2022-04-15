let currentUser = localStorage.getItem('CurrentUser');
currentUser = JSON.parse(currentUser);
function getAllPaymentCategory() {
    $.ajax({
        url: `http://localhost:8080/paymentCategories`,
        type: 'GET',
        headers:{
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (paymentCategories) {
            let content = '';
            for (let i = 0; i < paymentCategories.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${paymentCategories[i].name}</td>
        <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-product" data-toggle="modal"
                                        type="button" onclick="showEditPaymentCategory(${paymentCategories[i].id})"></i></button>edit</td>
        <td><button class="btn btn-danger" data-target="#delete-product" data-toggle="modal"
                                        type="button" onclick="showDeletePaymentCategory(${paymentCategories[i].id})"><i class="fa fa-trash"></i></button>delete</td>
    </tr>`
            }
            $('#paymentCategory-list-content').html(content);
        }
    })
    
    function showEditPaymentCategory(id) {
        let title = 'Chỉnh sửa thông tin danh mục';
        let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editPaymentCategory(${id})" type="button">Cập nhật</button>`;
        $('#create-paymentCategory-title').html(title);
        $('#create-paymentCategory-footer').html(footer);
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/paymentCategories/${id}`,
            headers: {
                'Authorization': 'Bearer ' + currentUser.token
            },
            success: function (paymentCategory) {
                $('#name').val(paymentCategory.name);
            }
        })
    }


    $(document).ready(function () {
        getAllPaymentCategory()
    })
}