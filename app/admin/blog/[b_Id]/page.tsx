"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { caterorys, SpecificBlog, updateBlog } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { handleApiRequest } from "@/lib/utils";
import { useRouter } from "next/navigation";
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

export default function SpecificBlogPage() {
    const params = useParams();
    console.log('id', params);
    const b_Id = params?.b_Id;
    const { token } = useAuth();
    const Router = useRouter();

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<any[]>([]);
    const [UpdateBlog, setUpdateBlog] = useState<fromtype>({
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

    useEffect(() => {
        if (!b_Id) return;

        async function fetchData() {
            try {
                const res = await SpecificBlog(token, b_Id);

                if (res) {
                    const data = res?.data?.data;
                    setUpdateBlog({
                        title: data?.title || "",
                        author: data?.author || "",
                        date: data?.date || "",
                        read_time: data?.read_time || "",
                        category_id: String(data?.category?.id || ""),
                        excerpt: data?.excerpt || "",
                        content: data?.content || "",
                        image: data?.image || null,
                        featured: data?.featured || false,
                    });
                }
            } catch (err: any) {
                Swal.fire("Error", err.message || "Failed to fetch Data", "error");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [b_Id, token]);

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

        if (!token || !b_Id) return;

        const formData = new FormData();
        formData.append("title", UpdateBlog.title);
        formData.append("author", UpdateBlog.author);
        formData.append("date", UpdateBlog.date);
        formData.append("read_time", UpdateBlog.read_time);
        formData.append("category_id", UpdateBlog.category_id);
        formData.append("excerpt", UpdateBlog.excerpt);
        formData.append("content", UpdateBlog.content);
        formData.append("featured", UpdateBlog.featured ? "1" : "0");

        //  only append file if it’s a File object (not a string from DB)
        // if (UpdateBlog.image instanceof File) {
        //   formData.append("image", UpdateBlog.image);
        // }
        if (UpdateBlog.image instanceof File) {
            formData.append('image', UpdateBlog.image);
        }
        // if (UpdateBlog.image) formData.append("image", UpdateBlog.image);

        try {
            const res = await handleApiRequest(
                () => updateBlog(token, b_Id, formData),
                "Blog Updated Successfully!"
            );
            console.log("res", res);
            if (res) {
                Router.replace("/admin/blog");
            }
        } catch (err: any) {
            console.error(err);
        }
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

    const categoryOptions = categories.map((cat) => ({
        value: String(cat.id),
        label: cat.name,
    }));

    return (
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                ✨ Edit Blog
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">

                {/* Category */}
                <div>
                    <Label className="font-semibold">Category</Label>
                    <Select
                        options={categoryOptions}
                        value={categoryOptions.find(
                            (opt) => opt.value === UpdateBlog.category_id
                        )}
                        onChange={(selected) =>
                            setUpdateBlog({
                                ...UpdateBlog,
                                category_id: selected?.value || "",
                            })
                        }
                        placeholder="-- Select Category --"
                        className="mt-1"
                    />
                </div>



                {/* Title */}
                <div>
                    <Label className="font-semibold">Blog Title</Label>
                    <Input
                        type="text"
                        value={UpdateBlog.title}
                        onChange={(e) =>
                            setUpdateBlog({ ...UpdateBlog, title: e.target.value })
                        }
                        placeholder="Enter event title"
                        className="mt-1" required
                    />
                </div>

                {/* Author */}
                <div>
                    <Label className="font-semibold">Author Name</Label>
                    <Input
                        type="text"
                        value={UpdateBlog.author}
                        onChange={(e) =>
                            setUpdateBlog({ ...UpdateBlog, author: e.target.value })
                        }
                        placeholder="Enter author name"
                        className="mt-1" required
                    />
                </div>



                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="font-semibold">Blog Date</Label>
                        <Input
                            type="date"
                            value={UpdateBlog.date}
                            onChange={(e) =>
                                setUpdateBlog({ ...UpdateBlog, date: e.target.value })
                            }
                            className="mt-1" required
                        />
                    </div>

                    <div>
                        <Label className="font-semibold">Read Time</Label>
                        <Input
                            type="text"
                            placeholder="e.g. 5 min"
                            value={UpdateBlog.read_time}
                            onChange={(e) =>
                                setUpdateBlog({ ...UpdateBlog, read_time: e.target.value })
                            }
                            className="mt-1"
                            required
                        />
                    </div>

                </div>


                {/* Description */}
                <div>
                    <Label className="font-semibold">Excerpt</Label>
                    <textarea
                        value={UpdateBlog.excerpt}
                        onChange={(e) =>
                            setUpdateBlog({ ...UpdateBlog, excerpt: e.target.value })
                        }
                        placeholder="Enter Blog description"
                        className="w-full border rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Content */}

                {/*content*/}
                <div>
                    <Label className="font-semibold">Content</Label>
                    <Editor
                        apiKey="fpm9pcn3s0frqp5v627eaup889pd8teekhx0jzfx2ihqdenp" // optional (get one from https://www.tiny.cloud)
                        value={UpdateBlog.content}
                        onEditorChange={(content) =>
                            setUpdateBlog({ ...UpdateBlog, content: content })
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
                            setup: (editor: any) => {
                                editor.on("change", () => {
                                    editor.save();
                                });
                            },
                            branding: false,
                        }}
                    />
                </div>



                {/* Image Upload */}
                <div className="flex flex-col items-center space-y-3">
                    <Label className="font-semibold">Blog Image</Label>
                    <label
                        htmlFor="event_image"
                        className="cursor-pointer w-32 h-32 flex items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl hover:bg-indigo-50"
                    >
                        {UpdateBlog.image && typeof UpdateBlog.image === "string" ? (
                            <img
                                src={UpdateBlog.image}
                                alt="Event"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : UpdateBlog.image instanceof File ? (
                            <img
                                src={URL.createObjectURL(UpdateBlog.image)}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <span className="text-gray-400">+ Upload</span>
                        )}
                    </label>
                    <input
                        id="event_image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                if (file.size <= 5 * 1024 * 1024) {
                                    setUpdateBlog({ ...UpdateBlog, image: file });
                                } else {
                                    alert("File size must be less than 5MB");
                                    e.target.value = "";
                                }
                            }
                        }}
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">

                    <Button className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:opacity-90">
                        💾 Update Blog
                    </Button>

                    <Button
                        variant="outline"
                        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-blue-100"
                        onClick={() => {
                            Router.back();
                        }}
                    >
                        ❌ Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
