import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL +'/user', // e.g. "http://localhost:8000/api"
});


// Get Category All
export const caterorys = async () => {
  const res = api.get("/categories");
  return res;
};
// get all Gallery
export const getGalleryImages = async () => {
  const res = await api.get("/galleries");
  return res;
}

// get all event

export const GetEvents = async () =>{
  const res = await api.get("/events");
  return res;
}

// get all blogs
export const GetBlogs = async ()=>{
  const res = await api.get("/blogs");
  return res;
}

// get blog by slug
export const SlugBlog = async (slug: string) =>{
  const res = await api.get(`/blogs/${slug}`);
  return res;
}

//store contact message
export const storeContactMessage = async (data: any) =>{
  const res = await api.post("/contacts", data);
  return res;
}

// store event registeration
export const storeEventRegistration = async (data: any) =>{
  const res = await api.post("/event/register", data);
  return res;
}

//send otp
export const sendOtp = async (email: string, eventName: string) => {
  const response = await api.post("/send-otp", {
    email,
    event_name: eventName,
  });
  return response.data;
};


// verify otp
export const verifyOtp = async (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  event_id: number;
  otp: string;
}) => {
  const response = await api.post("/verify-otp", data);
  return response.data;
};