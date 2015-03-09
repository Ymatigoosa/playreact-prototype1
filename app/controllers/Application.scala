package controllers

import javax.script.ScriptEngineManager
import play.api.Play.current
import play.api._
import play.api.cache.Cached
import play.api.libs.concurrent.Execution.Implicits._
import play.api.mvc._
import play.twirl.api.Html
import scala.concurrent.Promise
import scala.util.{Failure, Success}

object Application extends Controller {

  val manager: ScriptEngineManager = new ScriptEngineManager(null)
  val engine = manager.getEngineByName("nashorn")
  val invocable = engine.asInstanceOf[javax.script.Invocable]
  val nashornpolyfill = scala.io.Source.fromFile(Play.getFile("public/nashorn-polyfill.js"))
  val nashornpolyfilljs = nashornpolyfill.mkString
  nashornpolyfill.close
  val serverside = scala.io.Source.fromFile(Play.getFile("public/serverside.js"))
  val serversidejs = serverside.mkString
  serverside.close
  engine.eval(nashornpolyfilljs)
  engine.eval(serversidejs)

  def requireJsConfig = Cached("require_js_config") {
    Action {
      Ok(views.html.requireJsConfig()).as("application/javascript")
    }
  }

  def serverSideWithJsEngine(uri: String) = Action.async { request =>
    
    val markupPromise = Promise[String]()
    invocable.invokeFunction("prerender", request.uri, markupPromise)

    markupPromise.future.map{
      case markup => Ok(views.html.main(Html(markup)))
    }.recover{
      case e => BadRequest(e.getMessage)
    }
  }

}