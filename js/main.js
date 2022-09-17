import { Drawer } from "./drawer.js";
import { Curve } from "./curve.js";
import { Canvas } from "./canvas.js";
import { Mode } from "./mode.js";
import { HeadAndShoulders } from "./headandshoulder.js";
import { Noise } from "./noise.js";
import { SaveToJSON } from "./save.js";

let current_keyboard_event = undefined

function on_ready() {
    document.addEventListener('keydown', keyboard_down_callback)
    document.addEventListener('keyup', keyboard_up_callback)
    init()
}

function move_callback(event) {
    Mode.mouse_move_handler(event, current_keyboard_event)
}

function mousedown_callback(event) {
    Mode.mouse_down_handler(event, current_keyboard_event)
}
    

function mouseup_callback(event) {
    Mode.mouse_up_handler(event, current_keyboard_event)
}

function keyboard_down_callback(event) {
    current_keyboard_event = event
    if(event.code == 'KeyR') {
        Mode.set_to_normal()
        init()
    }
    else if(event.code == 'KeyC') {
        Mode.clear_handler()
        Canvas.clear()
        Drawer.draw()
    }
    else if(event.code == 'KeyN' && !event.altKey) {
        Mode.set_to_noise_visualisation()
        Curve.add_noise()
        Canvas.clear()
        Drawer.draw()
    }
    else if(event.code == 'KeyN' && event.altKey) {
        Mode.set_to_normal()
        Curve.clear_noise()
        Canvas.clear()
        Drawer.draw()
    }
    else if(event.code == 'KeyH' && !event.altKey) {
        Mode.set_to_head_and_shoulders()
        Canvas.clear()
        Curve.clear_noise()
    }
    else if(event.code == 'KeyH' && event.altKey) {
        Mode.set_to_normal()
        Canvas.clear()
        Curve.clear_noise()
    }
    else if(Mode.is_noise_preview_enable() && event.code == 'KeyQ' && !event.altKey) {
        Noise.increase_amplitude()
        put_in_noise_mode()
    }

    else if(Mode.is_noise_preview_enable() && event.code == 'KeyQ' && event.altKey) {
        Noise.decrease_amplitude()
        put_in_noise_mode()
    }

    else if(Mode.is_noise_preview_enable() && event.code == 'KeyS' && !event.altKey) {
        Noise.increase_steps()
        put_in_noise_mode()
    }

    else if(Mode.is_noise_preview_enable() && event.code == 'KeyS' && event.altKey) {
        Noise.decrease_steps()
        put_in_noise_mode()
    }

    else if(event.code == 'Enter') {
        put_in_noise_mode()
        SaveToJSON.save()
    }
    
}

function put_in_noise_mode() {
    Mode.set_to_noise_visualisation()
    Curve.clear_noise()
    Curve.add_noise()
    Canvas.clear()
    Drawer.draw()
}


function keyboard_up_callback(event) {
    current_keyboard_event = undefined
}

function init() {
    SaveToJSON.init()
    Canvas.init(move_callback, mousedown_callback, mouseup_callback)
    Noise.init()
    Drawer.init()
    HeadAndShoulders.init()
    Curve.init()
    Curve.draw()
    Mode.init()
    Mode.set_to_normal()
}

on_ready()