const dateFormat = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    const year = `${d.getFullYear()}`;
    let day = `${d.getDate()}`;

    if(day.length < 2) {
        day = `0${day}`;
    }

    if(month.length < 2) {
        month = `0${month}`;
    }

    return [year, month, day].join('-');
}

export default dateFormat;