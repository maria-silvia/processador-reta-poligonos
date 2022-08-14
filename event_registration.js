// radio_click2r.js
//   The event registering code for radio_click2

document.getElementById("canvas").addEventListener("mousedown", onMouseDown);

document
  .getElementById("canvas")
  .addEventListener("mousemove", getLineUnderCursor);

document.getElementById("canvas").addEventListener("contextmenu", onRightClick);
