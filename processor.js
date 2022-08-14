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

// ====================  LINE MOVEMENT =========================================
function onMouseDown(event) {
  SELECTED_LINE = getLineUnderCursor(event);
  if (SELECTED_LINE) {
    CANVAS.style.cursor = "move";
    SELECTED_LINE.setCursorOffset(event);
    document.addEventListener("mousemove", onLineMove, true);
    document.addEventListener("mouseup", onLineDrop, true);
  }
}
function onLineMove(event) {
  SELECTED_LINE.updateCoordenates(event);
  updateCanvas();
}
function onLineDrop() {
  CANVAS.style.cursor = "pointer";
  SELECTED_LINE = null;
  document.removeEventListener("mouseup", onLineDrop, true);
  document.removeEventListener("mousemove", onLineMove, true);
}
// ==================== END of LINE MOVEMENT ===================================

// ==================  DIVIDE LINE IN 2 ========================================
var LINE_DIV1, LINE_DIV2;

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

function onLineBreaking(event) {
  LINE_DIV1.updateCoordenates(event);
  LINE_DIV2.updateCoordenates(event);
  updateCanvas();
}

function onLineBreakingStop() {
  document.removeEventListener("mouseup", onLineBreakingStop, true);
  document.removeEventListener("mousemove", onLineBreaking, true);
}
// ==================  END of DIVIDE LINE IN 2 =================================

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
  CTX.strokeStyle = DEFAULT_COLOR;
  CTX.lineWidth = 5;
  CTX.lineCap = "round";
}

function addInitialLine() {
  const middle_h = CANVAS.height / 2;
  const middle_w = CANVAS.width / 2;
  LINES.push(new Line(middle_w, middle_h - 100, middle_w, middle_h + 100));
}
