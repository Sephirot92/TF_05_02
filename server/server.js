const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = 8085;
let users = {
    admin: { password: "123456", name: "Admin", surname: "Admin", age: 50, sex:"not interested"},
    jan: { password: "jan1234", name: "Jan", surname: "Kowalski", age: 32, sex:"male" },
    darek: { password: "ofelia", name:"Darek", surname:"Mieczkowski", age: 22, sex: "male"},
    fiona: { password: "rikitikita", name:"Fiona", surname:"Viola", age: 36, sex: "female"}
};
app.post('/auth/login', cors(), (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    let login = request.body.login;
    let password = request.body.password;
    if (!users[login]) {
        response.json({ logged: false, message: `User not exists ${login}.` });
        return null;
    } else {
        if (users[login].password != password) {
            response.json({ logged: false, message: `Password is not valid.` });
        } else {
            response.json({ logged: true, message: `User login success ${login}.` });
        }
    }
});
app.get('/userDetails/:login', cors(), function (request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    let login = request.params.login;
    let data = users[login];
    response.status(200).send(data);
});
app.get('/allUsers', cors(), function (request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200).send(users);
});
app.listen(port, () => console.log(`Aplikacja działa na porcie ${port}`));