import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Spinner from "../../Spinner/Spinner";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { BrandContext, brandContextType } from "./Context/BrandContext";
import { useDeleteBrandMutation } from "../../../Redux/apis/brandApi";
import DeleteModal from "../DeleteModal";
import EditBrand from "./EditBrand";

interface Column {
  id: "index" | "code" | "name" | "createAt" | "actions" | "image";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "Index" },
  { id: "name", label: "Name" },
  { id: "code", label: "Code" },
  { id: "image", label: "Image" },
  { id: "createAt", label: "CreateAt" },
  { id: "actions", label: "Actions" },
];

function BrandTable() {
  const [page, setPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBrandID, setDeleteBrandId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const {
    brands,
    brandsLoading,
    refetchBrands,
    setOpenEditModal,
    setEditBrandId,
  } = useContext(BrandContext) as brandContextType;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [deleteBrand] = useDeleteBrandMutation();

  const deleteBrandHandler = async (id: string) => {
    deleteBrand(id);
    await deleteBrand(id).then(() => {
      toast.success("Delete Brand Is Success");
      refetchBrands();
      setShowDeleteModal(false);
    });
  };

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
              {brandsLoading ? (
                <Spinner />
              ) : (
                (rowsPerPage > 0
                  ? brands?.data?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : brands?.data
                )?.map((row: any, index: any) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell
                      align="center"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={`http://127.0.0.1:6060/${row.fileUrl}`}
                        className="object-contain max-h-6 max-w-6"
                      />
                    </TableCell>
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
                          setDeleteBrandId(row.id);
                          setShowDeleteModal(true);
                        }}
                      />
                      <FaPen
                        className="text-orange-500"
                        onClick={() => {
                          setOpenEditModal(true);
                          setEditBrandId(row.id);
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
          count={brands?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </Paper>
      <EditBrand />
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteBrandID}
          deleteUrl={deleteBrandHandler}
        />
      )}
    </div>
  );
}

export default BrandTable;
