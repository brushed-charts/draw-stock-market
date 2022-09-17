import { Canvas } from "./canvas.js";
import { Drawer } from "./drawer.js";
import { Noise } from "./noise.js";
import { Point } from "./point.js";
import { SaveToJSON } from "./save.js";

export var line_points = []
export let base_curve = []
export var noise_enabled = false

export class Curve {
    static SAVE_SAMPLE = 30
    anchor_touched = undefined
    has_moved = false

    static init() {
        line_points = []
        base_curve = []
        line_points.push(Curve.get_starting_point_coord())
        line_points.push(Curve.get_ending_point_coord())
        base_curve = line_points
        Drawer.draw_register.push(Curve.draw)
        SaveToJSON.register.push(Curve.save)
    }

    static get_starting_point_coord() {
        let mid_height = window.innerHeight / 2
        return new Point(Point.DEFAULT_RADIUS, mid_height)
    }

    static get_ending_point_coord() {
        let mid_height = window.innerHeight / 2
        let end_screen = window.innerWidth - Point.DEFAULT_RADIUS
        return new Point(end_screen, mid_height)
    }

    static add_point(point) {
        let line_points_copy = base_curve.slice()
        for (let i = 0; i < line_points_copy.length - 1; i++) {
            let current_point = line_points_copy[i]
            let next_point = line_points_copy[i + 1]
            if(point.x <= current_point.x || point.x >= next_point.x) {
                continue
            }
            line_points_copy = Curve.insert(i, point)
        }
        base_curve = line_points_copy
        line_points = base_curve
    }

    static insert(index, point) {
        const first_line = line_points.slice(0, index)
        const second_line = line_points.slice(index)
        first_line.push(point)
        const new_curve = first_line.concat(second_line)
        return new_curve
    }

    static draw() {
        for (const point of base_curve) {
            Drawer.drawAnchor(point, 'black')
        }
        Drawer.drawCurve(line_points)
    }

    static get_anchor_mouse_touched(mouse_point) {
        for (const curve_pt of line_points) {
            let x1 = mouse_point.x
            let x2 = curve_pt.x
            let y1 = mouse_point.y
            let y2 = curve_pt.y
            let distance = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
            if(distance > Point.DEFAULT_RADIUS) continue;
            return curve_pt
        }
        return undefined
    }

    static remove_anchor(wanted_anchor) {
        for (let i = 0; i < line_points.length; i++) {
            const current_anchor = line_points[i]
            if(current_anchor == wanted_anchor) {
                line_points.splice(i, 1)
                return;
            }
        }
    }

    static add_noise() {
        if(!noise_enabled) {
            base_curve = line_points.slice()
        }
        line_points = Noise.noise_create(base_curve)
        Drawer.draw()
        noise_enabled = true
    }

    static clear_noise() {
        line_points = base_curve.slice()
        Drawer.draw()
        noise_enabled = false
    }

    static refresh_noise() {
        Curve.clear_noise()
        Curve.add_noise()
        Canvas.clear()
        Drawer.draw()
    }

    static on_mouse_down(mouse_event, keyboard_event) {
        Curve.anchor_touched = Curve.get_anchor_mouse_touched(new Point(mouse_event.clientX, mouse_event.clientY))
        if(!Curve.anchor_touched && !keyboard_event?.altKey) {
            Curve.add_point(new Point(mouse_event.clientX, mouse_event.clientY))
        }
        if(Curve.anchor_touched && keyboard_event?.altKey) {
            Curve.remove_anchor(Curve.anchor_touched)
        }
        Canvas.clear()
        Drawer.draw()
    }

    static on_mouse_up(mouse_event, keyboard_event) {
        Curve.anchor_touched = undefined
        Canvas.clear()
        Drawer.draw()
    }

    static on_mouse_move(mouse_event, keyboard_event) {
        if(!Curve.anchor_touched) return
        Curve.anchor_touched.x = mouse_event.clientX
        Curve.anchor_touched.y = mouse_event.clientY
        Canvas.clear()
        Drawer.draw()
    }

    static save() {
        const noisy_curves = []
        for (let i = 0; i < Curve.SAVE_SAMPLE; i++) {
            Curve.refresh_noise()
            noisy_curves.push(line_points.slice())
        }
        return {
            "price": noisy_curves
        }
    }
}
