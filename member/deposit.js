let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
user_id = currentUser.id;

function findAllDepositByUser() {
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
                                                <td></td>
                                                <td></td>
                                            </tr>`
            }
            $('#deposits-list-content').html(content);
        }
    })
}

$(document).ready(function (){
    findAllDepositByUser();
})