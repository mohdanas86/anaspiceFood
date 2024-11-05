import React, { useEffect, useState } from "react";

const Time = () => {
  const [indianFormat, setIndeanFormat] = useState(false);
  const [time, setTime] = useState({
    hour: "",
    min: "",
    sec: "",
    ms: "",
    day: "",
    month: "",
    year: "",
    zone: "",
    fullYear: "",
    AMPM: "",
  });

  useEffect(() => {
    // Set an interval to update the time every 500ms for better accuracy on milliseconds
    const intervalId = setInterval(() => {
      const date = new Date();

      setTime({
        AMPM: indianFormat ? date.getHours() : date.getHours(),
        hour: indianFormat ? date.getHours() % 12 || 12 : date.getHours(),
        min: indianFormat ? date.getMinutes() : date.getMinutes(),
        sec: indianFormat ? date.getSeconds() : date.getSeconds(),
        ms: indianFormat ? date.getMilliseconds() % 60 : date.getMilliseconds() % 60,
        day: indianFormat ? date.getDate() : date.getDate(), // Use getDate() for day of the month
        month: indianFormat ? date.getMonth() + 1 : date.getMonth(), // Adjust to 1-indexed month
        year: indianFormat ? date.getFullYear() : date.getFullYear(),
        zone: `${Math.floor(-date.getTimezoneOffset() / 60)}:${Math.abs(
          date.getTimezoneOffset() % 60
        )
          .toString()
          .padStart(2, "0")}`,
        fullYear: date.getUTCFullYear(),
      });
    }, 100);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [indianFormat]);

  return (
    <div className="w-full px-4">
      <h2 className="mt-4 font-semibold text-slate-800 text-2xl">
        Your check is 0.2 seconds ahead.
      </h2>

      <div className="conBox grid grid-cols-3 gap-4 w-[60%] text-slate-800 mt-4">
        <div className="conBoxItems py-3 px-4 bg-gray-300 grid grid-cols-1 relative h-14">
          <span className="absolute left-2 top-1 capitalize font-semibold text-xl">Time Zone</span>
          <span className="absolute right-2 bottom-2">{time.zone} (HH:MM)</span>
        </div>
        <div className="conBoxItems py-3 px-4 bg-gray-300 grid grid-cols-1 relative h-14">
          <span className="absolute left-2 top-1 capitalize font-semibold text-xl">date</span>
          <span className="absolute right-2 bottom-2">
            {String(time.day).padStart(2, "0")} :
            {String(time.month).padStart(2, "0")} :{time.year}
          </span>
        </div>
        <button className="conBoxItems py-3 px-4 bg-gray-300 grid grid-cols-1 relative font-semibold duration-300" onClick={(e) => setIndeanFormat(e => !e)}>
          {!indianFormat ? "12 Hour Format" : "24 Hour Format"}
        </button>
      </div>

      {/* TIME CONTAINER */}
      <div className="time-container mx-auto w-full justify-center items-center flex mt-[3%]">
        <span className="text-[7rem] font-bold text-slate-900 duration-300">
          {String(time.hour).padStart(2, "0")} <span>: </span>
          {String(time.min).padStart(2, "0")} <span>: </span>
          {String(time.sec).padStart(2, "0")}
          <span className="text-[2rem]">
            <span> : </span> {String(time.ms).padStart(2, "0")}
          </span><span> </span>
          <span>
            {time.AMPM > 12 ? "PM" : "AM"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Time;
