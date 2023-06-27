import React from "react";
import axios from "axios";
import { render, screen, fireEvent } from "@testing-library/react";

import AdminDashboard from "../components/AdminUI/AdminDashboard";

jest.mock("axios");

describe("AdminDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches users and displays them in a table", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<AdminDashboard />);

    await screen.findAllByRole("row");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("filters users based on search query", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<AdminDashboard />);

    await screen.findAllByRole("row");

    const searchInput = screen.getByPlaceholderText(
      "Search by Name, Email or Role..."
    );

    fireEvent.change(searchInput, { target: { value: "John" } });
    await screen.findByText("John Doe");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  test("deletes selected users when delete button is clicked", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<AdminDashboard />);

    await screen.findAllByRole("row");

    const checkbox = screen.getAllByRole("checkbox");
    fireEvent.click(checkbox[1]);

    const deleteButton = screen.getByRole("button", {
      name: "Delete Selected",
    });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
