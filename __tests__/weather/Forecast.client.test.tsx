import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Forecast from "@/components/weather/forecast/Forecast.client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { forecast } from "@/mocks/forecast";

jest.mock("../../server/actions/weather/getForecast.ts", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(forecast)),
}));

describe("Forecast Component", () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Forecast />
      </QueryClientProvider>
    );
  });

  it("should display the correct date strings for forecast items", async () => {
    const todayString = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
    const date1 = new Date(1715612400 * 1000).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
    const date2 = new Date(1715623200 * 1000).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });

    await waitFor(() => {
      const date1Text = screen.queryByText(date1);
      const date2Text = screen.queryByText(date2);
      const todayText = screen.queryByText("Today");

      expect(date1Text || todayText).toBeInTheDocument();
      expect(date2Text || todayText).toBeInTheDocument();
    });
  });
});
