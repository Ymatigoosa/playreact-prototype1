package controllers

import java.io.{ByteArrayOutputStream, File}
import akka.actor.Props
import akka.util.Timeout
import com.typesafe.jse.Engine.JsExecutionResult
import com.typesafe.jse._
import io.apigee.trireme.core._
import play.api.Play.current
import play.api._
import play.api.cache.Cached
import play.api.libs.concurrent.Akka
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.Json
import play.api.mvc._
import play.twirl.api.Html
import scala.concurrent.Promise
import scala.concurrent.duration._
import scala.util.Random

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  val colors = IndexedSeq("red", "green", "purple", "black", "yellow", "blue", "pink")

  /*def number = Action(Ok(Json.toJson(Json.obj(
    "number" -> Random.nextInt(colors.size)
  ))))*/

  def color(i: Int) = Action {
    colors.lift(i).map { c =>
      Ok(Json.toJson(Json.obj(
        "color" -> c
      )))
    }.getOrElse(NotFound)
  }

  def requireJsConfig = Cached("require_js_config") {
    Action {
      Ok(views.html.requireJsConfig()).as("application/javascript")
    }
  }

  def serverSideWithJsEngine(uri: String) = Action.async { request =>
    import akka.pattern.ask

    val serverside = Play.getFile("public/serverside.js")
    val f = new File(serverside.toURI)
    implicit val timeout = Timeout(5.seconds)
    val engine = Akka.system.actorOf(Trireme.props(), s"js-engine-${request.id}")

    for {
      result <- (engine ? Engine.ExecuteJs(f, List("/"+uri), timeout.duration)).mapTo[JsExecutionResult]
    } yield {
      val output = new String(result.output.toArray, "UTF-8")
      val err = new String(result.error.toArray, "UTF-8")
      Ok(views.html.main(Html(new String(result.output.toArray, "UTF-8"))))
    }
  }

}