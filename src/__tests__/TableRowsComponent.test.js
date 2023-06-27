/* eslint-disable jest/no-mocks-import */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TableRowsComponent from "../components/AdminUI/TableRowsComponent";
import { mockData } from "../__mocks__/mockData";

describe("TableRowsComponent", () => {
  const users = mockData;

  const setUsers = jest.fn();
  const currentPage = 1;
  const filteredUsers = users;
  const selectedUsers = [];
  const setSelectedUsers = jest.fn();

  test("renders table rows for each user", () => {
    render(
      <TableRowsComponent
        users={users}
        setUsers={setUsers}
        currentPage={currentPage}
        filteredUsers={filteredUsers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    );

    // Check if the table rows are rendered for each user
    users.slice(0, 10).forEach((user) => {
      const nameElement = screen.getByText(user.name);
      expect(nameElement).toBeInTheDocument();
    });
  });

  test("handles checkbox change", () => {
    render(
      <TableRowsComponent
        users={users}
        setUsers={setUsers}
        currentPage={currentPage}
        filteredUsers={filteredUsers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    );

    const checkbox = screen.getAllByRole("checkbox", { name: "" });
    fireEvent.click(checkbox[1]);
  });

  test("handles edit mode and save", async () => {
    render(
      <TableRowsComponent
        users={users}
        setUsers={setUsers}
        currentPage={currentPage}
        filteredUsers={filteredUsers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    );

    const editButton = screen.getAllByRole("button", { name: "" });
    fireEvent.click(editButton[0]);

    const nameInput = screen.getAllByRole("textbox", { name: "" });
    fireEvent.change(nameInput[0], { target: { value: "Updated Name" } });

    const saveButton = screen.getAllByText("Save");
    fireEvent.click(saveButton[0]);

    expect(setUsers).toHaveBeenCalledTimes(1);
    expect(setUsers).toHaveBeenCalledWith([
      {
        ...users[0],
        name: "Updated Name",
      },
      // Ensure other users are not modified
      ...users.slice(1),
    ]);
  });
  test("handles edit mode and cancel", async () => {
    render(
      <TableRowsComponent
        users={users}
        setUsers={setUsers}
        currentPage={currentPage}
        filteredUsers={filteredUsers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    );

    const editButton = screen.getAllByRole("button", { name: "" });
    fireEvent.click(editButton[0]);

    const nameInput = screen.getAllByRole("textbox", { name: "" });
    fireEvent.change(nameInput[0], { target: { value: "Updated Name" } });

    const cancelButton = screen.getAllByText("Cancel");
    fireEvent.click(cancelButton[0]);
  });

  test("handles delete", () => {
    render(
      <TableRowsComponent
        users={users}
        setUsers={setUsers}
        currentPage={currentPage}
        filteredUsers={filteredUsers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    );

    const deleteButton = screen.getAllByRole("button", { name: "" });
    fireEvent.click(deleteButton[1]);

    expect(setUsers).toHaveBeenCalledTimes(1);
  });
});
