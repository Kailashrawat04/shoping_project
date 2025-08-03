import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ImageUpload = ({ onImageUpload, label }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      onImageUpload(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1"
      />
      {image && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="h-32 w-32 object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
