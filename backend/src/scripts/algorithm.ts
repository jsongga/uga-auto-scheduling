import fs from "fs";
import fetchWalkingDistance from "./fetchWalkingDistance";

type ProfessorInfoV = {
  avgDifficulty: number;
  avgRating: number;
  department: string;
  firstName: string;
  id: string;
  lastName: string;
  numRatings: number;
  wouldTakeAgainPercent: number;
};

type ProfessorInfo = {
  [x: string]: ProfessorInfoV;
};

type CourseInfoV = {
  building: string;
  courseName: string;
  courseNumber: string;
  crn: number;
  days: string[];
  instructor: string;
  room: string;
  seatsAvailable: number;
  time: string;
};

type CourseInfo = {
  [s: string]: CourseInfoV;
};

type BuildingInfo = {
  [x: string]: string;
};

let professors: ProfessorInfo = {};
let courses: CourseInfo = {};
let buildings: BuildingInfo = {};

/* —— Load in the data —— */
try {
  const professorsData = fs.readFileSync("./src/ugaProfessors.json", "utf8");
  professors = JSON.parse(professorsData);

  const coursesData = fs.readFileSync("./src/courses.json", "utf8");
  courses = JSON.parse(coursesData);

  const buildingsData = fs.readFileSync("./src/buildings.json", "utf8");
  buildings = JSON.parse(buildingsData);
} catch (err) {
  console.error(err);
}

/**
 * Represents a Professor
 * @class
 */
export class Professor {
  private firstName: string;
  private lastName: string;
  rating: number;

  /**
   * Creates a professor
   * @constructor
   * @param firstName The first name of the professor
   * @param lastName The last name of the professor
   * @param rating The rating of the professor
   */
  constructor(firstName: string, lastName: string, rating: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.rating = rating;
  }

  /**
   * Outputs the professor's name and rating
   */
  output() {
    console.log(
      "Professor Name: " + this.firstName + " " + this.lastName + "\n",
    );
    console.log("Rating: " + this.rating);
  }
}

/**
 * Finds a professor
 * @param professor The string representation of the professor
 * @returns The professor object
 */
export function findProfessor(professor: string) {
  let pos = professor.split(" ");
  let fname = pos[0];
  let finitial = fname[0];
  let lname = pos[1];
  for (let i = 2; i < pos.length; i++) {
    lname += " " + pos[i];
  }

  let finitiallname = finitial + " " + lname;

  if (professors[finitiallname] !== undefined) {
    let curObj = professors[finitiallname];
    return new Professor(curObj.firstName, curObj.lastName, curObj.avgRating);
  }
  return new Professor("Unknown", "Unknown", 0);
}

/**
 * Gets a class
 * @param crn The crn of the class
 * @returns The class object
 */
export function getClass(crn: number) {
  let finalResult = [];

  let objList = Object.values(courses);
  finalResult = objList.filter((c) => crn == c.crn);

  if (finalResult.length == 0) {
    return "No class found";
  }

  return finalResult;
}

/**
 * Gets all classes
 * @param classNum The class number
 * @returns A list of CRNs
 */
export function getAllClass(classNum) {
  // this should return a list of CRNs
  let finalResult: CourseInfoV[] = [];

  let objList = Object.values(courses);
  finalResult = objList.filter((c) => classNum == c.courseNumber);

  if (finalResult.length == 0) {
    return "No class found";
  }

  let final: number[] = [];

  for (let i = 0; i < finalResult.length; i++) {
    if (i != 0 && finalResult[i].crn == finalResult[i - 1].crn) continue;
    final.push(finalResult[i].crn);
  }

  return final;
}

/**
 * Represents a class
 * @class
 */
export class Class {
  courseNumber: string;
  courseName: string;
  crn: number;
  group: number;
  professor: Professor;
  startTime: number[];
  endTime: number[];
  location: string[];
  rooms: number[];
  seats: number;

