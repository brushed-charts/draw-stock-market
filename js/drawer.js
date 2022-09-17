export class Drawer {
    static context = undefined
    static draw_register = []
    
    static init() {
        Drawer.context = document.getElementById('canvas').getContext('2d')
        Drawer.draw_register = []
    }

    static drawAnchor(point, color) {
        Drawer.context.beginPath();
        Drawer.context.arc(point.x, point.y, point.radius, 0, 2 * Math.PI, false)
        Drawer.context.fillStyle = color;
        Drawer.context.fill();
    }

    static drawCurve(curve, color='black') {
        Drawer.context.beginPath();
        let previous_point = undefined
        for (const point of curve) {
            if(previous_point == undefined) {
                previous_point = point
                continue;
            }
            Drawer.context.moveTo(previous_point.x, previous_point.y)
            Drawer.context.lineTo(point.x, point.y)
            Drawer.context.lineWidth = 2;
            Drawer.context.strokeStyle = color;
            Drawer.context.stroke()
            previous_point = point
        };
    }

    static draw() {
        for (const module_draw_function of Drawer.draw_register) {
            module_draw_function()
        }
    }
}