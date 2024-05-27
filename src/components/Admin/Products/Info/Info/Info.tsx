import ReactDOM from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { InfoPorps } from "./Info.interface";
import ProductInfo from "../ProductInfo/ProductInfo";
import ProductItemInfo from "../ProductItemInfo/ProductItemInfo";
import ProductImage from "../ProductImage/ProductImage";

export default function Info(props: InfoPorps) {
  const {
    showProductInfoModal,
    setShowInfo,
    setShowEditItem,
    setShowEditFile,
    showInfo,
    showEditItem,
    showEditFile,
    setShowProductInfoModal,
    editProductId,
    refetchProducts,
  } = props;

  return ReactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400 ${
        showProductInfoModal ? "visible" : "invisible"
      }`}
    >
      <div className="w-auto bg-white min-h-5/6 rounded-lg relative">
        <button
          className=" absolute right-1 top-1"
          onClick={() => {
            setShowProductInfoModal(false);
            setShowEditItem(false);
            setShowEditFile(false);
            setShowInfo(true);
          }}
        >
          <AiFillCloseCircle className="text-red text-2xl" />
        </button>
        <div className="flex gap-x-5 text-sm text-current justify-center py-4">
          <button
            className={`${showInfo === true && "text-blue-600 font-semibold"}`}
            onClick={() => {
              setShowInfo(true);
              setShowEditItem(false);
              setShowEditFile(false);
            }}
          >
            1 product info
          </button>
          <button
            className={`${
              showEditItem === true && "text-blue-600 font-semibold"
            }`}
            onClick={() => {
              setShowInfo(false);
              setShowEditItem(true);
              setShowEditFile(false);
            }}
          >
            2 product Item
          </button>
          <button
            className={`${
              showEditFile === true && "text-blue-600 font-semibold"
            }`}
            onClick={() => {
              setShowInfo(false);
              setShowEditItem(false);
              setShowEditFile(true);
            }}
          >
            3 product File
          </button>
        </div>
        <ProductInfo editProductId={editProductId} showInfo={showInfo} />
        <ProductItemInfo
          editProductId={editProductId}
          showEditItem={showEditItem}
        />
        <ProductImage
          editProductId={editProductId}
          showEditFile={showEditFile}
          refetchProducts={refetchProducts}
        />
      </div>
    </section>,
    document.getElementById("portal") as any
  );
}
