import React, { useContext, useEffect, useState } from "react";
import { product } from "../../../../types/product";
import { SelectList, Input } from "../../../../components";
import {
  ProductsContext,
  ProductsContextType,
} from "../../../../context/admin/productsContext";
import toast from "react-hot-toast";
import { brandSelectListType } from "../../../../types/brand";
import { useCreateProductMutation } from "../../../../Redux/apis/admin/productAdminApi";
import Spinner from "../../../Share/Spinner/Spinner";
import { productSchema } from "../../../../validations/Product";
import { productErrorType } from "../../../../types/error";
import { categoryUserType } from "../../../../types/category";
import { brandUserApi, categoryUserApi } from "../../../../Redux";

export type createProductType = {
  data: {
    data: string;
    message: String;
  };
};

function AddProductInfo() {
  const [addProductInfo, setAddProductInfo] = useState({
    brandId: "",
    categoryId: "",
    code: "",
    description: "",
    name: "",
    shortDescription: "",
    topFeatures: [""],
    brandName: "",
    categoryName: "",
  } as product);

  const {
    setShowAddInfoModal,
    setShowAddItem,
    setCreateProductId,
    setShowAddProductModal,
    createProductId,
    refetchProducts,
  } = useContext(ProductsContext) as ProductsContextType;

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddProductInfo({ ...addProductInfo, [name]: value });
  };

  const { data: brands } = brandUserApi.useGetBrandsSelectListQuery("");
  const { data: category } = categoryUserApi.useGetCategorySelectListQuery("");

  const [createProduct, { error: createProductError, isSuccess, isLoading }] =
    useCreateProductMutation();

  const [errors, setErrors] = useState<any>([]);

  const getFormIsValid = () => {
    try {
      const isValid = productSchema.validate(addProductInfo, {
        abortEarly: false,
      });
      if (Boolean(isValid) == true) {
        addNewProductHandler();
      }
    } catch (error: any) {
      let errors = error.inner.reduce(
        (acc: any, error: any) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setErrors(errors);
    }
  };

  const addNewProductHandler = async () => {
    try {
      const response = (await createProduct(
        addProductInfo
      )) as createProductType;
      setCreateProductId(response?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) {
      setShowAddInfoModal(false);
      setShowAddItem(true);
      setCreateProductId(createProductId as string);

      toast.success("Add product is successful");
      refetchProducts();
    }
  }, [isSuccess]);

  const [productError, setProductError] = useState<productErrorType>();

  useEffect(() => {
    if (createProductError) {
      setProductError(createProductError as productErrorType);
    }
  }, [createProductError]);

  return (
    <div className="rounded-xl min-w-[20rem]">
      <h1 className="text-center py-3 text-lg font-semibold">
        Add New Product
      </h1>
      <p className="text-red text-center text-xs">
        {productError?.data?.message}
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[24rem] min-w-[30rem]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 p-4 rounded-lg gap-x-4 gap-y-6">
            <div>
              <Input
                labelText="name"
                placeholder="name"
                name="name"
                className="border"
                value={addProductInfo.name}
                onChange={setInputValue}
                callback={() => {
                  setErrors(""), setProductError("" as any);
                }}
                Error={productError?.data?.errors?.name}
              />
            </div>

            <div>
              <Input
                labelText="code"
                placeholder="code"
                name="code"
                className="border"
                value={addProductInfo.code}
                onChange={setInputValue}
                callback={() => {
                  setErrors(""), setProductError("" as any);
                }}
                Error={errors?.code || productError?.data?.errors?.code}
              />
            </div>

            <div className="col-span-2">
              <Input
                labelText="description"
                placeholder="description"
                name="description"
                className="border"
                value={addProductInfo.description}
                onChange={setInputValue}
                callback={() => {
                  setErrors(""), setProductError("" as any);
                }}
                Error={
                  errors?.description || productError?.data?.errors?.description
                }
              />
            </div>

            <div className="col-span-2">
              <Input
                labelText="shortDescription"
                placeholder="shortDescription"
                name="shortDescription"
                className="border"
                value={addProductInfo.shortDescription}
                onChange={setInputValue}
                callback={() => {
                  setErrors(""), setProductError("" as any);
                }}
                Error={
                  errors?.shortDescription ||
                  productError?.data?.errors?.shortDescription
                }
              />
            </div>

            <div>
              <label className="text-sm">Category</label>
              <SelectList
                onChange={(selected) =>
                  setAddProductInfo({
                    ...addProductInfo,
                    categoryId: selected.value,
                    categoryName: selected.label,
                  })
                }
                name="categoryId"
                options={category?.data?.map((category: categoryUserType) => ({
                  label: category.value,
                  value: category.key,
                }))}
              />
              <p className="text-xs text-red">
                {errors?.categoryId || productError?.data?.errors?.categoryId}
              </p>
            </div>
            <div>
              <label className="text-sm">Brand</label>
              <SelectList
                onChange={(selected) =>
                  setAddProductInfo({
                    ...addProductInfo,
                    brandId: selected.value,
                    brandName: selected.label,
                  })
                }
                name="brandId"
                options={brands?.data?.map((brand: brandSelectListType) => ({
                  label: brand.value,
                  value: brand.key,
                }))}
              />
              <p className="text-xs text-red">
                {errors?.brandId || productError?.data?.errors?.brandId}
              </p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 mt-4">
          <button
            onClick={getFormIsValid}
            className="bg-black text-white py-2 disabled:bg-gray disabled:text-black"
          >
            Add Product
          </button>
          <button
            className="py-2 border border-gray"
            onClick={() => setShowAddProductModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductInfo;
