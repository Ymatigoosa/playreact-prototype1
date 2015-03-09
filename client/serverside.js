/**
 * This leverages Express to create and run the http server.
 * A fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

var jsserialize = require('serialize-javascript');
var navigateAction = require('flux-router-component').navigateAction;
var React = require('react');
var app = require('./app');
var Exception = Java.type('java.lang.Exception');

global.prerender = function (uri, markupPromise) {
    var context = app.createContext();

    context.getActionContext().executeAction(navigateAction, {
        url: uri
    }, function (err) {
        if (err) {
            markupPromise.failure(new Exception(err.toString()));
            return;
        }

        var exposed = 'window.App=' + jsserialize(app.dehydrate(context)) + ';';
        var appComponent = app.getAppComponent();

        React.withContext(context.getComponentContext(), function () {
            var markup = React.renderToStaticMarkup(appComponent());
            markupPromise.success('<div id="app">' + markup + '</div><script>' + exposed + '</script>');
        });
    });
}
