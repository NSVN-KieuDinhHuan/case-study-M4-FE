

function showAllWallets() {

    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/wallets/user/${user_id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (wallets) {
            let totalAmount = 0;
            for (let i = 0; i < wallets.length; i++) {
                totalAmount += wallets[i].currentAmount;
            }
            $('#totalAmount').html(totalAmount);
            let content = "";
            for (let i = 0; i < wallets.length; i++) {
                let currentAmount = wallets[i].currentAmount;
                let percent = currentAmount / totalAmount * 100;
                percent = percent.toFixed(2);
                content += ` <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div class="card">
                                <h5 class="card-header"><span>Ví </span><span>${wallets[i].name}</span></h5>
                                <div class="card-body">
                                    <div class="metric-value d-inline-block">
                                        <h1 class="mb-1"><span>VND </span><span>${wallets[i].currentAmount}</span></h1>
                                    </div>
                                    <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                                        <span class="ml-1"><span>${percent}</span>%</span>
                                    </div>
                                </div>
                                <div class="card-footer text-center bg-white">
                                    <a href="#" class="card-link" onclick="showWalletDetails(${wallets[i].id})">View Details</a>
                                </div>
                            </div>
                        </div>`
            }
            $('#wallet-list').html(content);
            let username=currentUser.name;
            let  role=currentUser.roles[0].authority;
            $('#user').html(` <h5  class="mb-0 text-white nav-user-name">${username} </h5>
                                <span class="status"></span><span class="ml-2">${role}</span>`)
        }
    })
}

function showWalletDetails(id){

}

function showAllPaymentForHome() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/payments/user/${user_id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let totalPaymentAmount = 0;
            let content = "";
            for (let i = 0; i < data.length; i++) {
                totalPaymentAmount += data[i].amount;
                content += `<tr>
                                            <td>${i+1}</td>
                                            <td>${data[i].amount}</td>
                                            <td>${data[i].date}
                                            </td>
                                            <td>${data[i].paymentCategory == null ? "" : data[i].paymentCategory.name}</td>
                                        </tr>`;
            }
            $('#payments-list').html(content);
            $('#totalPaymentAmount').html(totalPaymentAmount);
        }
    })
}

function showAllDepositForHome(){
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
                </tr>`
            }
            $('#deposit-list').html(content);
        }
    })
}

$(document).ready(function (){
    showAllWallets();
    showAllPaymentForHome();
    showAllDepositForHome()
})