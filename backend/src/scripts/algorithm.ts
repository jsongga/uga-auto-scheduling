import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// Define a function to get the rating of a professor
function getProfessorRating(professor) {
  // Implementation for getting the professor's rating
  return 0
}


// Define a function to process the time frame of a class
function processTime(classX) {
  // Implementation for processing the time frame
}

// Define the class structure
class Class {
  constructor(courseNumber, professor, crn, startTime, endTime, location) {
    this.courseNumber = courseNumber;
    this.professor = professor;
    this.crn = crn;
    this.startTime = startTime; // vector<int>[5]: M, T, W, R, F
    this.endTime = endTime; // vector<int>[5]: M, T, W, R, F
    this.location = location; // string
  }
}

// Define the Schedule structure
class Schedule {
  constructor(averageProfessorRating, minProfessorRating, classes) {
    this.averageProfessorRating = averageProfessorRating;
    this.minProfessorRating = minProfessorRating;
    this.classes = classes; // Vector of Class instances
  }
}

// Vector of vectors to store groups of classes
let vt = [];

// Function to sort the vector of classes
function sortClasses() {
  // Implementation for sorting classes
}

// Function to check overlapping
function overlapping(a1, b1, a2, b2) {
  if (a1 > a2) {
    [a1, a2] = [a2, a1]
  }
  // a1 <= a2
  // a1 <= b1
  if (b1 >= a2) return true
  else return false
}

// Function to check if there's a conflict in time with the current class
function notConflictTime(classX, classY) {
  // Implementation for checking time conflicts
  let startTimeX = classX.startTime
  let endTimeX = classX.endTime
  let startTimeY = classY.startTime
  let endTimeY = classY.endTime
  for (let i = 0 ; i < 5 ; i++) {
    let st1 = startTimeX[i]
    if (st1 == 0) continue
    let en1 = endTimeX[i]
    let st2 = startTimeY[i]
    if (st2 == 0) continue
    let en2 = endTimeY[i]
    if (overlapping(st1, en1, st2, en2)) return false
  }
  return true
}

let curSchedule = []

// Function to take a class
function take(classX) {
  // Implementation for taking a class
  curSchedule.push(classX)
}

// Function to untake a class
function untake(classX) {
  // Implementation for untaking a class
}

// Check if ClassX is ok to take
function Ok(classX) {
  
}


// Function to make the schedule recursively
function makeSchedule(pos) {
  if (pos === vt.length) {
    // Get the schedule here
  }
  for (let c of vt[pos]) {
    if (Ok(c)) {
      curSchedule
      makeSchedule(pos + 1);
      untake(c);
    }
  }
}
