import { FC, TouchEvent, useRef, useState, WheelEvent } from "react";
import PlayIcon from "./PlayIcon";

const songs = [
  { title: "Soaked", slug: "soaked" },
  { title: "Foggy Glasses", slug: "foggy" },
  { title: "Qui con me", slug: "qui" },
];

const commonClassNames =
  "absolute origin-left pl-[320px] transition-transform ease-out duration-200 truncate hover:cursor-pointer";
const classNames = {
  primary: [commonClassNames, "text-8xl"].join(" "),
  secondary: [commonClassNames, "text-6xl", "text-indigo-200"].join(" "),
};

const useTouchWheel = (moveNext: () => void, movePrev: () => void) => {
  const lastYRef = useRef(0);

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const deltaY = event.touches[0].clientY - lastYRef.current;
    if (deltaY > 30) {
      moveNext();
    } else if (deltaY < -30) {
      movePrev();
    }
    lastYRef.current = event.touches[0].clientY;
  };

  const onTouchEnd = () => {
    lastYRef.current = 0;
  };

  return {
    onTouchMove,
    onTouchEnd,
  };
};

const useMouseWheel = (moveNext: () => void, movePrev: () => void) => {
  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      moveNext();
    } else {
      movePrev();
    }
  };

  return {
    onWheel,
  };
};

type WheelProps = {
  selectSong: (slug: string) => void;
};

const Wheel: FC<WheelProps> = ({ selectSong }) => {
  const [index, setIndex] = useState(0);
  const moveNext = () =>
    setIndex((prev) => (prev < songs.length - 1 ? prev + 1 : prev));
  const movePrev = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const desktopHandlers = useMouseWheel(moveNext, movePrev);
  const mobileHandlers = useTouchWheel(moveNext, movePrev);
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.84)), url('/bg/truck.jpeg')",
      }}
      className="flex flex-col justify-center gap-16 relative ml-[-260px] overflow-hidden h-full bg-top bg-cover"
      {...desktopHandlers}
      {...mobileHandlers}
    >
      {songs.map((song, i) => {
        const active = i === index;
        return (
          <button
            className={active ? classNames.primary : classNames.secondary}
            key={song.slug}
            onClick={() => selectSong(song.slug)}
            style={{ transform: `rotate(${(-index + i) * 15}deg)` }}
          >
            <span>{song.title}</span>
            {active && (
              <span className="absolute left-[280px] top-[calc(50%-12px)] text-2xl animate-pulse">
                <PlayIcon />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Wheel;
