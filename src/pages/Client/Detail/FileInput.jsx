import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import useHttpClient from "../../../hooks/http-client";
import constants from "../../../constants";
import { setSelectedFolder } from "../../../redux/slices/client-slice";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
  position: "relative",
};

const thumbInner = {
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "100%",
  objectFit: "cover",
};

const closeBtn = {
  position: "absolute",
  top: "-16px",
  right: "-22px",
  zIndex: 10,
};

const FileInput = ({ getClientFolders }) => {
  const { isLoading, request } = useHttpClient();
  const { selectedClient, selectedFolder } = useSelector((state) => state.client);
  
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
  });

  const onSubmit = async () => {
    if (!selectedFolder?.id) return

    const postBody = new FormData();
    
    files.forEach(item => postBody.append("files", item))
    postBody.append("audit_date", (new Date()).toISOString());
    postBody.append("folder", selectedFolder.id);
    postBody.append("client", selectedClient.id);

    try {
      await request.post(constants.apis.CREATE_DOCUMENT, postBody);
      setFiles([])
      getClientFolders();
    } catch (error) {
      console.log(error)
    }

  };

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="px-3 text-center"
      style={{
        width: "7rem",
        textOverflow: "ellipsis",
        position: "relative",
      }}
    >
      <div style={closeBtn}>
        <Button
          element="icon"
          variant="contained"
          sx={{ backgroundColor: "#fc1d1d", width: "25px", height: "25px" }}
          onClick={() => {
            setFiles([...files.filter((item) => item.path !== file.path)]);
          }}
        >
          <CloseIcon color="white" />
        </Button>
      </div>
      <div style={thumb}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
      <p className="m-0">
        <small>{file.path}</small>
      </p>
      <p>
        <small>{file.size / 1000} kb</small>
      </p>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section
      className="text-center mt-3"
      style={{
        outline: "1.5px dashed #adadad",
        borderRadius: "5px",
      }}
    >
      <div
        {...getRootProps({ className: "dropzone pt-2" })}
        style={{
          backgroundColor: "#e1e5ed",
          padding: "0 0 0.5rem 0",
          cursor: "pointer",
          height: !!thumbs.length ? "50px" : "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="m-0">Drop the files here ...</p>
        ) : (
          <p className="m-0">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      {!!thumbs.length && (
        <form>
          <aside style={thumbsContainer}>{thumbs}</aside>
          <hr className="text-secondary mb-0" />
          <div className="d-flex flex-column justify-content-end align-items-start p-3">
            <p className="m-0 ms-2 mb-2"><small>Selected Folder:</small><span className="ps-1">{!!selectedFolder?.name ? <b style={{ color: "#3f50b5" }}>{selectedFolder.name}</b> : <b style={{ color: "#fc1d1d" }}>Please select a folder.</b>}</span></p>
            <Button variant="contained" loading={isLoading} disabled={!selectedFolder.name} onClick={onSubmit}>
              Upload Files
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default FileInput;
