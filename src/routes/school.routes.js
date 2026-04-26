const express = require("express");
const { addSchool, listSchools } = require("../controllers/school.controller");
const validate = require("../middleware/validate");
const { addSchoolSchema, listSchoolsSchema } = require("../validators/school.validator");

const router = express.Router();

router.post("/addSchool", validate(addSchoolSchema), addSchool);
router.get("/listSchools", validate(listSchoolsSchema, "query"), listSchools);

module.exports = router;
