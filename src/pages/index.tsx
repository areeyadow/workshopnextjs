"use client";

import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { createUser } from "./api/baseApi";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const router = useRouter();

  const handleSubmit = async () => {
    const isActive = true;

    if (name && age) {
      try {
        const status = await createUser({
          name,
          age,
          isActive,
        });

        if (status === 200 || 201) {
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
