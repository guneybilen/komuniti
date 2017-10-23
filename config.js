'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');


Dotenv.config({ silent: true });

const criteria = {
    env: process.env.NODE_ENV
};

// console.log(process.env.MAIL);
// console.log(process.env.PASS2);

const config = {
    $meta: 'This file configures Komuniti.',
    projectName: 'Komuniti',
    port: {
        web: {
            $filter: 'env',
            test: 9000,
            production: process.env.PORT,
            $default: 8080
        }
    },
    baseUrl: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production: 'https://getaqua.herokuapp.com',
        $default: 'https://127.0.0.1:8080'
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    cookieSecret: {
        $filter: 'env',
        production: process.env.COOKIE_SECRET,
        $default: '!k3yb04rdK4tz~4qu4~k3yb04rdd0gz!'
    },
    hapiMongoModels: {
        mongodb: {
            uri: {
                $filter: 'env',
                production: process.env.MONGODB_URI,
                test: 'mongodb://localhost:27017/komuniti-test',
                $default: process.env.MONGODB_URI
            }
        },
        autoIndex: true
    },
    nodemailer: {
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS2
        }
        
    },
    system: {
        fromAddress: {
            name: 'Komuniti',
            address: process.env.MAIL
        },
        toAddress: {
            name: 'Komuniti',
            address: process.env.MAIL
        }
    }
};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
