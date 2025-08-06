import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { productDetails, isLoading } = useSelector(
    (state) => state.shopProducts
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  if (isLoading) return <div>Loading...</div>;

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={productDetails?.image}
          alt={productDetails?.name}
          className="w-full h-96 object-cover rounded-md"
        />
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{productDetails?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${productDetails?.price}</p>
            <p className="text-gray-700">{productDetails?.description}</p>
            <div className="flex items-center space-x-4 mt-4">
              <Button>Add to Cart</Button>
              <Button variant="outline">Add to Wishlist</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
