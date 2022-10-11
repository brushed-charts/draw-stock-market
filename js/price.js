import { Drawer } from "./drawer.js"
import { DrawTool } from "./drawtool.js"
import { HandDraw } from "./handdraw.js"
import { Mode } from "./mode.js"
import { SaveToJSON } from "./save.js"
import { Utils } from "./utils.js"

export class PriceTool {
    static draw_tool = undefined
    static max_point = 90
    

    static init() {
        PriceTool.draw_tool = new DrawTool('white', new HandDraw())
        PriceTool.draw_tool.fx_downsampler = PriceTool.downsample
        Drawer.draw_register.push(PriceTool.draw)
        Mode.tools_register.push(PriceTool.draw_tool)
        SaveToJSON.register.push(PriceTool.save)
    }

    static draw() {
        const curve = PriceTool.draw_tool.curve
        const color = PriceTool.draw_tool.color
        Drawer.drawCurve(curve, color)
    }

    static downsample() {
        PriceTool.draw_tool.curve = Utils.downsample(PriceTool.max_point, PriceTool.draw_tool.curve)
    }

    static save() {
        return {'price': PriceTool.draw_tool.curve}
    }
    
}