import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TextField,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { PER_PAGE_ROWS } from "../utils/constants";
import { userApi } from "../utils/userApi";
import TableHeadComponent from "./TableHeadComponent";
import TableRowsComponent from "./TableRowsComponent";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await userApi());
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      const filtered = users.filter((user) => {
        return (
          includesFilter(user.name, searchQuery) ||
          includesFilter(user.email, searchQuery) ||
          includesFilter(user.role, searchQuery)
        );
      });
      setFilteredUsers(filtered);
      setCurrentPage(1);
    };

    filterUsers();
  }, [users, searchQuery]);

  const includesFilter = (user, query) => {
    return user.toLowerCase().includes(query.toLowerCase());
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteSelected = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedUsers.includes(user))
    );
    setSelectedUsers([]);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <TextField
        type="text"
        placeholder="Search by Name, Email or Role..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="searchInput"
      />
      {users.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHeadComponent
                currentPage={currentPage}
                filteredUsers={filteredUsers}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
              <TableBody>
                <TableRowsComponent
                  users={users}
                  setUsers={setUsers}
                  currentPage={currentPage}
                  filteredUsers={filteredUsers}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                />
              </TableBody>
            </Table>
          </TableContainer>

          <div className="bottomContainer">
            <Button
              onClick={handleDeleteSelected}
              disabled={selectedUsers.length === 0}
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
            >
              Delete Selected
            </Button>

            <Pagination
              count={Math.ceil(filteredUsers.length / PER_PAGE_ROWS)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="circular"
            />
          </div>
        </>
      ) : (
        <div className="no-data-container">
          <Box>No Table Data</Box>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
