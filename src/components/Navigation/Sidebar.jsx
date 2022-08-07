import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Navlinks from './Navlinks';
import { setSidebarToggle } from '../../redux/slices/local-slice';
import { Drawer, DrawerHeader } from './MuiNavFunctions';

const Sidebar = ({ navlinks }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { sidebarToggle } = useSelector((state) => state.local);

  const [subTabToggle, setSubTabToggle] = useState({});

  const handleDrawerClose = () => {
    dispatch(setSidebarToggle(false));
  };

  return (
    <Drawer variant="permanent" open={sidebarToggle}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {navlinks.map((link, index) => (
          <ListItem key={index + 1} disablePadding sx={{ display: 'block' }}>
            {(() => {
              const sx = {
                minHeight: 48,
                justifyContent: sidebarToggle ? 'initial' : 'center',
                px: 2.5,
              };

              const toggleSubTab = () => {
                setSubTabToggle({
                  ...subTabToggle,
                  [link.name]: !subTabToggle[link.name],
                });
              };

              const attr = link?.children
                ? {
                    sx,
                    onClick: toggleSubTab,
                  }
                : {
                    sx,
                  };

              const listItemButton = (
                <ListItemButton {...attr}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sidebarToggle ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={link.name}
                    sx={{ opacity: sidebarToggle ? 1 : 0 }}
                  />
                  {link?.children && sidebarToggle ? (
                    subTabToggle[link.name] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    ''
                  )}
                </ListItemButton>
              );

              return link?.children ? (
                listItemButton
              ) : (
                <NavLink to={link.path} exact>
                  {listItemButton}
                </NavLink>
              );
            })()}
            {link?.children &&
              link?.children.map((child, index) => (
                <Collapse
                  key={index}
                  in={sidebarToggle && subTabToggle[link.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <NavLink to={child.path} exact>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    </NavLink>
                  </List>
                </Collapse>
              ))}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Navlinks(Sidebar);
