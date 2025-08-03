import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAddresses } from "@/store/shop/address-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Address = () => {
  const dispatch = useDispatch();
  const { addressList, isLoading } = useSelector((state) => state.shopAddress);

  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Addresses</h2>
        <Button>Add Address</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addressList.map((address) => (
          <Card key={address._id}>
            <CardHeader>
              <CardTitle>{address.firstName} {address.lastName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{address.address}</p>
              <p>{address.city}, {address.state} {address.postalCode}</p>
              <p>{address.country}</p>
              <p>Phone: {address.phoneNumber}</p>
              <div className="flex space-x-2 mt-2">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Address;
