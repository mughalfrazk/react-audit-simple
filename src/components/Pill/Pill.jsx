import { Chip } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { lightBlue } from '@mui/material/colors';

const Pill = ({ icon = <BadgeOutlinedIcon sx={'#fff'} />, label = 'Employee', color = '#fff', variant = "outlined" }) => {
  return <Chip icon={icon} label={label} sx={{ color, paddingLeft: '0.4rem' }} variant={variant} />
}

export default Pill;