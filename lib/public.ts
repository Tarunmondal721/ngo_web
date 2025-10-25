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