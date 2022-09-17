import { SaveToJSON } from "./save.js"

export class Canvas {
    static context = undefined
    static src = undefined

    static init(move_callback, mousedown, mouseup) {
        Canvas.src = document.getElementById('canvas')
        Canvas.adjust_size()
        Canvas.context = Canvas.src.getContext('2d')
        Canvas.src.addEventListener("mousedown", mousedown);
        Canvas.src.addEventListener("mouseup", mouseup);
        Canvas.src.addEventListener("mousemove", move_callback);
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