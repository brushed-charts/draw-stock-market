import { Point } from "./point.js";
import { SaveToJSON } from "./save.js";
import { Utils } from "./utils.js";


export class Noise {
    static max_amplitude = 40
    static step = 20
    static label = undefined

    static init() {
        Noise.label = document.getElementById('noise_info')
        Noise.refresh_label()
        SaveToJSON.register.push(Noise.save)
    }

    static noise_create(curve_points) {
        const enhanced_curve = []
        for(let i = 1; i < curve_points.length; i++) {
            const segment = [curve_points[i-1], curve_points[i]]
            enhanced_curve.push(curve_points[i-1])
            const noised_segement = Noise.noise_process_segment(segment)
            enhanced_curve.push(...noised_segement)
        }
        enhanced_curve.push(curve_points[curve_points.length- 1])
        return enhanced_curve
    }
    
    static noise_process_segment(segment) {
        const start = segment[0].x
        const end = segment[1].x
        const noised_segement = []
        for(let cursor = start + Noise.step; cursor < end; cursor += Noise.step) {
            const base_y = Utils.found_y_between_points(segment[0], segment[1], cursor)
            const random_deviation = Utils.random_between(-Noise.max_amplitude, Noise.max_amplitude)
            const y_deviated = base_y + random_deviation
            const noisy_point = new Point(cursor, y_deviated)
            noised_segement.push(noisy_point)
        }
        return noised_segement
    }

    static refresh_label() {
        Noise.label.innerText = `noise_amplitude: ${Noise.max_amplitude} -- step: ${Noise.step}`
    }

    static increase_steps() {
        Noise.step += 2
        Noise.refresh_label()
    }

    static decrease_steps() {
        if(Noise.step - 2 <= 1) return;
        Noise.step -= 2
        Noise.refresh_label()
    }

    static increase_amplitude() {
        Noise.max_amplitude += 10
        Noise.refresh_label()
    }

    static decrease_amplitude() {
        if(Noise.max_amplitude - 10 == 0) return;
        Noise.max_amplitude -= 10
        Noise.refresh_label()
    }

    static save() {
        return {"noise": {
            "max_amplitude": Noise.max_amplitude,
            "step": Noise.step
        }}
    }
}
