import { HandDraw } from "./handdraw.js"

export class Mode {
    static touch_down_handler = HandDraw.touch_down_handler
    static touch_up_handler = HandDraw.touch_up_handler
    static touch_move_handler = HandDraw.touch_move_handler
    static clear_handler = HandDraw.init
    static draw = []
    static label = undefined

    static current = 'hand_draw'
    
    static init() {
        Mode.label = document.getElementById('mode')
    }

    static set_to_hand_draw() {
        Mode.current = 'hand_draw'
        Mode.label.innerText = 'Hand Drawing'
        Mode.touch_down_handler = HandDraw.on_touch_down
        Mode.touch_up_handler = HandDraw.on_touch_up
        Mode.touch_move_handler = HandDraw.on_touch_move
        Mode.clear_handler = HandDraw.init
        Mode.draw = HandDraw.draw()
    }
    
    static is_head_and_should_enable() {
        if(Mode.current == 'head_and_shoulders') {
            return true
        }
        return false
    }

}