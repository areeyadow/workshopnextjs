"use client";

import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const router = useRouter();

  const handleSubmit = async () => {
    if (name && age) {
      try {
        const res = await axios.post(
          "https://665429261c6af63f4676a1dd.mockapi.io/api/v1/users",
          {
            name,
            age,
          }
        );
        if (res.status === 200 || 201) {
          router.push("/user");
        } else {
          alert("something wrong!");
        }
      } catch {
        alert("something wrong!");
      }
    } else {
      alert("fill form!");
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
          Create User
        </Typography>
        <form>
          <Box>
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <TextField
              sx={{ ml: 5 }}
              id="outlined-basic"
              label="age"
              variant="outlined"
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
            />
          </Box>
          <Button sx={{ mt: 5 }} variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </form>
      </CardContent>
    </Box>
  );
}
