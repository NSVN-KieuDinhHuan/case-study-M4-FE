
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
        }
    })
}

function showWalletDetails(id){

}

// $(document).ready(function (){
//     showAllWallets();
// })


$(document).ready(function (){
    showAllWallets();
})