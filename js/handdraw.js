import { Canvas } from "./canvas.js";
import { Drawer } from "./drawer.js";
import { Point } from "./point.js";
import { Utils } from "./utils.js";

export var line_points = []
export let base_curve = []
export var noise_enabled = false

export class HandDraw {
    static curve = []
    static isDrawing = false
    static acceptable_point_distance = 10;


    static init() {
        HandDraw.curve = []
        HandDraw.isDrawing = false
        Drawer.draw_register.push(HandDraw.draw)
        Canvas.clear()
    }

    static draw() {
        Drawer.drawCurve(HandDraw.curve)
    }

    
    static on_touch_down(touch_event, keyboard_event) {
        HandDraw.isDrawing = true
        Canvas.clear()
        Drawer.draw()
    }

    static on_touch_up(touch_event, keyboard_event) {
        HandDraw.isDrawing = false
        Canvas.clear()
        Drawer.draw()
    }

    static on_touch_move(touch_event, keyboard_event) {
        if(!HandDraw.isDrawing) return
        const point = new Point(touch_event.clientX, touch_event.clientY)
        if(!HandDraw.should_draw_this_point(point)) return
        HandDraw.curve.push(point)
        Canvas.clear()
        Drawer.draw()
    }

    static should_draw_this_point(current_point) {
        if(HandDraw.curve.length == 0) return true
        let last_point = HandDraw.curve[HandDraw.curve.length - 1]
        let interval = Utils.distance_between_point(current_point, last_point)
        if(interval >= HandDraw.acceptable_point_distance) return true
        return false
    }

    static save() {
        // const noisy_curves = []
        // for (let i = 0; i < Curve.SAVE_SAMPLE; i++) {
        //     Curve.refresh_noise()
        //     noisy_curves.push(line_points.slice())
        // }
        // return {
        //     "price": noisy_curves
        // }
    }
}
