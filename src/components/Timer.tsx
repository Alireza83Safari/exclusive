import React, { useEffect, useState } from "react";

type TimeProps = {
  hour: number;
};

export default function Timer({ hour }: TimeProps) {
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(timer);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <div className="lg:text-base text-sm flex">
      <div className="lg:w-14 lg:h-14 h-11 w-11 rounded-xl text-white-100 md:mr-6 mr-3">
        <p className="text-xs">hours</p>
        <p className="text-lg font-bold">
          {hours !== undefined ? hours.toString().padStart(2, "0") : "00"}
        </p>
      </div>
      <div className="lg:w-14 lg:h-14 h-11 w-11 rounded-xl text-white-100 md:mr-6 mr-3">
        <p className="text-xs">minutes</p>
        <p className="text-lg font-bold">
          {minutes !== undefined ? minutes.toString().padStart(2, "0") : "00"}
        </p>
      </div>
      <div className="lg:w-14 lg:h-14 h-11 w-11 rounded-xl text-white-100 md:mr-6 mr-3">
        <p className="text-xs">seconds</p>
        <p className="text-lg font-bold">
          {seconds !== undefined ? seconds.toString().padStart(2, "0") : "00"}
        </p>
      </div>
    </div>
  );
}
