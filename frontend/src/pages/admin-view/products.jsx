import AdminProductTile from "@/components/admin-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => navigate("/admin/add-product")}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
    </Fragment>
  );
}

export default AdminProducts;
