class Line {
  constructor(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  draw(ctx) {
    const path = new Path2D();
    path.moveTo(this.x0, this.y0);
    path.lineTo(this.x1, this.y1);
    this.path_obj = path;
    ctx.stroke(path);
  }

  setGrabberOffset(event) {
    const { offsetX: mouse_x, offsetY: mouse_y } = event;
    // distancia entre cursor e o INICIO da linha
    this.dist_from_x0 = mouse_x - this.x0;
    this.dist_from_y0 = mouse_y - this.y0;
    // distancia entre cursor e o FIM da linha
    this.dist_from_x1 = mouse_x - this.x1;
    this.dist_from_y1 = mouse_y - this.y1;
  }
    
	updateCoordenates(event) {
    const { offsetX: mouse_x, offsetY: mouse_y } = event;
    this.x0 = mouse_x - this.dist_from_x0;
    this.y0 = mouse_y - this.dist_from_y0;
    this.x1 = mouse_x - this.dist_from_x1;
    this.y1 = mouse_y - this.dist_from_y1;
	}
}

