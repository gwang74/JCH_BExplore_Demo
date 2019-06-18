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