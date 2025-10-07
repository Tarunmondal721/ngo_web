"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { caterorys, SpecificEvent, UpdateEvent } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { handleApiRequest } from "@/lib/utils";
import { useRouter } from "next/navigation";

type fromtype = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category_id: string;
  image: File | null | string;
  attendees: string;
  impact: string;
  status: string;
  price: string;
  featured: boolean;
};

export default function SpecificEventPage() {
  const params = useParams();
  const e_Id = params?.e_Id;
  const { token } = useAuth();
  const Router = useRouter();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [updateEvent, setUpdateEvent] = useState<fromtype>({
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

  useEffect(() => {
    if (!e_Id) return;

    async function fetchData() {
      try {
        const res = await SpecificEvent(token, e_Id);

        if (res) {
          const data = res?.data?.data;
          setUpdateEvent({
            title: data?.title || "",
            date: data?.date || "",
            time: data?.time || "",
            location: data?.location || "",
            description: data?.description || "",
            category_id: String(data?.category?.id || ""),
            image: data?.image || null,
            attendees: data?.attendees || "",
            impact: data?.impact || "",
            status: data?.status || "processing",
            price: data?.price || "free",
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
  }, [e_Id, token]);

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

    if (!token || !e_Id) return;

    const formData = new FormData();
    formData.append("title", updateEvent.title);
    formData.append("description", updateEvent.description);
    formData.append("category_id", updateEvent.category_id);
    formData.append("date", updateEvent.date);
    formData.append("status", updateEvent.status);
    formData.append("location", updateEvent.location);
    formData.append("time", updateEvent.time);
    formData.append("attendees", updateEvent.attendees);
    formData.append("impact", updateEvent.impact);
    formData.append("price", updateEvent.price);
    formData.append("featured", updateEvent.featured ? "1" : "0");

    // ✅ only append file if it’s a File object (not a string from DB)
    // if (updateEvent.image instanceof File) {
    //   formData.append("image", updateEvent.image);
    // }

    if (updateEvent.image) { formData.append("image", updateEvent.image); }

    try {
      const res = await handleApiRequest(
        () => UpdateEvent(token, e_Id, formData),
        "Event Updated Successfully!"
      );

      if (res) {
        Router.replace("/admin/event");
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
        ✨ Edit Event
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <div>
          <Label className="font-semibold">Event Title</Label>
          <Input
            type="text"
            value={updateEvent.title}
            onChange={(e) =>
              setUpdateEvent({ ...updateEvent, title: e.target.value })
            }
            placeholder="Enter event title"
            className="mt-1"
          />
        </div>

        {/* Category */}
        <div>
          <Label className="font-semibold">Category</Label>
          <Select
            options={categoryOptions}
            value={categoryOptions.find(
              (opt) => opt.value === updateEvent.category_id
            )}
            onChange={(selected) =>
              setUpdateEvent({
                ...updateEvent,
                category_id: selected?.value || "",
              })
            }
            placeholder="-- Select Category --"
            className="mt-1"
          />
        </div>

        {/* Status */}
        <div>
          <Label className="font-semibold">Status</Label>
          <Select
            options={[
              { value: "processing", label: "Processing" },
              { value: "completed", label: "Completed" },
            ]}
            value={{
              value: updateEvent.status,
              label:
                updateEvent.status.charAt(0).toUpperCase() +
                updateEvent.status.slice(1),
            }}
            onChange={(selected) =>
              setUpdateEvent({ ...updateEvent, status: selected?.value || "" })
            }
            placeholder="-- Select Status --"
            className="mt-1"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="font-semibold">Event Date</Label>
            <Input
              type="date"
              value={updateEvent.date}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, date: e.target.value })
              }
              className="mt-1"
            />
          </div>
          {updateEvent.status === "processing" && (
            <div>
              <Label className="font-semibold">Time</Label>
              <Input
                type="text"
                placeholder="e.g. 8:00 AM - 12:00 PM"
                value={updateEvent.time}
                onChange={(e) =>
                  setUpdateEvent({ ...updateEvent, time: e.target.value })
                }
                className="mt-1"
                required={updateEvent.status === "processing"}
              />
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <Label className="font-semibold">Location</Label>
          <Input
            type="text"
            value={updateEvent.location}
            onChange={(e) =>
              setUpdateEvent({ ...updateEvent, location: e.target.value })
            }
            placeholder="Enter location"
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label className="font-semibold">Description</Label>
          <textarea
            value={updateEvent.description}
            onChange={(e) =>
              setUpdateEvent({ ...updateEvent, description: e.target.value })
            }
            placeholder="Enter event description"
            className="w-full border rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Attendess */}
        {updateEvent.status === "processing" && (

          <div>
            <Label className="font-semibold">Attendess</Label>
            <Input
              value={updateEvent.attendees}
              type="text"
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, attendees: e.target.value })
              }
              placeholder="e.g:520"
              className=" mt-1"
              required={updateEvent.status === 'processing'}
            />
          </div>
        )}

        {/* Impact */}
        {updateEvent.status === "completed" && (

          <div>
            <Label className="font-semibold">Impact</Label>
            <Input
              value={updateEvent.impact}
              type="text"
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, impact: e.target.value })
              }
              placeholder="how many people impact.."
              className=" mt-1"
              required={updateEvent.status === 'completed'}
            />
          </div>
        )}



        {/* Image Upload */}
        <div className="flex flex-col items-center space-y-3">
          <Label className="font-semibold">Event Image</Label>
          <label
            htmlFor="event_image"
            className="cursor-pointer w-32 h-32 flex items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl hover:bg-indigo-50"
          >
            {updateEvent.image && typeof updateEvent.image === "string" ? (
              <img
                src={updateEvent.image}
                alt="Event"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : updateEvent.image instanceof File ? (
              <img
                src={URL.createObjectURL(updateEvent.image)}
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
                  setUpdateEvent({ ...updateEvent, image: file });
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
            💾 Update Event
          </Button>
        </div>
      </form>
    </div>
  );
}
