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
}