import { createContext, useState } from "react";
import { useFetchDataFromUrl } from "../../../../hooks/useFetchDataFromUrl";
import { adminAxios } from "../../../../services/adminInterceptor";

type ProductsContextProviderType = { children: React.ReactNode };

export type ProductsContextType = {
  showDeleteModal: boolean;
  showAddProductModal: boolean;
  showAddInfoModal: boolean;
  showAddItem: boolean;
  createProductId: string;
  showAddFeature: boolean;
  showAddFile: boolean;
  setShowAddProductModal: (value: boolean) => void;
  setShowDeleteModal: (value: boolean) => void;
  setShowAddInfoModal: (value: boolean) => void;
  setShowAddItem: (value: boolean) => void;
  setShowAddFile: (value: boolean) => void;
  setShowAddFeature: (value: boolean) => void;
  setCreateProductId: (value: string) => void;

  showInfo: boolean;
  showEditItem: boolean;
  showEditFile: boolean;
  showEditFeature: boolean;
  showProductInfoModal: boolean;
  editProductId: string;

  setShowInfo: (value: boolean) => void;
  setShowEditItem: (value: boolean) => void;
  setShowEditFile: (value: boolean) => void;
  setShowEditFeature: (value: boolean) => void;
  setShowProductInfoModal: (value: boolean) => void;
  setEditProductId: (value: string) => void;
  refetchProducts: () => void;
  loading: boolean;
  products: any;
  total: number;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsContextProvider = ({
  children,
}: ProductsContextProviderType) => {
  //// add
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddInfoModal, setShowAddInfoModal] = useState(true);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [createProductId, setCreateProductId] = useState<string>("");
  //// edit
  const [showInfo, setShowInfo] = useState(true);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showEditFile, setShowEditFile] = useState(false);
  const [showEditFeature, setShowEditFeature] = useState(false);
  const [showProductInfoModal, setShowProductInfoModal] = useState(false);
  const [editProductId, setEditProductId] = useState<string>("");
  //
  const {
    getFilterData: products,
    fetchDataFormUrl: refetchProducts,
    loading,
    total,
  } = useFetchDataFromUrl(null, adminAxios);
  return (
    <ProductsContext.Provider
      value={{
        showDeleteModal,
        setShowDeleteModal,
        setShowAddProductModal,
        showAddProductModal,
        showAddInfoModal,
        setShowAddInfoModal,
        showAddItem,
        setShowAddItem,
        showAddFile,
        setShowAddFile,
        showAddFeature,
        setShowAddFeature,
        setCreateProductId,
        createProductId,
        editProductId,
        setEditProductId,
        showProductInfoModal,
        setShowProductInfoModal,
        showEditFeature,
        setShowEditFeature,
        showEditFile,
        setShowEditFile,
        showEditItem,
        setShowEditItem,
        showInfo,
        setShowInfo,
        refetchProducts,
        products,
        loading,
        total,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
