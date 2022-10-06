import { HandDraw } from "./handdraw.js"
import { Mode } from "./mode.js";

export class Interaction {
    static last_keyboard_event = undefined

    static on_touch_start(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        Mode.touch_down_handler(touches[0], Interaction.last_keyboard_event)
    }

    static on_touch_up(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        Mode.touch_up_handler(touches[0], Interaction.last_keyboard_event)
    }

    static on_touch_move(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        Mode.touch_move_handler(touches[0], Interaction.last_keyboard_event)
    }
    

    static on_mouse_down(event) {
        Mode.touch_down_handler(event, Interaction.last_keyboard_event)
    }

    static on_mouse_up(event) {
        Mode.touch_up_handler(event, Interaction.last_keyboard_event)
    }

    static on_mouse_move(event) {
        Mode.touch_move_handler(event, Interaction.last_keyboard_event)
    }

}