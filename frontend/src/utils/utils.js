// 2024-06-19T23:41:36.486Z

export const formatTime = (inputTime) => {
  const [date,time] = inputTime.split("T");
  const [year, month, day] = date.split("-");
  let [hour, minutes, seconds] = time.split(".")[0].split(":");
  let timeOfDay;
  hour = hour - 4
  if (hour > 12) {
    hour = hour - 12
    timeOfDay = "PM"
  } else {
    timeOfDay = "AM"
  }
  return `${month}/${day}/${year} at ${hour}:${minutes}:${seconds}${timeOfDay}`
}