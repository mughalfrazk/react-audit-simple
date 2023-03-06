import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from './MuiNavFunctions';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import useHttpClient from '../../hooks/http-client';
import { setSidebarToggle } from '../../redux/slices/local-slice';
import { setUserDetail } from '../../redux/slices/user-slice';
import HeaderDropdown from './HeaderDropdown';
import constants from '../../constants';

const Header = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.user.detail);
  const { request } = useHttpClient();
  const { sidebarToggle } = useSelector((state) => state.local);

  const handleDrawerOpen = () => {
    dispatch(setSidebarToggle(true));
  };

  const getUserDetail = async () => {
    const { data } = await request.get(constants.apis.PROFILE);
    dispatch(setUserDetail(data));
  }

  useEffect(() => {getUserDetail()}, []);

  return (
    <AppBar position="fixed" open={sidebarToggle}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(sidebarToggle && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <NavLink to={constants.urls.INDEX}>
          <Typography variant="h6" sx={{ color: "#ffffff" }} noWrap component="div">
            Audit Simple
          </Typography>
        </NavLink>
        <Box flex sx={{ flexGrow: 0 }}>
          <HeaderDropdown userDetail={userDetail} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
