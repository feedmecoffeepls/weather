import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Weather from "@/components/weather/current-weather/Weather.client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { weatherMock } from "@/mocks/weather";

jest.mock("../../server/actions/weather/getCurrentWeather.ts", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(weatherMock)),
}));

describe("Weather Component", () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Weather />
      </QueryClientProvider>
    );
  });

  it("should display the correct current date", async () => {
    const expectedDate = new Date(weatherMock.dt * 1000).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    await waitFor(() => {
      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });
  });

  it("should display the correct temperature", async () => {
    const expectedTemp = `${weatherMock.main.temp.toFixed(2)} °C`;
    await waitFor(() => {
      expect(screen.getByText(expectedTemp)).toBeInTheDocument();
    });
  });

  it("should display the correct humidity", async () => {
    const expectedHumidity = `${weatherMock.main.humidity} %`;
    await waitFor(() => {
      expect(screen.getByText(expectedHumidity)).toBeInTheDocument();
    });
  });

  it("should display the correct wind speed", async () => {
    const expectedWindSpeed = `${weatherMock.wind.speed} m/s`;
    await waitFor(() => {
      expect(screen.getByText(expectedWindSpeed)).toBeInTheDocument();
    });
  });

  it("should display the correct visibility", async () => {
    const expectedVisibility = `${weatherMock.visibility} km`;
    await waitFor(() => {
      expect(screen.getByText(expectedVisibility)).toBeInTheDocument();
    });
  });
});
