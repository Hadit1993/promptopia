import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metaData: Metadata = {
  title: "Propmptia",
  description: "Discover & Share AI Prompts",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
