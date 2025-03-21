import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import Navbar from "../index";
import { expect } from "@jest/globals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// Create mock store
const mockStore = configureStore([]);

describe("Navbar component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
      },
    });

    // Mock store.dispatch to track actions
    store.dispatch = jest.fn();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("displays login/signup button when user is not logged in", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Signup\/Login/i)).toBeInTheDocument();
  });

  it("displays logout button when user is logged in", () => {
    const loggedInStore = mockStore({
      auth: {
        isAuthenticated: true,
        user: { name: "test", role: "user" },
      },
    });

    render(
      <Provider store={loggedInStore}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it("opens modal on click of signup/login button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const loginButton = screen.getByText(/Signup\/Login/i);
    fireEvent.click(loginButton);

    expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
  });

  it("should handle form submission", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);

    // Ensure store.dispatch was called
    expect(store.dispatch).toHaveBeenCalled();
  });
});
