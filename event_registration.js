// radio_click2r.js
//   The event registering code for radio_click2

document.getElementById("canvas").addEventListener("mousedown", (e) => {
  if (e.button == 0) {
    onLeftClick(e);
  } else {
    onRightClick(e);
  }
});

document
  .getElementById("canvas")
  .addEventListener("mousemove", getLineUnderCursor);

document.getElementById("nPolygon").onchange = validatePolygonNumber;
document.getElementById("generateBtn").onclick = generatePolygon;
document
  .getElementById("canvas")
  .addEventListener("contextmenu", (e) => e.preventDefault());
