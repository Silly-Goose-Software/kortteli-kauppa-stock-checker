import Request from "supertest";
import { makeFakeHttpApi } from "./makeTestingApi";

describe("Shop Routes", () => {
  describe("GET /shops", () => {
    it("should return all created shops", async () => {
      const app = makeFakeHttpApi();

      // Create a few shops
      await Request(app).post("/shops").send({ name: "Shop 1" });
      await Request(app).post("/shops").send({ name: "Shop 2" });

      const response = await Request(app).get("/shops");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
    });
  });
  describe("POST /shops", () => {
    it("should create a new shop", async () => {
      const app = makeFakeHttpApi();

      const response = await Request(app)
        .post("/shops")
        .send({ name: "Shop 1" });

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.name).toBe("Shop 1");
    });
  });
});
