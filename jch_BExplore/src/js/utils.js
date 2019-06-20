export const formatUnixTime = (t) => {
    let unixtime = t;
    let unixTimestamp = new Date(unixtime * 1000);
    let Y = unixTimestamp.getFullYear();
    let M =
        unixTimestamp.getMonth() + 1 >= 10 ?
        unixTimestamp.getMonth() + 1 :
        '0' + (unixTimestamp.getMonth() + 1);
    let D =
        unixTimestamp.getDate() >= 10 ?
        unixTimestamp.getDate() :
        '0' + unixTimestamp.getDate();
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
    t = t.replace(/-/g, '/');
    var timestamp = new Date(t).getTime();
    timestamp = (timestamp + 28800000) / 1000
    return formatUnixTime(timestamp)
}

export const getTransactionAmount = (type, effects, amount) => {
    let res = "";
    if (type === "offernew") {
        if (effects[0].type === "sell" || effects[0].type === "buy") {
            res = effects[0].amount + effects[0].pair;
        } else if (effects[0].type === "bought" || effects[0].type === "sold") {
            let paid = effects[0].paid;
            let got = effects[0].got;
            res = paid.value + paid.currency + " -> " + got.value + got.currency;
        }
    } else if (type === "offercancel") {
        res = effects[0].amount + " " + effects[0].pair;
    } else if (type === "sent") {
        res = amount.value + " " + amount.currency;
    }
    return res;
}

export const getType = (type) => {
    let res = "";
    switch (type) {
        case "sent":
            res = "转账";
            break;
        case "offernew":
            res = "创建委托";
            break;
        case "offercancel":
            res = "撤销委托";
            break;
    }
    return res;
}