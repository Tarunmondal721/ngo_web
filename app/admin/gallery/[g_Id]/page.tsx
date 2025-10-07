"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { caterorys, getGallery, updateGallery } from "@/lib/api";
import { handleApiRequest } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select"; // ✅ stylish select


type FormType = {
  title: string;
  description: string;
  category_id: string;
  image: File | string | null;
  display_name: string;
 
};

export default function SpecificGalleryPage() {
  const params = useParams();
  const g_Id = params?.g_Id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [gallerydata, setGallerydata] = useState<FormType>({
    description: "",
    category_id: "",
    image: null,
    display_name: "",
    title: "",
  });
  const [categories, setCategories] = useState<any[]>([]);
  const { token } = useAuth();
  const Router = useRouter();

  // Fetch specific gallery
  useEffect(() => {
    if (!g_Id) return;

    async function fetchdata() {
      try {
        const res = await getGallery(token, g_Id);
        const data = res?.data?.data;

        setGallerydata({
          title: data?.title || "",
          description: data?.description || "",
          category_id: String(data?.category?.id || ""),
          image: data?.src || null,
          display_name: data?.alt || "",
        });
      } catch (err: any) {
        setError(err.message || "Failed To Fetch Gallery Data");
      } finally {
        setLoading(false);
      }
    }
    fetchdata();
  }, [g_Id, token]);

  // Fetch categories
  useEffect(() => {
    if (!token) return;
    const fetchCategories = async () => {
      try {
        const res = await caterorys(token);
        setCategories(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (error) {
        console.error(error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData =  new FormData;
    formData.append("title",gallerydata.title);
    formData.append("description",gallerydata.description);
    formData.append("category_id",gallerydata.category_id);
    formData.append("alt",gallerydata.display_name);
    if(gallerydata.image) formData.append("src",gallerydata.image);
   
    console.log("teeff",gallerydata);
    
      // TODO: call your API update endpoint here
      const res = await handleApiRequest( ()=> updateGallery(
        token,
        g_Id,
       formData
      ),
      "Gallery Update Successfully!"
    );

      if(res){
        Router.replace("/admin/gallery");
      }
      console.log("Submitting gallerydata:", gallerydata);

     
   
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-10 w-1/3 mt-4" />
      </div>
    );
  }

  // ✅ react-select options
  const categoryOptions = categories.map((cat) => ({
    value: String(cat.id),
    label: cat.name,
  }));
  const selectedCategory = categoryOptions.find(
    (opt) => opt.value === gallerydata.category_id
  );

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
        Update Gallery
      </h2>

      {error && (
        <p className="text-center text-red-500 bg-red-100 p-2 rounded-md">
          {error}
        </p>
      )}
      {success && (
        <p className="text-center text-green-600 bg-green-100 p-2 rounded-md">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Category */}
        <div>
          <Label className="font-semibold">Select Category</Label>
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={(opt) =>
              setGallerydata({ ...gallerydata, category_id: opt?.value || "" })
            }
            placeholder="-- Select Category --"
            className="mt-2"
            classNamePrefix="react-select"
            isSearchable
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label className="font-semibold">Title</Label>
            <Input
              name="title"
              type="text"
              placeholder="Gallery Title"
              value={gallerydata.title}
              onChange={(e) =>
                setGallerydata({ ...gallerydata, title: e.target.value })
              }
              required
              className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
            />
          </div>
          <div>
            <Label className="font-semibold">Display Name</Label>
            <Input
              name="display_name"
              type="text"
              placeholder="Display Name"
              value={gallerydata.display_name}
              required
              onChange={(e) =>
                setGallerydata({ ...gallerydata, display_name: e.target.value })
              }
              className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Description */}
            <Label className="font-semibold">Wtire Description</Label>
        <textarea
          placeholder="Enter description"
          value={gallerydata.description}
          onChange={(e) =>
            setGallerydata({ ...gallerydata, description: e.target.value })
          }
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[100px]"
        />

        {/* Image Upload & Preview */}
        <div className="flex flex-col items-center space-y-4">
          <label
            htmlFor="gallery_image"
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-400 shadow-md hover:scale-105 transition-transform bg-gray-100">
              {gallerydata.image &&   typeof gallerydata.image === "string" ? (
                <img
                    src={gallerydata.image}
                    alt="Current"
                    className="w-full h-full object-cover"
                  />
                ) : gallerydata.image instanceof File?  (
                  <img
                    src={URL.createObjectURL(gallerydata.image)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-semibold">
                  + Upload
                </div>
              )}
            </div>
          </label>
          <input
            id="gallery_image"
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (file.size <= maxSize) {
                  setGallerydata({ ...gallerydata, image: file });
                } else {
                  alert("File size must be less than 5MB");
                  e.target.value = "";
                }
              }
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-3">
          <Button
            type="button"
            onClick={() => Router.back()}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 text-white py-3 rounded-xl shadow-lg"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
