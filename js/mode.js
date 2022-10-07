import { HandDraw } from "./handdraw.js"
import { HeadAndShouldersTool } from "./headandshoulders.js"
import { PriceTool } from "./price.js"

export class Mode {
    static current_drawtool = undefined
    static tools_register = []
    static label = undefined

    static current = 'price'
    
    static init() {
        Mode.label = document.getElementById('mode')
        Mode.tools_register = []
        Mode.current_drawtool = PriceTool.draw_tool
    }

    static set_to_price() {
        Mode.current = 'price'
        Mode.label.innerText = 'Price drawing'
        Mode.current_drawtool = PriceTool.draw_tool
        Mode.define_handdraw_as_handler()
    }
    
    static set_to_head_and_shoulders() {
        Mode.current = 'head_and_shoulders'
        Mode.label.innerText = 'Head & Shoulders drawing'
        Mode.current_drawtool = HeadAndShouldersTool.draw_tool
        Mode.define_handdraw_as_handler()
    }

    static define_handdraw_as_handler() {
        Mode.touch_down_handler = HandDraw.on_touch_down
        Mode.touch_up_handler = HandDraw.on_touch_up
        Mode.touch_move_handler = HandDraw.on_touch_move
        Mode.clear_handler = HandDraw.init
    }
    
    static is_head_and_should_enable() {
        if(Mode.current == 'head_and_shoulders') {
            return true
        }
        return false
    }

}