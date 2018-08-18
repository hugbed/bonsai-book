function zeroPad(value) {
    return (value < 10) ? '0' + value : value;
}

function dateToString (date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${zeroPad(month)}-${zeroPad(day)}`;
}

function todayString() {
    return dateToString(new Date(Date.now()));
}

function dateToAgo(date) {
    const now = new Date(Date.now());

    const year =  now.getFullYear() - date.getFullYear();
    const month = now.getMonth() - date.getMonth();
    const day = now.getDate() - date.getDate();

    let agoStr = '';
    if (year > 0 || month > 0 || day > 0) {

        if (year > 0) {
            agoStr += year + ' ';
            agoStr += year > 1 ? 'years' : 'year';
        }

        if (month > 0) {
            agoStr += year > 0 ? ', ' : '';
            agoStr += month + ' ';
            agoStr += month > 1 ? 'months' : 'month';
        }

        if (day > 0) {
            agoStr += month > 0 ? ', ' : '';
            agoStr += day + ' ';
            agoStr += day > 1 ? 'days' : 'day';
        }
        agoStr += ' ago';
    } else {
        agoStr += 'today';
    }
    return agoStr;
}

function dateTimeToLocal(dateStr) {
    const date = new Date(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return dateToString(date) + `T${zeroPad(hours)}:${zeroPad(minutes)}` ;
}

export { dateToString, todayString, dateToAgo, dateTimeToLocal };
