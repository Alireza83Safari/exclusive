import React, { useContext, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  TableHead,
  Button,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../DeleteModal";
import {
  ProductsContext,
  ProductsContextType,
} from "./Context/ProductsContext";
import Spinner from "../../Spinner/Spinner";
import toast from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
import { useDeleteProductMutation } from "../../../Redux/apis/admin/productAdminApi";
import Pagination from "../../Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { useSearch } from "../../../hooks/useSearch";
import useRow from "../../../hooks/useRow";

export default function ProductsTable() {
  const {
    setShowDeleteModal,
    showDeleteModal,
    setShowAddProductModal,
    setShowProductInfoModal,
    setEditProductId,
    total,
    refetchProducts,
    loading,
    products,
    setProductInfo,
  } = useContext(ProductsContext) as ProductsContextType;

  const [deleteProduct] = useDeleteProductMutation();
  const [deleteId, setDeleteId] = useState("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };
  const { searchHandler } = useSearch();

  const submitSearch = () => {
    setCurrentPage(1);
    searchHandler(searchValue);
  };
  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);
  const {} = usePagination(currentPage, pageSize);

  const changePageHandler = (id: number) => {
    setCurrentPage(id);
  };

  const deleteProductHandler = async (id: string) => {
    await deleteProduct(id).then(() => {
      toast.success("delete product is success");
      refetchProducts();
      setShowDeleteModal(false);
    });
  };

  const { rowNumber, limit } = useRow();

  return (
    <>
      <Box
        sx={{ backgroundColor: "white", paddingBottom: "1rem", minHeight: 650 }}
      >
        <div className="flex justify-between h-10 mt-5 md:mx-8 mb-3">
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
              value={searchValue}
              onKeyPress={(e) => e.key === "Enter" && submitSearch()}
            />
          </Box>

          <Button
            sx={{ backgroundColor: "black", color: "white" }}
            onClick={() => setShowAddProductModal(true)}
          >
            Add New Product
          </Button>
        </div>
        <TableContainer component={Paper} sx={{ boxShadow: "0" }}>
          <Table
            sx={{ minWidth: 500 }}
            aria-label="custom pagination table "
            className={`${loading && `min-h-[30rem]`}`}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
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
                  {products?.length > 0 ? (
                    products?.map((row: any, index: number) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ width: 160 }} align="center">
                          {(rowNumber as any) >= (limit as any)
                            ? rowNumber + index + 1
                            : index + 1}
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
                              src={row?.brandFileUrl}
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
                                setProductInfo(row);
                              }}
                            >
                              Infos
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <p className="text-xl text-center font-semibold">
                          We couldn't find a product with these specifications.
                        </p>
                      </TableCell>
                    </TableRow>
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
      </Box>

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={deleteId}
          deleteUrl={deleteProductHandler}
        />
      )}
    </>
  );
}
