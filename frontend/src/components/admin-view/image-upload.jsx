import React, { useState, useRef } from "react";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageUpload = ({ onImageUpload, label }) => {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      onImageUpload(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-10 cursor-pointer ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUpload size={48} className="text-gray-400 mb-2" />
        <p className="text-gray-500 text-center">Drag & drop or click to upload image</p>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
      <Button
        onClick={() => onImageUpload(image)}
        disabled={!image}
        className="mt-4 w-full bg-black text-white hover:bg-gray-900"
      >
        Upload
      </Button>
      {image && (
        <div className="mt-4">
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
