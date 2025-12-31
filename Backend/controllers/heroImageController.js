// // import HeroImageModel from "../models/HeroImage.model.js";

// // // GET hero image
// // export const getHeroImage = async (req, res) => {
// //   try {
// //     const hero = await HeroImageModel.findOne().sort({ createdAt: -1 });

// //     if (!hero) {
// //       return res.json({
// //         success: false,
// //         message: "No hero image uploaded yet",
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       url: hero.imageUrl,
// //     });
// //   } catch (error) {
// //     console.error("Get hero image error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch hero image",
// //     });
// //   }
// // };

// // // POST upload hero image
// // export const uploadHeroImage = async (req, res) => {
// //   try {
// //     if (!req.imageUrl) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Image upload failed",
// //       });
// //     }

// //     const hero = new HeroImageModel({
// //       imageUrl: req.imageUrl,
// //     });

// //     await hero.save();

// //     res.json({
// //       success: true,
// //       message: "Hero image uploaded successfully",
// //       url: req.imageUrl,
// //     });
// //   } catch (error) {
// //     console.error("Upload hero image error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to upload hero image",
// //     });
// //   }
// // };
// import HeroImageModel from "../models/HeroImage.model.js";

// // GET all hero images
// export const getHeroImages = async (req, res) => {
//   try {
//     const heroes = await HeroImageModel.find().sort({ createdAt: -1 });

//     if (!heroes || heroes.length === 0) {
//       return res.json({
//         success: false,
//         message: "No hero images uploaded yet",
//         images: [],
//       });
//     }

//     res.json({
//       success: true,
//       images: heroes.map((h) => h.imageUrl),
//     });
//   } catch (error) {
//     console.error("Get hero images error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch hero images",
//     });
//   }
// };

// // POST upload hero image (same as before)
// export const uploadHeroImage = async (req, res) => {
//   try {
//     if (!req.imageUrl) {
//       return res.status(400).json({
//         success: false,
//         message: "Image upload failed",
//       });
//     }

//     const hero = new HeroImageModel({
//       imageUrl: req.imageUrl,
//     });

//     await hero.save();

//     res.json({
//       success: true,
//       message: "Hero image uploaded successfully",
//       url: req.imageUrl,
//     });
//   } catch (error) {
//     console.error("Upload hero image error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to upload hero image",
//     });
//   }
// };
// In your heroImageController.js
import HeroImageModel from "../models/HeroImage.model.js";

// GET all hero images
export const getHeroImages = async (req, res) => {
  try {
    const heroes = await HeroImageModel.find().sort({ createdAt: -1 });

    if (!heroes || heroes.length === 0) {
      return res.json({
        success: false,
        message: "No hero images uploaded yet",
        images: [],
      });
    }

    res.json({
      success: true,
      images: heroes.map((h) => h.imageUrl),
    });
  } catch (error) {
    console.error("Get hero images error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero images",
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

// DELETE hero image
export const deleteHeroImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    // Find and delete the hero image by URL
    const result = await HeroImageModel.findOneAndDelete({ imageUrl });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Hero image not found",
      });
    }

    res.json({
      success: true,
      message: "Hero image deleted successfully",
    });
  } catch (error) {
    console.error("Delete hero image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete hero image",
    });
  }
};
