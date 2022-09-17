import { Curve } from "./curve.js"
import { HeadAndShoulders } from "./headandshoulder.js"

export class Mode {
    static mouse_down_handler = Curve.mouse_down_handler
    static mouse_up_handler = Curve.mouse_up_handler
    static mouse_move_handler = Curve.mouse_move_handler
    static clear_handler = Curve.init
    static draw = []
    static label = undefined

    static current = 'normal'
    
    static init() {
        Mode.label = document.getElementById('mode')
    }

    static set_to_normal() {
        Mode.current = 'normal'
        Mode.label.innerText = 'Normal'
        Mode.mouse_down_handler = Curve.on_mouse_down
        Mode.mouse_up_handler = Curve.on_mouse_up
        Mode.mouse_move_handler = Curve.on_mouse_move
        Mode.clear_handler = Curve.init
        Mode.draw = [Curve.draw(), HeadAndShoulders.draw()]
    }

    static set_to_head_and_shoulders() {
        Mode.current = 'head_and_shoulders'
        Mode.label.innerText = 'Head And Shoulder -- Draw'
        Mode.mouse_down_handler = HeadAndShoulders.on_mouse_down
        Mode.mouse_up_handler = HeadAndShoulders.on_mouse_up
        Mode.mouse_move_handler = HeadAndShoulders.on_mouse_move
        Mode.clear_handler = HeadAndShoulders.clear
        Mode.draw = [Curve.draw(), HeadAndShoulders.draw()]
    }
    
    static is_head_and_should_enable() {
        if(Mode.current == 'head_and_shoulders') {
            return true
        }
        return false
    }

    static is_noise_preview_enable() {
        if(Mode.current == 'noisy_view') {
            return true
        }
        return false
    }

    static set_to_noise_visualisation() {
        Mode.current = 'noisy_view'
        Mode.label.innerText = 'Noise -- Preview'
        Mode.mouse_down_handler = ()=>{}
        Mode.mouse_up_handler = ()=>{}
        Mode.mouse_move_handler = ()=>{}
        Mode.draw = [Curve.draw(), HeadAndShoulders.draw()]
    }
}