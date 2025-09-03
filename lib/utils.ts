import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Swal from "sweetalert2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// utils/apiHelper.ts

export async function handleApiRequest<T>(
  apiFunc: () => Promise<T>,
  successMessage: string
): Promise<T | null> {
  try {
    const res = await apiFunc();
    
    Swal.fire({
      title: "Success!",
      text: successMessage,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });

    return res;
  } catch (err: any) {
    Swal.fire({
      title: "Error!",
      text: err.response?.data?.message || err.message || "Something went wrong",
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
    return null;
  }
}
