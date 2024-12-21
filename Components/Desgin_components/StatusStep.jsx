import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatusCircle = styled(Box)(({ theme, isactive }) => ({
  width: 64,
  height: 64,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isactive === 'true' ? theme.palette.success.main : theme.palette.grey[200],
  color: isactive === 'true' ? theme.palette.common.white : theme.palette.grey[400]
}));

const StatusStep = ({ title, icon: Icon, active }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <StatusCircle isactive={active.toString()}>
      <Icon size={32} />
    </StatusCircle>
    <Typography
      sx={{
        mt: 1,
        color: active ? 'success.main' : 'text.disabled',
        fontWeight: 'medium'
      }}
    >
      {title}
    </Typography>
  </Box>
);

export default StatusStep;