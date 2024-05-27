import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField } from "@mui/material";
import { Pagination, ProductTableSkeleton } from "../../../../components";
import { useSearch } from "../../../../hooks/useSearch";
import SearchIcon from "@mui/icons-material/Search";
import useRow from "../../../../hooks/useRow";
import { columns, OrderTableProps } from "./OrderTable.interface";

function OrderTable(props: OrderTableProps) {
  const { orders, isLoading } = props;

  const pageSize = 12;
  const totalPages = Math.ceil(orders?.total / pageSize);

  const [searchQuery, setSearchQuery] = useState("");
  const { searchHandler } = useSearch();
  const setInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };
  const submitSearch = () => {
    searchHandler(searchQuery);
  };

  const { rowNumber, limit } = useRow();

  return (
    <div className="col-span-12 m-3 bg-white p-2">
      {isLoading ? (
        <ProductTableSkeleton />
      ) : (
        <>
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
                  {orders?.data.map((row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell style={{ width: 10 }} align="center">
                        {(rowNumber as any) >= (limit as any)
                          ? rowNumber + index + 1
                          : index + 1}
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
                  ))}
                  {!orders?.data?.length && (
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
            <Pagination totalPages={totalPages} pageSize={pageSize} />
          </Paper>
        </>
      )}
    </div>
  );
}

export default OrderTable;
