import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const dummy_data = [
  { name: 'Item One', view: <div>View 01</div> },
  { name: 'Item Two', view: <div>View 02</div> },
  { name: 'Item Three', view: <div>View 02</div> },
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
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

export default ({ tabs = dummy_data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((item, index) => (
            <Tab key={item.name} label={item.name} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((item, index) => (
        <TabPanel key={item.name} value={value} index={index}>
          {item.view}
        </TabPanel>
      ))}
    </Box>
  );
};
