const Catalog = require("../models/catalog.model");

async function listSuites(req, res) {
  const result = await Catalog.listSuites(req.query);
  res.status(200).json({ suites: result.data, meta: result.meta });
}


async function getSuiteBySlug(req, res) {
  const suite = await Catalog.getSuiteBySlug(req.params.slug);

  if (!suite) {
    return res.status(404).json({ message: "Suite not found." });
  }

  res.status(200).json({ suite });
}

async function listAmenities(req, res) {
  const result = await Catalog.listAmenities(req.query);
  res.status(200).json({ amenities: result.data, meta: result.meta });
}


async function listExperiences(req, res) {
  const result = await Catalog.listExperiences(req.query);
  res.status(200).json({ experiences: result.data, meta: result.meta });
}

async function listGallery(req, res) {
  const result = await Catalog.listGallery(req.query);
  res.status(200).json({ images: result.data, meta: result.meta });
}

module.exports = {
  getSuiteBySlug,
  listAmenities,
  listExperiences,
  listGallery,
  listSuites,
};
