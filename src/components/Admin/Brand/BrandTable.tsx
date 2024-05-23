import React, { useContext, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  BrandContext,
  brandContextType,
} from "../../../context/admin/brandContext";
import DeleteModal from "../DeleteModal";
import EditBrand from "./EditBrand";
import { useDeleteBrandMutation } from "../../../Redux/apis/admin/brandAdminApi";
import {Pagination} from "../../../components";
import { usePagination } from "../../../hooks/usePagination";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../../../hooks/useSearch";
import useHasAccess from "../../../hooks/useHasAccess";
import { RowTableSkeleton } from "../../../skelton/admin/Table/Table";
import useRow from "../../../hooks/useRow";

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

  const { userHasAccess: accessList } = useHasAccess("action_brand_admin_list");
  const { userHasAccess: accessDelete } = useHasAccess(
    "action_brand_admin_delete"
  );
  const { userHasAccess: accessEdit } = useHasAccess(
    "action_brand_admin_update"
  );

  const [deleteBrand] = useDeleteBrandMutation();

  const deleteBrandHandler = async (id: string) => {
    if (accessDelete) {
      deleteBrand(id);
      await deleteBrand(id).then(() => {
        toast.success("Delete Brand Is Success");
        refetchBrands();
        setShowDeleteModal(false);
      });
    } else {
      toast.error("You Havent Access Delete Brand");
      setShowDeleteModal(false);
    }
  };

  const editBrandHandler = (id: string) => {
    if (accessEdit) {
      setOpenEditModal(true);
      setEditBrandId(id);
    } else {
      toast.error("You Havent Access Edit Brand");
    }
  };

  const pageSize = 9;
  const {} = usePagination(currentPage, pageSize);
  console.log(currentPage);

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
  };

  const { rowNumber, limit } = useRow();

  return (
    <div className="lg:col-span-8 col-span-12 lg:order-1 order-2 rounded-xl bg-white m-3">
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
        <TableContainer sx={{ minHeight: 570 }}>
          {accessList ? (
            <Table stickyHeader aria-label="sticky table">
              {brandsLoading ? (
                Array.from(
                  Array(brands?.length ? brands?.length : 8).keys()
                ).map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(5).keys()].map((cellIndex) => (
                      <TableCell key={cellIndex}>
                        <RowTableSkeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
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
                          <TableCell align="center">
                            {(rowNumber as any) >= (limit as any)
                              ? rowNumber + index + 1
                              : index + 1}
                          </TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.code}</TableCell>
                          <TableCell
                            align="center"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={row.fileUrl}
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
                              onClick={() => editBrandHandler(row.id)}
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
          ) : (
            <Box sx={{ marginTop: "100px" }}>
              <h1 className="text-3xl font-bold  flex justify-center items-center ">
                You Havent Access Brand List
              </h1>
            </Box>
          )}
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
