import "@/styles/globals.css";
import { ImageProvider } from "@/context/imageProvider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ImageProvider>
      <Component {...pageProps} />
    </ImageProvider>
  );
}
