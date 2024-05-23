import { CategoryContextProvider } from "../../context/admin/cayegoryContext";
import { AddCategory, CategoryTable, TotalCategory } from "../../components";

function Category() {
  return (
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
  );
}

export default Category;
