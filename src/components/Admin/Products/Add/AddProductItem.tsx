import React, { useContext, useEffect, useMemo, useState } from "react";
import Input from "../../../Input";
import SelectList from "../../../SelectList";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { productItemType } from "../../../../types/ProductItem.type";
import {
  addProductItem,
  resetAddProductItemResponse,
  setAddProductItemResponse,
} from "../../../../Redux/store/productItem";
import { getColorsSelectList } from "../../../../Redux/store/color";

function AddProductItem() {
  const dispatch = useAppDispatch();
  const [dataFethed, setDataFetched] = useState(false);
  const {
    setShowAddItem,
    setShowAddFeature,
    createProductId,
    showAddItem,
    setShowAddProductModal,
    setShowAddInfoModal,
  } = useContext(ProductsContext) as ProductsContextType;

  const [productItemInfo, setProductItemInfo] = useState({
    colorId: "",
    isMainItem: false,
    price: null,
    productId: createProductId,
    quantity: null,
    status: null,
  } as productItemType);

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setProductItemInfo({
      ...productItemInfo,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const { colorsSelectList } = useAppSelector((state) => state.color);
  const { addProductItemError, addProductItemResponse } = useAppSelector(
    (state) => state.productItem
  );

  useEffect(() => {
    if (!dataFethed) {
      dispatch(getColorsSelectList());
      setDataFetched(true);
    }
  }, [dataFethed]);

  const addNewProductHandler = () => {
    const cloneInfo = { ...productItemInfo };
    delete cloneInfo.productName;
    delete cloneInfo.productName;

    dispatch(addProductItem(cloneInfo));
  };
  useEffect(() => {
    if (addProductItemResponse === 200) {
      setShowAddItem(false);
      setShowAddFeature(true);
      setAddProductItemResponse(0);
      dispatch(resetAddProductItemResponse());
    }
  }, [addProductItemResponse]);

  const getDisabledBtn = useMemo(() => {
    const { colorId, price, quantity, status } = productItemInfo;
    if (colorId.length < 2 || price == 0 || quantity == 0 || status == null) {
      return true;
    } else {
      return false;
    }
  }, [productItemInfo]);

  return (
    <div className={` rounded-xl ${showAddItem ? `visible` : `hidden`} `}>
      <h1 className="text-center py-3 text-lg font-semibold">
        Add New Product Item
      </h1>
      <p className="text-red text-center text-xs">
        {addProductItemError?.message}
      </p>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 p-4 rounded-lg gap-x-4 gap-y-6">
          <div>
            <Input
              type="number"
              labelText="Quantity"
              placeholder="quantity"
              name="quantity"
              className="border"
              value={productItemInfo.quantity}
              onChange={setInputValue}
              Error={
                addProductItemError?.errors?.quantity
                  ? String(addProductItemError?.errors?.quantity)
                  : ""
              }
            />
          </div>

          <div>
            <Input
              type="number"
              labelText="Price"
              placeholder="price"
              name="price"
              className="border"
              value={productItemInfo.price}
              onChange={setInputValue}
              Error={
                addProductItemError?.errors?.price
                  ? String(addProductItemError?.errors?.price)
                  : ""
              }
            />
          </div>

          <div>
            <label className="text-sm">Color</label>
            <SelectList
              onChange={(selected) =>
                setProductItemInfo({
                  ...productItemInfo,
                  colorId: selected.value,
                  colorName: selected.label,
                })
              }
              name="brandId"
              options={colorsSelectList?.map((category) => ({
                label: category.value,
                value: category.key,
              }))}
            />
          </div>

          <div>
            <label className="text-sm">Status</label>
            <SelectList
              onChange={(selected) =>
                setProductItemInfo({
                  ...productItemInfo,
                  status: selected.value,
                })
              }
              name="status"
              options={[0, 1].map((status) => ({
                label: status === 0 ? "Publush" : "InActive",
                value: status,
              }))}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mt-4">
          <button
            onClick={addNewProductHandler}
            disabled={getDisabledBtn}
            className="bg-black text-white py-2 disabled:bg-gray disabled:text-black"
          >
            Add Product Item
          </button>
          <button
            className="py-2 border border-borderColor"
            onClick={() => {
              setShowAddInfoModal(true);
              setShowAddItem(false);
              setShowAddProductModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductItem;
