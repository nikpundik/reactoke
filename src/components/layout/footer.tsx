import { FC, PropsWithChildren } from "react";

const Footer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-red-900 p-4 w-full">
      {children}
    </footer>
  );
};

export default Footer;
