let currentUser = localStorage.getItem('currentUser'); // lay ra chuoi token
currentUser = JSON.parse(currentUser);
let user_id = currentUser.id;