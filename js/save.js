
export class SaveToJSON {
    static boardID = undefined
    static tool = undefined
    static register = []

    static init(savingTool) {
        SaveToJSON.register = []
        SaveToJSON.boardID = new Date().valueOf()
        SaveToJSON.tool = savingTool
    }

    static save() {
        const concated_saving_dict = SaveToJSON.save_each_object()
        const json_output = SaveToJSON.convert_to_json(concated_saving_dict)
        SaveToJSON.tool.save(SaveToJSON.boardID, json_output).then((_) => console.log('saved'))

    }

    static save_each_object() {
        const objects_to_save = []
        for (const save_function of SaveToJSON.register) {
            objects_to_save.push(save_function())
        }
        const concated_saving = Object.assign({}, ...objects_to_save)
        return concated_saving
    }
    
        static convert_to_json(concated_save_dict) {
            return JSON.parse(JSON.stringify(concated_save_dict, null, 2))
        }

    
    static get_iso_date() {
        const today = new Date().toISOString()
        const today_without_microsec = today.split('.')[0]
        const parsed_today = today_without_microsec.replace(new RegExp(':', 'g'), '-')
        return parsed_today
    }

}