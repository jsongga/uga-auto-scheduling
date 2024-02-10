var Professor = /** @class */ (function () {
    function Professor(firstName, lastName, rating) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.rating = rating;
    }
    return Professor;
}());
// Define the class structure
var Class = /** @class */ (function () {
    function Class(courseNumber, courseName, professor, crn, timeFrame, day, location) {
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.professor = professor;
        this.crn = crn;
        this.startTime = [0, 0, 0, 0, 0];
        this.endTime = [0, 0, 0, 0, 0];
        for (var i = 0; i < day.length; i++) {
            var id = 0; // M
            if (day == 'M')
                id = 0;
            else if (day == 'T')
                id = 1;
            else if (day == 'W')
                id = 2;
            else if (day == 'R')
                id = 3;
            else if (day == 'F')
                id = 4;
            this.startTime[id] = parseInt(timeFrame.substring(0, 2)) * 60 + parseInt(timeFrame.substring(3, 4)); // vector<int>[5]: M, T, W, R, F
            this.endTime[id] = parseInt(timeFrame.substring(5, 7)) * 60 + parseInt(timeFrame.substring(7, 9)); // vector<int>[5]: M, T, W, R, F
        }
        this.location = location; // string
    }
    return Class;
}());
// Define the Schedule structure
var Schedule = /** @class */ (function () {
    function Schedule(classes) {
        this.classes = classes;
        this.numClasses = classes.length;
        // write later 
        this.totalTimeOnCampus = 0;
        var sumProfRating = 0;
        for (var i = 0; i < this.numClasses; i++) {
            sumProfRating += classes[i].professor.rating;
        }
        this.avgProfessorRating = sumProfRating / this.numClasses;
        // write later
        this.totalDistance = 0;
    }
    return Schedule;
}());
// Function to check overlapping
function overlapping(a1, b1, a2, b2) {
    var _a;
    if (a1 > a2) {
        _a = [a2, a1], a1 = _a[0], a2 = _a[1];
    }
    // a1 <= a2
    // a1 <= b1
    if (b1 >= a2)
        return true;
    else
        return false;
}
// Function to check if there's a conflict in time with the current class
function ConflictTime(classX, classY) {
    for (var i = 0; i < 5; i++) {
        if (classX.startTime[i] == 0 || classY.startTime[i] == 0)
            continue;
        if (overlapping(classX.startTime[i], classX.endTime[i], classY.startTime[i], classY.endTime[i]))
            return true;
    }
    return false;
}
var curSchedule = [];
var ClassGroups;
var schedules;
// Check if class can be pushed in
function pushable(classX) {
    for (var i = 0; i < curSchedule.length; i++) {
        if (ConflictTime(classX, curSchedule[i]))
            return false;
    }
    return true;
}
// Function to make schedule
function makeSchedule(i) {
    if (i == ClassGroups.length) {
        schedules.push(new Schedule(curSchedule));
    }
    var numClasses = ClassGroups[i].length;
    for (var j = 0; j < numClasses; j++) {
        var classX = ClassGroups[i][j];
        if (pushable(classX)) {
            curSchedule.push(classX);
            makeSchedule(i + 1);
            curSchedule.pop();
        }
    }
}


function readFile() {
    let fs = require('fs');
    let realData = "";
    fs.readFileSync('src/courses.csv', 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        // Process the CSV data
        console.log(typeof(data));
        console.log(data.length)
        realData = data;
    });
    console.log(realData.length)
    return realData;
}

function parseCSVData(csvData) {
    let csvData = readFile()
    console.log(typeof(csvData))
    if (!csvData) {
        console.log("No data.")
        return [];
    }
    return csvData.split('\n').map(row => row.split(','));
}
// 
module.exports = {parseCSVData};
// export {readFile};
// export default readFile