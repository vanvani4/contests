const User = require('./models/user');

const Contest = require('./models/contest');

var jwt = require('jsonwebtoken');
const serverJWTSecret = '7pTxN5k652fjHFEJ58LfrK;';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
// const expressJwt = require('express-jwt');


cloudinary.config({
    cloud_name: 'vanvani4',
    api_key: '611596714563166',
    api_secret: 'Z1E-veCzPCBkIZqg4lmE3gEPTiQ'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'Contests',
    allowedFormats: ['jpg', 'png'],
    transformation: [
        {width: 235, height: 173, crop: 'fit'}
    ],
    // filename: function (req, file, cb) {
    //     cb(undefined, 'my-file-name');
    //   }
});

const parser = multer({ storage: storage });

const validateToken = function (req, res, next) {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, serverJWTSecret, (err, decoded) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

module.exports = function (app) {
    app.get('/main', function (req, res) {
        Contest.find(function (err, contests) {
            if (err) {
                res.send(err);
            }
            res.json(contests);
        });
        console.log('get main');
    });

    app.put('/contest/:id', function (req, res) {
        Contest.findById(req.body.id, function (err, contest) {
            if (err) {
                res.send(err);
            }
            res.json(contest);
        });
        console.log('put contest/id');
    });

    app.put('/admin', parser.single('image'), validateToken, function (req, res) {
        // console.log("put admin " + req.headers.authorization);
        
            Contest.create({
                name: req.body.name,
                image: req.file.secure_url,
                description: req.body.description
            }, function (err) {
                if (err) {
                    res.send(err);
                }
            });
        console.log('put admin');
    });

    app.post('/login', function (req, res) {
        User.findOne({ login: req.body.login, password: req.body.password },
            function (err, users) {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign(users.login, serverJWTSecret);
                res.status(200).send({
                    user: users.login,
                    token: token
                });
            })
        console.log('post /login');
    });
}