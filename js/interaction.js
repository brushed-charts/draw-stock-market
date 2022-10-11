import { Canvas } from "./canvas.js";
import { Drawer } from "./drawer.js";
import { Mode } from "./mode.js";
import { SaveToJSON } from "./save.js";

export class InteractionEvent {
    x = undefined
    y = undefined
    last_keyboard_event = undefined

    constructor(x, y, keyboard_event) {
        this.x = x
        this.y = y
        this.last_keyboard_event = keyboard_event
    }
}

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
        this.save_button.addEventListener('click', this.save)
        this.reset_button.addEventListener('click', this.reset)
        this.clear_button.addEventListener('click', this.clear)
        Interaction.enable_price_mode()
    }

    static build_interaction_event(evt) {
        const rect = Canvas.src.getBoundingClientRect();
        return new InteractionEvent(
            ((evt.clientX - rect.left) / (rect.right - rect.left)) * Canvas.src.width,
            ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * Canvas.src.height,
            Interaction.last_keyboard_event
        )
    };


    static on_touch_start(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        const interaction_event = Interaction.build_interaction_event(touches[0])
        Mode.current_drawtool.draw_style.on_touch_down(interaction_event, Interaction.last_keyboard_event)
    }

    static on_touch_up(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        const interaction_event = Interaction.build_interaction_event(touches[0])
        Mode.current_drawtool.draw_style.on_touch_up(interaction_event, Interaction.last_keyboard_event)
    }

    static on_touch_move(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        const interaction_event = Interaction.build_interaction_event(touches[0])
        Mode.current_drawtool.draw_style.on_touch_move(interaction_event, Interaction.last_keyboard_event)
    }
    

    static on_mouse_down(event) {
        const interaction_event = Interaction.build_interaction_event(event)
        Mode.current_drawtool.draw_style.on_touch_down(interaction_event, Interaction.last_keyboard_event)
    }

    static on_mouse_up(event) {
        const interaction_event = Interaction.build_interaction_event(event)
        Mode.current_drawtool.draw_style.on_touch_up(interaction_event, Interaction.last_keyboard_event)
    }

    static on_mouse_move(event) {
        const interaction_event = Interaction.build_interaction_event(event)
        Mode.current_drawtool.draw_style.on_touch_move(interaction_event, Interaction.last_keyboard_event)
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
    
    static save() {
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