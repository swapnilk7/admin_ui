import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";

import { PER_PAGE_ROWS } from "../utils/constants";

const TableHeadComponent = ({
  currentPage,
  filteredUsers,
  selectedUsers,
  setSelectedUsers,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const startIdx = (currentPage - 1) * PER_PAGE_ROWS;
      const endIdx = startIdx + PER_PAGE_ROWS;
      const currentPageUsers = filteredUsers.slice(startIdx, endIdx);
      setSelectedUsers(currentPageUsers);
    } else {
      setSelectedUsers([]);
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none">
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedUsers.length > 1}
          />
        </TableCell>
        <TableCell>
          <b>Name</b>
        </TableCell>
        <TableCell>
          <b>Email</b>
        </TableCell>
        <TableCell>
          <b>Role</b>
        </TableCell>
        <TableCell>
          <b>Edit</b>
        </TableCell>
        <TableCell>
          <b>Delete</b>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
