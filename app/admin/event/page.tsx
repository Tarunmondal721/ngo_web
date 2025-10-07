"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getGalleryImages, createGallery, deleteCategory, caterorys, getEvents, createEvent, DeleteEvent } from "@/lib/api";
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


type fromtype = {
    title: string,
    date: string,
    time: string,
    location: string,
    description: string,
    category_id: string,
    image: File | null,
    attendees: string,
    impact: string,
    status: string,
    price: string,
    featured: boolean,
}

export default function EventPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState<fromtype>({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        category_id: "",
        image: null,
        attendees: "",
        impact: "",
        status: "processing",
        price: "free",
        featured: false,
    });
    const [categories, setCategories] = useState<any[]>([]);

    const { token } = useAuth();

    // Fetch Events
    useEffect(() => {
        if (!token) return;
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const res = await getEvents(token);
                setEvents(Array.isArray(res?.data?.data) ? res.data.data : []);
            } catch (error) {
                console.error(error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
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
    const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) return;



        const formData = new FormData();
        formData.append("title", newEvent.title);
        formData.append("description", newEvent.description);
        formData.append("category_id", newEvent.category_id);
        formData.append("date", newEvent.date);
        formData.append("status", newEvent.status);
        formData.append("location", newEvent.location);
        formData.append("time", newEvent.time);
        formData.append("attendees", newEvent.attendees);
        formData.append("impact", newEvent.impact);
        formData.append("price", newEvent.price);
        formData.append("featured", newEvent.featured ? "1" : "0");

        if (newEvent.image) {
            formData.append("image", newEvent.image);
        }

        try {
            const res = await handleApiRequest(
                () => createEvent(token, formData),
                "Event created successfully!"
            );

            if (res) {
                // Add new event to state
                setEvents((prev) => [...prev, res?.data?.data]);

                // Close modal and reset form
                setShowModal(false);
                setNewEvent({
                    title: "",
                    date: "",
                    time: "",
                    location: "",
                    description: "",
                    category_id: "",
                    image: null,
                    attendees: "",
                    impact: "",
                    status: "processing",
                    price: "free",
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
                setEvents((prev) => prev.filter((e) => e.id !== id));
            }
        });
    };

    // DataTable columns
    const columns = [
        { name: "SL No", selector: (_row, i) => i + 1, width: "80px" },
        { name: "Category Name", selector: (row) => row.category.name },
        { name: "Title", selector: (row) => row.title },
        { name: "Date", selector: (row) => row.date },
        { name: "Time", selector: (row) => row.time ?? "N/A" },
        { name: "Location", selector: (row) => row.location },
        { name: "Description", selector: (row) => row.description },
        { name: "Image", selector: (row) => <img src={row.image} alt={row.alt} className="w-16 h-16 object-cover rounded" /> },
        { name: "Attendees", selector: (row) => row.attendees ?? "N/A" },
        { name: "Impact", selector: (row) => row.impact ?? "N/A" },
        {
            name: "Status", selector: (row) => row.status,
            cell: (row) => {
                switch (row.status) {
                    case "completed":
                        return (
                            <span className="flex text-xs
                             items-center gap-2 text-green-600">
                                <CheckCircle size={18} /> Completed
                            </span>
                        );

                    case "processing":
                        return (
                            <span className="flex items-center gap-2 text-blue-600">
                                <Loader2 size={18} className="animate-spin" /> Processing
                            </span>
                        );
                }
            }
        },
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
        { name: "Price", selector: (row) => row.price },
        { name: "Updated At", selector: (row) => new Date(row.updated_at).toLocaleDateString("en-GB") },
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
                <h1 className="text-2xl font-bold">📅 Events</h1>
                <Button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md"
                >
                    ➕ Create Event
                </Button>
            </div>

            {/* DataTable */}
            <DataTable
                columns={columns}
                data={events}
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
                                Create New Event
                            </h2>

                            <form onSubmit={handleCreateEvent} className="space-y-5" encType="multipart/form-data">
                                {/* Category */}
                                <div>
                                    <Label className="font-semibold">Select Category</Label>
                                    <Select
                                        options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
                                        value={
                                            categories
                                                .map((cat) => ({ value: cat.id, label: cat.name }))
                                                .find((opt) => opt.value === newEvent.category_id) || null
                                        }
                                        onChange={(selected) =>
                                            setNewEvent({ ...newEvent, category_id: selected?.value || "" })
                                        }
                                        isSearchable
                                        placeholder="-- Select Category --"
                                    />
                                </div>
                                {/* Event Status */}
                                <div>
                                    <Label className="font-semibold">Select Event Status</Label>
                                    <Select
                                        options={[
                                            { value: "processing", label: "Processing" },
                                            // { value: "active", label: "Active" },
                                            { value: "completed", label: "Completed" },
                                            // { value: "cancelled", label: "Cancelled" },
                                        ]}
                                        onChange={(selected) => setNewEvent({ ...newEvent, status: selected?.value || "processind" })}
                                        placeholder="-- Select Status --"
                                    />
                                </div>

                                {/* Title */}
                                <Label className="font-semibold">Event Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    placeholder="Enter event title"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    required
                                />

                                {/* Date & Time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-semibold">Date</Label>
                                        <Input
                                            name="date"
                                            type="date"
                                            value={newEvent.date}
                                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    {newEvent.status === "processing" &&

                                        <div>
                                            <Label className="font-semibold">Time</Label>
                                            <Input
                                                name="time"
                                                type="text"
                                                placeholder="e.g. 8:00 AM - 12:00 PM"
                                                value={newEvent.time}
                                                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                                required={newEvent.status === "processing"}
                                            />
                                        </div>
                                    }
                                </div>

                                {/* Location */}
                                <Label className="font-semibold">Location</Label>
                                <Input
                                    name="location"
                                    type="text"
                                    placeholder="Enter location"
                                    value={newEvent.location}
                                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                    required
                                />

                                {/* Description */}
                                <Label className="font-semibold">Description</Label>
                                <textarea
                                    placeholder="Enter description"
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    className="w-full border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    required
                                />

                                {/* Extra fields */}
                                {/* <div className="grid grid-cols-2 gap-4"> */}
                                {newEvent.status === "processing" &&
                                    <div>
                                        <Label className="font-semibold">Attendees</Label>
                                        <Input
                                            name="attendees"
                                            type="text"
                                            placeholder="e.g. 500"
                                            value={newEvent.attendees}
                                            onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                                            required={newEvent.status === "processing"}
                                        />
                                    </div>
                                }
                                {newEvent.status === "completed" &&

                                    <div>
                                        <Label className="font-semibold">Impact</Label>
                                        <Input
                                            name="impact"
                                            type="text"
                                            placeholder="How Many people Impact for this event.."
                                            value={newEvent.impact}
                                            onChange={(e) => setNewEvent({ ...newEvent, impact: e.target.value })}
                                            required={newEvent.status === "completed"}
                                        />
                                    </div>
                                }
                                {/* </div> */}
                                {newEvent.status === "processing" &&

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="font-semibold">Price</Label>
                                            <Input
                                                name="price"
                                                type="text"
                                                placeholder="e.g. ₹30 registration / free"
                                                value={newEvent.price}
                                                onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-2 mt-6">
                                            <input
                                                id="featured"
                                                type="checkbox"
                                                checked={newEvent.featured}
                                                onChange={(e) => setNewEvent({ ...newEvent, featured: e.target.checked })}
                                            />
                                            <Label htmlFor="featured" className="font-semibold">
                                                Featured
                                            </Label>
                                        </div>
                                    </div>
                                }


                                {/* Image Upload & Preview */}
                                <div className="flex flex-col items-center space-y-4">
                                    <label htmlFor="event_image" className="cursor-pointer flex flex-col items-center">
                                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg hover:scale-105 transition-transform">
                                            {newEvent.image ? (
                                                <img
                                                    src={URL.createObjectURL(newEvent.image)}
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
                                                    setNewEvent({ ...newEvent, image: file });
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