  /**
   * Creates a class
   * @param crn The crn of the class
   * @param numGroup The group number of the class
   */
  constructor(crn: number, numGroup = 0) {
    let result = getClass(crn);
    this.courseNumber = result[0].courseNumber;
    this.courseName = result[0].courseName;
    this.crn = crn;
    this.group = numGroup;
    // console.log(result[0], crn);
    this.professor = findProfessor(result[0].instructor);
    this.startTime = [0, 0, 0, 0, 0];
    this.endTime = [0, 0, 0, 0, 0];
    this.location = ["", "", "", "", ""]; // string
    this.rooms = [0, 0, 0, 0, 0];
    this.seats = result[0].seatsAvailable;

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].days.length; j++) {
        let id = 0;

        if (result[i].days[j] == "T") {
          id = 1;
        } else if (result[i].days[j] == "W") {
          id = 2;
        } else if (result[i].days[j] == "R") {
          id = 3;
        } else if (result[i].days[j] == "F") {
          id = 4;
        }

        let bruh = result[i].time.split("-");
        this.startTime[id] =
          parseInt(bruh[0].substring(0, 2)) * 60 +
          parseInt(bruh[0].substring(2, 4));
        this.endTime[id] =
          parseInt(bruh[1].substring(0, 2)) * 60 +
          parseInt(bruh[1].substring(2, 4));

        this.location[id] = result[i].building;
        this.rooms[id] = result[i].room;
      }
    }
  }

  /**
   * Outputs the class information
   */
  output() {
    console.log("Course Number: " + this.courseNumber + "\n");
    console.log("Course Name: " + this.courseName + "\n");
    console.log("Course CRN: " + this.crn + "\n");
    console.log("Course Professor: ");
    this.professor.output();
    console.log("Course Time:\n");
    for (let i = 0; i < 5; i++) {
      console.log(this.startTime[i] + " - " + this.endTime[i] + "\n");
    }
    console.log("Course Location:\n");
    for (let i = 0; i < 5; i++) {
      console.log(this.location[i] + " " + this.rooms[i] + "\n");
    }
  }
}

/**
 * Finds a building
 * @param building The name of the building
 * @returns The building's address
 */
export function findBuilding(building: string) {
  return buildings[building];
}

/**
 * Represents a schedule
 * @class
 */
export class Schedule {
  numClasses: number;
  classes: Class[];
  avgProfessorRating: number;
  totalTimeOnCampus: number;
  totalDaysOnCampus: number;
  totalDistance: number;

  /**
   * Creates a schedule
   * @param classes The classes in the schedule
   */
  constructor(classes: Class[]) {
    this.numClasses = classes.length;
    this.classes = [];
    for (let i = 0; i < this.numClasses; i++) {
      this.classes.push(classes[i]);
    }

    this.totalTimeOnCampus = 0;
    this.totalDaysOnCampus = 0;
    let minTime = [1440, 1440, 1440, 1440, 1440];
    let maxTime = [0, 0, 0, 0, 0];

    for (let i = 0; i < this.numClasses; i++) {
      for (let j = 0; j < 5; j++) {
        if (classes[i].startTime[j] == 0) continue;
        minTime[j] = Math.min(minTime[j], classes[i].startTime[j]);
        maxTime[j] = Math.max(maxTime[j], classes[i].endTime[j]);
      }
    }

    for (let i = 0; i < 5; i++) {
      if (minTime[i] < maxTime[i]) {
        this.totalDaysOnCampus++;
        this.totalTimeOnCampus += maxTime[i] - minTime[i];
      }
    }

    let sumProfRating = 0;
    for (let i = 0; i < this.numClasses; i++) {
      sumProfRating += classes[i].professor.rating;
    }
    this.avgProfessorRating = sumProfRating / this.numClasses;
    this.totalDistance = 0;
    /*
        for(let day = 0 ; day < 5 ; day++) {
            // calculate the total walking distance for each days
            let arr = [];
            for(let i = 0 ; i < this.numClasses ; i++) {
                for(let j = 0 ; j <= i ; j++) {
                    if(j == i) arr.splice(j, 0, this.classes[i]);
                    else if (this.classes[i].startTime[day] > arr[j].startTime[day]) {
                        arr.splice(j, 0, this.classes[i]);
                        break;
                    }
                }
            }
            for(let i = 1 ; i < arr.length ; i++) {
                let location1 = findBuilding(arr[i - 1].location[day])
                let location2 = findBuilding(arr[i].location[day])
                fetchWalkingDistance(location1, location2).then((data) => console.log(data.rows[0].elements[0]))
            }
        }
        */
  }

  /**
   * Outputs the schedule
   */
  output() {
    for (let i = 0; i < this.numClasses; i++) {
      console.log(this.classes[i].crn);
    }
    console.log("AvgRating = " + this.avgProfessorRating);
    console.log("Total time on campus " + this.totalTimeOnCampus);
    console.log("Total days on campus " + this.totalDaysOnCampus);
    // console.log("Total walking distance " + this.totalDistance);
  }
}

