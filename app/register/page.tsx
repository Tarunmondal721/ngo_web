"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { register } from "@/lib/api";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const maxsize = 5 * 1024 * 1024;
        if(e.target.files[0].size <= maxsize){
          setPreview(URL.createObjectURL(e.target.files[0]));
        }else{
           alert("File size must be less than 5MB");
        }
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const profile_picture = formData.get("profile_picture") as File; // <-- File, not string

    try {
      const res = await register(name, email, password, profile_picture);

      if (res.status === 201) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Registration Successful 🎉",
          text: res.data.message || "Your account has been created!",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          router.replace("/login");
        });
      }
    } catch (err: any) {
      setLoading(false);

      // Laravel validation errors
      const errors = err.response?.data?.errors;

      if (errors) {
        // Convert error object into a single string
        const errorMessages = Object.values(errors)
          .flat()
          .join("\n");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `<pre style="text-align:left">${errorMessages}</pre>`,
          confirmButtonColor: "#d33",
        });
      } else {
        // Generic error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.message || "Something went wrong!",
          confirmButtonColor: "#d33",
        });
      }
    }

  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-3xl border-0">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Create an Account
            </h2>

            <form onSubmit={handleRegister} className="space-y-5" content="multipart/form-data">
              <div className="flex flex-col items-center space-y-4">
                <label
                  htmlFor="profile_picture"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg hover:scale-105 transition-transform">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        + Upload
                      </div>
                    )}
                  </div>
                </label>
                <Input
                  id="profile_picture"
                  name="profile_picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <Input name="name" type="text" placeholder="Full Name" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
              />

              <Button
                className="w-full rounded-xl cursor-pointer py-5 text-lg shadow-md bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
