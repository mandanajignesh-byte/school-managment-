const test = require("node:test");
const assert = require("node:assert/strict");
const { addSchoolSchema, listSchoolsSchema } = require("../src/validators/school.validator");

test("addSchoolSchema accepts a valid school payload", () => {
  const result = addSchoolSchema.safeParse({
    name: "Delhi Public School",
    address: "Mathura Road, New Delhi",
    latitude: 28.5821,
    longitude: 77.2461
  });

  assert.equal(result.success, true);
});

test("addSchoolSchema rejects empty strings and invalid coordinates", () => {
  const result = addSchoolSchema.safeParse({
    name: "",
    address: "",
    latitude: 120,
    longitude: 220
  });

  assert.equal(result.success, false);
  assert.equal(result.error.errors.length, 4);
});

test("listSchoolsSchema coerces query-string coordinates to numbers", () => {
  const result = listSchoolsSchema.safeParse({
    latitude: "28.6139",
    longitude: "77.2090"
  });

  assert.equal(result.success, true);
  assert.equal(typeof result.data.latitude, "number");
  assert.equal(typeof result.data.longitude, "number");
});

test("coordinate validation rejects blank query strings", () => {
  const result = listSchoolsSchema.safeParse({
    latitude: "",
    longitude: " "
  });

  assert.equal(result.success, false);
});
