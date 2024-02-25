const express = require('express');
var router = express.Router();
const fs = require('fs');
const authentication = require('../auth/authentication');
const authorization = require('../auth/authorization');

//service logic

function getAllUsers(req, res) {
    var users = JSON.parse(fs.readFileSync('user.json').toString());
    res.json(users);
}

function createUser(req, res) {
    var users = JSON.parse(fs.readFileSync('user.json').toString());
    req.body.id = users.length != 0 ? users[users.length -1].id + 1 : 1;
    users = [...users, req.body];
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json(req.body);
}

function getUserById(req, res) {
    var users = JSON.parse(fs.readFileSync('user.json').toString());
    users = users.map(u => u.id == req.params.userId ? req.body : u);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json(req.body);
}

function updateUserById(req, res) {
    var users = JSON.parse(fs.readFileSync('user.json').toString());
    res.json(users.map(u =>{ return u.id == req.params.userId ? req.body : u }));
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json(req.body);
}

function deleteUser(req, res) {
    var users = JSON.parse(fs.readFileSync('user.json').toString());
    users = users.filter(u => u.id != req.params.userId);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json({message: "Deleted successfully"});
}

//set user routes
router.get('/', authentication, authorization, getAllUsers);
router.get('/:userId', authentication, authorization, getUserById);
router.post('/', authentication, authorization, createUser);
router.put('/:userId' , authentication, authorization, updateUserById);
router.delete(':userId', authentication, authorization, deleteUser);

module.exports = router;