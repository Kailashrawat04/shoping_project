import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductTile = ({ product, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => onEdit(product)}>Edit</Button>
            <Button variant="destructive" onClick={() => onDelete(product._id)}>Delete</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductTile;
