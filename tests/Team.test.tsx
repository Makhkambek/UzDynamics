import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Team from "../app/components/Team";

describe("Team", () => {
  it("renders exactly 2 team members", () => {
    render(<Team />);
    expect(screen.getByText("PERS-0041")).toBeInTheDocument();
    expect(screen.getByText("PERS-0042")).toBeInTheDocument();
  });

  it("renders member names", () => {
    render(<Team />);
    expect(screen.getByText("TESHABAYEV_MAKHKAMBEK")).toBeInTheDocument();
    expect(screen.getByText("SODIKOV_SHUKRULLO")).toBeInTheDocument();
  });

  it("renders titles", () => {
    render(<Team />);
    expect(screen.getByText("CO-FOUNDER · CEO")).toBeInTheDocument();
    expect(screen.getByText("CO-FOUNDER · CTO")).toBeInTheDocument();
  });

  it("renders initials avatars", () => {
    render(<Team />);
    expect(screen.getByText("TM")).toBeInTheDocument();
    expect(screen.getByText("SS")).toBeInTheDocument();
  });

  it("renders clearance badges", () => {
    render(<Team />);
    const alphaBadges = screen.getAllByText("CLEARANCE:ALPHA");
    expect(alphaBadges).toHaveLength(2);
  });

  it("renders skills for both members", () => {
    render(<Team />);
    expect(screen.getByText("DRONE_SYSTEMS")).toBeInTheDocument();
    expect(screen.getByText("AUTONOMOUS_AI")).toBeInTheDocument();
    expect(screen.getByText("COMPUTER_VISION")).toBeInTheDocument();
  });

  it("has section id='team' for navbar anchor", () => {
    const { container } = render(<Team />);
    expect(container.querySelector("#team")).toBeInTheDocument();
  });
});
