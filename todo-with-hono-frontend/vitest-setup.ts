import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { APIServer } from "./src/test/server";

beforeAll(() => APIServer.listen());
afterEach(() => APIServer.resetHandlers());
afterAll(() => APIServer.close());
