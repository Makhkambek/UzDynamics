import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../app/components/Footer";

describe("Footer", () => {
  it("renders logo", () => {
    render(<Footer />);
    expect(screen.getByText("UZDYNAMICS")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Projects").closest("a")).toHaveAttribute("href", "#projects");
    expect(screen.getByText("Team").closest("a")).toHaveAttribute("href", "#team");
    expect(screen.getByText("About").closest("a")).toHaveAttribute("href", "#about");
    // "Contact" встречается дважды (ссылка + заголовок секции) — берём все
    const contactEls = screen.getAllByText("Contact");
    expect(contactEls.length).toBeGreaterThanOrEqual(1);
  });

  it("renders social links", () => {
    render(<Footer />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
  });

  it("renders contact info", () => {
    render(<Footer />);
    expect(screen.getByText("contact@uzdynamics.uz")).toBeInTheDocument();
    expect(screen.getByText("Tashkent, Uzbekistan")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders system status", () => {
    render(<Footer />);
    expect(screen.getByText("ALL SYSTEMS ONLINE")).toBeInTheDocument();
  });
});
