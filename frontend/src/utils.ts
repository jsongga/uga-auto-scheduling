let uid = 0;

export function generateUID() {
  return uid++;
}

/**
 * Convert to "2024-02-06T10:30:00" format
 * @param time minutes since midnight
 * @returns string[]
 */
export function convertToTTime(time: number[]) {
  const monday = "2024-02-";
  const start = 12;
  const result = [];

  for (let i = 0; i < 5; i++) {
    const day = start + i;
    const date = monday + day.toString().padStart(2, "0");
    const timeHours = (time[i] - (time[i] % 60)) / 60;
    const timeMinutes = time[i] % 60;

    const timeHoursPadded = timeHours.toString().padStart(2, "0");
    const timeMinutesPadded = timeMinutes.toString().padStart(2, "0");

    result.push(`${date}T${timeHoursPadded}:${timeMinutesPadded}:00`);
  }

  return result;
}
