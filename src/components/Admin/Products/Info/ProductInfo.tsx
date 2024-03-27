import React, { useContext, useEffect, useState } from "react";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
import Spinner from "../../../Spinner/Spinner";
import Input from "../../../Input";
import { product } from "../../../../types/product";
import SelectList from "../../../SelectList";
import toast from "react-hot-toast";
import { categoryUserType } from "../../../../types/category";
import { brandSelectListType } from "../../../../types/brand";
import { useGetBrandsSelectListQuery } from "../../../../Redux/apis/user/brandUserApi";
import { useGetCategorySelectListQuery } from "../../../../Redux/apis/user/categoryUserApi";
import {
  useEditProductMutation,
  useGetProductAdminMutation,
} from "../../../../Redux/apis/admin/productAdminApi";

function ProductInfo() {
  const { editProductId } = useContext(ProductsContext) as ProductsContextType;
  const { showInfo } = useContext(ProductsContext) as ProductsContextType;

  const [getProductAdmin, { data: product, isLoading: productLoading }] =
    useGetProductAdminMutation();

  const [editProduct, { isSuccess: editProductResponse, isError }] =
    useEditProductMutation();

  useEffect(() => {
    if (editProductId) {
      getProductAdmin(editProductId);
    }
  }, [editProductId]);

  const { data: brands } = useGetBrandsSelectListQuery("");
  const { data: category } = useGetCategorySelectListQuery("");

  const [editProductInfo, setEditProductInfo] = useState<product>({
    brandId: "",
    categoryId: "",
    code: "",
    description: "",
    name: "",
    shortDescription: "",
    topFeatures: [""],
    categoryName: "",
    brandName: "",
  });

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditProductInfo({ ...editProductInfo, [name]: value });
  };

  useEffect(() => {
    if (product && !productLoading) {
      setEditProductInfo({
        ...editProductInfo,
        brandId: product?.brandId,
        categoryId: product.categoryId,
        code: product.code,
        description: product.description,
        name: product.name,
        shortDescription: product.shortDescription,
        topFeatures: product?.topFeatures,
        categoryName: product.categoryName,
        brandName: product.brandName,
      });
    }
  }, [product, editProductId, category, productLoading, brands]);

  const editProductInfoHandler = () => {
    editProduct({ id: product?.id, productInfo: editProductInfo });
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        "It seems you encountered an error while adding a product. Please try again later."
      );
    } else if (editProductResponse) {
      toast.success("Edit Product Is Success");
    }
  }, [editProductResponse]);

  return (
    <div
      className={`relative min-w-[34rem] ${showInfo ? `visible` : `hidden`}`}
    >
      <div className="px-5 py-3">
        {productLoading ? (
          <div className="min-h-[23rem]">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2">
              <div>
                <div className="py-4 border-b border-gray w-full">Name:</div>
                <div className="py-4 border-b border-gray w-full">Code:</div>
                <div className="py-4 border-b border-gray w-full">
                  Brand Name:
                </div>
                <div className="py-4 border-b border-gray w-full">
                  Category Name:
                </div>
                <div className="py-4 border-b border-gray w-full">
                  description :
                </div>
                <div className="py-4 w-full">shortDescription:</div>
              </div>
              <form>
                <div className="py-2 border-b border-gray w-full">
                  <Input
                    name="name"
                    value={editProductInfo.name}
                    onChange={setInputValue}
                  />
                </div>
                <div className="py-2 border-b border-gray w-full">
                  <Input
                    name="code"
                    value={editProductInfo.code}
                    onChange={setInputValue}
                  />
                </div>
                <div className="py-2 border-b border-gray w-full">
                  <SelectList
                    name="brandId"
                    value={{
                      label: editProductInfo.brandName,
                      value: editProductInfo.brandId,
                    }}
                    onChange={(select) => {
                      setEditProductInfo({
                        ...editProductInfo,
                        brandId: select.value,
                        brandName: select.label,
                      });
                    }}
                    options={brands?.data.map((brand: brandSelectListType) => ({
                      label: brand.value,
                      value: brand.key,
                    }))}
                  />
                </div>
                <div className="py-2 border-b border-gray w-full">
                  <SelectList
                    value={{
                      label: String(editProductInfo.categoryName),
                      value: editProductInfo.categoryId,
                    }}
                    onChange={(select) => {
                      setEditProductInfo({
                        ...editProductInfo,
                        categoryId: select.value,
                        categoryName: select.label,
                      });
                    }}
                    name="categoryId"
                    options={category?.data.map(
                      (category: categoryUserType) => ({
                        label: category.value,
                        value: category.key,
                      })
                    )}
                  />
                </div>
                <div className="py-2 border-b border-gray w-full">
                  <Input
                    name="description"
                    value={editProductInfo.description}
                    onChange={setInputValue}
                  />
                </div>
                <div className="py-2 w-full">
                  <Input
                    name="shortDescription"
                    value={editProductInfo.shortDescription}
                    onChange={setInputValue}
                  />
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      <button
        className="w-full bg-black text-white py-2"
        onClick={editProductInfoHandler}
      >
        Save Change
      </button>
    </div>
  );
}

export default React.memo(ProductInfo);
