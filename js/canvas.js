import { SaveToJSON } from "./save.js"
import { Interaction } from "./interaction.js"

export class Canvas {
    static context = undefined
    static src = undefined

    static init() {
        Canvas.src = document.getElementById('canvas')
        Canvas.adjust_size()
        Canvas.context = Canvas.src.getContext('2d')
        Canvas.src.addEventListener("touchstart", Interaction.on_touch_start);
        Canvas.src.addEventListener("touchend", Interaction.on_touch_up);
        Canvas.src.addEventListener("touchcancel", Interaction.on_touch_up);
        Canvas.src.addEventListener("touchmove", Interaction.on_touch_move);

        Canvas.src.addEventListener("mousedown", Interaction.on_mouse_down);
        Canvas.src.addEventListener("mouseup", Interaction.on_mouse_up);
        Canvas.src.addEventListener("mousemove", Interaction.on_mouse_move);
        SaveToJSON.register.push(Canvas.save)
        Canvas.clear()
    }

    static adjust_size() {
        Canvas.src.width = document.body.clientWidth;
        Canvas.src.height = document.body.clientHeight;
    }

    static clear() {
        Canvas.context.clearRect(0, 0, Canvas.src.width, Canvas.src.height);
    }

    static save() {
        return {
            "canvas": {
                "width": Canvas.src.width,
                "height": Canvas.src.height
            }
        }
    }
}