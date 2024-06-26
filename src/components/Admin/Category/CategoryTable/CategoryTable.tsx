import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDeleteCategoryMutation } from "../../../../Redux/apis/admin/categoryAdminApi";
import { useSearch } from "../../../../hooks/useSearch";
import { BrandTableSkeleton, Pagination } from "../../../../components";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useHasAccess from "../../../../hooks/useHasAccess";
import DeleteModal from "../../DeleteModal/DeleteModal";
import useRow from "../../../../hooks/useRow";
import { CategoryTableProps } from "./CategoryTable.interface";

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

function CategoryTable(props: CategoryTableProps) {
  const {
    category,
    categoryLoading,
    refetchCategory,
    setOpenEditModal,
    setEditCategoryId,
  } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState("");

  const { userHasAccess: accessList } = useHasAccess(
    "action_category_admin_list"
  );

  const { userHasAccess: accessEdit } = useHasAccess(
    "action_category_admin_update"
  );
  const { userHasAccess: accessDelete } = useHasAccess(
    "action_category_admin_delete"
  );

  const [deleteCategory, { error: deleteCategoryError, isSuccess }] =
    useDeleteCategoryMutation();

  const deleteCategoryHandler = (id: string) => {
    if (accessDelete) {
      deleteCategory(id);
      setShowDeleteModal(false);
    } else {
      toast.error("You Havent Access Delete Category");
      setShowDeleteModal(false);
    }
  };

  const editCategoryHandler = (id: string) => {
    if (accessEdit) {
      setOpenEditModal(true);
      setEditCategoryId(id);
    } else {
      toast.error("You Havent Access Edit Category");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 9;
  const totalPages = Math.ceil(category?.total / pageSize);

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };
  const { searchHandler } = useSearch();

  const submitSearch = () => {
    searchHandler(searchQuery);
    setSearchQuery("");
    setSearchQuery("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete Category Is Success");
      refetchCategory();
    }
    if (deleteCategoryError) {
      toast.error("delete category get error!!");
    }
  }, [isSuccess, deleteCategoryError]);

  const { rowNumber, limit } = useRow();

  if (categoryLoading) {
    return <BrandTableSkeleton />;
  }

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
        <TableContainer sx={{ minHeight: 530 }}>
          {accessList ? (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell key={column.id} align="center">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {category?.data.map((row: any, index: any) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      {(rowNumber as any) >= (limit as any)
                        ? rowNumber + index + 1
                        : index + 1}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell style={{ whiteSpace: "nowrap" }} align="center">
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
                        onClick={() => {
                          setEditCategoryId(row.id);
                          setShowDeleteModal(true);
                          setDeleteCategoryId(row.id);
                        }}
                      />
                      <FaPen
                        className="text-orange-500"
                        onClick={() => editCategoryHandler(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}

                {!category?.data.length && (
                  <TableCell colSpan={7}>
                    <p className="text-xl text-center font-semibold">
                      We couldn't find a category with these specifications.
                    </p>
                  </TableCell>
                )}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ marginTop: "100px" }}>
              <h1 className="text-3xl font-bold  flex justify-center items-center ">
                You Havent Access Category List
              </h1>
            </Box>
          )}
        </TableContainer>
        <Pagination totalPages={totalPages} pageSize={pageSize} />
      </Paper>

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteCategoryId}
          deleteUrl={deleteCategoryHandler}
        />
      )}
    </div>
  );
}

export default CategoryTable;
