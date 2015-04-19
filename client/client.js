/*global document, window */

'use strict';

var React = require('react');
var app = require('./app');
var navigateAction = require('flux-router-component').navigateAction;
//var dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support


// pass in the dehydrated server state from server.js
//app.rehydrate(dehydratedState, function (err, context) {
//    if (err) {
//        throw err;
//    }
//    window.context = context;
//    var mountNode = document.getElementById('app');
//
//    React.withContext(context.getComponentContext(), function () {
//        React.render(context.createElement(), mountNode, function () {
//        });
//    });
//});

var context = app.createContext();
window.context = context;

context.getActionContext().executeAction(navigateAction, {
    url: window.location.href //
}, function (err) {
    if (err) {
        if (err.status && err.status === 404) {
            console.log("404 - todo - page");
        } else {
            console.log("unexpected navigateAction error =C");
        }
        return;
    }

    var mountNode = document.getElementById('app');
    React.withContext(context.getComponentContext(), function () {
        React.render(context.createElement(), mountNode, function () {
        });
    });
});
