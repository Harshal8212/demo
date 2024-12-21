import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle, Clock, Truck } from 'lucide-react';
import StatusStep from './StatusStep';

const ConnectorLine = styled(Box)(({ theme, isactive }) => ({
  height: 4,
  flex: 1,
  margin: '0 16px',
  backgroundColor: isactive === 'true' ? theme.palette.success.main : theme.palette.grey[200]
}));

const steps = [
  { title: 'Pending', icon: Clock },
  { title: 'In-transit', icon: Truck },
  { title: 'Delivered', icon: CheckCircle }
];

const isStepActive = (stepIndex, currentStatus) => {
  switch (currentStatus) {
    case 0:
      return stepIndex === 0;
    case 1:
      return stepIndex <= 1;
    case 2:
      return stepIndex <= 2;
    default:
      return false;
  }
};

const ShippingStatus = ({ status }) => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }} >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <StatusStep 
              title={step.title} 
              icon={step.icon} 
              active={isStepActive(index, status)}
            />
            {index < steps.length - 1 && (
              <ConnectorLine 
                isactive={isStepActive(index + 1, status).toString()} 
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default ShippingStatus;