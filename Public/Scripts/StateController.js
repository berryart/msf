//@input Component.InteractionComponent startButton
//@input Component.InteractionComponent againButton
//@input SceneObject introPanel
//@input SceneObject challengePanel
//@input SceneObject resultPanel
//@input Component.Text scoreText
//@input Component.Text timeText
//@input Component.ScriptComponent challengeScript


function init() {
  script.startButton.onTap.add(start)
  script.againButton.onTap.add(start)

}


function start() {
  print("Challenge started!")
  script.introPanel.enabled = false
  script.challengePanel.enabled = true
  script.resultPanel.enabled = false
  script.challengeScript.restart()
}


function completeChallenge(solved, time) {
  print("COMPLETE")
  script.challengePanel.enabled = false
  script.resultPanel.enabled = true
  script.scoreText.text = solved.toString()
  var t = Math.floor(time / 60) + "m" + Math.floor(time % 60) + "s"
  script.timeText.text = t.toString()
}


script.completeChallenge = completeChallenge
init()
