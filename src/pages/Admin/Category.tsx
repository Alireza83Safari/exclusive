import {
  AddCategory,
  CategoryTable,
  EditCategory,
  TotalCategory,
} from "../../components";
import { useState } from "react";
import { categoryAdminApi } from "../../Redux";
import { useLocation } from "react-router-dom";

function Category() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");
  const location = useLocation();
  const {
    data: category,
    isLoading: categoryLoading,
    refetch: refetchCategory,
  } = categoryAdminApi.useGetCategoriesQuery(
    location.search || "?page=1&limit=9"
  );

  return (
    <div className="grid grid-cols-12 mt-4">
      <CategoryTable
        category={category}
        categoryLoading={categoryLoading}
        refetchCategory={refetchCategory}
        setOpenEditModal={setOpenEditModal}
        setEditCategoryId={setEditCategoryId}
      />
      <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
        <div className="lg:col-span-2 cols-span-1">
          <TotalCategory
            total={category?.total}
            categoryLoading={categoryLoading}
          />
        </div>
        <div className="lg:col-span-2 cols-span-1">
          <AddCategory refetchCategory={refetchCategory} />
        </div>
      </div>
      <EditCategory
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        editCategoryId={editCategoryId}
        refetchCategory={refetchCategory}
      />
    </div>
  );
}

export default Category;
