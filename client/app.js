'use strict';

var React = require('react');
var Fluxible = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');

// create new fluxible instance
var app = new Fluxible({
    component: React.createFactory(require('./components/Application.jsx'))
});

// add routes to the routr plugin
app.plug(routrPlugin({
    routes: require('./routes/routes')
}));

// register stores
app.registerStore(require('./stores/ApplicationStore'));

module.exports = app;
