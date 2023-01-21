import { Tooltip, IconButton } from "@mui/material";
import React, { ReactElement } from "react";

/**
 * Displays a customaizable icon as a button
 * @param props 
 * @returns 
 */
export default function DefaultIconButton(props: {
  tooltipTitle: string;
  onClick: Function;
  icon: ReactElement;
}) {
  return (
    <Tooltip title={props.tooltipTitle}>
      <IconButton onClick={() => props.onClick()}>{props.icon}</IconButton>
    </Tooltip>
  );
}