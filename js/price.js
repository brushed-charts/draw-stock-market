import { Drawer } from "./drawer.js"
import { DrawTool } from "./drawtool.js"
import { Mode } from "./mode.js"
import { Utils } from "./utils.js"

export class PriceTool {
    static draw_tool = undefined
    static max_point = 40
    

    static init() {
        PriceTool.draw_tool = new DrawTool('white')
        PriceTool.draw_tool.fx_downsampler = PriceTool.downsample
        Mode.current_drawtool = PriceTool.draw_tool
        Drawer.draw_register.push(PriceTool.draw)
        Mode.tools_register.push(PriceTool.draw_tool)
    }

    static draw() {
        const curve = PriceTool.draw_tool.curve
        const color = PriceTool.draw_tool.color
        Drawer.drawCurve(curve, color)
    }

    static downsample() {
        PriceTool.draw_tool.curve = Utils.downsample(PriceTool.max_point, PriceTool.draw_tool.curve)
    }
}