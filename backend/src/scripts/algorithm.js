import fs from "fs";

let professors;
let courses;

try {
	const professorsData = fs.readFileSync("./src/ugaProfessors.json", "utf8");
	professors = JSON.parse(professorsData);

	const coursesData = fs.readFileSync("./src/courses.json", "utf8");
	courses = JSON.parse(coursesData);
} catch (err) {
	console.error(err);
}

export class Professor {
	constructor(firstName, lastName, rating) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.rating = rating;
	}

	output() {
		console.log(
			"Professor Name: " + this.firstName + " " + this.lastName + "\n"
		);
		console.log("Rating: " + this.rating);
	}
}

export function findProfessor(professor) {
	console.log(professor);
	// Input: one string
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
		return new Professor(
			curObj.firstName,
			curObj.lastName,
			curObj.avgRating
		);
	}
	return new Professor("Unknown", "Unknown", 0);
}

export function getClass(crn) {
	let finalResult = [];

	let objList = Object.values(courses);
	finalResult = objList.filter((c) => crn == c.crn);

	if (finalResult.length == 0) {
		return "No class found";
	}

	return finalResult;
}

// Define the class structure
export class Class {
	constructor(crn) {
		let result = getClass(crn);
		console.log(typeof result);
		this.courseNumber = result[0].courseNumber;
		console.log(this.courseNumber);
		this.courseName = result[0].courseName;
		this.crn = crn;
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
				this.endTime[id] = parseInt(
					bruh[1].substring(0, 2) * 60 +
						parseInt(bruh[1].substring(2, 4))
				);
				this.location[id] = result[i].building;
				this.rooms[id] = result[i].room;
			}
		}
	}
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
})();
// Function to check overlapping
function overlapping(a1, b1, a2, b2) {
	var _a;
	if (a1 > a2) {
		(_a = [a2, a1]), (a1 = _a[0]), (a2 = _a[1]);
	}
	// a1 <= a2
	// a1 <= b1
	if (b1 >= a2) return true;
	else return false;
}
// Function to check if there's a conflict in time with the current class
function ConflictTime(classX, classY) {
	for (var i = 0; i < 5; i++) {
		if (classX.startTime[i] == 0 || classY.startTime[i] == 0) continue;
		if (
			overlapping(
				classX.startTime[i],
				classX.endTime[i],
				classY.startTime[i],
				classY.endTime[i]
			)
		)
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
		if (ConflictTime(classX, curSchedule[i])) return false;
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
