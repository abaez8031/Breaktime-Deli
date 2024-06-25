// 2024-06-19T23:41:36.486Z
// 2024-06-20T04:15:34.322Z

export const formatTime = inputTime => {
  let [date, time] = inputTime.split("T");
  let [year, month, day] = date.split("-");
  let [hour, minutes, seconds] = time.split(".")[0].split(":");
  
  // Convert to local time by subtracting 4 hours
  hour = parseInt(hour) - 4;
  
  // Handle day wrap-around if hour is negative
  if (hour < 0) {
    hour += 24;
    // Adjust the date backward by one day
    const dateObj = new Date(year, month - 1, day);
    dateObj.setDate(dateObj.getDate() - 1);
    [year, month, day] = [
      dateObj.getFullYear(),
      String(dateObj.getMonth() + 1).padStart(2, '0'),
      String(dateObj.getDate()).padStart(2, '0')
    ];
  }
  
  let timeOfDay = 'AM';
  if (hour >= 12) {
    timeOfDay = 'PM';
    if (hour > 12) {
      hour -= 12;
    }
  } else if (hour === 0) {
    hour = 12;
  }

  const formattedHour = String(hour).padStart(2, '0');
  
  return `${month}/${day}/${year} at ${formattedHour}:${minutes}:${seconds}${timeOfDay}`;
}

export const calcReviewAvg = (reviews) => {
  let total = 0;
  reviews.forEach(review => {
    total += review.rating
  })
  return total / reviews.length
}

export const calculateReviewsDistribution = (reviews) => {
  const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  reviews.forEach(review => {
    distribution[review.rating] += 1
  })
  return distribution;
}

export const formatIngredientName = (name) => {
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};