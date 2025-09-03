"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { caterorys, createCategory, deleteCategory } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Edit,Trash2 } from "lucide-react";
import Link from "next/link";
import { handleApiRequest } from "@/lib/utils";
import Swal from "sweetalert2";

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const { token } = useAuth();
  // console.log("token", token);
  // console.log("categories", categories);

  
  // Fetch categories when token is ready
  useEffect(() => {
    if (!token) return;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await caterorys(token);
        // console.log("category",res)
        setCategories(Array.isArray(res?.data?.data) ? res?.data?.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);


  // Create Category
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return alert("Category name is required!");

    try {
      const res = await createCategory(token, newCategory.trim());
      const data = res?.data?.data;

      if (res?.status === 201 && data) {
        setCategories((prev) => [...prev, data]); // add new category
        setNewCategory("");
        setShowModal(false);
      } else {
        alert(data?.message || "Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Delete Category
  const handelDeleteCategory = async (id: string) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await handleApiRequest(
          () => deleteCategory(token, id),
          "Category deleted successfully!"
        );
      }
    });

    
    // If delete is successful, update the categories state
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
  };

  const columns = [
    { name: "SL No", selector: (_row, i) => i + 1, sortable: true, width: "80px" },
    { name: "Category Name", selector: (row) => row.name, sortable: true },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toLocaleDateString("en-GB"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => new Date(row.updated_at).toLocaleDateString("en-GB"),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="space-x-2 flex">
          {/* Edit Button: navigates to edit page */}
          <Link href={`/admin/category/${row.id}`}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer rounded-md">
              <Edit  size={16} />
              Edit
            </Button>
          </Link>

          {/* Delete Button: calls a function */}
          <Button
            onClick={() => handelDeleteCategory(row.id)}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-3 py-1 rounded-md"
          >
            Delete
          </Button>
        </div>
      )

    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📂 Category Page</h1>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md"
        >
          ➕ Create Category
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={categories}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={{
          headCells: {
            style: { fontWeight: "bold", fontSize: "14px", backgroundColor: "#f3f4f6" },
          },
        }}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-100">
            <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => { setShowModal(false); setNewCategory(""); }}
                className="bg-gray-400 hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCategory}
                className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
