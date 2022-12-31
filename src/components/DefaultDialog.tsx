import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

function DefaultDialog(props: { open: boolean, dialogBehaviour: DialogBehaviour }) {
    // default dialog for confirmation
    return (
        <Dialog
            open={props.open}
            onClose={() => props.dialogBehaviour.handleClose()}
        >
            <DialogTitle>
                {props.dialogBehaviour.type === "confirmation" && "Confirm delete?"}
                {props.dialogBehaviour.type === "error" && "Error occured!"}
            </DialogTitle>
            {/* <DialogContent>
                <DialogContentText>
                    {"Some text"}
                </DialogContentText>
            </DialogContent> */}
            <DialogActions >
                {props.dialogBehaviour.type === "confirmation" && <Button onClick={() => props.dialogBehaviour.handleConfirmation?.()}>{"Delete"}</Button>}
                {props.dialogBehaviour.type === "confirmation" && <Button onClick={() => props.dialogBehaviour.handleClose()}>{"Cancel"}</Button>}
                {props.dialogBehaviour.type === "error" && <Button onClick={() => props.dialogBehaviour.handleClose()}>{"Close"}</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default DefaultDialog