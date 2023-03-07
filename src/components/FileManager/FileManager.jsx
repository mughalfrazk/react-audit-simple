import React, { Fragment, useState } from 'react';
import { Box } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import Divider from '@mui/material/Divider';
import Table from '../Table';

const dummy_folders = [
  {
    id: 11,
    name: 'Audit Reporting',
    children: [
      {
        id: 12,
        name: 'Reporting 01',
      },
      {
        id: 13,
        name: 'Reporting 02',
      },
    ],
  },
  {
    id: 10,
    name: 'Audit Planning',
    children: [
      {
        id: 14,
        name: 'Planning 01',
      },
      {
        id: 15,
        name: 'Planning 02',
      },
      {
        id: 16,
        name: 'Planning 03',
      },
    ],
  },
  {
    id: 17,
    name: 'Refrences',
    children: [],
  },
];

const files_columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'uploaded_by', headerName: 'Uploaded By', flex: 1 },
  { field: 'reviewed_by', headerName: 'Reviewed By', flex: 1 },
  {
    field: 'audit_date',
    headerName: 'Audit Date',
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'number',
    flex: 1,
  },
];

const FileManager = ({ folders = dummy_folders }) => {
  const [open, setOpen] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleClick = (id, action) => {
    if (action === 'collapse') {
      if (open === id) setOpen(0);
      else setOpen(id);
    }
    if (selected === id) setSelected(0);
    else setSelected(id);
  };

  return (
    <div className="card">
      <div className="row">
        <Box
          className="col-4 col-sm-3 col-md-2 pe-0"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ bgcolor: 'transparent' }}
              >
                Folders
              </ListSubheader>
            }
          >
            {folders.map((item) => (
              <Fragment key={item.id}>
                <ListItemButton
                  onClick={() => handleClick(item.id, 'collapse')}
                  selected={selected === item.id}
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {open === item.id ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>
                <Divider />
                <Collapse in={open === item.id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((subItem) => (
                      <ListItemButton
                        key={subItem.id}
                        onClick={() => handleClick(subItem.id)}
                        selected={selected === subItem.id}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Fragment>
            ))}
          </List>
        </Box>
        <Box className="col-8 col-sm-9 col-md-10 ps-0" sx={{ height: '650px' }}>
          <Table
            columns={files_columns}
            rows={[]}
            border={0}
            height="640px"
            backgroundColor="transparent"
          />
        </Box>
      </div>
    </div>
  );
};

export default FileManager;
