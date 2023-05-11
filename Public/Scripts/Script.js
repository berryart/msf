// -----JS CODE-----


script.createEvent("TapEvent").bind(function (tapData) {
  print("Tap" + tapData.getTapPosition().x)
})