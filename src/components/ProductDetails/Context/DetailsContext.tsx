import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userProductType } from "../../../types/product";
import { useGetProductsUserQuery } from "../../../Redux/apis/user/productApiUser";
import { useGetProductItemUserMutation } from "../../../Redux/apis/user/productItemUserApi";

export type DetailContextProviderType = {
  children: React.ReactNode;
};
export type DetailContextType = {
  productItem: any;
  productItemLoading: boolean;
  productFind: any;
  productLoading: boolean;
  products: any;
};

export const DetailContext = createContext<DetailContextType | null>(null);

export const DetailContextProvider = ({
  children,
}: DetailContextProviderType) => {
  const { productId } = useParams();
  const [productFind, setProductFind] = useState<userProductType>();

  const { data: products, isLoading: productLoading } =
    useGetProductsUserQuery("?limit=100");

  useEffect(() => {
    let findProduct = products?.data.find(
      (product: userProductType) => product.id == productId
    );
    setProductFind(findProduct);
  }, [products?.data, productId]);

  const [
    getProductItemUser,
    { data: productItem, isLoading: productItemLoading },
  ] = useGetProductItemUserMutation();

  useEffect(() => {
    if (productFind) {
      getProductItemUser(productFind?.itemId);
    }
  }, [productFind]);

  return (
    <DetailContext.Provider
      value={{
        productItem,
        productItemLoading,
        productFind,
        productLoading,
        products,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
