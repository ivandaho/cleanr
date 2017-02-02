export const format_date_generic_short = function(mdate) {
    return mdate.format("DD-MM");
}
export const format_date_descriptive_full = function(mdate) {
    return mdate.format("(MMMM Do)");
    {/* return mdate.format("MMMM Do YYYY"); */}
}
