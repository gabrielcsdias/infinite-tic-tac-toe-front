// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Infinite Tic Tac Toe - Online Multiplayer",
  description:
    "Play Infinite Tic Tac Toe online with friends. An endless version of the classic Tic Tac Toe (Jogo da Velha Infinito) with real-time multiplayer matches.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="h3EmKu3aV2V8vwpkFXMaxBO-7eu6SSu22d-sp8_psDg"
        />
        <link
          rel="canonical"
          href="https://infinite-tic-tac-toe-front.vercel.app/"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Asimovian&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Asimovian&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-nunito antialiased">{children}</body>
    </html>
  );
}
