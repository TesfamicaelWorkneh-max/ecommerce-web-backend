import HeroImageModel from "../models/HeroImage.model.js";

// GET hero image
export const getHeroImage = async (req, res) => {
  try {
    const hero = await HeroImageModel.findOne().sort({ createdAt: -1 });

    if (!hero) {
      return res.json({
        success: false,
        message: "No hero image uploaded yet",
      });
    }

    res.json({
      success: true,
      url: hero.imageUrl,
    });
  } catch (error) {
    console.error("Get hero image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero image",
    });
  }
};

// POST upload hero image
export const uploadHeroImage = async (req, res) => {
  try {
    if (!req.imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const hero = new HeroImageModel({
      imageUrl: req.imageUrl,
    });

    await hero.save();

    res.json({
      success: true,
      message: "Hero image uploaded successfully",
      url: req.imageUrl,
    });
  } catch (error) {
    console.error("Upload hero image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload hero image",
    });
  }
};
