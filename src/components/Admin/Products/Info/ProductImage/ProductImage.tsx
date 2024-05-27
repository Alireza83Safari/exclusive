import React, { useContext, useEffect, useState } from "react";
import { userAxios } from "../../../../../services/userInterceptor";
import toast from "react-hot-toast";
import Spinner from "../../../../Share/Spinner/Spinner";
import {
  useChangeImagePriorityMutation,
  useGetFileItemIdMutation,
  useUploadImageMutation,
} from "../../../../../Redux/apis/user/fileUserApi";
import { FaTrash } from "react-icons/fa";
import useHasAccess from "../../../../../hooks/useHasAccess";
import { ProductImageProps } from "./ProductImage.interface";

export default function ProductImage(props: ProductImageProps) {
  const { editProductId, showEditFile, refetchProducts } = props;
  const [productFile, setProductFile] = useState<any>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [imageURLs, setImageURLs] = useState<any>([]);
  const [newUrl, setNewUrl] = useState<any>([]);
  const [showUrl, setShowUrl] = useState<string[]>([]);
  const [getFileItemId, { data: images }] = useGetFileItemIdMutation();
  const [changeImagePriority] = useChangeImagePriorityMutation();

  const { userHasAccess: userHasAccessDelete } =
    useHasAccess("action_file_delete");

  useEffect(() => {
    if (editProductId) {
      getFileItemId({ itemId: editProductId, fileType: 1 });
    }
  }, [editProductId]);

  useEffect(() => {
    if (images) {
      setProductFile(images);
    }
  }, [images]);

  //------- start drag drop -------////
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLImageElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", `image-${index}`);
    setDraggedIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    setDropIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || dropIndex === null) {
      return;
    }

    const draggedImageId = e.dataTransfer.getData("text/plain");
    const draggedImageIndex = parseInt(draggedImageId.split("-")[1]);

    const newShowUrl = [...showUrl];
    const newImageURLs = [...imageURLs];
    const [draggedImageUrl] = newShowUrl.splice(draggedImageIndex, 1);
    const [draggedImage] = newImageURLs.splice(draggedImageIndex, 1);
    if (draggedImageUrl) {
      const fileId = productFile?.find(
        (product: any) => product?.fileUrl === draggedImageUrl
      );

      if (fileId) {
        userAxios.post(`/file/changePriority/${fileId}/${editProductId}/1`);
      }
    }

    newShowUrl.splice(index, 0, draggedImageUrl);
    newImageURLs.splice(index, 0, draggedImage);

    setShowUrl(newShowUrl);
    setImageURLs(newImageURLs);

    setDraggedIndex(null);
    setDropIndex(null);
  };

  useEffect(() => {
    const endIndices = productFile?.map((img: any) => img?.fileUrl) || [];
    setShowUrl(endIndices);
  }, [productFile]);

  useEffect(() => {
    const endIndices = productFile?.map((img: any) => img?.fileUrl) || [];
    setImageURLs(endIndices);
  }, []);
  //------- finish drag drop -------////
  const [uploadImage, { isSuccess: successAddImage, isLoading, error }] =
    useUploadImageMutation();
  console.log(error);

  const addFile = async () => {
    const formData = new FormData();

    if (imageURLs.length === 0) {
      setServerError("Please select at least one file.");
      return;
    }
    newUrl?.forEach((img: any) => formData.append(`fileUrl`, img));
    uploadImage({ itemId: editProductId, fileType: 1, images: formData });
  };

  useEffect(() => {
    if (successAddImage) {
      getFileItemId({ itemId: editProductId, fileType: 1 });
      refetchProducts();
      toast.success("create product is successfully");
      changeImagePriority({
        itemId: editProductId,
        fileId: productFile[0]?.id,
        priority: 1,
      });
    }
  }, [successAddImage]);

  useEffect(() => {
    if (error) {
      toast.error("please choose jpg , png ,jpeg file");
    }
  }, [error]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      const newImageURLs = Array.from(files)?.map((file, index) => {
        formData.append(`file-${index}`, file);
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
      });
      setImageURLs((prevImageURLs: any) => [
        ...prevImageURLs,
        ...Array.from(files),
      ]);
      setNewUrl((prevImageURLs: any) => [
        ...prevImageURLs,
        ...Array.from(files),
      ]);
      setShowUrl((prev) => [...prev, ...newImageURLs]);
    }
  };

  const deleteImage = async (ID: string, index: number) => {
    const newImageURLs = [...imageURLs];
    const newShowUrl = [...showUrl];

    newImageURLs.splice(index, 1);
    newShowUrl.splice(index, 1);

    setImageURLs(newImageURLs);
    setShowUrl(newShowUrl);
    let findDelete = productFile?.find(
      (product: any) => product?.fileUrl == ID
    );
    try {
      if (userHasAccessDelete && findDelete?.id) {
        const response = await userAxios.post(`/file/delete/${findDelete?.id}`);
        if (response.status === 200) {
          refetchProducts();
          toast.success("delete image is success");
        }
      } else {
        toast.error("You Havent Access Delete Image");
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div
        className={`lg:w-[46rem] max-h-[44rem] max-w-10/12 rounded-xl overflow-auto ${
          showEditFile ? `visible` : `hidden`
        }`}
      >
        {isLoading ? (
          <div className="w-full h-full min-h-[30rem] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 overflow-auto">
            <h2 className="text-center mb-4">Upload images</h2>
            <span className="text-center text-red-700">{serverError}</span>
            {showUrl?.length ? (
              <div className="relative grid md:grid-cols-4 grid-cols-2">
                {showUrl?.map((imageUrl, index) => (
                  <div key={imageUrl} className="w-full p-2 relative">
                    <img
                      src={imageUrl?.includes("uploads") ? imageUrl : imageUrl}
                      className="mb-4 border w-96 h-44 object-contain"
                      draggable={true}
                      id={`image-${index}`}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                    />

                    <button
                      className="absolute top-2 right-2 text-red-700 p-1 rounded-full cursor-pointer"
                      onClick={() => deleteImage(imageUrl, index)}
                    >
                      <FaTrash className="text-red" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <img
                  src="/images/empty.jpg"
                  className="object-contain h-72 rounded-xl"
                />
              </div>
            )}
            <div className="flex justify-center w-full mt-16">
              <input type="file" onChange={handleImageChange} multiple />
            </div>
            <div className="flex justify-center w-full mt-16">
              <button
                type="submit"
                className="bg-black text-white w-full py-2 mx- rounded-lg outline-none disabled:bg-gray"
                onClick={addFile}
                disabled={newUrl?.length < 1}
              >
                Add Product Files
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
