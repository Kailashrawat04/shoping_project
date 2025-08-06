import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "@/store/admin/products-slice";
import { addProductFormElements } from "@/config";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/admin-view/image-upload";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.adminProducts);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    totalStock: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (file) => {
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("price", parseFloat(formData.price));
    data.append("totalStock", parseInt(formData.totalStock));
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const result = await dispatch(addNewProduct(data));

      if (result?.payload?.success) {
        toast({
          title: "Success",
          description: "Product added successfully!",
          variant: "success",
        });

        setFormData({
          name: "",
          description: "",
          category: "",
          brand: "",
          price: "",
          totalStock: "",
        });
        setImageFile(null);

        navigate("/admin/products");
      } else {
        toast({
          title: "Error",
          description: result?.payload?.message || "Failed to add product",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the product",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderFormField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              name={field.id}
              value={formData[field.id]}
              onChange={handleInputChange}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              name={field.id}
              value={formData[field.id]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      default:
        return (
          <div key={field.id} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              name={field.id}
              value={formData[field.id]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={field.type === "number" ? 0 : undefined}
            />
          </div>
        );
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Fill in the details below to add a new product to your store.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {addProductFormElements.map((field) => renderFormField(field))}

        <div>
          <ImageUpload label="Product Image" onImageUpload={handleImageUpload} />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/products")}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
