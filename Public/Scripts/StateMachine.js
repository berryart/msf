// -----JS CODE-----


const STATE = {
  CHALLENGE: 0,
  ANSWER_L: 1,
  ANSWER_R: 2,
  RESULT: 3,
}
var state = STATE.CHALLENGE
var reset = false
var evt = script.createEvent("DelayedCallbackEvent")
evt.bind(newChallenge)


function init() {
  script.createEvent("UpdateEvent").bind(update)

}


function update() {
  var so = script.getSceneObject().getTransform().up
  var angle = so.angleTo(new vec3(1, 0, 0))
  if (angle < 1.3) {
    emitEvent(STATE.ANSWER_L)
  }
  else if (angle < 1.7) {
    emitEvent(STATE.CHALLENGE)
  }
  else {
    emitEvent(STATE.ANSWER_R)
  }
}


function newChallenge() {
  if (reset)
    return
  reset = true
  evt.reset(3)
  state = STATE.CHALLENGE
  stateUpdated()
}


function emitEvent(newState) {
  if (newState == state)
    return

  if ((state == STATE.CHALLENGE && newState == STATE.ANSWER_L) || (state == STATE.CHALLENGE && newState == STATE.ANSWER_R)) {
    script.stateUpdated(newState)
    state = STATE.RESULT
  }
}


function stateUpdated(newState) {

}


function restart() {
  state = STATE.CHALLENGE
}


script.stateUpdated = stateUpdated
script.restart = restart
init()