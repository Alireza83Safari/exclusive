import React, { useContext, useMemo, useState } from "react";
import Input from "../../../Input";
import SelectList from "../../../SelectList";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
import { productItemType } from "../../../../types/ProductItem.type";
import { productItemErrorType } from "../../../../types/Error.type";
import toast from "react-hot-toast";
import { useCreateProductItemMutation } from "../../../../Redux/apis/admin/productItemAdminApi";
import { useGetColorsSelectListQuery } from "../../../../Redux/apis/user/colorUserApi";
import Spinner from "../../../Spinner/Spinner";

function AddProductItem() {
  const {
    setShowAddItem,
    setShowAddFeature,
    createProductId,
    showAddItem,
    setShowAddProductModal,
    setShowAddInfoModal,
    refetchProducts,
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

  const [createProductItem, { error: createItemError, isLoading }] =
    useCreateProductItemMutation();

  const { data: colors } = useGetColorsSelectListQuery("");

  const addProductItemHandler = async () => {
    //const cloneInfo = { ...productItemInfo };

    await createProductItem(productItemInfo as any)
      .unwrap()
      .then(() => {
        toast.success("Add product item is successful");
        setShowAddItem(false);
        setShowAddFeature(true);
        refetchProducts();
      });
  };
  const addItemError = createItemError as productItemErrorType;

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
        {addItemError?.data?.message}
      </p>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 p-4 rounded-lg gap-x-4 gap-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[24rem] min-w-[30rem]">
              <Spinner />
            </div>
          ) : (
            <>
              <div>
                <Input
                  type="number"
                  labelText="Quantity"
                  placeholder="quantity"
                  name="quantity"
                  className="border"
                  value={productItemInfo.quantity}
                  onChange={setInputValue}
                  Error={addItemError?.data?.errors?.quantity}
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
                  Error={addItemError?.data?.errors?.price}
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
                  options={colors?.data.map((color: any) => ({
                    label: color.value,
                    value: color.key,
                  }))}
                />
                <p className="text-red text-center text-xs">
                  {addItemError?.data?.errors?.colorId}
                </p>
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
                <p className="text-red text-center text-xs">
                  {addItemError?.data?.errors?.status}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 mt-4">
          <button
            onClick={addProductItemHandler}
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
