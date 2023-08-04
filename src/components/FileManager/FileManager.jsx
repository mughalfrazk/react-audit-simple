import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Table from '../Table';
import { setSelectedFolder } from '../../redux/slices/client-slice';
import FileInput from '../../pages/Client/Detail/FileInput';

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
  { 
    field: 'uploaded_by',
    headerName: 'Uploaded By',
    flex: 1,
    valueGetter: (params) => `${params.row?.uploaded_by?.first_name || ''} ${params.row?.uploaded_by?.last_name || ''}`,
  },
  { 
    field: 'reviewed_by',
    headerName: 'Reviewed By',
    flex: 1,
    valueGetter: (params) => `${params.row?.reviewed_by?.first_name || ''} ${params.row?.reviewed_by?.last_name || ''}`,
  },
  {
    field: 'audit_date',
    headerName: 'Audit Date',
    flex: 1,
    valueGetter: (params) => `${params.row.audit_date.split("T")[0]}`
  },
  {
    field: 'status',
    headerName: 'Review Status',
    type: 'number',
    flex: 1,
    renderCell: (params) => !!params.row.reviewed_by ? <CheckCircleIcon htmlColor='#198754' /> : <CancelIcon htmlColor='#ffc107' />
  },
];

const FileManager = ({ folders = dummy_folders, setShowAddFolderModal }) => {
  const dispatch = useDispatch();
  const { selectedFolder } = useSelector(state => state.client);
  
  const [open, setOpen] = useState(0);
  const [selectedDocumentParent, setSelectedDocumentParent] = useState(0);
  const [documentList, setDocumentList] = useState([]);

  const handleClick = (detail, action) => {
    if (action === 'collapse') {
      if (open === detail.id) setOpen(0);
      else setOpen(detail.id);
    }

    dispatch(setSelectedFolder(detail))
  };

  const addFolderHandler = (parent) => {
    if (!!parent) dispatch(setSelectedFolder({ id: parent.id, name: parent.name }))
    else {
      dispatch(setSelectedFolder({ id: 0, name: "" }))
      setOpen(0)
    }

    setShowAddFolderModal(prevState => !prevState)
  } 

  const findDocumentList = (folders, id) => {
    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];

      if (folder.id === id) {
        return folder
      } else {
        for (let j = 0; j < folder.children.length; j++) {
          const subFolder = folder.children[j];
          if (subFolder.id === id) {
            return subFolder
          }
        }
      }
    }
  }

  useEffect(() => {
    if (!!selectedFolder.id && selectedFolder.id !== selectedDocumentParent) {
      setDocumentList(() => {
        const detail = findDocumentList(folders, selectedFolder.id)
        setSelectedDocumentParent(detail.id)
        return [ ...detail.documents ]
      })
    } else {
      setDocumentList([])
    }
  }, [selectedFolder.id])

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
                  onClick={() => handleClick({ id: item.id, name: item.name, level_no: item.level_no }, 'collapse')}
                  selected={selectedFolder.id === item.id}
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
                        onClick={() => handleClick({ id: subItem.id, name: subItem.name, level_no: item.level_no })}
                        selected={selectedFolder.id === subItem.id}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    ))}
                    <ListItemButton
                      onClick={() => addFolderHandler(item)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Folder" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </Fragment>
            ))}
              <ListItemButton
                onClick={() => addFolderHandler(null)}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Folder" />
              </ListItemButton>
          </List>
        </Box>
        <Box className="col-8 col-sm-9 col-md-10 ps-0" sx={{ height: '100%' }}>
          <div className='px-3 pb-1'><FileInput /></div>
          <Table
            columns={files_columns}
            rows={documentList}
            border={0}
            height="800px"
            backgroundColor="transparent"
          />
        </Box>
      </div>
    </div>
  );
};

export default FileManager;
