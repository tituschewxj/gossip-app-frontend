import React from 'react'

import { Box, Card, Container, Typography } from '@mui/material'

export default function DefaultFormCard(props: { formHeader?: string, children?: React.ReactElement}) {
  return (
    <Container>
      <Card>
        {props.formHeader && <Box sx={{ margin: 1 }}>
          <Typography variant="h5" align="center">
            {props.formHeader}
          </Typography>
        </Box>}
        {props.children}
      </Card>
    </Container>
  )
}