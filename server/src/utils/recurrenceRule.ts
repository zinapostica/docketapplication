import moment from "moment";

export const calculateRecurrenceRule = (repeatsOn: any, startsOn: any, endsOn: string = "") => {
    const diff = moment(repeatsOn).diff(startsOn, "days");
    let until = "";
    if (endsOn) {
        until = ";UNTIL=" + endsOn.replace("-", "");
    }
    return `FREQ=DAILY;INTERVAL=${diff}${until}`;
}