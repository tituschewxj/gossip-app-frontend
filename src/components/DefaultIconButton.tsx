import { Tooltip, IconButton } from '@mui/material'
import React, { ReactElement } from 'react'

function DefaultIconButton(props: { tooltipTitle: string, onClick: Function, icon: ReactElement }) {
    return (
        <Tooltip title={props.tooltipTitle}>
            <IconButton onClick={
                () => props.onClick()
            } >
                {props.icon}
            </IconButton>
        </Tooltip>
    )
}

export default DefaultIconButton