import { Canvas } from "./canvas.js";
import { Drawer } from "./drawer.js";
import { Mode } from "./mode.js";
import { Point } from "./point.js";
import { Utils } from "./utils.js";

export var line_points = []
export let base_curve = []
export var noise_enabled = false

export class HandDraw {
    isDrawing = false
    acceptable_point_distance = 10;


    constructor() {
        this.isDrawing = false
    }

    
    on_touch_down(touch_event, keyboard_event) {
        this.isDrawing = true
    }

    on_touch_up(touch_event, keyboard_event) {
        this.isDrawing = false
        this.call_downsample_function()
        Canvas.clear()
        Drawer.draw()
    }

    on_touch_move(touch_event, keyboard_event) {
        if(!this.isDrawing) return
        this.add_to_curve(touch_event)
        Canvas.clear()
        Drawer.draw()
    }

    add_to_curve(touch_event) {
        const point = new Point(touch_event.clientX, touch_event.clientY)
        if(!this.should_draw_this_point(point)) return
        Mode.current_drawtool.curve.push(point)
    }

    should_draw_this_point(current_point) {
        const current_curve = Mode.current_drawtool.curve
        if(current_curve.length == 0) return true
        let last_point = current_curve[current_curve.length - 1]
        let interval = Utils.distance_between_point(current_point, last_point)
        if(interval >= this.acceptable_point_distance) return true
        return false
    }

    call_downsample_function() {
        const tool = Mode.current_drawtool
        tool.fx_downsampler()
    }
}
