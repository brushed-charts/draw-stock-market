import { Canvas } from "./canvas.js";
import { Drawer } from "./drawer.js";
import { Mode } from "./mode.js";
import { SaveToJSON } from "./save.js";

export class Interaction {
    static last_keyboard_event = undefined
    static active_button_class = 'button-active'
    static main_init_function = undefined

    static price_button = document.getElementById('handdraw-icon')
    static head_and_shoulders_button = document.getElementById('head_and_shoulders-icon')
    static save_button = document.getElementById('save-icon')
    static reset_button = document.getElementById('reset-icon')
    static clear_button = document.getElementById('clear-icon')

    static init(main_init_function) {
        Interaction.main_init_function = main_init_function
        this.price_button.addEventListener('click', this.enable_price_mode)
        this.head_and_shoulders_button.addEventListener('click', this.enable_head_and_shoulder_mode)
        this.save_button.addEventListener('click', this.handle_save_mode)
        this.reset_button.addEventListener('click', this.reset)
        this.clear_button.addEventListener('click', this.clear)
        Interaction.enable_price_mode()
    }

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

    static enable_price_mode() {
        Mode.set_to_price()
        Interaction.deactivate_all_button()
        Interaction.activate_button(Interaction.price_button)
    }
    
    static enable_head_and_shoulder_mode() {
        Mode.set_to_head_and_shoulders()
        Interaction.deactivate_all_button()
        Interaction.activate_button(Interaction.head_and_shoulders_button)
    }
    
    static handle_save_mode() {
        SaveToJSON.save()
    }

    static clear() {
        Mode.current_drawtool.clear()
        Canvas.clear()
        Drawer.draw()
    }

    static reset() {
        Mode.set_to_price()
        Interaction.main_init_function()
    }

    static activate_button(button) {
        button.classList.add(Interaction.active_button_class)
    }

    static deactivate_all_button() {
        Interaction.price_button.classList.remove(Interaction.active_button_class)
        Interaction.head_and_shoulders_button.classList.remove(Interaction.active_button_class)
    }

}