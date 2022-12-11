var ajaxService = null;

//constants
var PASSWORD_STRING = 'password';
var USER_NICK_STRING = 'User nick';

function init() {
    document.getElementById("loginBtn").addEventListener("click", signIn);
    ajaxService = new AjaxService();
}
function signIn() {
    var login = document.getElementById("login").value;
    ajaxService.post({
        url: "http://127.0.0.1:8085/auth/login",
        data: {
            login: login,
            password: document.getElementById("password").value
        },
        success: function (response) {
            if (response.logged === true) {
                showUserDetails(login);
                showMessage(response.message)
            }
        }
    });
}
function showUserDetails(login) {
    
    ajaxService.get({
        url: `http://127.0.0.1:8085/userDetails/${login}`,
        data: {
            login: login
        },
        success: function (response) {
            document.getElementById("loginPanel").style.display = "none";
            document.getElementById("appPanel").style.display = "block";
            document.getElementById("userDetails").textContent = `${response.name} ${response.surname}`;

        }
    });
}
function allUsers() {
    ajaxService.get({
        url: 'http://127.0.0.1:8085/allUsers',
        success: function (response) {
            //generate general table data
            var userDataTable = document.createElement('table');
            userDataTable.style.width = '100%';
            userDataTable.setAttribute('border', 1);
            var userDataTableBody = document.createElement('tbody');
            var userDataTableHead = document.createElement('thead');
            var userDataTableHeadRow = document.createElement('tr');
            var userDataTableHead_nick = document.createElement('th');
            userDataTableHead_nick.textContent = USER_NICK_STRING;
            userDataTableHeadRow.appendChild(userDataTableHead_nick);
            //create table headers - exclude password
            Object.keys(Object.values(response) [0]).forEach(value => {
                var tableHeadElement = document.createElement('th')
                if(value === PASSWORD_STRING) {
                    return;
                }
                tableHeadElement.textContent = value
                userDataTableHeadRow.appendChild(tableHeadElement)
            });
            userDataTableHead.appendChild(userDataTableHeadRow);
            
            //iterate over all elements - populate data excluding password
            Object.entries(response).forEach(([key, value])=> {
                var userDataTable_dataRow = document.createElement('tr');
                var userDataTable_dataRowData = document.createElement('td');
                userDataTable_dataRowData.textContent = key;
                userDataTable_dataRow.appendChild(userDataTable_dataRowData);
                Object.entries(value).forEach (([id, content])=> {
                    if(id === PASSWORD_STRING) {
                        return;
                    }
                    var userDataTable_dataValue = document.createElement('td');
                    userDataTable_dataValue.textContent = content;
                    userDataTable_dataRow.appendChild(userDataTable_dataValue);
                })
                userDataTableBody.appendChild(userDataTable_dataRow);
            });
            userDataTable.append(userDataTableHead, userDataTableBody);
            document.getElementById('appPanel').appendChild(userDataTable);
        }
    })
}
function showMessage(message) {
    document.getElementById("message").textContent = message;
    console.log(allUsers);
    document.getElementById('showUsersBtn').addEventListener('click', allUsers);
}
document.addEventListener("DOMContentLoaded", init);