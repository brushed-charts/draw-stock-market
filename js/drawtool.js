export class DrawTool {
    curve = []
    color = undefined
    fx_downsampler = undefined

    constructor(color = 'white') {
        this.color = color
    }

    clear() {
        this.curve = []
    }
}