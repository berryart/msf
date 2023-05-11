//@input Component.Text taskText
//@input Component.Text leftText
//@input Component.Text rightText
//@input Component.ScriptComponent stateController
//@input Component.ScriptComponent stateMachine
//@input Component.Image leftImage
//@input Component.Image rightImage
//@input Asset.Material defaultMat
//@input Asset.Material right
//@input Asset.Material wrong


var correctSide = null
var evt = script.createEvent("DelayedCallbackEvent")
evt.bind(generateTask)
var challengeCount = 0
const countLimit = 3
var solved = 0
var time = 0


function init() {
  script.stateController.stateUpdated = onStateUpdated
  generateTask()
  script.createEvent("TapEvent").bind(function (tapData) {
    var x = tapData.getTapPosition().x
    if (x > 0.5)
      getAnswer(true)
    else
      getAnswer(false)
  })
  time = getTime()
  solved = 0
}


function restart() {
  time = getTime()
  solved = 0
  challengeCount = 0
}


function generateTask() {
  var n1 = Math.floor(Math.random() * 9)
  var n2 = Math.floor(Math.random() * 9)
  var n3 = Math.floor(Math.random() * 99)

  script.taskText.text = n1 + " x " + n2
  
  var lr = Math.random()
  if (lr > 0.5) {
    correctSide = true
    script.leftText.text = (n1 * n2).toString()
    script.rightText.text = n3.toString()
  }
  else {
    correctSide = false
    script.leftText.text = n3.toString()
    script.rightText.text = (n1 * n2).toString()
  }

  script.leftImage.clearMaterials()
  script.rightImage.clearMaterials()
  script.leftImage.addMaterial(script.defaultMat)
  script.rightImage.addMaterial(script.defaultMat)

  challengeCount += 1
  if (challengeCount >= countLimit) {
    completeChallenge(solved, time)
  }

  script.stateMachine.restart()
}


function getAnswer(side) {
  if (side == correctSide) {
    print("Correct")
    if (side) {
      script.leftImage.clearMaterials()
      script.leftImage.addMaterial(script.right)
    }
    else {
      script.rightImage.clearMaterials()
      script.rightImage.addMaterial(script.right)
    }
    solved += 1
    evt.reset(1)
  }
  else {
    print("Incorrect")
    if (side) {
      script.leftImage.clearMaterials()
      script.leftImage.addMaterial(script.wrong)
    }
    else {
      script.rightImage.clearMaterials()
      script.rightImage.addMaterial(script.wrong)
    }
  }
  evt.reset(1)
}


function completeChallenge() {
  time = getTime() - time
  script.stateController.completeChallenge(solved, time)
}


function onStateUpdated(state) {
  if (state == 1)
    getAnswer(true)
  else if (state == 2)
    getAnswer(false)
}


script.stateMachine.stateUpdated = onStateUpdated
script.completeChallenge = completeChallenge
script.restart = restart
init()