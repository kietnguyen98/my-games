// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local

type clockProps = {
  isDone: boolean;
  isStart: boolean;
};

const Clock: FunctionComponent<clockProps> = ({ isDone, isStart }) => {
  const [timerString, setTimerString] = React.useState<string>("00:00:00");

  React.useEffect(() => {
    var second = 0;
    const getTimeString = (time: number) => {
      let valString: string = time.toString();
      if (valString.length < 2) {
        valString = "0" + valString;
      }
      return valString;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isStart) {
      let interval = window.setInterval(() => {
        second = second + 1;
        let secondsString = getTimeString(second % 60);
        let minutesString = getTimeString(Math.floor(second / 60));
        let hoursString = getTimeString(Math.floor(second / 3600));
        setTimerString(hoursString + ":" + minutesString + ":" + secondsString);
      }, 1000);

      if (isDone) {
        window.clearInterval(interval);
      }

      return () => {
        window.clearInterval(interval);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone, isStart]);

  return (
    <div className="relative w-fit">
      <img
        className="h-14 w-14 absolute -left-7 -top-3"
        src="images/commons/alarm-clock-1.png"
        alt="timer"
      ></img>
      <div className="px-8 py-0 border-4 border-solid border-pink-500/80 rounded-full bg-slate-50">
        <p className="text-xl font-bold text-slate-600 tracking-wider">
          Play time: {timerString}
        </p>
      </div>
    </div>
  );
};

export default Clock;
