import React, { useContext, useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../../Redux/store/product";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Button,
  TextField,
  TableHead,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../DeleteModal";
import { TablePaginationActions } from "./TablePagination";
import {
  ProductsContext,
  ProductsContextType,
} from "./Context/ProductsContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import Spinner from "../../Spinner/Spinner";

export default function ProductsTable() {
  const {
    setShowDeleteModal,
    showDeleteModal,
    setShowAddProductModal,
    setShowProductInfoModal,
    setEditProductId,
  } = useContext(ProductsContext) as ProductsContextType;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useAppDispatch();

  const [isDataFetched, setIsDtaFetched] = useState(false);
  useEffect(() => {
    if (!isDataFetched) {
      dispatch(getProducts(true));
      setIsDtaFetched(true);
    }
  }, [isDataFetched]);

  const { adminProducts, productLoading } = useAppSelector(
    (state) => state.product
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adminProducts.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [deleteId, setDeleteId] = useState("");
  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
    dispatch(getProducts(true));
    setShowDeleteModal(false);
  };
  return (
    <>
      <Box>
        <div className="mt-5 md:mx-12 flex justify-between h-16">
          <TextField
            placeholder="Search"
            variant="outlined"
            sx={{
              height: "10px",
              padding: "1px",
              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                paddingY: "7px",
              },
            }}
          />

          <button
            className="bg-black text-white h-9 text-sm px-3"
            onClick={() => setShowAddProductModal(true)}
          >
            Add New Product
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ width: 160, fontWeight: "bold" }}
                  align="center"
                >
                  #
                </TableCell>
                <TableCell
                  style={{ width: 160, fontWeight: "bold" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ width: 160, fontWeight: "bold" }}
                  align="center"
                >
                  Code
                </TableCell>
                <TableCell
                  style={{ width: 160, fontWeight: "bold" }}
                  align="center"
                >
                  Brand
                </TableCell>
                <TableCell
                  style={{ width: 160, fontWeight: "bold" }}
                  align="center"
                >
                  Category Name
                </TableCell>
                <TableCell
                  style={{ width: 160, fontWeight: "bold" }}
                  align="center"
                >
                  Actions
                </TableCell>
                <TableCell
                  style={{ width: 160, fontWeight: "bold" }}
                  align="center"
                >
                  Infos
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productLoading ? (
                <Spinner />
              ) : (
                (rowsPerPage > 0
                  ? adminProducts.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : adminProducts
                ).map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ width: 160 }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.code}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      <div className=" flex justify-center">
                        <img
                          src={`http://127.0.0.1:6060/${row.brandFileUrl}`}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.categoryName}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      <div className="flex justify-center gap-x-2">
                        <FaTrash
                          className="text-red"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setDeleteId(row.id);
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      <div className="flex justify-center">
                        <button
                          className="flex justify-center gap-x-2 border border-borderColor rounded-md px-2 text-xs py-1"
                          onClick={() => {
                            setEditProductId(row.id);
                            setShowProductInfoModal(true);
                          }}
                        >
                          Infos
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={adminProducts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteId}
          deleteUrl={handleDeleteProduct}
        />
      )}
    </>
  );
}
