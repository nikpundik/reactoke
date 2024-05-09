import { FC, PropsWithChildren, Dispatch, SetStateAction } from "react";

const Layout: FC<
  PropsWithChildren & { setView: Dispatch<SetStateAction<string>> }
> = ({ children, setView }) => {
  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-white">
      <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-red-900 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reactoke</h1>
        <div className="flex gap-4">
          <button onClick={() => setView("wheel")}>songs</button>
          <button onClick={() => setView("creator")}>creator</button>
        </div>
      </header>
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
};

export default Layout;
