import { FC, useState, WheelEvent } from "react";
import { SwipeCallback, useSwipeable } from "react-swipeable";
import PlayIcon from "./PlayIcon";

const songs = [
  { title: "Soaked", slug: "soaked" },
  { title: "Foggy Glasses", slug: "foggy" },
  { title: "Qui Con Me", slug: "qui" },
  { title: "Out to Sea", slug: "sea" },
  { title: "Here With Me", slug: "here" },
];

const commonClassNames =
  "absolute origin-left pl-[320px] transition-transform ease-out duration-200 truncate hover:cursor-pointer";
const classNames = {
  primary: [commonClassNames, "md:text-8xl text-6xl drop-shadow-lg"].join(" "),
  secondary: [commonClassNames, "md:text-6xl text-4xl", "text-indigo-200"].join(
    " "
  ),
};

const useTouchWheel = (moveNext: () => void, movePrev: () => void) => {
  const onSwiped: SwipeCallback = (event) => {
    if (event.dir === "Up") {
      moveNext();
    } else if (event.dir === "Down") {
      movePrev();
    }
  };
  const handlers = useSwipeable({
    onSwiped,
  });

  return handlers;
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
      {...mobileHandlers}
      {...desktopHandlers}
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
              <span className="absolute left-[280px] top-[calc(50%-12px)] text-base md:text-2xl animate-pulse">
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
