import { Canvas } from "./canvas.js";
import { Drawer } from "./drawer.js";
import { Mode } from "./mode.js";
import { Point } from "./point.js";
import { Utils } from "./utils.js";

export var line_points = []
export let base_curve = []
export var noise_enabled = false

export class HandDraw {
    static isDrawing = false
    static acceptable_point_distance = 10;


    static init() {
        HandDraw.isDrawing = false
    }

    
    static on_touch_down(touch_event, keyboard_event) {
        HandDraw.isDrawing = true
        Canvas.clear()
        Drawer.draw()
    }

    static on_touch_up(touch_event, keyboard_event) {
        HandDraw.isDrawing = false
        HandDraw.downsample_all()
        Canvas.clear()
        Drawer.draw()
    }

    static on_touch_move(touch_event, keyboard_event) {
        if(!HandDraw.isDrawing) return
        const point = new Point(touch_event.clientX, touch_event.clientY)
        if(!HandDraw.should_draw_this_point(point)) return
        Mode.current_drawtool.curve.push(point)
        Canvas.clear()
        Drawer.draw()
    }

    static should_draw_this_point(current_point) {
        const current_curve = Mode.current_drawtool.curve
        if(current_curve.length == 0) return true
        let last_point = current_curve[current_curve.length - 1]
        let interval = Utils.distance_between_point(current_point, last_point)
        if(interval >= HandDraw.acceptable_point_distance) return true
        return false
    }

    static downsample_all() {
        const tools = Mode.tools_register
        tools.forEach((tool) => tool.fx_downsampler())
    }
}
