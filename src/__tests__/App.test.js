import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders AdminDashboard component", () => {
  render(<App />);
  const adminDashboardComponent = screen.getByTestId("admin-dashboard");
  expect(adminDashboardComponent).toBeInTheDocument();
});
