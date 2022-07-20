export const displayPlayTime = (timeString: string) => {
  var seconds = timeString.substring(6, 8);
  var minutes = timeString.substring(3, 5);
  var hours = timeString.substring(0, 2);
  var secondsStr: string = "";
  var minutesStr: string = "";
  var hoursStr: string = "";
  if (parseInt(seconds) >= 0) secondsStr = seconds + "(s)";
  if (parseInt(minutes) > 0) minutesStr = minutes + "(m) ";
  if (parseInt(hours) > 0) hoursStr = hours + "(h) ";
  return hoursStr + minutesStr + secondsStr;
};
