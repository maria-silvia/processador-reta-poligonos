var CANVAS;
var CTX;
var LINES = [];
var DEFAULT_COLOR = "rgba(148, 55, 171)";

function load() {
  CANVAS = document.getElementById("canvas");
  CTX = CANVAS.getContext("2d");
  CTX.strokeStyle = DEFAULT_COLOR;
  CTX.lineWidth = 5;

  const middle_h = canvas.height / 2;
  const middle_w = canvas.width / 2;
  LINES.push(new Line(middle_w, middle_h - 100, middle_w, middle_h + 100));
  updateCanvas();
}

function updateCanvas() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  for (let i = 0; i < LINES.length; i++) {
    LINES[i].draw(CTX);
  }
}

var SELECTED_LINE = null;

function onMouseDown(event) {
  SELECTED_LINE = getSelectedLine(event);
  if (SELECTED_LINE) {
    SELECTED_LINE.setGrabberOffset(event);
    // if (SELECTED_LINE.grabbedByEdge)
    // if (offset.x0 < 5 && offset.y0 < 5) || (offset.x1 < 5 && offset.y1 < 5)
    // eh canto
    // else
    CANVAS.style.cursor = "move";
    document.addEventListener("mousemove", onLineMove, true);
    document.addEventListener("mouseup", dropper, true);
  }
}
function onLineMove(event) {
  SELECTED_LINE.updateCoordenates(event);
  updateCanvas();
}
function dropper(event) {
  document.removeEventListener("mouseup", dropper, true);
  document.removeEventListener("mousemove", onLineMove, true);
  CANVAS.style.cursor = "pointer";
}

function getSelectedLine(evt) {
  for (let i = 0; i < LINES.length; i++) {
    if (CTX.isPointInStroke(LINES[i].path_obj, evt.offsetX, evt.offsetY)) {
      return LINES[i];
    }
  }
  return null;
}

function showGrabbableArea(event) {
  if (CTX.isPointInStroke(LINES[0].path_obj, event.offsetX, event.offsetY)) {
    CTX.strokeStyle = "blue";
    if (CANVAS.style.cursor != "move") {
      CANVAS.style.cursor = "pointer";
    }
  } else {
    CTX.strokeStyle = DEFAULT_COLOR;
    CANVAS.style.cursor = "initial";
  }
  CTX.stroke(LINES[0].path_obj);
}
