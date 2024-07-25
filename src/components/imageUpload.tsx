import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { useImage } from "@/context/imageProvider";
import galleryIcon from "@/images/galleryIcon.svg";
import auth from "@/firebase/auth";

const ImageUploadForm: React.FC = () => {
  const {setImage} = useImage()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | "">("");
  const [error, setError] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState("")

  const user = auth.currentUser
  useEffect(() => {
    if (user && user.photoURL) {
      const src = user.photoURL.slice(3)
      setProfilePicture(src || "");
    }
  }, [user])
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const img = new window.Image();
      img.onload = () => {
        if (img.width > 1024 || img.height > 1024) {
          setError("Image must be less than 1024x1024 pixels.");
        } else {
          setSelectedFile(file);
          const imageURL = URL.createObjectURL(file)
          setPreview(imageURL);
          setImage(imageURL)
          setError("");
        }
      };
      img.src = URL.createObjectURL(file);

      if (!["image/png", "image/jpeg"].includes(file.type)) {
        setError("Only PNG and JPG formats are allowed.");
        return;
      }
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <form className="flex flex-col items-center justify-center gap-6 self-start">
      <div className="flex flex-col px-[38px] py-[60px] items-center self-start justify-center rounded-xl bg-fadedPurple">
        <div className="flex flex-col items-center gap-2">
          {profilePicture || preview ? (
            <div className="relative w-24 h-24 flex items-center justify-center border rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profilePicture}
                alt="Selected Image"
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <Image src={galleryIcon} alt="Upload Icon" />
          )}
          <p
            onClick={handleButtonClick}
            className="text-purple text-base font-semibold leading-normal "
          >
            + Upload Image
          </p>
        </div>
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />
      {selectedFile && !error && (
        <p className="text-green-500">Selected file: {selectedFile.name}</p>
      )}
      <p className={`${error ? "text-red" : "text-grey"}`}>
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </form>
  );
};

export default ImageUploadForm;
