import { Drawer } from "./drawer.js"
import { DrawTool } from "./drawtool.js"
import { Mode } from "./mode.js"

export class HeadAndShouldersTool {
    static draw_tool = undefined
    static max_point = 7
    

    static init() {
        HeadAndShouldersTool.draw_tool = new DrawTool('red')
        HeadAndShouldersTool.draw_tool.fx_downsampler = HeadAndShouldersTool.downsample
        Drawer.draw_register.push(HeadAndShouldersTool.draw)
        Mode.tools_register.push(HeadAndShouldersTool.draw_tool)
        Mode.clear_handler = HeadAndShouldersTool.init    
    }

    static draw() {
        const curve = HeadAndShouldersTool.draw_tool.curve
        const color = HeadAndShouldersTool.draw_tool.color
        Drawer.drawCurve(curve, color)
    }

    static downsample() {
        const curve = HeadAndShouldersTool.draw_tool.curve
        HeadAndShouldersTool.draw_tool.curve = curve.slice(0, HeadAndShouldersTool.max_point)
    }
}