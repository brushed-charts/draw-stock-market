import { Canvas } from "./canvas.js"
import { Drawer } from "./drawer.js"
import { Point } from "./point.js"
import { SaveToJSON } from "./save.js"

const FIGURE_VERTEX = 7

export class HeadAndShoulders {
    static anchors = []

    static init() {
        HeadAndShoulders.clear()
        Drawer.draw_register.push(HeadAndShoulders.draw)
        SaveToJSON.register.push(HeadAndShoulders.save)
    }

    static add_anchor(point) {
        HeadAndShoulders.anchors.push(point)
    }

    static draw() {
        for (const point of HeadAndShoulders.anchors) {
            Drawer.drawAnchor(point, 'red')
        }
        Drawer.drawCurve(HeadAndShoulders.anchors, 'red')
    }

    static clear() {
        HeadAndShoulders.anchors = []
        Canvas.clear()
        HeadAndShoulders.draw()
    }

    static on_mouse_down(mouse_event, keyboard_event) {
        
    }

    static on_mouse_up(mouse_event, keyboard_hevent) {
        if(HeadAndShoulders.anchors.length == FIGURE_VERTEX) return
        const point = new Point(mouse_event.clientX, mouse_event.clientY)
        HeadAndShoulders.anchors.push(point)
        Canvas.clear()
        Drawer.draw()
    }

    static on_mouse_move(mouse_event, keyboard_event) {
        
    }

    static save() {
        if(HeadAndShoulders.anchors.length != FIGURE_VERTEX) {
            return {}
        }
        return {
            "head_and_shoulders": HeadAndShoulders.anchors
        }
    }
}