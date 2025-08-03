import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductTile = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <Card className="w-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <div className="flex space-x-2 mt-2">
          <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
          <Button variant="outline" onClick={() => onAddToWishlist(product)}>
            Wishlist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductTile;
