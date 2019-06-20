export const formatUnixTime = (t) => {
    let unixtime = t;
    let unixTimestamp = new Date(unixtime * 1000);
    let Y = unixTimestamp.getFullYear();
    let M =
        unixTimestamp.getMonth() + 1 >= 10
            ? unixTimestamp.getMonth() + 1
            : '0' + (unixTimestamp.getMonth() + 1);
    let D =
        unixTimestamp.getDate() >= 10
            ? unixTimestamp.getDate()
            : '0' + unixTimestamp.getDate();
    let H = unixTimestamp.getHours();
    let mm = unixTimestamp.getMinutes();
    if (mm < 10) {
        mm = '0' + mm;
    }
    let toDay = Y + '-' + M + '-' + D + ' ' + H + ':' + mm;
    return toDay;
};

export const formatUSATime = (t) => {
    t = t.replace("Jan", "01")
    t = t.replace("Feb", "02")
    t = t.replace("Mar", "03")
    t = t.replace("Apr", "04")
    t = t.replace("May", "05")
    t = t.replace("Jun", "06")
    t = t.replace("Jul", "07")
    t = t.replace("Aug", "08")
    t = t.replace("Sep", "09")
    t = t.replace("Oct", "10")
    t = t.replace("Nov", "11")
    t = t.replace("Dec", "12")
    t = t.replace(/-/g,'/');
    var timestamp = new Date(t).getTime();
    timestamp = (timestamp + 28800000) / 1000
    return formatUnixTime(timestamp)
}