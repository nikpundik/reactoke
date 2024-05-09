import { useEffect, useState } from "react";

export type Song = {
  lyrics: { text: string; timestamp: number }[];
  audio: string;
  cover: string;
};

const useSong = (name: string): Song | null => {
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    let ignore = false;
    setSong(null);
    fetch(`/songs/${name}/lyrics.json`)
      .then((result) => result.json())
      .then((result: Song["lyrics"]) => {
        if (!ignore) {
          setSong({
            lyrics: result,
            audio: `/songs/${name}/song.mp3`,
            cover: `/songs/${name}/cover.jpeg`,
          });
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  return song;
};

export default useSong;
