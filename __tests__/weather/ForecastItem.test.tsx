import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ForecastItem from "@/components/ui/ForecastItem";

describe("ForecastItem Component", () => {
  const mockItem = {
    dt: 1661990400,
    weather: [
      {
        icon: "01d",
        description: "clear sky",
      },
    ],
    main: {
      temp_min: 15.0,
      temp_max: 22.0,
    },
    clouds: {},
    wind: {},
    sys: {},
  };

  it("should render the correct time", () => {
    render(<ForecastItem item={mockItem} />);
    const timeElement = screen.getByText("08:00 AM");
    expect(timeElement).toBeInTheDocument();
  });

  it("should render the correct weather icon and description", () => {
    render(<ForecastItem item={mockItem} />);
    const iconElement = screen.getByAltText("clear sky");
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the correct temperature range", () => {
    render(<ForecastItem item={mockItem} />);
    const temperatureElement = screen.getByText("15.00 / 22.00 °C");
    expect(temperatureElement).toBeInTheDocument();
  });

  it("should render the correct weather description", () => {
    render(<ForecastItem item={mockItem} />);
    const descriptionElement = screen.getByText("clear sky");
    expect(descriptionElement).toBeInTheDocument();
  });
});
