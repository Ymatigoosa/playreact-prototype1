'use strict';

var loadPage = require('../actions/loadPage');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        action: loadPage
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        action: loadPage
    }
};
