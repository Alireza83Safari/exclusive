import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Spinner from "../../Spinner/Spinner";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  CategoryContext,
  categoryContextType,
} from "./Context/CayegoryContext";
import EditCategory from "./EditCategory";
import { useDeleteCategoryMutation } from "../../../Redux/apis/admin/categoryAdminApi";
import { useSearch } from "../../../hooks/useSearch";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../Pagination";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Column {
  id: "index" | "code" | "name" | "createAt" | "actions";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "name", label: "Category Name" },
  { id: "code", label: "Category Code" },
  { id: "createAt", label: "createAt" },
  { id: "actions", label: "actions" },
];

function CategoryTable() {
  const {
    setOpenEditModal,
    setEditCategoryId,
    total,
    category,
    categoryLoading,
    refetchCategory,
  } = useContext(CategoryContext) as categoryContextType;

  const [deleteCategory, { error: deleteCategoryError, isSuccess }] =
    useDeleteCategoryMutation();

  const deleteCategoryHandler = (id: string) => {
    deleteCategory(id);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 8;
  const totalPages = Math.ceil(total / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const {} = usePagination(currentPage, pageSize);

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };
  const { searchHandler } = useSearch();

  const submitSearch = () => {
    setCurrentPage(1);
    searchHandler(searchQuery);
    setSearchQuery("");
  };

  const changePageHandler = (id: number) => {
    setCurrentPage(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("delete category is success");
      refetchCategory();
    }
    if (deleteCategoryError) {
      toast.error(deleteCategoryError?.data.message);
    }
  }, [isSuccess, deleteCategoryError]);
  return (
    <div className="lg:col-span-8 col-span-12 m-3 lg:order-1 order-2">
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          margin: "0 auto",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
          borderRadius: "12px",
        }}
      >
        <div className="h-8 md:mx-8 mb-4">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
              onClick={submitSearch}
            />
            <TextField
              id="input-with-sx"
              label="search"
              variant="standard"
              onChange={setInputValue}
              value={searchQuery}
              onKeyPress={(e) => e.key === "Enter" && submitSearch()}
            />
          </Box>
        </div>
        <TableContainer sx={{ minHeight: 490 }}>
          <Table stickyHeader aria-label="sticky table">
            {categoryLoading ? (
              <Spinner />
            ) : (
              <>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="center">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category?.length ? (
                    category?.map((row: any, index: any) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.code}</TableCell>
                        <TableCell
                          style={{ whiteSpace: "nowrap" }}
                          align="center"
                        >
                          {row.createdAt.slice(0, 10)}
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: "6px",
                          }}
                        >
                          <FaTrash
                            className="text-red mr-3"
                            onClick={() => deleteCategoryHandler(row.id)}
                          />
                          <FaPen
                            className="text-orange-500"
                            onClick={() => {
                              setOpenEditModal(true);
                              setEditCategoryId(row.id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableCell colSpan={7}>
                      <p className="text-xl text-center font-semibold">
                        We couldn't find a category with these specifications.
                      </p>
                    </TableCell>
                  )}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePageHandler}
          />
        )}
      </Paper>
      <EditCategory />
    </div>
  );
}

export default CategoryTable;