/**
 * Function to check if two time intervals overlap
 * @param a1 The start time of the first class
 * @param b1 The end time of the first class
 * @param a2 The start time of the second class
 * @param b2 The end time of the second class
 */
function overlapping(a1: number, b1: number, a2: number, b2: number) {
  let _a;
  if (a1 > a2) {
    (_a = [a2, a1]), (a1 = _a[0]), (a2 = _a[1]);
  }
  // a1 <= a2
  // a1 <= b1
  if (b1 >= a2) return true;
  else return false;
}

/**
 * Function to check if there's a conflict in time with the current class
 * @param classX The first class
 * @param classY The second class
 * @constructor
 */
function ConflictTime(classX: Class, classY: Class) {
  for (let i = 0; i < 5; i++) {
    if (classX.startTime[i] == 0 || classY.startTime[i] == 0) continue;
    if (
      overlapping(
        classX.startTime[i],
        classX.endTime[i],
        classY.startTime[i],
        classY.endTime[i],
      )
    )
      return true;
  }
  return false;
}

let curSchedule: Class[] = [];
let ClassGroups: Class[][] = [];
let schedules: Schedule[] = [];

/**
 * Function to check if a class can be pushed in
 * @param classX The class to be pushed in
 */
function pushable(classX: Class) {
  for (let i = 0; i < curSchedule.length; i++) {
    if (ConflictTime(classX, curSchedule[i])) return false;
  }
  return true;
}

/**
 * Function to make a schedule
 * @param i The index of the class group
 */
function makeSchedule(i: number) {
  if (i == ClassGroups.length) {
    schedules.push(new Schedule(curSchedule));
    return;
  }

  let numClasses = ClassGroups[i].length;
  for (let j = 0; j < numClasses; j++) {
    let classX = ClassGroups[i][j];
    //console.log(typeof(classX))
    if (pushable(classX)) {
      curSchedule.push(classX);
      makeSchedule(i + 1);
      curSchedule.pop();
    }
  }
}

/**
 * Get the best schedule based on the professor rating
 * @param schedules
 */
function bestRMPSchedule(schedules: Schedule[]) {
  let sortedSchedules = schedules.sort(
    (a, b) => b.avgProfessorRating - a.avgProfessorRating,
  );

  let top10Schedules = sortedSchedules.slice(0, 10);

  return top10Schedules;
}

/**
 * Get the best schedule based on the total days on campus
 * @param schedules
 */
function getMinDaysSchedules(schedules: any[]) {
  let minDays = Math.min(
    ...schedules.map((schedule) => schedule.totalDaysOnCampus),
  );

  // Filter the schedules to get those with the minimum number of totalDaysOnCampus
  let minDaysSchedules = schedules.filter(
    (schedule) => schedule.totalDaysOnCampus === minDays,
  );

  return minDaysSchedules;
}

/**
 * Get the best schedule based on the total time on campus
 * @param schedules The schedules
 * @param earliestTime The earliest time
 * @param latestTime The latest time
 */
function getScheduleByValidTime(
  schedules: Schedule[],
  [earliestTime, latestTime]: [number, number],
) {
  // Filter the schedules to get those with the valid time
  let validTimeSchedules: Schedule[] = schedules.filter((schedule) => {
    return (
      schedule.totalTimeOnCampus >= earliestTime &&
      schedule.totalTimeOnCampus <= latestTime
    );
  });

  return validTimeSchedules;
}

/**
 * Get the best schedule based on the valid rating
 * @param schedules The schedules
 * @param lowestRating The lowest rating
 * @param highestRating The highest rating
 */
function getScheduleByValidRating(
  schedules: Schedule[],
  [lowestRating, highestRating]: [number, number],
) {
  // Filter the schedules to get those with the valid rating
  let validRatingSchedules = schedules.filter((schedule) => {
    return (
      schedule.avgProfessorRating >= lowestRating &&
      schedule.avgProfessorRating <= highestRating
    );
  });

  return validRatingSchedules;
}

function getScheduleByProfesssors(
  schedules: Schedule[],
  professors: string | Professor[],
) {
  // Filter the schedules to get those with the valid professors
  let validProfessorsSchedules = schedules.filter((schedule) => {
    return schedule.classes.every((classX) => {
      if (typeof professors === "string") {
        throw new Error("Invalid professors: " + professors);
      }
      return professors.includes(classX.professor);
    });
  });

  return validProfessorsSchedules;
}

/**
 * Add a class to the class group
 * @param crns The crns
 */
