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

(function () {
    var context = app.createContext();
    var url = global.process.argv[2];
    var output = console.log;
    console.log = function() {};
    context.getActionContext().executeAction(navigateAction, {
        url: url
    }, function (err) {
        if (err) {
            output(err);
            return;
        }

        var exposed = 'window.App=' + jsserialize(app.dehydrate(context)) + ';';
        var appComponent = app.getAppComponent();

        React.withContext(context.getComponentContext(), function () {
            var markup = React.renderToStaticMarkup(appComponent());
            output('<div id="app">' + markup + '</div><script>' + exposed + '</script>');
        });
    });
})();
