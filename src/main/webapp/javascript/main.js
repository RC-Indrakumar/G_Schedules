(function (_global) {
    /**
     * @description This method will give the details of the given time(in milliSeconds)
     * @param {*} timeInMillis 
     * @returns Object
     */
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

    /**
     * @description This method will return true,
     * if the given time(time in milliSeconds) is the past one, else return false
     * @param {*} timeInMillis 
     * @returns Boolean
     */
    const isPast = timeInMillis => {
        return timeInMillis < new Date().getTime() ? true : false;
    }

    /**
     * @description This method will wrap the schedules for the day, inside the HTML_template
     * @param {*} schedule Object
     * @param {*} fromTime Concatenated fromTime in String [Ex: 12:10pm]
     * @param {*} toTime Concatenated toTime in String [Ex: 12:20pm]
     * @returns HTML_template string with appended given details of the schedule
     */
    const scheduleWrapper = (schedule, fromTime, toTime) => {
        let schedule_title = !toTime ? "All Day" : `${fromTime} - ${toTime}`,
            dot_classType = isPast(schedule.timeInMillis_To) ? ` past_task` : ``;
        return `<p class="schedule_wrap">
            <span class="schedule_dot${dot_classType}"></span>
            <span class="schedule_title">${schedule_title}</span>
            <span class="schedule_desc">${schedule.eventDesc}</span>
            </p>`;
    };

    /**
     * @description This method will construct the given schedules present for the day
     * @param {*} schedule Object
     * @returns Accumulated string of HTML_template with the given details of the schedule
     */
    const wrapSchedule = schedule => {
        if (schedule) {
            return schedule.reduce((accumulator, currentValue) => {
                let fromTime_Details = getTimeDetails(currentValue.timeInMillis_From),
                    toTime_Details = getTimeDetails(currentValue.timeInMillis_To);
                return accumulator +
                    scheduleWrapper(
                        currentValue,
                        fromTime_Details.concatenatedString,
                        toTime_Details.concatenatedString
                )
            }, ``);
        }
    };

    /**
     * @description This method will bind the day, and the schedules for the particular day together, 
     * inside the HTML_template
     * @param {*} schedule Object
     * @param {*} timeInMillis time in milliSeconds
     * @returns HTML_template string with appended given details of the schedule
     */
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

    /**
     * @description This method will paint the schedules list in the DOM
     */
    const paintSchedule = () => {
        let resultantValue = ``;
        Object.keys(schedules).forEach(item => {
            // Here we are wrapping up the schedules, inside the HTML_template
            resultantValue += getScheduleTemplate(schedules[item], Number(item));
        });
        document.getElementById('schedules').querySelector('tbody').innerHTML = resultantValue;
    }

    // Painting the schedule list
    paintSchedule();
})(this);
