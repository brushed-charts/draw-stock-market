export class DrawTool {
    curve = []
    color = undefined
    fx_downsampler = undefined
    draw_style = undefined

    constructor(color = 'white', draw_style) {
        this.color = color
        this.draw_style = draw_style
    }

    clear() {
        this.curve = []
    }
}