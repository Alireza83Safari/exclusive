import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField } from "@mui/material";
import { OrderContext, orderContextType } from "./Context/OrderContext";
import Pagination from "../../Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { useSearch } from "../../../hooks/useSearch";
import SearchIcon from "@mui/icons-material/Search";
import { RowTableSkeleton } from "../../../skelton/admin/Table/Table";
import { useLocation } from "react-router-dom";

interface Column {
  id: "index" | "username" | "totalPrice" | "paidAt" | "status" | "price";
  label: string;
}

const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "username", label: "username" },
  { id: "totalPrice", label: "totalPrice" },
  { id: "paidAt", label: "paidAt" },
  { id: "status", label: "status" },
  { id: "price", label: "price" },
];

function OrderTable() {
  const { orders, orderLoading, total } = useContext(
    OrderContext
  ) as orderContextType;

  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limitUrl = searchParams.get("limit");
  const pageSize = limitUrl ? +limitUrl : 12;
  const {} = usePagination(currentPage, pageSize);
  const totalPages = Math.ceil(total / pageSize);
  const changePageHandler = (id: number) => {
    setCurrentPage(id);
  };
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <div className="col-span-12 m-3 bg-white p-2">
      <div className="h-8 md:mx-3 mb-4">
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
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          margin: "0 auto",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
          borderRadius: "12px",
        }}
      >
        <TableContainer sx={{ minHeight: 550 }}>
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
              {orderLoading ? (
                Array.from(Array(orders?.length).keys()).map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(6).keys()].map((cellIndex) => (
                      <TableCell key={cellIndex}>
                        <RowTableSkeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : orders?.length ? (
                orders?.map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell style={{ width: 10 }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">
                      {Math.floor(row.totalPrice)}
                    </TableCell>
                    <TableCell align="center">
                      {row.paidAt?.slice(0, 10)}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: `${row.status === 0 ? `orange` : `green`}`,
                      }}
                    >
                      {row.status === 0 ? "pending" : "success"}
                    </TableCell>
                    <TableCell align="center">
                      {Math.floor(row.price)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <p className="text-xl text-center font-semibold">
                      We couldn't find a order with these specifications.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
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
    </div>
  );
}

export default OrderTable;
