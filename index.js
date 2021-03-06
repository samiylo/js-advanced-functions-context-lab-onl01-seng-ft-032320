/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(ray) {
    return {
        firstName: ray[0],
        familyName: ray[1],
        title: ray[2],
        payPerHour: ray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(ray) {
    return ray.map(function(e) {
        return createEmployeeRecord(e)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push( {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    let timeIn = this.timeInEvents.find(function(e) {
        return e.date === dateStamp
    })

    let timeOut = this.timeOutEvents.find(function(e) {
        return e.date === dateStamp
    })

    let totalHours = (timeOut.hour - timeIn.hour)/ 100
    return totalHours
}

let wagesEarnedOnDate = function(dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp)
    let pay = this.payPerHour * (hoursWorked)
    return pay
}

let calculatePayroll = function(employeeRay) {
    return employeeRay.reduce(function(memo, record){
        return memo + allWagesFor.call(record)
    }, 0)
}

let findEmployeeByFirstName = function(ray, firstName) {
    return ray.find(function(record){
        return record.firstName === firstName
    })
}