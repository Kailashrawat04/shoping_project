import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProductTile = ({ product, handleDelete }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-32 object-cover rounded-md"
            />
          )}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Price:</span> ${product.price}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {product.category}
              </p>
              {product.quantity && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Stock:</span> {product.quantity}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={() => {
                  navigate(`/admin/update-product/${product._id}`);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Edit
              </Button>
              <Button 
                size="sm"
                variant="destructive" 
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number
  }).isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default ProductTile;
