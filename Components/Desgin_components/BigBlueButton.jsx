import React from 'react'
import { Button } from '@mui/material'

export default function BigBlueButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        backgroundColor: 'blue',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkblue',
        },
        padding: '12px 24px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

