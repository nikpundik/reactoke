import { FC, useEffect, useState } from "react";

type TimerProps = {
  target: number;
  timeRef: React.MutableRefObject<number>;
};

const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const getClassName = (index: number, selected: boolean) => {
  const current = ["w-2 h-2"];
  if (selected) {
    current.push("bg-indigo-400");
  } else {
    current.push("bg-indigo-900");
  }
  if (index === 0) {
    current.push("rounded-l-sm");
  } else if (index === steps.length - 1) {
    current.push("rounded-r-sm");
  }
  return current.join(" ");
};

const Timer: FC<TimerProps> = ({ target, timeRef }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const countdown = () => {
      setCounter(Math.max(0, Math.round(target - timeRef.current)));
    };
    const i = setInterval(countdown, 200);
    countdown();
    return () => {
      clearInterval(i);
    };
  }, [target]);

  return (
    <div className="flex gap-4">
      <div className="flex gap-1">
        {steps.map((index) => (
          <div
            className={getClassName(index, index <= counter)}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
