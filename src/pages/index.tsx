import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createUser } from "./api/baseApi";
import { useRouter } from "next/router";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const router = useRouter();

  const handleSubmit = async () => {
    const isActive = true;
    if (name && age) {
      try {
        const status = await createUser({
          age,
          name,
          isActive,
        });
        if (status === 201) {
          router.push("/user");
        }
      } catch {
        alert("something wrong!");
      }
    } else {
      alert("fill the form completely!");
    }
  };

  return (
    <Box
      sx={{
        minWidth: 100,
        mt: 10,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
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
        <Box>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            hello world
          </Typography>
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            sx={{ ml: 5 }}
            id="outlined-basic"
            label="age"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          ></TextField>
        </Box>
        <Button sx={{ mt: 4 }} variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </CardContent>
    </Box>
  );
}
