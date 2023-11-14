// Create web server

var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

var commentsPath = path.join(__dirname, 'comments.json');

// Get comments
router.get('/', function(req, res, next) {
    fs.readFile(commentsPath, function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(JSON.parse(data));
        }
    });
});

// Add comment
router.post('/', function(req, res, next) {
    fs.readFile(commentsPath, function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else {
            var comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile(commentsPath, JSON.stringify(comments, null, 4), function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                } else {
                    res.setHeader('Cache-Control', 'no-cache');
                    res.json(comments);