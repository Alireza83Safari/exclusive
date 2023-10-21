import React, { useContext, useEffect, useMemo, useState } from "react";
import { productType } from "../../../../types/Product.type";
import Input from "../../../Input";
import SelectList from "../../../SelectList";
import { getAdminCategory } from "../../../../Redux/store/category";
import { getBrandsSelectList } from "../../../../Redux/store/brand";
import {
  addProduct,
  resetAddProductResponse,
} from "../../../../Redux/store/product";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import toast from "react-hot-toast";

function AddProductInfo() {
  const [dataFethed, setDataFetched] = useState(false);
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
  } as productType);

  const {
    setShowAddInfoModal,
    setShowAddItem,
    setCreateProductId,
    setShowAddProductModal,
  } = useContext(ProductsContext) as ProductsContextType;

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddProductInfo({ ...addProductInfo, [name]: value });
  };

  const dispatch = useAppDispatch();

  const { adminCategory } = useAppSelector((state) => state.category);
  const { brandsSelectList } = useAppSelector((state) => state.brand);
  const { addProductError, addProductResponse, createProductId } =
    useAppSelector((state) => state.product);

  useEffect(() => {
    if (!dataFethed) {
      dispatch(getAdminCategory());
      dispatch(getBrandsSelectList());
      setDataFetched(true);
    }
  }, [dataFethed]);

  const addNewProductHandler = () => {
    dispatch(addProduct(addProductInfo));
  };

  useEffect(() => {
    if (addProductResponse === 200) {
      setShowAddInfoModal(false);
      setShowAddItem(true);
      setCreateProductId(createProductId as string);

      dispatch(resetAddProductResponse());
    } else if (addProductResponse === 500) {
      toast.error(
        "It seems you encountered an error while adding a product. Please try again later."
      );
    }
  }, [addProductResponse]);

  const getDisbledBtn = useMemo(() => {
    const { name, brandId, categoryId, code, shortDescription, description } =
      addProductInfo;
    if (
      name.length < 2 ||
      brandId.length < 2 ||
      categoryId.length < 2 ||
      code.length < 2 ||
      shortDescription.length < 2 ||
      description.length < 2
    ) {
      return true;
    } else {
      return false;
    }
  }, [addProductInfo]);

  return (
    <div className="rounded-xl">
      <h1 className="text-center py-3 text-lg font-semibold">
        Add New Product
      </h1>
      <p className="text-red text-center text-xs">{addProductError?.message}</p>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 p-4 rounded-lg gap-x-4 gap-y-6">
          <div>
            <Input
              labelText="name"
              placeholder="name"
              name="name"
              className="border"
              value={addProductInfo.name}
              onChange={setInputValue}
              Error={
                addProductError?.errors?.name
                  ? String(addProductError?.errors?.name)
                  : ""
              }
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
              Error={
                addProductError?.errors?.code
                  ? String(addProductError?.errors?.code)
                  : ""
              }
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
              Error={
                addProductError?.errors?.description
                  ? String(addProductError?.errors?.description)
                  : ""
              }
            />
          </div>
          <div>
            <Input
              labelText="topFeatures"
              placeholder="topFeatures"
              name="topFeatures"
              className="border"
              value={addProductInfo.topFeatures}
              onChange={setInputValue}
              Error={
                addProductError?.errors?.topFeatures
                  ? String(addProductError?.errors?.topFeatures)
                  : ""
              }
            />
          </div>

          <div>
            <Input
              labelText="shortDescription"
              placeholder="shortDescription"
              name="shortDescription"
              className="border"
              value={addProductInfo.shortDescription}
              onChange={setInputValue}
              Error={
                addProductError?.errors?.shortDescription
                  ? String(addProductError?.errors?.shortDescription)
                  : ""
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
              options={adminCategory?.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
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
              options={brandsSelectList?.map((category) => ({
                label: category.value,
                value: category.key,
              }))}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mt-4">
          <button
            onClick={addNewProductHandler}
            disabled={getDisbledBtn}
            className="bg-black text-white py-2 disabled:bg-gray disabled:text-black"
          >
            Add Product
          </button>
          <button
            className="py-2 border border-borderColor"
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
