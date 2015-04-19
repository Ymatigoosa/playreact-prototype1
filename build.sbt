name := "scissis-prototype1"

version := "2.3.8"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.5"

libraryDependencies ++= Seq(
  cache,
  ws,
  "org.webjars" %% "webjars-play" % "2.3.0-2",
  "org.webjars" % "bootstrap" % "3.3.2",
  "org.webjars" % "jquery" % "1.11.1",
  "org.webjars" % "requirejs" % "2.1.16",
  // Test dependencies
  "org.webjars" % "rjs" % "2.1.15" % "test",
  "org.webjars" % "squirejs" % "0.1.0" % "test"
)

// JsEngineKeys.engineType := JsEngineKeys.EngineType.Node

MochaKeys.requires += "./Setup"

CoffeeScriptKeys.sourceMap := true

// Apply RequireJS optimization, digest calculation and gzip compression to assets
pipelineStages := Seq(digest, gzip)

PublicOnFileSystem.settings
