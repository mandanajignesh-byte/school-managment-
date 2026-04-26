const { z } = require("zod");

const trimmedText = (field, max) =>
  z
    .string({
      required_error: `${field} is required`,
      invalid_type_error: `${field} must be a string`
    })
    .trim()
    .min(1, `${field} cannot be empty`)
    .max(max, `${field} must be at most ${max} characters`);

const coordinateNumber = (field) =>
  z.preprocess(
    (value) => {
      if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed === "" ? undefined : Number(trimmed);
      }

      return value;
    },
    z.number({
      required_error: `${field} is required`,
      invalid_type_error: `${field} must be a number`
    })
  );

const latitude = coordinateNumber("latitude")
  .refine((value) => value >= -90 && value <= 90, "latitude must be between -90 and 90");

const longitude = coordinateNumber("longitude")
  .refine((value) => value >= -180 && value <= 180, "longitude must be between -180 and 180");

const addSchoolSchema = z.object({
  name: trimmedText("name", 255),
  address: trimmedText("address", 500),
  latitude,
  longitude
});

const listSchoolsSchema = z.object({
  latitude,
  longitude
});

module.exports = {
  addSchoolSchema,
  listSchoolsSchema
};
