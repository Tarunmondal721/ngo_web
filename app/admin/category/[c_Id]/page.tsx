"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getCategory, updateCategory } from "@/lib/api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { handleApiRequest } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

interface Category {
    // id: string;
    name: string;
    description?: string;
}

export default function CategoryUpdatePage() {
    const params = useParams();
    const c_Id = params?.c_Id;
    const { token } = useAuth();
    const Router = useRouter();

    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (!c_Id) return;

        async function fetchCategory() {
            try {
                const res = await getCategory(token, c_Id);
                setCategory(res?.data?.data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch category");
            } finally {
                setLoading(false);
            }
        }

        fetchCategory();
    }, [c_Id, token]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!category) return;

        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        //   const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;

        const res = await handleApiRequest(
            () => updateCategory(token, c_Id, name,),
            "Category updated successfully!"
        );

        if (res) {
            setCategory({ ...category, name });
            Router.replace("/admin/category");
        }
    };
    // console.log("logging", loading);
    if (loading) {
        return (
            <div className="max-w-xl mx-auto mt-25 p-6 bg-white rounded-lg shadow-md space-y-4">
                <Skeleton className="h-8 w-3/4" /> {/* Title */}
                <Skeleton className="h-6 w-full" /> {/* Input */}
                <Skeleton className="h-6 w-full" /> {/* Input */}
                <Skeleton className="h-10 w-1/3 mt-4" /> {/* Button */}
            </div>
        );
    }
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-xl mx-auto mt-25 p-6 bg-white rounded-lg shadow-md">

            
                {/* Back Button */}
                <button
                    onClick={() => Router.replace("/admin/category")}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back</span>
                </button>

                <h1 className="text-2xl font-bold mb-6">Update Category</h1>

            {/* {success && <div className="mb-4 text-green-600">{success}</div>} */}

            {category ? (
                <form className="space-y-4" onSubmit={handleUpdate}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category Name</label>
                        <input
                            name="name"
                            type="text"
                            defaultValue={category.name}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={category.description || ""}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Update
                    </button>
                </form>
            ) : (
                <div className="text-center text-gray-500">Category not found.</div>
            )}
        </div>
    );
}
