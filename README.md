# Scheduler

## Developers

John Song, Rishith Auluka, and Hiep Pham

## Description

Scheduler is a sohpiosticated scheduling application that allows users to easily plan out
their classes for their next semester. Users can almost instantly add create hundreds of
combinations of classes and view them in a calendar view. Scheduler takes in all the courses
in a given semester, scrapes RateMyProfessor to find the best professors and utilizes the
Google Maps Geolocation to calculate the walking time between classes. Given the classes one
wants to take during a semester, Scheduler fetches every possible combination of classes and
nicely filters it onto a responsive weekly calendar view.

![image](https://github.com/jsongga/uga-auto-scheduling/assets/128270303/ebf3d832-71be-4467-b9ec-a4bb4abc40a5)
![image](https://github.com/jsongga/uga-auto-scheduling/assets/128270303/9a711c59-364f-4fbb-87d6-731604501be9)
![image](https://github.com/jsongga/uga-auto-scheduling/assets/128270303/7deb1009-2b71-4e85-9a64-b2ee0f800470)
![image](https://github.com/jsongga/uga-auto-scheduling/assets/128270303/a4567205-db76-4e38-b178-121e77809024)



## Tools Utilized

React w/ Typescript
Vite
Auth0
Node.js
bun.js
Python (scraping and parsing data)

## Problems

Getting data off of RMP and Athena was a struggle. We had to look into JQuery and browser HTML editors
to find an efficient solution. Offering filtering solutions to display schedules to users was also an issue.
More filters are in-progress, but the main ones are up.

## Public Frameworks

React.js
Material-UI/Joy-UI
