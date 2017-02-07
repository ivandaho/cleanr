export const format_date_day_descriptive_full = function(mdate) {
    const formatString = "dddd, MMMM Do YYYY";
    if (moment.isMoment(mdate)) {
        return mdate.format(formatString);
    }
    return moment.utc(mdate).format(formatString);
}
export const format_date_descriptive_full = function(mdate) {
    const formatString = "MMMM Do YYYY";
    if (moment.isMoment(mdate)) {
    return mdate.format(formatString);
    }
    return moment.utc(mdate).format(formatString);
    {/* return mdate.format("MMMM Do YYYY"); */}
}
export const format_date_expand_day = function(day) {
    return day.substr(0,1).toUpperCase().concat(day.substr(1)).concat("day");
}
export const format_date_generic_short = function(mdate) {
    const formatString = "DD-MM";
    if (moment.isMoment(mdate)) {
        return mdate.format(formatString);
    }
    return moment.utc(mdate).format(formatString);
}
export const format_date_to_day = function(mdate) {
    const formatString = "dddd";
    if (moment.isMoment(mdate)) {
        return mdate.format(formatString);
    }
    return moment.utc(mdate).format(formatString);
}
export const parse_substatus = function(substatus) {
    if (substatus === 0) {
        return "Inactive";
    } else if (substatus === 1) {
        return "Active";
    } else if (substatus === 2) {
        return "Single session booking";
    }
    return "Inactive";
}
