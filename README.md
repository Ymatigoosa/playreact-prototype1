# About

FOR THE GLORY OF SCALA HUEHUEHUE

# How to run?

## Idea 14

1. install scala plugin & some js plugins for syntax highlighting (dont remember which.....)
2. press import project and choose sbt project
3. wait until magic is done
4. add startup config like this

    ![startup config](http://i.imgur.com/FFh9Rp1.png "startup config")

    JVM Options:

    `-Xms512M -Xmx1024M -Xss1M -XX:+CMSClassUnloadingEnabled -XX:MaxPermSize=256M`

6. enjoi

### js

1. install [npm]( https://www.npmjs.com/)
2. go to `client/` folder
3. run cmd from this folder
4. use following command:
    1. `npm install` - install libraries, declared in package.json
    2. `npm run watch` - start auto compile when files is changed. Compiled file will be placed in `public/client.js` folder where is can be accessed from Play framework.

# Project structure

* `app` - Play application folder
    * `actors` - actors package
    * `assets` - this folder can contain js/coffee/less files that uses play-framework js build system.***так как я использую внешнюю систему билдинга эта папка бесполезна, хотя в будущем омжно всё свести в систиму билдинга скалы, тк плагин для es6 вроде есть...***
    * `controllers`
        * `Application.scala` - main controller
        * `Application_isomorphic.scala` - UNUSED. isomorphic rendering controller
        * `SumController` - *from example.... im so lazy to delete it*
    * `views`
        * `index.scala.html`
        * `mail.scala.html`
        * `requireJsConfig.scala.html` - UNUSED. auto creating require js config for standart build system.
* `client` - client js project
    * `client.js` - main file
    * `package.json` - libraries
    * `webpack.***.js` - building
* `conf`
    * `application.conf` - play framework configs
    * `routes` - play framework routes
* `project` - scala build config
* `target` - scala build output
* `build.sbt` - scala build script
* `procfile` - heroku config