import { Drawer } from "./drawer.js";
import { Canvas } from "./canvas.js";
import { Mode } from "./mode.js";
import { SaveToJSON } from "./save.js";
import { HandDraw } from "./handdraw.js";
import { Interaction } from "./interaction.js";
import { PriceTool } from "./price.js";

function on_ready() {
    document.addEventListener('keydown', keyboard_down_callback)
    document.addEventListener('keyup', keyboard_up_callback)
    init()

}


function keyboard_down_callback(event) {
    Interaction.last_keyboard_event = event
    if(event.code == 'KeyR') {
        Mode.set_to_price()
        init()
    }
    else if(event.code == 'KeyC') {
        Mode.clear_handler()
        Canvas.clear()
        Drawer.draw()
    }
    else if(event.code == 'KeyD') {
        
    }
    else if(event.code == 'Enter') {
        SaveToJSON.save()
    }
}



function keyboard_up_callback(_event) {
    Interaction.last_keyboard_event = undefined
}


function init() {
    SaveToJSON.init()
    Canvas.init()
    Drawer.init()
    Mode.init()
    PriceTool.init()
    HandDraw.init()
    Mode.set_to_price()
}


on_ready()