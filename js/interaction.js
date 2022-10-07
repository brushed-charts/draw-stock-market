import { HandDraw } from "./handdraw.js"
import { Mode } from "./mode.js";

export class Interaction {
    static last_keyboard_event = undefined

    static on_touch_start(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        Mode.current_drawtool.draw_style.on_touch_down(touches[0], Interaction.last_keyboard_event)
    }

    static on_touch_up(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        Mode.current_drawtool.draw_style.on_touch_up(touches[0], Interaction.last_keyboard_event)
    }

    static on_touch_move(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        Mode.current_drawtool.draw_style.on_touch_move(touches[0], Interaction.last_keyboard_event)
    }
    

    static on_mouse_down(event) {
        Mode.current_drawtool.draw_style.on_touch_down(event, Interaction.last_keyboard_event)
    }

    static on_mouse_up(event) {
        Mode.current_drawtool.draw_style.on_touch_up(event, Interaction.last_keyboard_event)
    }

    static on_mouse_move(event) {
        Mode.current_drawtool.draw_style.on_touch_move(event, Interaction.last_keyboard_event)
    }

}