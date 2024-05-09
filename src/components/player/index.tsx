import { FC, ReactEventHandler, useRef, useState } from "react";
import Timer from "../timer";
import Footer from "../layout/footer";
import useSong, { Song } from "./useSong";

type PlayerContainerProps = {
  slug: string;
};

const PlayerContainer: FC<PlayerContainerProps> = ({ slug }) => {
  const song = useSong(slug);
  if (!song) return null;
  return <Player song={song} />;
};

const Player: FC<{ song: Song }> = ({ song }) => {
  const { lyrics, audio, cover } = song;

  const timeRef = useRef(0);
  const [index, setIndex] = useState(-1);

  const updateLyrics: ReactEventHandler<HTMLAudioElement> = (event) => {
    timeRef.current = event.currentTarget.currentTime;
    const current =
      lyrics.findIndex(({ timestamp }) => timestamp >= timeRef.current) - 1;
    if (current >= 0) {
      setIndex(current);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("${cover}")`,
        }}
        className="p-4 flex-1 flex flex-col items-center justify-center gap-2 w-full bg-center bg-cover"
      >
        <p className="text-6xl text-center font-bold text-[#F2F2F2] tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.95)]">
          {lyrics[index] ? lyrics[index]?.text || "♬" : ""}
        </p>
        <p className="text-4xl text-center text-[#CCCCCC] tracking-wide drop-shadow-md">
          {lyrics[index + 1] ? lyrics[index + 1]?.text || "♬" : ""}
        </p>
        <p className="text-4xl text-center text-[#CCCCCC] tracking-wide drop-shadow-md">
          {lyrics[index + 2] ? lyrics[index + 2]?.text || "♬" : ""}
        </p>
        {lyrics[index + 1] && (
          <div className="m-4">
            <Timer target={lyrics[index + 1].timestamp} timeRef={timeRef} />
          </div>
        )}
      </div>
      <Footer>
        <div className="flex items-center justify-center w-full">
          <audio onTimeUpdate={updateLyrics} controls autoPlay>
            <source src={audio} type="audio/mpeg" />
          </audio>
        </div>
      </Footer>
    </div>
  );
};

export default PlayerContainer;
