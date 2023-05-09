//@input Component.InteractionComponent startButton
//@input Component.InteractionComponent againButton
//@input SceneObject introPanel
//@input SceneObject challengePanel
//@input SceneObject resultPanel


function init() {
  script.startButton.onTap.add(start)
  script.againButton.onTap.add(start)
}


function start() {
  print("Challenge started!")
  
  script.introPanel.enabled = false
  script.challengePanel.enabled = true
  script.resultPanel.enabled = false


}


init()
