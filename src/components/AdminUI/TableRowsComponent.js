import React, { useState } from "react";
import {
  Button,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { PER_PAGE_ROWS } from "../utils/constants";

const TableRowsComponent = ({
  users,
  setUsers,
  currentPage,
  filteredUsers,
  selectedUsers,
  setSelectedUsers,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const startIdx = (currentPage - 1) * PER_PAGE_ROWS;
  const endIdx = startIdx + PER_PAGE_ROWS;
  const currentPageUsers = filteredUsers.slice(startIdx, endIdx);

  const handleCheckboxChange = (e, user) => {
    if (e.target.checked) {
      setSelectedUsers((prevState) => [...prevState, user]);
    } else {
      setSelectedUsers((prevState) =>
        prevState.filter((selectedUser) => selectedUser.id !== user.id)
      );
    }
  };

  const handleSave = (id) => {
    const currentUsers = users.map((user) => {
      if (user.id === id) {
        return editedUser;
      } else {
        return user;
      }
    });
    setUsers(currentUsers);
    setEditMode(false);
    setEditedUser(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedUser(null);
  };

  const handleDelete = (user) => {
    setUsers((prevUsers) =>
      prevUsers.filter((currentUser) => currentUser.id !== user.id)
    );
  };

  const handleEdit = (user) => {
    setEditedUser(user);
    setEditMode(true);
  };

  return currentPageUsers.map((user) => {
    if (editMode && editedUser && editedUser.id === user.id) {
      return (
        <TableRow key={user.id}>
          <TableCell>
            <Checkbox
              checked={selectedUsers.some(
                (selectedUser) => selectedUser.id === user.id
              )}
              onChange={(e) => handleCheckboxChange(e, user)}
            />
          </TableCell>
          <TableCell>
            <TextField
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
            />
          </TableCell>
          <TableCell>
            <TextField
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
            />
          </TableCell>
          <TableCell>
            <TextField
              value={editedUser.role}
              onChange={(e) =>
                setEditedUser({ ...editedUser, role: e.target.value })
              }
            />
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave(user.id)}
            >
              Save
            </Button>
          </TableCell>
          <TableCell>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow
          key={user.id}
          className={
            selectedUsers.find((selectedUser) => selectedUser.id === user.id)
              ? "selectedRow"
              : ""
          }
        >
          <TableCell>
            <Checkbox
              checked={selectedUsers.some(
                (selectedUser) => selectedUser.id === user.id
              )}
              onChange={(e) => handleCheckboxChange(e, user)}
            />
          </TableCell>
          <TableCell>
            <span className="cell-Data"> {user.name}</span>
          </TableCell>
          <TableCell>
            <span className="cell-Data"> {user.email}</span>
          </TableCell>
          <TableCell>
            <span> {user.role}</span>
          </TableCell>
          <TableCell>
            <IconButton onClick={() => handleEdit(user)} color="primary">
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton onClick={() => handleDelete(user)} color="error">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    }
  });
};

export default TableRowsComponent;
