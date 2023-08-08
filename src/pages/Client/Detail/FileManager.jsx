import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";

import Table from "../../../components/Table";
import { setSelectedFolder } from "../../../redux/slices/client-slice";
import FileInput from "./FileInput";
import { useCheckPermission } from "../../../hooks/check-permission";
import constants from "../../../constants";
import Button from "../../../components/Button";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import useHttpClient from "../../../hooks/http-client";
import UpdateDateModal from "./UpdateDateModel";
import DownloadIcon from '@mui/icons-material/Download';

const dummy_folders = [
  {
    id: 11,
    name: "Audit Reporting",
    children: [
      {
        id: 12,
        name: "Reporting 01",
      },
      {
        id: 13,
        name: "Reporting 02",
      },
    ],
  },
  {
    id: 10,
    name: "Audit Planning",
    children: [
      {
        id: 14,
        name: "Planning 01",
      },
      {
        id: 15,
        name: "Planning 02",
      },
      {
        id: 16,
        name: "Planning 03",
      },
    ],
  },
  {
    id: 17,
    name: "Refrences",
    children: [],
  },
];

const FileManager = ({
  folders = dummy_folders,
  setShowAddFolderModal,
  getClientFolders,
}) => {
  const dispatch = useDispatch();
  const { permissionGuard } = useCheckPermission();
  const { isLoading, request } = useHttpClient();

  const { detail, role } = useSelector((state) => state.user);
  const { selectedClient, selectedFolder } = useSelector(
    (state) => state.client
  );

  const [open, setOpen] = useState(0);
  const [selectedDocumentParent, setSelectedDocumentParent] = useState(0);
  const [documentList, setDocumentList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(0);
  const [showUpdateDateModal, setShowUpdateDateModal] = useState(false);
  const [selectedAuditDate, setSelectedAuditDate] = useState("");
  const [allowFileCreate, setAllowFileCreate] = useState(false);

  const downloadDocumentHanlder = async (id) => {
    try {
      const { data } = await request.get(constants.apis.GET_DOCUMENT(id))
      console.log(data)

      if (!!data.Body) {
        const file = new File([new Uint8Array(data.Body.data)], data.name);
        const downloadUrl = URL.createObjectURL(file);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = data.name;
        link.click();

        URL.revokeObjectURL(downloadUrl)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const renderAuditDateCell = (params) => {
    const editable = (
      <div className="d-flex align-items-baseline">
        <p className="m-0">{params.row.audit_date.split("T")[0]}</p>
        <Button
          element="element"
          padding="0 0 0 5px"
          sx={{ padding: "10px 0" }}
          onClick={() => {
            setSelectedAuditDate(params.row.audit_date.split("T")[0]);
            setSelectedDocument(params.row.id);
            setShowUpdateDateModal(true);
          }}
        >
          <EditIcon />
        </Button>
      </div>
    );

    if (role.isSuperAdmin || role.isAdmin) return editable;
    else {
      if (
        detail.client_assignments.some(
          (item) =>
            item.company.id === selectedClient.id &&
            item.action.identifier === constants.actions.UPDATE
        )
      )
        return editable;
      return `${params.row.audit_date.split("T")[0]}`;
    }
  };

  const renderActionCell = (params) => {
    const editable = (
      <Button
        variant="contained"
        size="small"
        padding="0 0 0 5px"
        sx={{ padding: "10px 0" }}
        onClick={() => downloadDocumentHanlder(params.row.id)}
      >
        <DownloadIcon />
      </Button>
    );

    if (role.isSuperAdmin || role.isAdmin) return editable;
    else {
      if (
        detail.client_assignments.some(
          (item) =>
            item.company.id === selectedClient.id &&
            item.action.identifier === constants.actions.UPDATE
        )
      )
        return editable;
      return `${params.row.audit_date.split("T")[0]}`;
    }
  };

  const renderReviewByCell = (params) => {
    const editable = (
      <Button
        variant="contained"
        loading={isLoading}
        onClick={() => {
          setSelectedDocument(params.row.id);
          setShowConfirmation(true);
        }}
      >
        Review
      </Button>
    );

    if (!!params.row?.reviewed_by) {
      return `${params.row?.reviewed_by?.first_name || ""} ${
        params.row?.reviewed_by?.last_name || ""
      }`;
    } else {
      if (role.isSuperAdmin || role.isAdmin) return editable;
      else {
        if (
          detail.client_assignments.some(
            (item) =>
              item.company.id === selectedClient.id &&
              item.action.identifier === constants.actions.REVIEW
          )
        )
          return editable;
      }
    }
  };

  const files_columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "uploaded_by",
      headerName: "Uploaded By",
      flex: 1,
      valueGetter: (params) =>
        `${params.row?.uploaded_by?.first_name || ""} ${
          params.row?.uploaded_by?.last_name || ""
        }`,
    },
    {
      field: "reviewed_by",
      headerName: "Reviewed By",
      flex: 1,
      renderCell: renderReviewByCell,
    },
    {
      field: "audit_date",
      headerName: "Audit Date",
      flex: 1,
      renderCell: renderAuditDateCell,
    },
    {
      field: "status",
      headerName: "Review Status",
      type: "number",
      flex: 1,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params) =>
        !!params.row.reviewed_by ? (
          <CheckCircleIcon htmlColor="#198754" />
        ) : (
          <CancelIcon htmlColor="#ffc107" />
        ),
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      headerAlign: 'right',
      align: 'right',
      renderCell: renderActionCell,
    },
  ];

  const handleClick = (detail, action) => {
    if (action === "collapse") {
      if (open === detail.id) setOpen(0);
      else setOpen(detail.id);
    }

    dispatch(setSelectedFolder(detail));
  };

  const addFolderHandler = (parent) => {
    if (!!parent)
      dispatch(setSelectedFolder({ id: parent.id, name: parent.name }));
    else {
      dispatch(setSelectedFolder({ id: 0, name: "" }));
      setOpen(0);
    }

    setShowAddFolderModal((prevState) => !prevState);
  };

  const findDocumentList = (folders, id) => {
    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];

      if (folder.id === id) {
        return folder;
      } else {
        for (let j = 0; j < folder.children.length; j++) {
          const subFolder = folder.children[j];
          if (subFolder.id === id) {
            return subFolder;
          }
        }
      }
    }
  };

  const fileInputComponent = useMemo(
    () => allowFileCreate ? (
        <div className="px-3 pb-1">
          <FileInput getClientFolders={getClientFolders} />
        </div>
      ) : null,
    [selectedClient?.id, allowFileCreate]
  );

  const reviewDocumentHandler = async () => {
    try {
      const { data } = await request.patch(
        constants.apis.UPDATE_DOCUMENT(selectedDocument),
        { client: selectedClient.id, reviewed: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const reviewConfirmationComponent = useMemo(() => {
    if (!showConfirmation) return null;
    return (
      <ConfirmationDialog
        titleText="Confirm Review"
        warningText="Do you want to mark this document as reviewed?"
        moveForward={reviewDocumentHandler}
        show={showConfirmation}
        setShow={setShowConfirmation}
      />
    );
  }, [showConfirmation]);

  const updateDateModalComponent = useMemo(() => {
    return (
      showUpdateDateModal && (
        <UpdateDateModal
          show={showUpdateDateModal}
          setShow={setShowUpdateDateModal}
          selectedAuditDate={selectedAuditDate}
          selectedDocument={selectedDocument}
        />
      )
    );
  }, [showUpdateDateModal]);

  useEffect(() => {
    if (!!selectedFolder && !!selectedClient) {
      setAllowFileCreate(permissionGuard(constants.actions.CREATE, selectedClient?.id))
    }
  }, [selectedFolder?.id, selectedClient?.id])

  useEffect(() => {
    if (!!selectedFolder.id && selectedFolder.id !== selectedDocumentParent) {
      setDocumentList(() => {
        const detail = findDocumentList(folders, selectedFolder.id);
        setSelectedDocumentParent(detail.id);
        return [...detail.documents];
      });
    } else {
      setDocumentList([]);
    }
  }, [selectedFolder.id]);

  return (
    <Fragment>
      {updateDateModalComponent}
      {reviewConfirmationComponent}
      <div className="card">
        <div className="row">
          <Box
            className="col-4 col-sm-3 col-md-2 pe-0"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ bgcolor: "transparent" }}
                >
                  Folders
                </ListSubheader>
              }
            >
              {folders.map((item) => (
                <Fragment key={item.id}>
                  <ListItemButton
                    onClick={() =>
                      handleClick(
                        {
                          id: item.id,
                          name: item.name,
                          level_no: item.level_no,
                        },
                        "collapse"
                      )
                    }
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
                          onClick={() =>
                            handleClick({
                              id: subItem.id,
                              name: subItem.name,
                              level_no: item.level_no,
                            })
                          }
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
                        disabled={!allowFileCreate}
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
              <ListItemButton onClick={() => addFolderHandler(null)} disabled={!allowFileCreate} >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Folder" />
              </ListItemButton>
            </List>
          </Box>
          <Box
            className="col-8 col-sm-9 col-md-10 ps-0"
            sx={{ height: "100%" }}
          >
            {fileInputComponent}
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
    </Fragment>
  );
};

export default FileManager;
