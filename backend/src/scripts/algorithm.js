import fs from "fs";
import { Module } from "module";

export class Professor {
	constructor(firstName, lastName, rating) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.rating = rating;
	}

	output() {
		console.log("Professor Name: " + this.fname + this.lname + "\n");
		console.log("Rating: " + this.rating);
	}
}

export function findProfessor(professor) {
	// Input: one string
	let pos = professor.split(" ");
	let fname = pos[0];
	let finitial = fname[0];
	let lname = pos[1];
	for (let i = 2; i < pos.length; i++) {
		lname += " " + pos[i];
	}

	let finitiallname = finitial + " " + lname;
	fs.readFile("./src/ugaProfessors.json", "utf8", (err, data) => {
		if (err) {
			console.error(err);
		}

		let obj = JSON.parse(data);
		// console.log(obj)

		if (obj[finitiallname] !== undefined) {
			// console.log(obj[finitiallname])
			let curObj = obj[finitiallname];
			return new Professor(
				curObj.firstName,
				curObj.lastName,
				curObj.avgRating
			);
		}
	});
}

export function getClass(crn) {
	let finalResult = [];
	fs.readFile("./src/courses.json", "utf8", (err, data) => {
		if (err) {
			console.error(err);
		}

		let obj = JSON.parse(data);
		// console.log(obj)

		let objList = Object.values(obj);

		const result = objList.filter((c) => crn == c.crn);

		// console.log(result)

		finalResult = result;
		//type array
	});
	return finalResult;
}

// Define the class structure
export class Class {
	constructor(crn) {
		let result = getClass(crn);
		console.log(typeof result);
		this.courseNumber = result[0].courseNumber;
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
			console.log(this.location[i] + " " + this.room[i] + "\n");
		}
	}
}
// Define the Schedule structure
export class Schedule {
	constructor(classes) {
		this.classes = classes;
		this.numClasses = classes.length;
		// write later
		this.totalTimeOnCampus = 0;
		let sumProfRating = 0;
		for (let i = 0; i < this.numClasses; i++) {
			sumProfRating += classes[i].professor.rating;
		}
		this.avgProfessorRating = sumProfRating / this.numClasses;
		// write later
		this.totalDistance = 0;
	}
	output() {
		for (let i = 0; i < this.numClasses; i++) {
			this.classes[i].output();
		}
	}
}
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
	let numClasses = ClassGroups[i].length;
	for (let j = 0; j < numClasses; j++) {
		let classX = ClassGroups[i][j];
		console.log(classX instanceof Class);
		if (pushable(classX)) {
			curSchedule.push(classX);
			makeSchedule(i + 1);
			curSchedule.pop();
		}
	}
}

export function main() {
	// CSCI 1302
	ClassGroups.push([
		Class(26245),
		Class(26311),
		Class(36424),
		Class(64229),
		Class(69400),
	]);
	// CSCI 2610
	ClassGroups.push([Class(26368), Class(26372), Class(43005), Class(64228)]);
	// PHYS 1112
	ClassGroups.push([Class(27133), Class(27144), Class(27150), Class(45173)]);
	// ENGL 1101
	ClassGroups.push([Class(27603), Class(27662), Class(27667), Class(27670)]);

	makeSchedule(0);

	console.log(schedules.length);

	for (let i = 0; i < schedules.length; i++) {
		schedules[i].output();
	}
}
