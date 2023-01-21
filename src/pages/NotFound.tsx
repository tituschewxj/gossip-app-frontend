import { Container } from "@mui/material";
import React from "react";

/**
 * The not found page is rendered when an invalid URL is entered
 * @returns 
 */
export default function NotFound() {
  return (
    <Container sx={{ marginTop: 3 }}>
      <p>Not found</p>
    </Container>
  );
}
