import { useContext, useEffect, useState } from "react";
import { resetAddProductFeatureKeyResponse } from "../../../../Redux/slices/feature";
import {
  addProductFeatureValue,
  getProductFeatureKey,
} from "../../../../Redux/slices/feature";
import {
  ProductsContext,
  ProductsContextType,
} from "../../../../context/admin/productsContext";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../Redux/store";

export default function AddProductFeature() {
  const [dataIsFetched, setDataIsFetched] = useState(false);
  const {
    createProductId,
    setShowAddFile,
    setShowAddFeature,
    setShowAddProductModal,
    setShowAddInfoModal,
    refetchProducts,
  } = useContext(ProductsContext) as ProductsContextType;

  const dispatch = useDispatch();

  const [values, setValues] = useState<any>([]);

  const addNewProducts = () => {
    dispatch(addProductFeatureValue({ createProductId, values }) as any);
  };

  const { productFeatureKey, addProductFeatureKeyResponse, featureLoading } =
    useAppSelector((state) => state?.feature);

  useEffect(() => {
    if (!dataIsFetched) {
      dispatch(getProductFeatureKey() as any);
      setDataIsFetched(true);
    }
  }, [dataIsFetched]);

  useEffect(() => {
    if (addProductFeatureKeyResponse === 200) {
      dispatch(resetAddProductFeatureKeyResponse());
      setShowAddFile(true);
      setShowAddFeature(false);
      refetchProducts();
    }
  }, [addProductFeatureKeyResponse]);

  const handleInputChange = (id: string, value: string | number) => {
    const index = values.findIndex(
      (item: any) => item.productFeatureKeyId === id
    );

    if (index !== -1) {
      const updatedValues = [...values];
      updatedValues[index] = { productFeatureKeyId: id, value: value };
      setValues(updatedValues);
    } else {
      setValues([...values, { productFeatureKeyId: id, value: value }]);
    }
  };

  return (
    <div className="lg:w-[30rem] min-h-[27rem] max-w-10/12 bg-white-100 dark:bg-black-200  p-5 rounded-xl relative">
      <span className="mb-5 text-xl font-bold flex justify-center dark:text-white-100">
        Add New Product Feature
      </span>

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div
          className={`grid grid-cols-2 gap-x-8 gap-y-4 mt-2 text-sm h-[18rem] ${
            featureLoading && "opacity-20"
          }`}
        >
          {productFeatureKey?.map((item: any) => (
            <div key={item.id}>
              <label className="dark:text-white-100">{item.name}: </label>
              <input
                type="text"
                className="border border-borderColor p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600  dark:text-white-100"
                placeholder={item.name}
                value={
                  values?.find((v: any) => v.productFeatureKeyId === item.id)
                    ?.value || ""
                }
                onChange={(e) => handleInputChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 mt-8 gap-x-8">
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-black text-white text-white-100"
            onClick={addNewProducts}
          >
            Add Product Feature
          </button>
          <button
            type="button"
            className="w-full py-2 rounded-xl border border-blue-600 dark:text-white-100"
            onClick={() => {
              setShowAddInfoModal(true);
              setShowAddFeature(false);
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
