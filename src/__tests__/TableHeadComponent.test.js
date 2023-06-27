import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TableHeadComponent from "../components/AdminUI/TableHeadComponent";

describe("TableHeadComponent", () => {
  test("should handle select all checkbox correctly", () => {
    const currentPage = 1;
    const filteredUsers = [
      { id: 1, name: "John", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane", email: "jane@example.com", role: "User" },
      { id: 3, name: "Bob", email: "bob@example.com", role: "User" },
    ];
    const selectedUsers = [];
    const setSelectedUsers = jest.fn();

    render(
      <TableHeadComponent
        currentPage={currentPage}
        filteredUsers={filteredUsers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    );

    const selectAllCheckbox = screen.getAllByRole("checkbox");

    fireEvent.click(selectAllCheckbox[0]);

    expect(setSelectedUsers).toHaveBeenCalledTimes(1);
  });
});
