(function (_global) {
    const getTimeDetails = timeInMillis => {
        if (!timeInMillis) return {}
        let dateObj = new Date(timeInMillis),
            splittedDate = dateObj.toString().split(" "),
            hours = dateObj.getHours(),
            minutes = dateObj.getMinutes();
        return {
            concatenatedString: `${
                hours > 12 ? hours - 12 : hours
                }:${minutes < 10 ? "0" + minutes : minutes}${hours > 12 ? "pm" : "am"}`,
            day: splittedDate[0],
            month: splittedDate[1],
            date: splittedDate[2],
            year: splittedDate[3],
            isToday: (Number(splittedDate[2]) === new Date().getDate())
        };
    };
    const scheduleWrapper = (eventDesc, fromTime, toTime) => {
        let schedule_title = !toTime ? "All Day" : `${fromTime} - ${toTime}`
        return `<p class="schedule_wrap">
            <span class="schedule_dot"></span>
            <span class="schedule_title">${schedule_title}</span>
            <span class="schedule_desc">${eventDesc}</span>
            </p>`;
    };
    const wrapSchedule = schedule => {
        if (schedule) {
            return schedule.reduce((accumulator, currentValue) => {
                let fromTime_Details = getTimeDetails(currentValue.timeInMillis_From),
                    toTime_Details = getTimeDetails(currentValue.timeInMillis_To);
                return accumulator +
                    scheduleWrapper(
                        currentValue.eventDesc,
                        fromTime_Details.concatenatedString,
                        toTime_Details.concatenatedString
                )
            }, ``);
        }
    };
    const getScheduleTemplate = (schedule, timeInMillis) => {
        if (schedule && schedule.length <= 0) {
            return ``;
        }
        let fromTime_Details = getTimeDetails(timeInMillis)
        return `<tr>
            <td class="schedule_on">
                <p>
                    <span class="day${fromTime_Details.isToday?" day_select":""}">${fromTime_Details.date}</span>${fromTime_Details.month}, ${fromTime_Details.day}
                </p>
            </td>
            <td class="schedule_details">
                ${wrapSchedule(schedule)}
            </td>
        </tr>`;
    };
    let resultantValue = ``;
    Object.keys(schedules).forEach(item => {
        resultantValue += getScheduleTemplate(schedules[item], Number(item));
    });
    document.getElementById('schedules').querySelector('tbody').innerHTML = resultantValue;
})(this);
