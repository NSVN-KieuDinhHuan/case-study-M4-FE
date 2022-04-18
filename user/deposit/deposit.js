let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
user_id = currentUser.id;

function findAllDepositByUser() {
    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/deposits/user/${user_id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (deposits) {
            let content = '';
            for (let i = 0; i < deposits.length; i++) {
                content += ` <tr>
                <td>${i + 1}</td>
                <td>${deposits[i].amount}</td>
                <td>${deposits[i].date}</td>
                <td>${deposits[i].note}</td>
                <td>${deposits[i].wallet.name}</td>
                <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#edit-deposit" onclick="showEditDeposit(${deposits[i].id})"
                ><i class="fa fa-edit"></i></button></td>
                <td><button class="btn btn-danger" type="button" data-toggle="modal" data-target="#delete-deposit" onclick="showDeleteDeposit(${deposits[i].id})"
                ><i class="fa fa-trash"></i></button></td>
                </tr>`
            }
            $('#deposits-list-content').html(content);
        }
    })
    if (startDate !=="" && endDate !==""){
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/deposits/user/${user_id}?startDate=${startDate}&endDate=${endDate}`,
            headers: {
                'Authorization': 'Bearer ' + currentUser.token
            },
            success: function (deposits) {
                let content = '';
                for (let i = 0; i < deposits.length; i++) {
                    content += ` <tr>
                <td>${i + 1}</td>
                <td>${deposits[i].amount}</td>
                <td>${deposits[i].date}</td>
                <td>${deposits[i].note}</td>
                <td>${deposits[i].wallet.name}</td>
                <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#edit-deposit" onclick="showEditDeposit(${deposits[i].id})"
                ><i class="fa fa-edit"></i></button></td>
                <td><button class="btn btn-danger" type="button" data-toggle="modal" data-target="#delete-deposit" onclick="showDeleteDeposit(${deposits[i].id})"
                ><i class="fa fa-trash"></i></button></td>
                </tr>`
                }
                $('#deposits-list-content').html(content);
            }
        })
    }
}

function findAllDepositByWallet(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/deposits/wallet/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (deposits) {
            let content = '';
            for (let i = 0; i < deposits.length; i++) {
                content += ` <tr>
                <td>${i + 1}</td>
                <td>${deposits[i].amount}</td>
                <td>${deposits[i].date}</td>
                <td>${deposits[i].note}</td>
                <td>${deposits[i].wallet.name}</td>
                <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#edit-deposit" onclick="showEditDeposit(${deposits[i].id})"
                ><i class="fa fa-edit"></i></button></td>
                <td><button class="btn btn-danger" type="button" data-toggle="modal" data-target="#delete-deposit" onclick="showDeleteDeposit(${deposits[i].id})"
                ><i class="fa fa-trash"></i></button></td>
                </tr>`
            }
            $('#deposits-list-content').html(content);
        }
    })
}

function showEditDeposit(id) {
    let footer = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onclick="editDeposit(${id})"
                        aria-label="Close" class="close" data-dismiss="modal">Edit</button>`;
    $('#footer-deposit-edit').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/deposits/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (deposit){
            $('#amount').val(deposit.amount);
            $('#date').val(deposit.date);
            $('#note').val(deposit.note);
            $('#wallet').val(deposit.wallet.id);

            $.ajax({
                type: 'GET',
                url: `http://localhost:8080/wallets/user/${user_id}`,
                headers: {
                    'Authorization': 'Bearer ' + currentUser.token
                },
                success: function (deposits) {
                    let content = '';
                    for (let i = 0; i < deposits.length; i++) {
                        if (deposit.wallet.id === deposits[i].id) {
                            content += `<option value="${deposits[i].id}" selected>${deposits[i].name}</option>`
                        } else {
                            content += `<option value="${deposits[i].id}">${deposits[i].name}</option>`
                        }
                    }
                    $('#wallet').html(content);
                }
            })
        }
    })
}

function editDeposit(id) {
    let amount = $('#amount').val();
    let date = $('#date').val();
    let note = $('#note').val();
    let wallet = $('#wallet').val();
    let deposit = {
        amount: amount,
        date: date,
        note: note,
        wallet: {
            id : wallet
        }
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/deposits/${id}`,
        data: JSON.stringify(deposit),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            findAllDepositByUser();
        }
    })
}

function showDeleteDeposit(id) {
    let footer = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onclick="deleteDeposit(${id})"
                        aria-label="Close" class="close" data-dismiss="modal">Delete</button>`;
    $('#footer-deposit-delete').html(footer);
}

function deleteDeposit(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/deposits/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (){
            findAllDepositByUser();
        }
    })
}

$(document).ready(function () {
    findAllDepositByUser();
})