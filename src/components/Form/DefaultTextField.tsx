import React, { useEffect, useState } from "react";

import { Box, TextField } from "@mui/material";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: Function;
  multiline?: boolean;
  minRows?: number;
};

/**
 * Displays a text field.
 * @param props 
 * @returns 
 */
export default function DefaultTextField(props: {
  errorMsg?: string;
  isVisible?: boolean;
  textFieldProps: TextFieldProps;
  emptyError?: boolean;
  type: string;
  disabled?: boolean;
}) {
  // the default text field for input fields in DefaultFormCard
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    if (props.emptyError) {
      setErrorMsg(`${props.textFieldProps.label} cannot be empty`);
    } else if (props.errorMsg) {
      setErrorMsg(props.errorMsg);
    } else {
      setErrorMsg("");
    }
  }, [props.errorMsg, props.emptyError]);
  return (
    <>
      {(props.isVisible ? true : props.isVisible === undefined) && (
        <Box sx={{ margin: 1 }}>
          <TextField
            type={props.type}
            disabled={props.disabled}
            label={props.textFieldProps.label}
            multiline={props.textFieldProps.multiline}
            minRows={
              props.textFieldProps.multiline
                ? props.textFieldProps.minRows
                  ? props.textFieldProps.minRows
                  : 3
                : undefined
            }
            value={props.textFieldProps.value}
            fullWidth
            error={errorMsg !== undefined && errorMsg !== ""}
            helperText={errorMsg}
            onChange={(e) => props.textFieldProps.onChange(e)}
          />
        </Box>
      )}
    </>
  );
}
