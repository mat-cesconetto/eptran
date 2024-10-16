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
    <div className="w-full bg-neutral-200 h-80 mt-4 text-center relative cursor-pointer" onClick={handleImageClick}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          width={200}
          height={200}
          alt="Foto de perfil"
          className="m-auto align-middle pt-[8%] rounded-full object-cover"
        />
      ) : (
        <Image
          src="/default-user.svg"
          width={200}
          height={200}
          alt="Default User"
          className="m-auto align-middle pt-[8%] rounded-full object-cover"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={hiddenFileInput}
        className="hidden"
      />
      <p className="text-[#003966] font-normal pt-4">Clique na imagem para adicionar ou alterar a foto de perfil</p>
    </div>
  );
};

export default Photo;
