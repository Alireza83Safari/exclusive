import React, { useContext, useEffect, useState } from "react";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
import { AiFillCloseCircle } from "react-icons/ai";
import Spinner from "../../../Spinner/Spinner";
import Input from "../../../Input";
import { productType } from "../../../../types/Product.type";
import SelectList from "../../../SelectList";
import toast from "react-hot-toast";
import { categoryUserType } from "../../../../types/Category.type";
import { brandSelectListType } from "../../../../types/Brand.type";
import { useGetBrandsSelectListQuery } from "../../../../Redux/apis/user/brandUserApi";
import { useGetCategorySelectListQuery } from "../../../../Redux/apis/user/categoryUserApi";
import { useEditProductMutation, useGetProductAdminMutation } from "../../../../Redux/apis/admin/productAdminApi";

function ProductInfo() {
  const { editProductId } = useContext(ProductsContext) as ProductsContextType;
  const { setShowProductInfoModal, setShowEditItem, setShowInfo, showInfo } =
    useContext(ProductsContext) as ProductsContextType;

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

  const [editProductInfo, setEditProductInfo] = useState<productType>({
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
  }, [product, editProductId, category]);

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
      setShowInfo(false);
      setShowEditItem(true);
    }
  }, [editProductResponse]);

  return (
    <div
      className={`relative min-w-[34rem] ${showInfo ? `visible` : `hidden`}`}
    >
      <div className="px-5 py-3">
        <button
          className=" absolute right-3"
          onClick={() => setShowProductInfoModal(false)}
        >
          <AiFillCloseCircle className="text-red text-2xl" />
        </button>
        {productLoading ? (
          <Spinner />
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
                  Ctegory Name:
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
                    defaultValue={{
                      label: String(editProductInfo.brandName),
                      value: editProductInfo.brandId,
                    }}
                    onChange={(select) => {
                      setEditProductInfo({
                        ...editProductInfo,
                        brandId: select.value,
                        brandName: select.label,
                      });
                    }}
                    name="brandId"
                    options={brands?.data.map((brand: brandSelectListType) => ({
                      label: brand.value,
                      value: brand.key,
                    }))}
                  />
                </div>
                <div className="py-2 border-b border-gray w-full">
                  <SelectList
                    defaultValue={{
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
