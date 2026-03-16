import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Projects from "../app/components/Projects";

describe("Projects", () => {
  it("renders all 6 project cards", () => {
    render(<Projects />);
    // Каждая карточка имеет уникальный ID вида UZD-00X
    expect(screen.getByText("UZD-001")).toBeInTheDocument();
    expect(screen.getByText("UZD-002")).toBeInTheDocument();
    expect(screen.getByText("UZD-003")).toBeInTheDocument();
    expect(screen.getByText("UZD-004")).toBeInTheDocument();
    expect(screen.getByText("UZD-005")).toBeInTheDocument();
    expect(screen.getByText("UZD-006")).toBeInTheDocument();
  });

  it("renders all project names", () => {
    render(<Projects />);
    expect(screen.getByText("RECON_DRONE_X1")).toBeInTheDocument();
    expect(screen.getByText("COMBAT_DRONE_V2")).toBeInTheDocument();
    expect(screen.getByText("URBAN_ROVER")).toBeInTheDocument();
    expect(screen.getByText("DESERT_CRAWLER")).toBeInTheDocument();
    expect(screen.getByText("SHIELD_SYSTEM")).toBeInTheDocument();
    expect(screen.getByText("TACTICAL_UNIT")).toBeInTheDocument();
  });

  it("renders correct type badges", () => {
    const { container } = render(<Projects />);
    // Бейджи — span с классом border, тип текст также есть в заглушке картинки
    // Считаем все вхождения и проверяем что их не меньше 2 (badge + placeholder)
    const uavBadges = screen.getAllByText("UAV");
    const ugvBadges = screen.getAllByText("UGV");
    expect(uavBadges.length).toBeGreaterThanOrEqual(2);
    expect(ugvBadges.length).toBeGreaterThanOrEqual(2);
    expect(container.querySelector("#projects")).toBeInTheDocument();
    // DEF и TAC тоже есть в бейдже и в заглушке картинки
    expect(screen.getAllByText("DEF").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("TAC").length).toBeGreaterThanOrEqual(1);
  });

  it("renders correct statuses", () => {
    render(<Projects />);
    const operational = screen.getAllByText("[OPERATIONAL]");
    const classified  = screen.getAllByText("[CLASSIFIED]");
    expect(operational).toHaveLength(2);
    expect(classified).toHaveLength(3);
    expect(screen.getByText("[TESTING]")).toBeInTheDocument();
  });

  it("renders the section heading terminal command", () => {
    render(<Projects />);
    expect(screen.getByText(/ls -la \/classified\/projects\//)).toBeInTheDocument();
  });

  it("has section id='projects' for navbar anchor", () => {
    const { container } = render(<Projects />);
    expect(container.querySelector("#projects")).toBeInTheDocument();
  });
});
