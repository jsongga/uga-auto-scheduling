
class Professor {
    public firstName: String
    public lastName: String
    public rating: number
    constructor(firstName: String, lastName: String, rating: number) {
        this.firstName = firstName
        this.lastName = lastName
        this.rating = rating
    }
}

// Define the class structure
class Class {
    public courseNumber: String
    public courseName: String
    public professor: Professor
    public crn: number
    public startTime: number[]
    public endTime: number[]
    public location: String
    constructor(courseNumber: String, courseName: String, professor: Professor, 
        crn: number, timeFrame: String, day: String, location: String) {
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.professor = professor;
        this.crn = crn;
        this.startTime = [0, 0, 0, 0, 0]
        this.endTime = [0, 0, 0, 0, 0]
        for (let i = 0 ; i < day.length ; i++) {
            let id = 0; // M
            if(day == 'M') id = 0;
            else if(day == 'T') id = 1;
            else if(day == 'W') id = 2;
            else if(day == 'R') id = 3;
            else if(day == 'F') id = 4;
            this.startTime[id] = parseInt(timeFrame.substring(0, 2)) * 60 + parseInt(timeFrame.substring(3, 4)); // vector<int>[5]: M, T, W, R, F
            this.endTime[id] = parseInt(timeFrame.substring(5, 7)) * 60 + parseInt(timeFrame.substring(7, 9)); // vector<int>[5]: M, T, W, R, F
        }
        this.location = location; // string
    }
}
  
  // Define the Schedule structure
class Schedule {
    public classes: Class[]
    public numClasses: number
    public totalTimeOnCampus: number
    public avgProfessorRating: number
    public totalDistance: number
    constructor(classes: Class[]) {
        this.classes = classes
        this.numClasses = classes.length
        // write later 
        this.totalTimeOnCampus = 0
        let sumProfRating = 0
        for(let i = 0 ; i < this.numClasses ; i++) {
            sumProfRating += classes[i].professor.rating
        }
        this.avgProfessorRating = sumProfRating / this.numClasses
        // write later
        this.totalDistance = 0
    }
}

// Function to check overlapping
function overlapping(a1: number, b1: number, a2: number, b2: number) {
    if (a1 > a2) {
        [a1, a2] = [a2, a1];
    }
    // a1 <= a2
    // a1 <= b1
    if (b1 >= a2) return true;
    else return false;
}

// Function to check if there's a conflict in time with the current class
function ConflictTime(classX: Class, classY: Class) {
    for(let i = 0 ; i < 5 ; i++) {
        if(classX.startTime[i] == 0 || classY.startTime[i] == 0) continue;
        if(overlapping(classX.startTime[i], classX.endTime[i], classY.startTime[i], classY.endTime[i])) return true;
    }
    return false;
}

let curSchedule: Class[] = [];
let ClassGroups: Class[][];
let schedules: Schedule[]

// Check if class can be pushed in
function pushable(classX: Class) {
    for(let i = 0 ; i < curSchedule.length ; i++) {
        if(ConflictTime(classX, curSchedule[i])) return false;
    }
    return true;
}

// Function to make schedule
function makeSchedule(i: number) {
    if(i == ClassGroups.length) {
        schedules.push(new Schedule(curSchedule));
    }
    let numClasses = ClassGroups[i].length
    for (let j = 0 ; j < numClasses ; j++) {
        let classX = ClassGroups[i][j];
        if(pushable(classX)) {
            curSchedule.push(classX)
            makeSchedule(i + 1)
            curSchedule.pop()
        }
    }
}

const fs = require('fs');

fs.readFile('src/Course Schedule - Spring 2024_Page 1_Table.csv', 'utf8', (err: any, data: any) => {
  if (err) {
    console.error(err);
    return;
  }
  // Process the CSV data
  console.log(data);
});