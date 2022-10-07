import { HandDraw } from "./handdraw.js"
import { PriceTool } from "./price.js"

export class Mode {
    static clear_handler = PriceTool.init
    static current_drawtool = undefined
    static tools_register = []
    static draw = []
    static label = undefined

    static current = 'price'
    
    static init() {
        Mode.label = document.getElementById('mode')
        Mode.tools_register = []
    }

    static set_to_price() {
        Mode.current = 'price'
        Mode.label.innerText = 'Price drawing'
        Mode.touch_down_handler = HandDraw.on_touch_down
        Mode.touch_up_handler = HandDraw.on_touch_up
        Mode.touch_move_handler = HandDraw.on_touch_move
        Mode.clear_handler = HandDraw.init
        Mode.draw = [PriceTool.draw]
    }
    
    static is_head_and_should_enable() {
        if(Mode.current == 'head_and_shoulders') {
            return true
        }
        return false
    }

}