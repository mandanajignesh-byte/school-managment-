const pool = require("../config/db");

const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude
      }
    });
  } catch (error) {
    next(error);
  }
};

const listSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    const [schools] = await pool.execute(
      `
        SELECT
          id,
          name,
          address,
          latitude,
          longitude,
          ROUND(
            6371 * 2 * ASIN(
              SQRT(
                POWER(SIN(RADIANS(? - latitude) / 2), 2) +
                COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                POWER(SIN(RADIANS(? - longitude) / 2), 2)
              )
            ),
            3
          ) AS distance_km
        FROM schools
        ORDER BY distance_km ASC, name ASC
      `,
      [latitude, latitude, longitude]
    );

    res.status(200).json({
      success: true,
      count: schools.length,
      user_location: {
        latitude,
        longitude
      },
      data: schools
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSchool,
  listSchools
};