function addClassCRN(crns: string | number[]) {
  if (typeof crns === "string") {
    throw new Error("Invalid crns: " + crns);
  }

  let arr: Class[] = [];
  for (let i = 0; i < crns.length; i++) {
    let x = new Class(crns[i]);
    if (checkClass(x)) arr.push(x);
  }
  ClassGroups.push(arr);
}

let earliestTime = [0, 0, 0, 0, 0];
let latestTime = [1440, 1440, 1440, 1440, 1440];
let lowestRating = 0;
let highestRating = 5;

/**
 * Check if the class is valid
 * @param classX The class
 */
function checkClass(classX: Class) {
  if (
    classX.professor.rating < lowestRating ||
    classX.professor.rating > highestRating
  )
    return false;

  for (let i = 0; i < 5; i++) {
    if (classX.startTime[i] == 0) continue;
    if (classX.startTime[i] < earliestTime[i]) return false;
    if (classX.endTime[i] > latestTime[i]) return false;
  }

  return true;
}

/**
 * Get the best schedule
 * @param requests The requests [[CRN or Course Number, ...], ...]
 */
export function createSchedule(requests: string[][]) {
  curSchedule = [];
  ClassGroups = [];
  schedules = [];
  earliestTime = [0, 0, 0, 0, 0];
  latestTime = [1440, 1440, 1440, 1440, 1440];
  lowestRating = 0;
  highestRating = 5;

  // console.log(requests.length);
  // Loop through pairs of options
  for (let t = 0; t < requests.length; t++) {
    let request = requests[t];
    let tmp: Class[] = [];

    // Loop through each choice within the pair
    for (let i = 0; i < request.length; i++) {
      let pos = request[i].split(" ");
      if (pos[0].substring(0, 3) == "CRN") {
        let num = parseInt(pos[1]);
        tmp.push(new Class(num));
      } else {
        let arr = getAllClass(request);
        for (let j = 0; j < arr.length; j++) {
          let num = arr[j];
          // console.log(request);
          if (typeof num !== "number") continue;
          tmp.push(new Class(num));
        }
      }
    }
    ClassGroups.push(tmp);
  }
  makeSchedule(0);
  // printing the output: json
  // console.log("{");
  // for (let i = 0; i < schedules.length; i++) {
  //   console.log('\t"' + toString(i) + '": {'); // open {
  //   console.log(
  //     '\t\t"' +
  //       "Average Professor Rating" +
  //       '": ' +
  //       schedules[i].avgProfessorRating,
  //   );
  //   console.log(
  //     '\t\t"' +
  //       "Total Time On Campus (Minutes)" +
  //       '": ' +
  //       schedules[i].totalTimeOnCampus,
  //   );
  //   console.log(
  //     '\t\t"' +
  //       "Number Of Days On Campus" +
  //       '": ' +
  //       schedules[i].totalDaysOnCampus,
  //   );
  //   console.log(
  //     '\t\t"' + "Total Walking Distance" + '": ' + schedules[i].totalDistance,
  //   );
  //   console.log('\t\t"' + "Classes CRNs" + '": ['); // open [
  //
  //   for (let j = 0; j < schedules[i].classNum; j++) {
  //     if (j == schedules[i].classNum - 1) {
  //       console.log("\t\t\t" + toString(schedules[i].classes[j].crn));
  //     } else console.log("\t\t\t" + toString(schedules[i].classes[j].crn) + ",");
  //   }
  //
  //   console.log("\t\t]"); // close ]
  //   console.log("\t},");
  // }
  // console.log("}");

  return schedules;
}

export function main() {
  let result1 = getAllClass("CSCI1302");
  console.log(result1);
  //let result2 = getAllClassProf('CSCI1302', 'Bradley Barnes')
  //console.log(result2)

  // CSCI 1302
  ClassGroups.push([
    new Class(26245),
    new Class(26311),
    new Class(36424),
    new Class(64229),
    new Class(69400),
  ]);
  // CSCI 2610
  ClassGroups.push([
    new Class(26368),
    new Class(26372),
    new Class(43005),
    new Class(64228),
  ]);
  // PHYS 1112
  ClassGroups.push([
    new Class(27133),
    new Class(27144),
    new Class(27150),
    new Class(45173),
  ]);
  // ENGL 1101
  ClassGroups.push([
    new Class(27603),
    new Class(27662),
    new Class(27667),
    new Class(27670),
  ]);

  makeSchedule(0);

  console.log(schedules.length);

  for (let i = 0; i < schedules.length; i++) {
    schedules[i].output();
  }
}
