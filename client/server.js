'use strict';

/**
 * This leverages Express to create and run the http server.
 * A fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

require('node-jsx').install({ extension: '.jsx' });

var express = require('express');
var serialize = require('serialize-javascript');
var navigateAction = require('flux-router-component').navigateAction;
var debug = require('debug')('super-recipe-storage-client');
var React = require('react');
var app = require('./app');
var htmlComponent = React.createFactory(require('./components/Html.jsx'));

var server = express();
server.set('state namespace', 'App');
server.use('/public', express.static(__dirname + '/build/public'));

server.use(function (req, res, next) {
    var context = app.createContext();

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        var appComponent = app.getAppComponent();
        React.withContext(context.getComponentContext(), function () {
            var html = React.renderToStaticMarkup(htmlComponent({
                state: exposed,
                markup: React.renderToString(appComponent())
            }));

            debug('Sending markup');
            res.write('<!DOCTYPE html>' + html);
            res.end();
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
