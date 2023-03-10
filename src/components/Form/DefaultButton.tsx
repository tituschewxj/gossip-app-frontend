import { Button } from "@mui/material";
import React from "react";

/**
 * Displays a customizable button
 * @param props 
 * @returns 
 */
export default function DefaultButton(props: {
  onClick: Function;
  text: string;
  backgroundColor?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="contained"
      disabled={props.disabled}
      sx={{
        margin: 1,
        backgroundColor: props.backgroundColor
          ? `${props.backgroundColor}.main`
          : undefined,
        "&:hover": {
          backgroundColor: props.backgroundColor
            ? `${props.backgroundColor}.dark`
            : undefined,
        },
      }}
      onClick={() => props.onClick()}
    >
      {props.text}
    </Button>
  );
}
