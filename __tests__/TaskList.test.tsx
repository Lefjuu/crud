import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskList } from "../src/components/tasks/TaskList";
import "@testing-library/jest-dom";

// Mock the useTasks hook
jest.mock("../src/hooks/useTasks", () => ({
  useTasks: jest.fn(),
  useUpdateTask: jest.fn(),
  useDeleteTask: jest.fn(),
}));

import { useTasks, useUpdateTask, useDeleteTask } from "../src/hooks/useTasks";
const mockUseTasks = useTasks as jest.MockedFunction<any>;
const mockUseUpdateTask = useUpdateTask as jest.MockedFunction<any>;
const mockUseDeleteTask = useDeleteTask as jest.MockedFunction<any>;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
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

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUpdateTask.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });
    mockUseDeleteTask.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });
  });

  it("shows loading skeleton when loading", () => {
    mockUseTasks.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderWithProviders(<TaskList />);

    // Should show loading skeletons
    const skeletons = screen.getAllByRole("generic", { hidden: true });
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("shows error message when error occurs", () => {
    const errorMessage = "Failed to fetch tasks";
    mockUseTasks.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: errorMessage },
    });

    renderWithProviders(<TaskList />);

    expect(
      screen.getByText(`Error loading tasks: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it("shows empty message when no tasks", () => {
    mockUseTasks.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    renderWithProviders(<TaskList />);

    expect(
      screen.getByText("No tasks yet. Add one above!")
    ).toBeInTheDocument();
  });

  it("renders tasks when data is available", () => {
    const mockTasks = [
      {
        id: 1,
        title: "Test Task 1",
        completed: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        title: "Test Task 2",
        completed: true,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ];

    mockUseTasks.mockReturnValue({
      data: mockTasks,
      isLoading: false,
      error: null,
    });

    renderWithProviders(<TaskList />);

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });
});
