//@input Component.Text taskText
//@input Component.Text leftText
//@input Component.Text rightText


function init() {
  generateTask()
}


function generateTask() {
  var n1 = Math.floor(Math.random() * 9)
  var n2 = Math.floor(Math.random() * 9)
  var n3 = Math.floor(Math.random() * 99)

  script.taskText.text = n1 + "x" + n2
  
  var lr = Math.random()
  if (lr > 0.5) {
    script.leftText.text = (n1 * n2).toString()
    script.rightText.text = n3.toString()
  }
  else {
    script.leftText.text = n3.toString()
    script.rightText.text = (n1 * n2).toString()
  }
}


init()