var CANVAS;
var CTX;
var LINES = [];
var DEFAULT_COLOR = "rgba(148, 55, 171)";
var EDGE_RADIUS = 10;
var SELECTED_LINE = null;

function load() {
  initCanvas();
  addInitialLine();
  updateCanvas();
}

function updateCanvas() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  for (let i = 0; i < LINES.length; i++) {
    LINES[i].draw();
  }
}

function onMouseDown(event) {
  SELECTED_LINE = getLineUnderCursor(event);
  if (SELECTED_LINE) {
    CANVAS.style.cursor = "move";
    SELECTED_LINE.setCursorOffset(event);
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

function getLineUnderCursor(event) {
  for (let i = 0; i < LINES.length; i++) {
    if (LINES[i].mouseMatch(event)) {
      LINES[i].paint("blue");
      if (CANVAS.style.cursor != "move") {
        CANVAS.style.cursor = "pointer";
      }
      return LINES[i];
    } else {
      LINES[i].paint(DEFAULT_COLOR);
      CANVAS.style.cursor = "initial";
    }
  }
  return null;
}

function initCanvas() {
  CANVAS = document.getElementById("canvas");
  CTX = CANVAS.getContext("2d");
  CTX.strokeStyle = DEFAULT_COLOR;
  CTX.lineWidth = 5;
}

function addInitialLine() {
  const middle_h = CANVAS.height / 2;
  const middle_w = CANVAS.width / 2;
  LINES.push(new Line(middle_w, middle_h - 100, middle_w, middle_h + 100));
}
