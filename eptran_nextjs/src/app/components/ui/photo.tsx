"use client";

import React, { useState } from "react";
import Image from "next/image";

const Photo: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  return (
    <div 
      className="w-full bg-neutral-200 h-60 sm:h-72 md:h-80 mt-4 text-center relative cursor-pointer flex flex-col items-center justify-center" 
      onClick={handleImageClick}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          width={200}
          height={200}
          alt="Foto de perfil"
          className="rounded-full object-cover w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
        />
      ) : (
        <Image
          src="/default-user.svg"
          width={200}
          height={200}
          alt="Default User"
          className="rounded-full object-cover w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={hiddenFileInput}
        className="hidden"
      />
      <p className="text-[#003966] font-normal mt-4 text-sm sm:text-base">
        Clique na imagem para adicionar ou alterar a foto de perfil
      </p>
    </div>
  );
};

export default Photo;