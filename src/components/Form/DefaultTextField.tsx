import { Box, TextField } from '@mui/material'
import React from 'react'

type TextFieldProps = {
    label: string,
    value: string
    onChange: Function,
    multiline?: boolean,
}

function DefaultTextField(props: { errorMsg?: string, isVisible?: boolean, textFieldProps: TextFieldProps }) {
    // the default text field for input fields in DefaultFormCard
    return (
        <>
            {(props.isVisible ? true : props.isVisible === undefined) && <Box sx={{ margin: 1 }}>
                <TextField
                    label={props.textFieldProps.label}
                    multiline={props.textFieldProps.multiline}
                    minRows={props.textFieldProps.multiline ? 3 : undefined}
                    value={props.textFieldProps.value}
                    fullWidth
                    error={props.errorMsg !== undefined && props.errorMsg !== ''}
                    helperText={props.errorMsg}
                    onChange={(e) => props.textFieldProps.onChange(e)}
                />
            </Box>}
        </>
    )
}

export default DefaultTextField