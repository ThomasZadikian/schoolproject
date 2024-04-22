import { beforeAll } from "vitest";
import type MockAdapter from "axios-mock-adapter";

export let variables: Record<string, any>;
export let mock: MockAdapter;

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  };
});
