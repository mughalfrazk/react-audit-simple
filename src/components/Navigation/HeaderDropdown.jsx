import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { useAuth } from '../../hooks/auth';
import ConfirmationDialog from '../ConfirmationDialog';
import constants from '../../constants';
import Pill from '../Pill';

const HeaderDropdown = ({ userDetail }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const settings = [
    { name: 'Profile', onClick: () => viewProfile() },
    { name: 'Logout', onClick: () => setShowConfirmation(true) },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const viewProfile = () => {
    handleCloseUserMenu()
    navigate(constants.urls.EMPLOYEE_DETAIL(userDetail?.id))
  }

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  return (
    <Fragment>
      <ConfirmationDialog
        titleText="Confirm Logout?"
        warningText="Are you sure you want to logout?"
        moveForward={handleLogout}
        show={showConfirmation}
        setShow={setShowConfirmation}
      />
      <span><Pill label={userDetail?.role?.name} />&nbsp;&nbsp;</span>
      <span className='pe-2' style={{ opacity: 0.8 }}> {userDetail?.email}</span>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(({ name, onClick }) => (
          <MenuItem key={name} onClick={onClick}>
            <Typography textAlign="center">{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default HeaderDropdown;