function Convert12hTo24hTime(str) {
    str = String(str).toLowerCase().replace(/\s/g, '');
    var has_am = str.indexOf('am') >= 0;
    var has_pm = str.indexOf('pm') >= 0;
    str = str.replace('am', '').replace('pm', '');
    if (str.indexOf(':') < 0) str = str + ':00';
    if (has_am) str += ' am';
    if (has_pm) str += ' pm';
    var d = new Date("1/1/2011 " + str);
    var doubleDigits = function (n) {
        return (parseInt(n) < 10) ? "0" + n : String(n);
    };
    return doubleDigits(d.getHours()) + ':' + doubleDigits(d.getMinutes());
}

function Convert24hTo12hTime(time) {
    var timeString = time;
    var H = +timeString.substr(0, 2);
    var h = (H % 12) || 12;
    var ampm = H < 12 ? " am" : " pm";
    timeString = ('0' + h).slice(-2) + timeString.substr(2, 3) + ampm;
    return timeString
}

function ConvertDateTime(DateStrDDMMYYYY, TimeStr12FormatWithAmPmStr) {
    TimeStr12FormatWithAmPmStr = String(TimeStr12FormatWithAmPmStr).toLowerCase().replace(/\s/g, '');
    var dateS = DateStrDDMMYYYY.split('/')
    var has_am = TimeStr12FormatWithAmPmStr.indexOf('am') >= 0;
    var has_pm = TimeStr12FormatWithAmPmStr.indexOf('pm') >= 0;
    TimeStr12FormatWithAmPmStr = TimeStr12FormatWithAmPmStr.replace('am', '').replace('pm', '');
    if (TimeStr12FormatWithAmPmStr.indexOf(':') < 0) str = str + ':00';
    if (has_am) TimeStr12FormatWithAmPmStr += ' am';
    if (has_pm) TimeStr12FormatWithAmPmStr += ' pm';
    return new Date(dateS[1] + '/' + dateS[0] + '/' + dateS[2] + " " + TimeStr12FormatWithAmPmStr);
}

function IsEmptyOrNull(string) {
    switch (string) {
        case "":
        case null:
        case typeof this == "undefined":
            return true;
        default:
            return false;
    }
}