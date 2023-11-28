import React from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FeedbackTabs({ strengths, weaknesses }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs
        variant='fullWidth'
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          backgroundColor: '#B7E2CE',
          borderRadius: '.5rem .5rem 0 0',
          '& .MuiTabs-indicator': {
            backgroundColor: '#8FC0A9',
            height: '3px',
          },
        }}
        indicatorColor='primary'
      >
        <Tab
          label='Strengths'
          {...a11yProps(0)}
          sx={{
            fontWeight: 700,
            color: '#354F528A',
            '&.Mui-selected': {
              color: '#272D2DC7',
            },
            height: '3.5rem',
          }}
        />
        <Tab
          label='Improvements'
          {...a11yProps(1)}
          sx={{
            fontWeight: 700,
            color: '#354F528A',
            '&.Mui-selected': {
              color: '#272D2DC7',
            },
            height: '3.5rem',
          }}
        />
      </Tabs>
      <CustomTabPanel value={tabValue} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        Item Two
      </CustomTabPanel>
    </>
  );
}
