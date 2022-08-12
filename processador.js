function load_reta_inicial() {
  var canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(148, 55, 171, 0.40)";
  var width = canvas.width;
  var height = canvas.height;

  let middle_h = height/2
  let middle_w = width/2
  
  ctx.beginPath();
  let lineSize = 100
  ctx.moveTo(middle_w, middle_h-lineSize);
  ctx.lineTo(middle_w, middle_h+lineSize);
  ctx.stroke()
}

const processadorRetas = {
  myProperty: "someValue",
  // object literals can contain properties and methods.
  // e.g we can define a further object for module configuration:
  myConfig: {
    useCaching: true,
    language: "en",
  },

  moverReta() {
    console.log("Where is Paul Irish debugging today?");
  },
};
