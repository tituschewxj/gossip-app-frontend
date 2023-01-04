import { Button } from '@mui/material'
import React from 'react'

function DefaultButton(props: { onClick: Function, text: string, backgroundColor?: string }) {
    return (
        <Button variant='contained' sx={{
            margin: 1,
            backgroundColor: props.backgroundColor ? `${props.backgroundColor}.main` : undefined,
            '&:hover': {
                backgroundColor: props.backgroundColor ? `${props.backgroundColor}.dark` : undefined,
            }
        }}
            onClick={() => props.onClick()}>
            {props.text}
        </Button>
    )
}

export default DefaultButton