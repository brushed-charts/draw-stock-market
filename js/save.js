export class SaveToJSON {
    static register = []

    static init() {
        SaveToJSON.register = []
    }

    static save() {
        const objects_to_save = []
        for (const save_function of SaveToJSON.register) {
            objects_to_save.push(save_function())
        }
        const concated_saving = Object.assign({}, ...objects_to_save)
        SaveToJSON.make_download_file(concated_saving)
    }

    static make_download_file(json_content) {
        const today_date = this.get_iso_date()
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(json_content, null, 2)], {
            type: "application/json"
        }));
        a.setAttribute("download", today_date);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    static get_iso_date() {
        const today = new Date().toISOString()
        const today_without_microsec = today.split('.')[0]
        const parsed_today = today_without_microsec.replace(new RegExp(':', 'g'), '-')
        console.log(parsed_today)
        return parsed_today
    }

}