import moment from "moment";

export const calculateRecurrenceRule = (repeatsOn: string, startsOn: string, endsOn: string = ""): string => {
    const diff = moment(repeatsOn).diff(startsOn, "days");
    let until = "";
    if (endsOn) {
        until = ";UNTIL=" + endsOn.replaceAll("-", "");
    }
    return `FREQ=DAILY;INTERVAL=${diff}${until}`;
}