import {
  AddBrand,
  AddBrandFile,
  BrandTable,
  EditBrand,
  TotalBrand,
} from "../../components";
import { useState } from "react";
import { brandAdminApi } from "../../Redux";
import { useLocation } from "react-router-dom";

function Brand() {
  const [showEditModal, setShownEditModal] = useState(false);
  const [editBrandId, setEditBrandId] = useState("");
  const [createdBrandId, setCreatedBrandId] = useState("");
  const [showAddBrand, setShowAddBrand] = useState(true);
  const [showAddBrandFile, setShowAddBrandFile] = useState(false);

  const location = useLocation();

  const {
    data: brands,
    isLoading: isLoadingBrnads,
    refetch: refetchBrands,
  } = brandAdminApi.useGetBrandsAdminQuery(
    location.search || `?page=1&limit=9`
  );

  return (
    <div className="grid grid-cols-12 mt-4">
      <BrandTable
        brands={brands}
        isLoadingBrands={isLoadingBrnads}
        refetchBrands={refetchBrands}
        setEditBrandId={setEditBrandId}
        setShownEditModal={setShownEditModal}
      />

      <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
        <div className="lg:col-span-2 cols-span-1">
          <TotalBrand total={brands?.total} isLoadingBrnads={isLoadingBrnads} />
        </div>
        <div className="lg:col-span-2 cols-span-1">
          {showAddBrand && (
            <AddBrand
              setShowAddBrand={setShowAddBrand}
              refetchBrands={refetchBrands}
              setCreatedBrandId={setCreatedBrandId}
              setShowAddBrandFile={setShowAddBrandFile}
            />
          )}

          {showAddBrandFile && (
            <AddBrandFile
              refetchBrands={refetchBrands}
              createdBrandId={createdBrandId}
              setShowAddBrand={setShowAddBrand}
              setShowAddBrandFile={setShowAddBrandFile}
            />
          )}
        </div>
      </div>
      <EditBrand
        showEditModal={showEditModal}
        setShownEditModal={setShownEditModal}
        editBrandId={editBrandId}
        refetchBrands={refetchBrands}
      />
    </div>
  );
}

export default Brand;
