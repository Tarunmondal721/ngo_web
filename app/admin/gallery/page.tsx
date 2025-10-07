"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getGalleryImages, createGallery, deleteCategory, caterorys, deleteGallery } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { handleApiRequest } from "@/lib/utils";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Select from "react-select";


type fromtype = {
  title: string,
  description: string,
  category_id: string,
  image: File | null,
  display_name: string,
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newGallery, setNewGallery] = useState<fromtype>({
    title: "",
    description: "",
    category_id: "",
    image: null,
    display_name: "",
  });
  const [categories, setCategories] = useState<any[]>([]);

  const { token } = useAuth();

  // Fetch galleries
  useEffect(() => {
    if (!token) return;
    const fetchGalleries = async () => {
      setLoading(true);
      try {
        const res = await getGalleryImages(token);
        setGalleries(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (error) {
        console.error(error);
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, [token]);

  // Fetch categories for modal select
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

  // Create gallery
  const handleCreateGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    const formData = new FormData();
    formData.append("title", newGallery.title);
    formData.append("description", newGallery.description);
    formData.append("category_id", newGallery.category_id);
    if (newGallery.image) formData.append("src", newGallery.image);
    formData.append("alt", newGallery.display_name);

    try {
      const res = await createGallery(
        token,formData
      );

      if (res?.status === 201 && res?.data?.data) {
        setGalleries((prev) => [...prev, res.data.data]);
        setShowModal(false);
        setNewGallery({ title: "", description: "", category_id: "", image: null, display_name: "" });
        Swal.fire("Success", "Gallery created successfully!", "success");
      } else {
        Swal.fire("Error", res?.data?.message || "Failed to create gallery", "error");
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire("Error", error.message || "Failed to create gallery", "error");
    }
  };

  // Delete gallery
  const handleDeleteGallery = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await handleApiRequest(() => deleteGallery(token, id), "Gallery deleted successfully!");
        setGalleries((prev) => prev.filter((g) => g.id !== id));
      }
    });
  };

  // DataTable columns
  const columns = [
    { name: "SL No", selector: (_row, i) => i + 1, width: "80px" },
    { name: "Category Name", selector: (row) => row.category.name },
    { name: "Title", selector: (row) => row.title },
    { name: "Description", selector: (row) => row.description },
    { name: "Image", selector: (row) => <img src={row.src} alt={row.alt} className="w-16 h-16 object-cover rounded" /> },
    { name: "Created At", selector: (row) => new Date(row.created_at).toLocaleDateString("en-GB") },
    { name: "Updated At", selector: (row) => new Date(row.updated_at).toLocaleDateString("en-GB") },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <Link href={`/admin/gallery/${row.id}`}>
            <Button className="flex items-center gap-1 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
              <Edit size={16} /> Edit
            </Button>
          </Link>
          <Button
            onClick={() => handleDeleteGallery(row.id)}
            className="flex items-center gap-1 bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            <Trash2 size={16} /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className=" max-w-5xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📂 Gallery Page</h1>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md"
        >
          ➕ Create Gallery
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={galleries}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={{
          headCells: { style: { fontWeight: "bold", fontSize: "14px", backgroundColor: "#f3f4f6" } },
        }}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 relative">
              <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Create New Gallery
              </h2>

              <form onSubmit={handleCreateGallery} className="space-y-5" encType="multipart/form-data">
                {/* Category */}
                {/* Category with react-select */}
                <div>
                  <Label className="font-semibold">Select Category</Label>
                  <Select
                    options={categories.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                    value={
                      categories
                        .map((cat) => ({ value: cat.id, label: cat.name }))
                        .find((opt) => opt.value === newGallery.category_id) || null
                    }
                    onChange={(selected) =>
                      setNewGallery({ ...newGallery, category_id: selected?.value || "" })
                    }
                    classNamePrefix="react-select"
                    isSearchable
                    placeholder="-- Select Category --"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "12px",
                        borderColor: "#ddd",
                        padding: "2px",
                        boxShadow: "none",
                        "&:hover": { borderColor: "#a78bfa" }, // purple hover
                      }),
                      option: (base, { isFocused, isSelected }) => ({
                        ...base,
                        backgroundColor: isSelected
                          ? "#8b5cf6"
                          : isFocused
                            ? "#ede9fe"
                            : "white",
                        color: isSelected ? "white" : "black",
                        cursor: "pointer",
                      }),
                    }}
                  />
                </div>


                {/* Title & Display Name */}
                <Label className="font-semibold">Image Title</Label>
                <Input
                  name="title"
                  type="text"
                  placeholder="Image Title"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  required
                />
                <Label className="font-semibold">Display Name(Not Found Then Show)</Label>
                <Input
                  name="display_name"
                  type="text"
                  placeholder="Display Name"
                  value={newGallery.display_name}
                  onChange={(e) => setNewGallery({ ...newGallery, display_name: e.target.value })}
                />

                {/* Description */}
                <Label className="font-semibold">Wtire Description</Label>
                <textarea
                  placeholder="Enter description"
                  value={newGallery.description}
                  onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                  className="w-full border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                {/* Image Upload & Preview */}
                <div className="flex flex-col items-center space-y-4">
                  <label htmlFor="gallery_image" className="cursor-pointer flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg hover:scale-105 transition-transform">
                      {newGallery.image ? (
                        <img
                          src={URL.createObjectURL(newGallery.image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-lg font-semibold">
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
                        // max size 2MB
                        const maxSize = 5 * 1024 * 1024;

                        if (file.size <= maxSize) {
                          setNewGallery({ ...newGallery, image: file });
                        } else {
                          alert("File size must be less than 5MB");
                          e.target.value = "";
                        }
                      }
                    }}
                    required
                  />

                </div>

                {/* Buttons */}
                <div className="flex justify-between space-x-2">
                  <Button
                    type="button"
                    className="flex-1 bg-gray-400 cursor-pointer hover:bg-gray-500 text-white py-3 rounded-xl"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r cursor-pointer from-indigo-500 to-pink-500 hover:opacity-90 text-white py-3 rounded-xl"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}


    </div>
  );
}
