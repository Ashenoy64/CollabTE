import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Home from "../page";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("@/app/lib/firebase", () => ({
  GoogleSignIn: jest
    .fn()
    .mockResolvedValue({ exists: () => true, data: () => ({ user: {} }) }),
  CreateNewUser: jest
    .fn()
    .mockResolvedValue({ exists: () => true, data: () => ({ user: {} }) }),
  CreateNewUserEntry: jest.fn().mockResolvedValue({ exists: () => true }),
  SignInWithEmail: jest
    .fn()
    .mockResolvedValue({ exists: () => true, data: () => ({ user: {} }) }),
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form by default", () => {
    render(<Home />);

    const loginButtons = screen.getAllByText("Login");
    expect(loginButtons).toHaveLength(2);

    expect(loginButtons[0]).toBeInTheDocument();
    expect(loginButtons[1]).toBeInTheDocument();

    const registerButton = screen.getByText("Register");
    expect(registerButton).toBeInTheDocument();
  });

  test('switches to registration form when clicking "Register"', () => {
    render(<Home />);

    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);

    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test("handles Google sign-in", async () => {
    render(<Home />);

    const googleSignInButton = screen.getByText("Google Sign-in");
    fireEvent.click(googleSignInButton);

    // Wait for asynchronous Google sign-in process
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    // Ensure the user is redirected to the dashboard
    act(() => {
      expect(require("next/navigation").useRouter().push).toHaveBeenCalledWith(
        "/dashboard"
      );
    });
  });

  test("handles email registration", async () => {
    render(<Home />);

    // Switch to registration form
    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);

    // Fill in registration form
    userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "password123");
    userEvent.type(
      screen.getByPlaceholderText("Confirm Password"),
      "password123"
    );

    const registerSubmitButton = screen.getByRole("button", {
      name: "Register",
    });
    expect(registerSubmitButton).toBeInTheDocument();
    
    // Wait for asynchronous registration process
    await waitFor(() => {
      fireEvent.click(registerSubmitButton);
      expect(screen.getByRole("status")).toBeInTheDocument();
    },);

    // Ensure the user is redirected to the dashboard
    act(() => {
      expect(require("next/navigation").useRouter().push).toHaveBeenCalledWith(
        "/dashboard"
      );
    });
  });

  test("handles email login", async () => {
    render(<Home />);

    // Fill in login form
    userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "password123");

    const loginSubmitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginSubmitButton);

    // Wait for asynchronous login process
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    // Ensure the user is redirected to the dashboard
    act(() => {
      expect(require("next/navigation").useRouter().push).toHaveBeenCalledWith(
        "/dashboard"
      );
    });
  });
});
