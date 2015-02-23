###
require.config {
  paths: {
    page: "./Page"
    controller: "./Controller"
    sumWebSocket: "./SumWebSocket"
    jquery: "../lib/jquery/jquery"
  }
  shim: {
    bootstrap: {
      deps: ["jquery"]
    }
    jquery: {
      exports: "$"
    }
  }
}
###

require ["Controller"], (controller) ->

  controller.bind()