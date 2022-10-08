import { Canvas } from "./canvas.js";
import { Drawer } from "./drawer.js";
import { Mode } from "./mode.js";
import { Point } from "./point.js";

export var line_points = []
export let base_curve = []
export var noise_enabled = false

export class PointDraw {
    acceptable_point_distance = 10;


    constructor() {
        this.isDrawing = false
    }

    on_touch_down(interaction_event) {
        this.add_to_curve(interaction_event)
        this.call_downsample_function()
        Canvas.clear()
        Drawer.draw()
    }

    on_touch_up(_) {}

    on_touch_move(_) {}

    add_to_curve(interaction_event) {
        const point = new Point(interaction_event.x, interaction_event.y)
        Mode.current_drawtool.curve.push(point)
    }

    call_downsample_function() {
        const tool = Mode.current_drawtool
        tool.fx_downsampler()
    }
}
