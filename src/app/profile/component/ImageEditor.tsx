import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Image as ImageIcon, User, Pencil } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";

export default function ImageEditor() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const user = auth.user;

    // React Query mutation for uploading image
    const { mutate: uploadImageMutation, isPending, isError } = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            const res = await axiosPrivate.patch("/customer/image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data; // assuming { user: updatedUser }
        },
        onSuccess: (data) => {
            setAuth((prev) => ({
                ...prev,
                user: data.data,
            }));
            setIsDialogOpen(false);
            setPreview(null);
            setFile(null);
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    return (
        <div className="relative w-24 h-24">
            {/* Profile Image */}
            {user?.image ? (
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${user.image}`}
                    width={100}
                    height={100}
                    alt={user.firstName}
                    className="w-24 h-24 rounded-full object-cover"
                />
            ) : (
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200">
                    <User className="w-12 h-12 text-gray-500" />
                </div>
            )}

            {/* Edit Icon */}
            <button
                onClick={() => setIsDialogOpen(true)}
                className="absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            >
                <Pencil className="w-4 h-4 text-gray-700" />
            </button>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                    </DialogHeader>

                    <div className="p-4">
                        {/* Upload Area */}
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={80}
                                    height={80}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <>
                                    <ImageIcon className="w-8 h-8 text-gray-500 mb-2" />
                                    <span className="text-gray-600">
                                        {isPending ? "Uploading..." : "Click to upload"}
                                    </span>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>

                        {/* Error Message */}
                        {isError && (
                            <p className="text-red-500 text-sm mt-2">
                                Failed to upload image. Please try again.
                            </p>
                        )}

                        {/* Save Button */}
                        <Button
                            disabled={isPending || !file}
                            type="button"
                            className="w-full mt-4"
                            onClick={() => file && uploadImageMutation(file)}
                        >
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
