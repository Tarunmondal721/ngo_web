// "use server"

import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. "http://localhost:8000/api"
});

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

// Login API
export const login = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  return res; // return full response
};

// Register API
export const register = async (
  name: string,
  email: string,
  password: string,
  profile_picture: File | null // <-- should be File, not string
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("profile_picture", profile_picture || "");

  const res = await api.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res;
};

// Logout api
export const logout = async (token: string) => {
  return api.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, // pass your token
      },
    }
  );
};

// Get Category All
export const caterorys = async (token: string) => {
  const res = api.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`, // pass your token
    },
  });
  return res;
};

// Create Category
export const createCategory = async (token: string, name: string) => {
  const res = api.post(
    "/categories",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`, // pass your token
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

// Get Category Specific id
export const getCategory = async (token: string, id: string) => {
  const res = api.get(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // pass your token
      "Content-Type": "application/json",
    },
  });
  return res;
};

// update Category
export const updateCategory = async (token: string, id: string, name: string) => {
  const res = api.put(
    `/categories/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`, // pass your token
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

// delete Category
export const deleteCategory = async (token: string, id: string) => {
  const res = api.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // pass your token  
      "Content-Type": "application/json",
    },
  });
  return res;
};


// get all Gallery
export const getGalleryImages = async (token: string) => {
  const res = await api.get("/galleries", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  }
  );
  return res;
}

// create Gallery
export const createGallery = async (token: string, title: string, description: string, category_id: string, image: File | null, display_name: string) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category_id", category_id);
  formData.append("src", image || "");
  formData.append("alt", display_name);
  const res = await api.post("/galleries", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    },
  }
  );
  return res;
}


// get gallery specific id
export const getGallery = async (token: string, g_Id: string) => {
  const res = await api.get(`/galleries/${g_Id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  })
  return res;
}

// update Gallery data

export const updateGallery = async (
  token: string, id: string, description: string, category_id: string, image: File | null, display_name: string, title: string
) => {
  // const formData = new FormData;
  // formData.append("title",title);
  // formData.append("src",image || "");
  // formData.append("description",description);
  // formData.append("alt",display_name);
  // formData.append("category_id",category_id);


  let payload: any = {
    title,
    description,
    alt: display_name,
    category_id,
  };
  if (image) {
    payload.src = await toBase64(image);
  }
  // return false;
  const res = await api.put(`/galleries/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res;
}

