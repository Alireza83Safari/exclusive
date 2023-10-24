import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDeleteCategoryMutation } from "../../../Redux/apis/categoryApi";
import Spinner from "../../Spinner/Spinner";
import {  FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  CategoryContext,
  categoryContextType,
} from "./Context/CayegoryContext";
import EditCategory from "./EditCategory";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);
  const {
    category,
    categoryLoading,
    refetchCategory,
    setOpenEditModal,
    setEditCategoryId,
  } = React.useContext(CategoryContext) as categoryContextType;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [deleteCategory, { error: deleteCategoryError, isSuccess }] =
    useDeleteCategoryMutation();

  const deleteCategoryHandler = (id: string) => {
    deleteCategory(id);
  };

  React.useEffect(() => {
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
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
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
              {categoryLoading ? (
                <Spinner />
              ) : (
                (rowsPerPage > 0
                  ? category?.data?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : category?.data
                )?.map((row: any, index: any) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
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
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={category?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </Paper>
      <EditCategory />
    </div>
  );
}

export default CategoryTable;
