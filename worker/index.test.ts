import { describe, expect, it } from "vitest";
import { tmdbPath } from "./index";

describe("tmdbPath", () => {
  it("passes allowed read endpoints through", () => {
    expect(tmdbPath("/api/tmdb/movie/popular")).toBe("movie/popular");
    expect(tmdbPath("/api/tmdb/trending/movie/week")).toBe("trending/movie/week");
    expect(tmdbPath("/api/tmdb/search/movie")).toBe("search/movie");
    expect(tmdbPath("/api/tmdb/tv/1399/season/1")).toBe("tv/1399/season/1");
    expect(tmdbPath("/api/tmdb/search/multi")).toBe("search/multi");
  });

  it("rejects anything that would make it an open proxy", () => {
    expect(tmdbPath("/api/tmdb/account/123")).toBeNull();
    expect(tmdbPath("/api/tmdb/movie/../account")).toBeNull();
    expect(tmdbPath("/api/other/movie/popular")).toBeNull();
    expect(tmdbPath("/api/tmdb/")).toBeNull();
  });
});
