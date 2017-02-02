export const format_date_generic_short = function(mdate) {
    return mdate.format("DD-MM");
}
export const format_date_descriptive_full = function(mdate) {
    return mdate.format("(MMMM Do)");
    {/* return mdate.format("MMMM Do YYYY"); */}
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
