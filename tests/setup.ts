import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock framer-motion — анимации не работают в jsdom
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...props }: any) => {
          const React = require("react");
          return React.createElement(tag, props, children);
        },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({ start: vi.fn() }),
  useInView: () => true,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => {
    const React = require("react");
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement("img", { src, alt, ...props });
  },
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/",
}));
