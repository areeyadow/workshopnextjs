"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button, Card, CardContent } from "@mui/material";
import router from "next/router";
export default function GetUser() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          "https://665424771c6af63f46768ce6.mockapi.io/api/v1/users"
        );
        if (res.data) {
          setUserData(res.data);
        }
      } catch {
        alert("Something went wrong!");
      }
    };

    getUserData();
  }, [setUserData]);

  const deleteData = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    if (confirmed) {
      try {
        const res = await axios.delete(
          `https://665424771c6af63f46768ce6.mockapi.io/api/v1/users/${id}`
        );
        if (res.status === 200 || res.status === 204) {
          window.location.reload();
        } else {
          alert("Something went wrong!");
        }
      } catch {
        alert("Something went wrong!");
      }
    }
  };
  const handleEdit = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <CardContent>
      <TableContainer
        sx={{
          width: 900,
          height: 500,
          display: "flex",
          justifyContent: "center",
          ml: 65,
          mt: 20,
        }}
        aria-label="simple table"
        component={Paper}
      >
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  backgroundColor: "whitesmoke",
                  minWidth: 100,
                },
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleEdit(user.id)}
                  >
                    edit
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => deleteData(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ ml: 65, mt: 5 }}
        onClick={() => router.push("/")}
      >
        Back
      </Button>
    </CardContent>
  );
}
