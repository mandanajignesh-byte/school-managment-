const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

process.env.NODE_ENV = "test";

const app = require("../src/app");

test("GET /health returns an ok status", async () => {
  const response = await request(app).get("/health").expect(200);

  assert.equal(response.body.success, true);
  assert.equal(response.body.status, "ok");
});
