import { Drawer } from "./drawer.js"
import { DrawTool } from "./drawtool.js"
import { Mode } from "./mode.js"

export class HeadAndShouldersTool {
    static draw_tool = undefined
    

    static init() {
        HeadAndShouldersTool.draw_tool = new DrawTool('red')
        Mode.current_drawtool = HeadAndShouldersTool.draw_tool
        Drawer.draw_register.push(HeadAndShouldersTool.draw)
        Mode.tools_register.push(HeadAndShouldersTool.draw_tool)
    }

    static draw() {
        const curve = HeadAndShouldersTool.draw_tool.curve
        const color = HeadAndShouldersTool.draw_tool.color
        Drawer.drawCurve(curve, color)
    }
}