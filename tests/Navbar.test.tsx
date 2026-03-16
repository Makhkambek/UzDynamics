import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "../app/components/Navbar";

describe("Navbar", () => {
  it("renders logo", () => {
    render(<Navbar />);
    expect(screen.getByText("UZDYNAMICS")).toBeInTheDocument();
    expect(screen.getByText("UZD://")).toBeInTheDocument();
  });

  it("renders all 4 nav links", () => {
    render(<Navbar />);
    expect(screen.getByText("01_PROJECTS")).toBeInTheDocument();
    expect(screen.getByText("02_TEAM")).toBeInTheDocument();
    expect(screen.getByText("03_ABOUT")).toBeInTheDocument();
    expect(screen.getByText("04_CONTACT")).toBeInTheDocument();
  });

  it("nav links point to correct anchors", () => {
    render(<Navbar />);
    expect(screen.getByText("01_PROJECTS").closest("a")).toHaveAttribute("href", "#projects");
    expect(screen.getByText("02_TEAM").closest("a")).toHaveAttribute("href", "#team");
    expect(screen.getByText("03_ABOUT").closest("a")).toHaveAttribute("href", "#about");
    expect(screen.getByText("04_CONTACT").closest("a")).toHaveAttribute("href", "#contact");
  });

  it("renders system status indicator", () => {
    render(<Navbar />);
    expect(screen.getByText("SYS:ONLINE")).toBeInTheDocument();
  });

  it("renders mobile menu toggle button", () => {
    render(<Navbar />);
    expect(screen.getByText("[MENU]")).toBeInTheDocument();
  });

  it("opens mobile menu on button click", () => {
    render(<Navbar />);
    const toggle = screen.getByText("[MENU]");
    fireEvent.click(toggle);
    expect(screen.getByText("[CLOSE]")).toBeInTheDocument();
  });
});
