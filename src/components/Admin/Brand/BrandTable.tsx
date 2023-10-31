import React, { useContext, useState } from "react";
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
import { BrandContext, brandContextType } from "./Context/BrandContext";
import DeleteModal from "../DeleteModal";
import EditBrand from "./EditBrand";
import { useDeleteBrandMutation } from "../../../Redux/apis/admin/brandAdminApi";
import Pagination from "../../Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../../../hooks/useSearch";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBrandID, setDeleteBrandId] = useState("");
  const {
    setOpenEditModal,
    setEditBrandId,
    brands,
    total,
    brandsLoading,
    refetchBrands,
  } = useContext(BrandContext) as brandContextType;

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBrand] = useDeleteBrandMutation();

  const deleteBrandHandler = async (id: string) => {
    deleteBrand(id);
    await deleteBrand(id).then(() => {
      toast.success("Delete Brand Is Success");
      refetchBrands();
      setShowDeleteModal(false);
    });
  };

  const pageSize = 8;
  const {} = usePagination(currentPage, pageSize);
  const totalPages = Math.ceil(total / pageSize);
  const changePageHandler = (id: number) => {
    setCurrentPage(id);
  };

  const { searchHandler } = useSearch();
  const setInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };
  const submitSearch = () => {
    setCurrentPage(1);
    searchHandler(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="lg:col-span-8 col-span-12 lg:order-1 order-2 rounded-xl bg-white mt-3">
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          margin: "0 auto",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
          borderRadius: "12px",
        }}
      >
        <div className="h-8  md:mx-8 mb-4">
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
        <TableContainer sx={{ minHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            {brandsLoading ? (
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
                  {brands?.length ? (
                    brands?.map((row: any, index: any) => (
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
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <p className="text-xl text-center font-semibold">
                          We couldn't find a brand with these specifications.
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
