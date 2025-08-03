import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CartItemsContent = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ userId: "user-id", productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(deleteCartItem({ userId: "user-id", productId }));
  };

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <Card key={item.productId}>
          <CardHeader>
            <CardTitle>{item.productName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Price: ${item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productId,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-16 text-center"
                  />
                  <Button
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CartItemsContent;
