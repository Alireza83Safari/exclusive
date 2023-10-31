import React, { useState, useContext } from "react";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
import toast from "react-hot-toast";
import { userAxios } from "../../../../services/userInterceptor";
import { FaTrashAlt } from "react-icons/fa";
import Spinner from "../../../Spinner/Spinner";

export default function AddProductFile() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    setShowAddProductModal,
    createProductId,
    setShowAddFile,
    setShowAddInfoModal,
    refetchProducts
  } = useContext(ProductsContext) as ProductsContextType;
  const [imageURLs, setImageURLs] = useState([]);
  const [showUrl, setShowUrl] = useState([]);

  const addFile = async () => {
    if (imageURLs.length === 0) {
      setServerError("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    imageURLs.forEach((img) => formData.append(`fileUrl`, img));
    setLoading(true);
    try {
      const response = await userAxios.post(
        `/file/uploadImage/${createProductId}/1`,
        formData
      );

      if (response.status === 200) {
        setShowAddFile(false);
        setShowAddInfoModal(true);
        setShowAddProductModal(false);
        toast.success("create product is successfully");
        setLoading(false);
        refetchProducts()
      }
    } catch (error) {
      setLoading(false);
      if (error?.response.status === 403) {
        setServerError("You haven't access to add an image");
      } else if (error?.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("An error occurred while uploading the file.");
      }
    }
  };

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      const newImageURLs = Array.from(files).map((file, index) => {
        formData.append(`file-${index}`, file as string);
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
      });
      setImageURLs((prevImageURLs) => [...prevImageURLs, ...Array.from(files)]);
      setShowUrl((prev) => [...prev, ...newImageURLs]);
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
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <h2 className="text-center mb-4 text-xl font-semibold">
              Upload images
            </h2>
            <span className="text-center text-red-700">{serverError}</span>
            {showUrl?.length ? (
              <div className="relative grid grid-cols-4">
                {showUrl?.map((imageUrl, index) => (
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
              className="flex justify-center container absolute bottom-20 dark:text-white-100"
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
