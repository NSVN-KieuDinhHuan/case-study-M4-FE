let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
user_id = currentUser.id;

function logout(){
    localStorage.removeItem('currentUser');
    location.href = '/case-study-M4-FE/login.html';
}
function showCreateDeposit() {
    let title = 'Create deposit';
    let footer = `<button type="button" class="btn btn-space btn-primary" onclick="createDeposit()">Create</button>
                                                        <button class="btn btn-space btn-secondary">Cancel</button>`;
    $('#create-deposit-title').html(title);
    $('#create-deposit-footer').html(footer);
    $('#amount').val(null);
    $('#date').val();
    $('#note').val(null);
    $('#wallet').val(null);

    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/wallets/user/${user_id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (wallets) {
            let content = `<option>Chose Wallet</option>`;
            for (let wallet of wallets) {
                content += `<option value="${wallet.id}">${wallet.name}</option>`
            }
            $('#wallet').html(content);
        }
    })
}

function createDeposit(){
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
        type: 'POST',
        url: `http://localhost:8080/deposits`,
        data: JSON.stringify(deposit),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            location.href = "/case-study-M4-FE/user/deposit/deposit.html";
        }
    })
}



$(document).ready(function () {
    showCreateDeposit();
})