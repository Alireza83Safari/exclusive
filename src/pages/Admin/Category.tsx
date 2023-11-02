import React, { Suspense } from "react";
import { CategoryContextProvider } from "../../components/Admin/Category/Context/CayegoryContext";
import Spinner from "../../components/Spinner/Spinner";

const CategoryTable = React.lazy(
  () => import("../../components/Admin/Category/CategoryTable")
);
const TotalCategory = React.lazy(
  () => import("../../components/Admin/Category/TotalCategory")
);
const AddCategory = React.lazy(
  () => import("../../components/Admin/Category/AddCategory")
);

function Category() {
  return (
    <Suspense fallback={<Spinner />}>
      <CategoryContextProvider>
        <div className="grid grid-cols-12 mt-4">
          <CategoryTable />
          <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
            <div className="lg:col-span-2 cols-span-1">
              <TotalCategory />
            </div>
            <div className="lg:col-span-2 cols-span-1">
              <AddCategory />
            </div>
          </div>
        </div>
      </CategoryContextProvider>
    </Suspense>
  );
}

export default Category;
