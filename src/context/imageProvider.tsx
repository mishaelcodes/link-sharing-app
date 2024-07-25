import React, { createContext, useState, useContext, ReactNode } from "react";

interface ImageContextProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
