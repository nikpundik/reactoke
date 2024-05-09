import { FC, ReactEventHandler, useEffect, useReducer, useRef } from "react";
import Footer from "../layout/footer";
import useSong, { Song } from "../player/useSong";

type CreatorState = {
  index: number;
  lyrics: Song["lyrics"];
};

type CreatorActions =
  | {
      type: "STORE";
      timestamp: number;
    }
  | {
      type: "BACK";
    };

const reducer = (state: CreatorState, action: CreatorActions) => {
  switch (action.type) {
    case "STORE": {
      const newLyrics = [...state.lyrics];
      newLyrics[state.index].timestamp = action.timestamp;
      return {
        ...state,
        index: state.index + 1,
        lyrics: newLyrics,
      };
    }
    case "BACK": {
      return {
        ...state,
        index: state.index - 1,
      };
    }
  }
  return state;
};

const CreatorContainer: FC = () => {
  const song = useSong("foggy");
  if (!song) return null;
  return <Creator song={song} />;
};

const Creator: FC<{ song: Song }> = ({ song }) => {
  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    lyrics: song.lyrics,
  });
  const timeRef = useRef(0);

  const updateLyrics: ReactEventHandler<HTMLAudioElement> = (event) => {
    timeRef.current = event.currentTarget.currentTime;
  };

  useEffect(() => {
    const saveTime = (event: KeyboardEvent) => {
      if (event.code == "Space") {
        dispatch({ type: "STORE", timestamp: timeRef.current });
        event.preventDefault();
        event.stopPropagation();
      }
      if (event.code == "Backspace") {
        dispatch({ type: "BACK" });
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("keydown", saveTime);
    return () => {
      document.removeEventListener("keydown", saveTime);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/bg/rollercoaster.jpeg")',
        }}
        className="p-4 flex-1 w-full bg-center bg-cover min-h-0"
      >
        <div className="h-full overflow-auto text-center">
          {state.lyrics.map(({ text, timestamp }, index) => (
            <div
              className={
                index === state.index
                  ? "text-3xl font-bold"
                  : "text-xl text-slate-300"
              }
              key={index}
            >
              {text || "[EMPTY LINE]"} {timestamp}
            </div>
          ))}
        </div>
      </div>
      <Footer>
        <div className="flex items-center gap-8 justify-center w-full">
          <button
            onClick={() => {
              const output = JSON.stringify(state.lyrics);
              navigator.clipboard.writeText(output);
              console.log(output);
            }}
          >
            Copy
          </button>
          <audio onTimeUpdate={updateLyrics} controls>
            <source src={song.audio} type="audio/mpeg" />
          </audio>
        </div>
      </Footer>
    </div>
  );
};

export default CreatorContainer;
