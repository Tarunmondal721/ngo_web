"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getGalleryImages, createGallery, deleteCategory, caterorys, getblogs, createBlog, DeleteEvent } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Loader2, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { handleApiRequest } from "@/lib/utils";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";


type fromtype = {
    title: string,
    // slug: string,
    author: string,
    date: string,
    read_time: string,
    category_id: string,
    excerpt: string,
    content: string,
    image: File | null,
    featured: boolean,
}

export default function BlogPage() {
    const [blogs, setblogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newBlog, setnewBlog] = useState<fromtype>({
        title: "",
        // slug: "",
        author: "",
        date: "",
        read_time: "",
        category_id: "",
        excerpt: "",
        content: "",
        image: null,
        featured: false,
    });
    const [categories, setCategories] = useState<any[]>([]);

    const { token } = useAuth();

    // Fetch blogs
    useEffect(() => {
        if (!token) return;
        const fetchblogs = async () => {
            setLoading(true);
            try {
                const res = await getblogs(token);
                setblogs(Array.isArray(res?.data?.data) ? res.data.data : []);
            } catch (error) {
                console.error(error);
                setblogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchblogs();
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

    // Create event
    const handleCreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) return;



        const formData = new FormData();
        formData.append("title", newBlog.title);
        formData.append("author", newBlog.author);
        formData.append("date", newBlog.date);
        formData.append("read_time", newBlog.read_time);
        formData.append("category_id", newBlog.category_id);
        formData.append("excerpt", newBlog.excerpt);
        formData.append("content", newBlog.content);
        formData.append("featured", newBlog.featured ? "1" : "0");

        if (newBlog.image) {
            formData.append("image", newBlog.image);
        }
        console.log("Form Data",formData);
        try {
            const res = await handleApiRequest(
                () => createBlog(token, formData),
                "Blog created successfully!"
            );

            if (res) {
                // Add new event to state
                setblogs((prev) => [...prev, res?.data?.data]);

                // Close modal and reset form
                setShowModal(false);
                setnewBlog({
                    title: "",
                    author: "",
                    date: "",
                    read_time: "",
                    category_id: "",
                    excerpt: "",
                    content: "",
                    image: null,
                    featured: false,
                });
            }
        } catch (error: any) {
            console.error(error);
            Swal.fire("Error", error.message || "Failed to create event", "error");
        }
    };


    // Delete gallery
    const handleDeleteEvent = async (id: string) => {
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
                const res = await handleApiRequest(() => DeleteEvent(token, id), "Event deleted successfully!");
                setblogs((prev) => prev.filter((e) => e.id !== id));
            }
        });
    };

    // DataTable columns
    const columns = [
        { name: "SL No", selector: (_row, i) => i + 1, width: "80px" },
        { name: "Category Name", selector: (row) => row.category.name },
        { name: "Slug", selector: (row) => row.slug },
        { name: "Title", selector: (row) => row.title },
        { name: "Date", selector: (row) => row.date },
        { name: "Read Time", selector: (row) => row.read_time ?? "N/A" },
        { name: "Exceprt", selector: (row) => row.excerpt },
        { name: "Image", selector: (row) => <img src={row.image} alt={row.alt} className="w-16 h-16 object-cover rounded" /> },
     
        {
            name: "Featured",
            selector: (row) => row.featured,
            cell: (row) =>
                row.featured ? (
                    <span className="flex items-center gap-2 text-green-600">
                        <CheckCircle size={18} /> Yes
                    </span>
                ) : (
                    <span className="flex items-center gap-2 text-red-600">
                        <XCircle size={18} /> No
                    </span>
                ),
        },
        
        {
            name: "Action",
            cell: (row) => (
                <div className="flex space-x-2">
                    <Link href={`/admin/event/${row.id}`}>
                        <Button className="flex items-center gap-1 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                            <Edit size={16} /> Edit
                        </Button>
                    </Link>
                    <Button
                        onClick={() => handleDeleteEvent(row.id)}
                        className="flex items-center gap-1 bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                        <Trash2 size={16} /> Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-5xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">📅 Blog</h1>
                <Button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md"
                >
                    ➕ Create Blogs
                </Button>
            </div>

            {/* DataTable */}
            <DataTable
                columns={columns}
                data={blogs}
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
                        className="w-full max-w-lg max-h-[95vh] overflow-y-auto"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 relative">
                            <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                                Create New Blog
                            </h2>

                            <form onSubmit={handleCreateBlog} className="space-y-5" encType="multipart/form-data">
                                {/* Category */}
                                <div>
                                    <Label className="font-semibold">Select Category</Label>
                                    <Select
                                        options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
                                        value={
                                            categories
                                                .map((cat) => ({ value: cat.id, label: cat.name }))
                                                .find((opt) => opt.value === newBlog.category_id) || null
                                        }
                                        onChange={(selected) =>
                                            setnewBlog({ ...newBlog, category_id: selected?.value || "" })
                                        }
                                        isSearchable
                                        placeholder="-- Select Category --"
                                    />
                                </div>


                                {/* Title */}
                                <Label className="font-semibold">Blog Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    placeholder="Enter blog title"
                                    value={newBlog.title}
                                    onChange={(e) => setnewBlog({ ...newBlog, title: e.target.value })}
                                    required
                                />


                                {/* Author Name */}
                                <Label className="font-semibold">Author Name</Label>
                                <Input
                                    name="author"
                                    type="text"
                                    placeholder="Enter author name"
                                    value={newBlog.author}
                                    onChange={(e) => setnewBlog({ ...newBlog, author: e.target.value })}
                                    required
                                />
                                {/* Date & Time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-semibold">Date</Label>
                                        <Input
                                            name="date"
                                            type="date"
                                            value={newBlog.date}
                                            onChange={(e) => setnewBlog({ ...newBlog, date: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label className="font-semibold">Read Time</Label>
                                        <Input
                                            name="read_time"
                                            placeholder="e.g. 5 min"
                                            type="text"
                                            value={newBlog.read_time}
                                            onChange={(e) => setnewBlog({ ...newBlog, read_time: e.target.value })}
                                            required
                                        />
                                    </div>

                                </div>



                                {/* Description */}
                                <Label className="font-semibold">Excerpt</Label>
                                <textarea
                                    placeholder="Write description"
                                    value={newBlog.excerpt}
                                    onChange={(e) => setnewBlog({ ...newBlog, excerpt: e.target.value })}
                                    className="w-full border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    required
                                />

                                {/*content*/}
                                <div>
                                    <Label className="font-semibold">Content</Label>
                                    <Editor
                                        apiKey="fpm9pcn3s0frqp5v627eaup889pd8teekhx0jzfx2ihqdenp" // optional (get one from https://www.tiny.cloud)
                                        value={newBlog.content}
                                        onEditorChange={(content) =>
                                            setnewBlog({ ...newBlog, content: content })
                                        }
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins:
                                                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                            toolbar:
                                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | " +
                                                "addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | " +
                                                "emoticons charmap | removeformat",
                                            tinycomments_mode: "embedded",
                                            tinycomments_author: "Author name",
                                            mergetags_list: [
                                                { value: "First.Name", title: "First Name" },
                                                { value: "Email", title: "Email" },
                                            ],
                                            setup: (editor:any) => {
                                                editor.on("change", () => {
                                                    editor.save();
                                                });
                                            },
                                            branding: false,
                                        }}
                                    />
                                </div>


                                {/* Image Upload & Preview */}
                                <div className="flex flex-col items-center space-y-4">
                                    <label htmlFor="event_image" className="cursor-pointer flex flex-col items-center">
                                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg hover:scale-105 transition-transform">
                                            {newBlog.image ? (
                                                <img
                                                    src={URL.createObjectURL(newBlog.image)}
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
                                        id="event_image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const maxSize = 5 * 1024 * 1024;
                                                if (file.size <= maxSize) {
                                                    setnewBlog({ ...newBlog, image: file });
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
