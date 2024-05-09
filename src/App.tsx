import { useState } from "react";
import "./App.css";
import Creator from "./components/creator";
import Player from "./components/player";
import Wheel from "./components/wheel";
import Layout from "./components/layout";

function App() {
  const [slug, setSlug] = useState<string>("");
  const [view, setView] = useState("wheel");
  const selectSong = (slug: string) => {
    setSlug(slug);
    setView("player");
  };
  return (
    <Layout setView={setView}>
      {view === "creator" && <Creator />}
      {view === "player" && <Player slug={slug} />}
      {view === "wheel" && <Wheel selectSong={selectSong} />}
    </Layout>
  );
}

export default App;
