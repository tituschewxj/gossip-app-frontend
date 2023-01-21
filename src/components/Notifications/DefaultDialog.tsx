import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useErrorState } from "../../hooks/useErrorState";

/**
 * DefaultDialog component shows confirmation/error popups. 
 * @param props 
 * @returns 
 */
export default function DefaultDialog(props: {
  open: boolean;
  dialogBehaviour: DialogBehaviour;
}) {
  const { errorMsg } = useErrorState();
  return (
    <Dialog
      open={props.open}
      onClose={() => props.dialogBehaviour.handleClose()}
    >
      <DialogTitle>
        {props.dialogBehaviour.type === "confirmation" && "Confirm delete?"}
        {props.dialogBehaviour.type === "error" && "Error occured!"}
      </DialogTitle>
      {errorMsg !== "" && (
        <DialogContent>
          <DialogContentText>{errorMsg}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {props.dialogBehaviour.type === "confirmation" && (
          <>
            <Button
              onClick={() => props.dialogBehaviour.handleConfirmation?.()}
            >
              {"Delete"}
            </Button>
            <Button onClick={() => props.dialogBehaviour.handleClose()}>
              {"Cancel"}
            </Button>
          </>
        )}
        {props.dialogBehaviour.type === "error" && (
          <Button onClick={() => props.dialogBehaviour.handleClose()}>
            {"Close"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}