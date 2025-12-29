// backend/models/Blog.model.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      maxlength: 200,
    },
    featuredImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "fashion",
        "lifestyle",
        "beauty",
        "trends",
        "tips",
        "news",
        "style-guide",
      ],
      default: "lifestyle",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        replies: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            text: String,
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
    metaTitle: String,
    metaDescription: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: Number, // in minutes
      default: 0,
    },
    seoScore: {
      type: Number,
      default: 0,
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Generate slug before saving
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  // Calculate read time (assuming 200 words per minute)
  if (this.isModified("content")) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }

  next();
});

// Virtual for comment count
blogSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Virtual for like count
blogSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Optimize featured image URL for different sizes
blogSchema.methods.getOptimizedImage = function (size = "medium") {
  if (!this.featuredImage.url) return "";

  const sizes = {
    thumbnail: { width: 300, height: 200, crop: "fill" },
    medium: { width: 800, height: 500, crop: "fill" },
    large: { width: 1200, height: 630, crop: "fill" },
    original: {},
  };

  const options = sizes[size] || sizes.medium;

  // If it's already a Cloudinary URL, we can add transformations
  if (this.featuredImage.url.includes("res.cloudinary.com")) {
    const parts = this.featuredImage.url.split("/upload/");
    if (parts.length === 2) {
      if (size === "original") return this.featuredImage.url;

      const transformations = `c_${options.crop},w_${options.width},h_${options.height},q_auto,f_auto`;
      return `${parts[0]}/upload/${transformations}/${parts[1]}`;
    }
  }

  return this.featuredImage.url;
};

// Indexes for better search performance
blogSchema.index({ title: "text", content: "text", tags: "text" });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, publishedAt: -1 });
blogSchema.index({ isFeatured: 1, publishedAt: -1 });
blogSchema.index({ isTrending: 1, publishedAt: -1 });

export default mongoose.model("Blog", blogSchema);
