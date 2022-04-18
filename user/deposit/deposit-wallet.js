let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
user_id = currentUser.id;
function logout(){
    localStorage.removeItem('currentUser');
    location.href = '/case-study-M4-FE/login.html';
}
function findAllWalletByUser() {

    let header = `<tr>
                                        <th>#</th>
                                        <th>Current Amount</th>
                                        <th>Icon</th>
                                        <th>Name</th>
<!--                                        <th colspan="2">Action</th>-->
                                    </tr>`;
    let footer = `<tr>
                                        <th>#</th>
                                        <th>Current Amount</th>
                                        <th>Icon</th>
                                        <th>Name</th>

<!--                                        <th colspan="2">Action</th>-->
                                    </tr>`;
    $('#header-deposit-wallet-list-content').html(header);
    $('#footer-deposit-wallet-list-content').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/wallets/user/${user_id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (wallets) {
            let content = '';
            for (let i = 0; i < wallets.length; i++) {
                content += `<tr>
                                        <td>${i + 1}</td>
                                        <td>${wallets[i].currentAmount}</td>
                                        <td><img src="http://localhost:8080/image/${wallets[i].icon}" alt="" height="50"></td>
                                        <td><a href="#" onclick="findAllDepositByWallet(${wallets[i].id})">${wallets[i].name}</a></td>
<!--                                        <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#edit-deposit"-->
<!--                ><i class="fa fa-edit"></i></button></td>-->
<!--                                        <td><button class="btn btn-danger" type="button" data-toggle="modal" data-target="#delete-deposit" -->
<!--                ><i class="fa fa-trash"></i></button></td>-->
                                    </tr>`
            }
            $('#body-deposit-wallet-list-content').html(content);
        }
    })
}

function findAllDepositByWallet(id) {

    let search = `                                <form>
                                    <label for="startDate"></label>
                                    <input type="date" id="startDate" value="">
                                    <label for="endDate"></label>
                                    <input type="date" id="endDate" value="">
                                    <button type="button" onclick="findAllDepositByWallet(${id})"><i class="fas fa-search"></i></button>
                                </form>`;
    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    let header = `<tr>
                                        <th>#</th>
                                        <th>Deposit Amount</th>
                                        <th>Date</th>
                                        <th>Note</th>
                                        <th>Wallet</th>
<!--                                        <th colspan="2">Action</th>-->
                                    </tr>`;
    let footer = `<tr>
                                        <th>#</th>
                                        <th>Deposit Amount</th>
                                        <th>Date</th>
                                        <th>Note</th>
                                        <th>Wallet</th>
<!--                                        <th colspan="2">Action</th>-->
                                    </tr>`;
    $('#header-deposit-wallet-list-content').html(header);
    $('#footer-deposit-wallet-list-content').html(footer);
    $('#search').html(search);
    if ((startDate !== "" && startDate !== undefined) && (endDate !== "" && endDate !== undefined)) {
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/deposits/wallet/${id}?startDate=${startDate}&endDate=${endDate}`,
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
                ><i class="fa fa-trash"></i></button></td>
                </tr>`
                }
                $('#body-deposit-wallet-list-content').html(content);
            }
        })
    } else {
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
                </tr>`
                }
                $('#body-deposit-wallet-list-content').html(content);
            }
        })
    }

}

$(document).ready(function () {
    findAllWalletByUser();
})


