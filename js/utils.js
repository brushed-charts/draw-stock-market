export class Utils {
    static random_between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
    }

    static found_y_between_points(point1, point2, x) {
        const m = (point2.y - point1.y) / (point2.x - point1.x)
        const c = (point1.y - m * point1.x)
        const y_wanted = m*x+c
        return y_wanted
    }

    static distance_between_point(pointA, pointB) {
        return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y)
    }

    static downsample(resolution, curve) {
        const curve_downsampled = []
        const interval = Math.ceil(curve.length / resolution)
        for(let i = 0; i < curve.length; i+=interval) {
            curve_downsampled.push(curve[i])
        }
        return curve_downsampled
    }
}