import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload } from "lucide-react";

function AdminFeatures() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([]);
  const { toast } = useToast();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast({
        title: "Error",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/common/feature/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Feature image uploaded successfully",
        });
        setImage("");
        fetchFeatures();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to upload image",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/common/feature/get`);
      const data = await response.json();
      if (data.success) {
        setFeatures(data.data);
      }
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/common/feature/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Feature image deleted successfully",
        });
        fetchFeatures();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  useState(() => {
    fetchFeatures();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feature Management</h1>
        <p className="text-muted-foreground">Manage feature images for your website</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Feature Image</CardTitle>
          <CardDescription>Upload a new image to be displayed as a feature</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
            </div>
            
            {image && (
              <div className="mt-4">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="max-w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}

            <Button type="submit" disabled={loading || !image} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Feature Image
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Feature Images</CardTitle>
          <CardDescription>Manage your uploaded feature images</CardDescription>
        </CardHeader>
        <CardContent>
          {features.length === 0 ? (
            <p className="text-muted-foreground">No feature images uploaded yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature) => (
                <div key={feature._id} className="relative group">
                  <img 
                    src={feature.image} 
                    alt="Feature" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(feature._id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminFeatures;
