import { DataGrid, GridPagination } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { get } from "../Custom/useApi";
import { getuser } from "./request";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

function SubscribedUserList() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    get(getuser.getSubscribedUserList)
      .then((res) => {
        const transformedRows = res.data.results.map((row) => ({
          id: row._id,
          ...row,
        }));
        setUserData(transformedRows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 170,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "planName",
      headerName: "Plan",
      width: 100,
      renderCell: (params) => {
        return <Typography>{params.row.payment.planName}</Typography>;
      },
    },
    {
      field: "paidAt",
      headerName: "Start Date",
      width: 170,
      renderCell: (params) => {
        return (
          <Typography>
            {dayjs(params.row.payment.paidAt).format("ddd MMM DD YYYY ")}
          </Typography>
        );
      },
    },
    {
      field: "expiredDate",
      headerName: "End Date",
      width: 170,
      renderCell: (params) => {
        return (
          <Typography>
            {dayjs(params.row.payment.expiredDate).format("ddd MMM DD YYYY ")}
          </Typography>
        );
      },
    },
    {
      field: "amount",
      headerName: "Total Amount",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Member Since",
      width: 170,
      renderCell: (params) => {
        return (
          <Typography>
            {dayjs(params.row.createdAt).format("ddd MMM DD YYYY ")}
          </Typography>
        );
      },
    },
  ];
  return (
    <div>
      <DataGrid
        sx={{ color: "#000", backgroundColor: "#f0f0f0" }}
        columns={columns}
        rows={userData}
        pageSize= {5}
        rowHeight={60}
        components={{
            Pagination: (props) => (
               <GridPagination
                 {...props}
                 rowsPerPageOptions={[5, 10, 15]} 
               />
            )
           }}
        autoHeight
      />
    </div>
  );
}

export default SubscribedUserList;
