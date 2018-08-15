function dateToString (date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}-${month}-${day}`;
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

export { dateToString, todayString, dateToAgo };
