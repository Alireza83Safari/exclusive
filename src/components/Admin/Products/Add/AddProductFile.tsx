import React, { useState, useContext, useEffect } from "react";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import Spinner from "../../../Spinner/Spinner";
import { useUploadImageMutation } from "../../../../Redux/apis/user/fileUserApi";

export default function AddProductFile() {
  const [serverError, setServerError] = useState("");
  const {
    setShowAddProductModal,
    createProductId,
    setShowAddFile,
    setShowAddInfoModal,
    refetchProducts,
  } = useContext(ProductsContext) as ProductsContextType;

  const [imageURLs, setImageURLs] = useState<any>([]);
  const [showUrl, setShowUrl] = useState<any>([]);

  const [uploadImage, { isSuccess, status, isLoading }] =
    useUploadImageMutation();

  const addFile = async () => {
    if (imageURLs.length === 0) {
      setServerError("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    imageURLs.forEach((img: any) => formData.append(`fileUrl`, img));
    uploadImage({ itemId: createProductId, fileType: 1, images: formData });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowAddFile(false);
      setShowAddInfoModal(true);
      setShowAddProductModal(false);
      toast.success("create product is successfully");
      refetchProducts();
    }
  }, [status]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      const newImageURLs = Array.from(files).map((file, index) => {
        formData.append(`file-${index}`, file);
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
      });
      setImageURLs((prevImageURLs: any) => [
        ...prevImageURLs,
        ...Array.from(files),
      ]);
      setShowUrl((prev: any) => [...prev, ...newImageURLs]);
    }
  };

  const deleteImage = (index: number) => {
    const newImageURLs = [...imageURLs];
    const newShowUrl = [...showUrl];

    newImageURLs.splice(index, 1);
    newShowUrl.splice(index, 1);

    setImageURLs(newImageURLs);
    setShowUrl(newShowUrl);
  };

  return (
    <div className="bg-white rounded-xl relative">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-[28rem] h-[30rem]"
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[24rem] min-w-[30rem]">
            <Spinner />
          </div>
        ) : (
          <div>
            <h2 className="text-center mb-4 text-xl font-semibold">
              Upload images
            </h2>
            <span className="text-center text-red">{serverError}</span>
            {showUrl?.length ? (
              <div className="relative grid grid-cols-4">
                {showUrl?.map((imageUrl: any, index: number) => (
                  <div key={imageUrl} className="w-ful p-2 relative">
                    <img
                      src={imageUrl}
                      className="mb-4 border w-96 h-44 object-contain"
                    />
                    <button
                      className="absolute top-2 right-2 text-red-700 p-1 rounded-full cursor-pointer"
                      onClick={() => deleteImage(index)}
                    >
                      <FaTrashAlt className="text-red" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-20">please add your image</p>
            )}
            <form
              method="post"
              className="flex justify-center container absolute bottom-20"
            >
              <input type="file" onChange={handleImageChange} multiple />
            </form>

            <div className="grid grid-cols-2 w-full absolute bottom-0">
              <button
                type="submit"
                className="bg-black text-white w-full py-2 outline-none"
                onClick={addFile}
              >
                Add Product Files
              </button>
              <button
                type="submit"
                className="py-2 border border-borderColor outline-none"
                onClick={() => {
                  setShowAddInfoModal(true);
                  setShowAddFile(false);
                  setShowAddProductModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
