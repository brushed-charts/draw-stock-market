import { Drawer } from "./drawer.js";
import { Canvas } from "./canvas.js";
import { Mode } from "./mode.js";
import { SaveToJSON } from "./save.js";
import { Interaction } from "./interaction.js";
import { PriceTool } from "./price.js";
import { HeadAndShouldersTool } from "./headandshoulders.js";

function on_ready() {
    document.addEventListener('keydown', keyboard_down_callback)
    document.addEventListener('keyup', keyboard_up_callback)
    init()

}


function keyboard_down_callback(event) {
    Interaction.last_keyboard_event = event
    if(event.code == 'KeyR') {
        Interaction.reset()
    }
    else if(event.code == 'KeyC') {
        Interaction.clear()
    }
    else if(event.code == 'KeyH') {
        Interaction.enable_head_and_shoulder_mode()
    }
    else if(event.code == 'KeyP') {
        Interaction.enable_price_mode()
    }
    else if(event.code == 'Enter') {
        Interaction.handle_save_mode
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
    HeadAndShouldersTool.init()
    PriceTool.init()
    Interaction.init(init)
}


on_ready()