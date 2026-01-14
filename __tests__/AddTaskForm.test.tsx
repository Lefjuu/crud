import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddTaskForm } from "../src/components/tasks/AddTaskForm";
import "@testing-library/jest-dom";

// Mock the useCreateTask hook
jest.mock("../src/hooks/useTasks", () => ({
  useCreateTask: jest.fn(),
}));

import { useCreateTask } from "../src/hooks/useTasks";
const mockUseCreateTask = useCreateTask as jest.MockedFunction<any>;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe("AddTaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    mockUseCreateTask.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });

    renderWithProviders(<AddTaskForm />);

    expect(
      screen.getByPlaceholderText("Enter new task...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Task" })
    ).toBeInTheDocument();
  });

  it("calls mutateAsync when form is submitted with valid input", async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue({});
    mockUseCreateTask.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    renderWithProviders(<AddTaskForm />);

    const input = screen.getByPlaceholderText("Enter new task...");
    const button = screen.getByRole("button", { name: "Add Task" });

    fireEvent.change(input, { target: { value: "New Test Task" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({ title: "New Test Task" });
    });
  });

  it("clears input after successful submission", async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue({});
    mockUseCreateTask.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    renderWithProviders(<AddTaskForm />);

    const input = screen.getByPlaceholderText("Enter new task...");

    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.submit(screen.getByRole("button", { name: "Add Task" }));

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  it("shows loading state when pending", () => {
    mockUseCreateTask.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: true,
    });

    renderWithProviders(<AddTaskForm />);

    expect(
      screen.getByRole("button", { name: "Adding..." })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("does not submit with empty title", () => {
    const mockMutateAsync = jest.fn();
    mockUseCreateTask.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    renderWithProviders(<AddTaskForm />);

    const button = screen.getByRole("button", { name: "Add Task" });
    fireEvent.click(button);

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });
});
