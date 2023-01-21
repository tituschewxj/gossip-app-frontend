import React from "react";

import {
  Alert,
  AlertTitle,
  Box,
  Card,
  Container,
  Typography,
} from "@mui/material";

/**
 * Displays the card, with the contents specified by it's children
 * @param props 
 * @returns 
 */
export default function DefaultFormCard(props: {
  formHeader?: string;
  children?: React.ReactElement;
  errorMsg?: string;
  buttons?: React.ReactElement;
}) {
  return (
    <Container>
      <Card>
        {props.formHeader && (
          <Box sx={{ margin: 1 }}>
            <Typography variant="h5" align="center">
              {props.formHeader}
            </Typography>
          </Box>
        )}
        {props.children}
        {props.errorMsg && props.errorMsg !== "" && (
          <Alert severity="error" sx={{ margin: 1 }}>
            <AlertTitle>Error occured</AlertTitle>
            {props.errorMsg}
          </Alert>
        )}
        {props.buttons && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {props.buttons}
          </Box>
        )}
      </Card>
    </Container>
  );
}
