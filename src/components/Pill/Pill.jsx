import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';

const Pill = ({ icon, label = 'Employee', color = '#fff', variant = "outlined" }) => {
  const [pillIcon, setPillIcon] = useState(null);

  useEffect(() => {
    if (label === 'Super Admin') setPillIcon(<AdminPanelSettingsIcon style={{ color }} />)
    else if (label === 'Admin') setPillIcon(<PersonIcon style={{ color }} />)
    else setPillIcon(<AssignmentIndIcon style={{ color }} />)
  }, [label])

  return <Chip icon={pillIcon} label={label} sx={{ color, paddingLeft: '0.4rem' }} variant={variant} />
}

export default Pill;