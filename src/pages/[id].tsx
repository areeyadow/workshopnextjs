"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import { editUser, updateUser } from "../pages/api/baseApi";
export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof id === "string") {
          const data = await editUser(id);
          if (data) {
            setName(data.name);
            setAge(data.age);
          }
        }
      } catch (error) {}
    };

    if (id) {
      fetchUserData();
    }
  }, [id]); // เรียกใช้ effect เมื่อ id เปลี่ยนแปลง

  const updateData = async () => {
    if (typeof id === "string") {
      const confirmed = window.confirm(
        "Are you sure you want to edit this user?"
      );
      if (!confirmed) return;

      if (confirmed) {
        const status = await updateUser(id, { name, age });
        if (status == 200 || 201) {
          router.push("/user");
        }
      }
    }
  };

  return (
    <Box
      sx={{
        miWidth: 100,
        mt: 10,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CardContent
        sx={{
          minWidth: 50,
          backgroundColor: "whitesmoke",
          mt: 20,
          borderRadius: 5,
        }}
      >
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ mb: 5, fontWeight: "bold" }}
        >
          Edit User
        </Typography>
        <form>
          <Box>
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              sx={{ ml: 5 }}
              id="outlined-basic"
              label="age"
              variant="outlined"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </Box>
          <Button sx={{ mt: 5 }} variant="contained" onClick={updateData}>
            Edit
          </Button>
        </form>
      </CardContent>
    </Box>
  );
}
