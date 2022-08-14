var CANVAS;
var CTX;
var LINES = [];
var DEFAULT_COLOR = "rgba(148, 55, 171)";
var EDGE_RADIUS = 10;
var SELECTED_LINE = null;

function load() {
  initCanvas();
  LINES.push(new Line(100, 100, 100, 300));
  updateCanvas();
}

function updateCanvas() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  for (let i = 0; i < LINES.length; i++) {
    LINES[i].draw();
  }
}

// ====================  LINE MOVEMENT =========================================
// called by mousedown
function onMouseDown(event) {
  SELECTED_LINE = getLineUnderCursor(event);
  if (SELECTED_LINE) {
    CANVAS.style.cursor = "move";
    SELECTED_LINE.setCursorOffset(event);
    document.addEventListener("mousemove", onLineMove, true);
    document.addEventListener("mouseup", onLineDrop, true);
  }
}
// called by mousemoves after mousedown
function onLineMove(event) {
  SELECTED_LINE.updateCoordenates(event);
  updateCanvas();
}
// called by a mouseup after mousedown
function onLineDrop() {
  CANVAS.style.cursor = "pointer";
  SELECTED_LINE = null;
  document.removeEventListener("mouseup", onLineDrop, true);
  document.removeEventListener("mousemove", onLineMove, true);
}
// ==================== END of LINE MOVEMENT ===================================

// ==================  DIVIDE LINE IN 2 ========================================
var LINE_DIV1, LINE_DIV2;

// called by contextmenu
function onRightClick(event) {
  event.preventDefault();
  SELECTED_LINE = getLineUnderCursor(event);

  if (SELECTED_LINE) {
    const { offsetX: mouse_x, offsetY: mouse_y } = event;

    // new line de x0,y0 para mouse
    LINE_DIV1 = new Line(SELECTED_LINE.x0, SELECTED_LINE.y0, mouse_x, mouse_y);
    LINE_DIV1.setCursorOffset(event);
    LINES.push(LINE_DIV1);

    // new line de mouse para x1, y1
    LINE_DIV2 = new Line(mouse_x, mouse_y, SELECTED_LINE.x1, SELECTED_LINE.y1);
    LINE_DIV2.setCursorOffset(event);
    LINES.push(LINE_DIV2);

    // remover line original
    LINES = LINES.filter((line) => {
      return line.path_obj != SELECTED_LINE.path_obj;
    });

    document.addEventListener("mousemove", onLineBreaking, true);
    document.addEventListener("mouseup", onLineBreakingStop, true);
  }
}

// called by mousemoves after contextmenu
function onLineBreaking(event) {
  LINE_DIV1.updateCoordenates(event);
  LINE_DIV1.paint("blue");
  LINE_DIV2.updateCoordenates(event);
  LINE_DIV2.paint("blue");
  updateCanvas();
}
// called by a mouseup after contextmenu
function onLineBreakingStop() {
  document.removeEventListener("mouseup", onLineBreakingStop, true);
  document.removeEventListener("mousemove", onLineBreaking, true);
}
// ==================  END of DIVIDE LINE IN 2 =================================

// called by mousemoves
function getLineUnderCursor(event) {
  for (let i = 0; i < LINES.length; i++) {
    if (LINES[i].mouseMatch(event)) {
      LINES[i].paint("blue");
      if (!SELECTED_LINE) {
        CANVAS.style.cursor = "pointer";
      }
      return LINES[i];
    } else {
      LINES[i].paint(DEFAULT_COLOR);
    }
  }
  return null;
}

function initCanvas() {
  CANVAS = document.getElementById("canvas");
  CTX = CANVAS.getContext("2d");
  CTX.lineWidth = 5;
  CTX.lineCap = "round";
}

function validatePolygonNumber() {
  const v = document.getElementById("nPolygon").value;
  if (!v) {
    alert("Entre a quantidade de lados!");
    return false;
  }
  if (v < 3 || v > 8) {
    alert("Na não!\n" + v + " não é válido.\nSó gero polígonos de 3 a 8 lados");
    return false;
  }
  return true;
}

// adaptado de http://www.scienceprimer.com/drawing-regular-polygons-javascript-canvas
function generatePolygon(event) {
  event.preventDefault();
  if (!validatePolygonNumber()) {
    return;
  }
  var N = document.getElementById("nPolygon").value;
  var lineSize = 60,
    Xcenter = CANVAS.width / 2,
    Ycenter = CANVAS.height / 2;
  for (var i = 1; i <= N; i += 1) {
    let x0 = Xcenter + lineSize * Math.cos(((i - 1) * 2 * Math.PI) / N);
    let y0 = Ycenter + lineSize * Math.sin(((i - 1) * 2 * Math.PI) / N);
    let x1 = Xcenter + lineSize * Math.cos((i * 2 * Math.PI) / N);
    let y1 = Ycenter + lineSize * Math.sin((i * 2 * Math.PI) / N);
    const lado = new Line(x0, y0, x1, y1);
    LINES.push(lado);
  }
  updateCanvas();
}
