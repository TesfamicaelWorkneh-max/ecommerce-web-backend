// import Blog from "../models/Blog.model.js";
// import User from "../models/User.model.js";
// import { deleteFromCloudinary, extractPublicId } from "../utils/cloudinary.js";

// // @desc    Get all published blog posts
// // @route   GET /api/blog
// // @access  Public
// export const getBlogPosts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 9;
//     const skip = (page - 1) * limit;
//     const category = req.query.category;
//     const tag = req.query.tag;
//     const search = req.query.search;
//     const author = req.query.author;
//     const featured = req.query.featured === "true";
//     const trending = req.query.trending === "true";

//     let query = { status: "published" };

//     // Filter by category
//     if (category) {
//       query.category = category;
//     }

//     // Filter by tag
//     if (tag) {
//       query.tags = tag;
//     }

//     // Filter by author
//     if (author) {
//       query.author = author;
//     }

//     // Filter by featured
//     if (featured) {
//       query.isFeatured = true;
//     }

//     // Filter by trending
//     if (trending) {
//       query.isTrending = true;
//     }

//     // Search in title, content, and tags
//     if (search) {
//       query.$text = { $search: search };
//     }

//     const [blogs, total] = await Promise.all([
//       Blog.find(query)
//         .populate("author", "name email avatar")
//         .sort({ publishedAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean(),
//       Blog.countDocuments(query),
//     ]);

//     // Get featured posts (excluding current results)
//     const featuredPosts = await Blog.find({
//       isFeatured: true,
//       status: "published",
//       _id: { $nin: blogs.map((b) => b._id) },
//     })
//       .populate("author", "name")
//       .sort({ publishedAt: -1 })
//       .limit(3)
//       .select("title slug excerpt featuredImage publishedAt readTime")
//       .lean();

//     // Get trending posts
//     const trendingPosts = await Blog.find({
//       isTrending: true,
//       status: "published",
//       _id: { $nin: blogs.map((b) => b._id) },
//     })
//       .populate("author", "name")
//       .sort({ views: -1 })
//       .limit(3)
//       .select("title slug excerpt featuredImage publishedAt views readTime")
//       .lean();

//     // Get categories with counts
//     const categories = await Blog.aggregate([
//       { $match: { status: "published" } },
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ]);

//     // Get popular tags
//     const tags = await Blog.aggregate([
//       { $match: { status: "published" } },
//       { $unwind: "$tags" },
//       { $group: { _id: "$tags", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//       { $limit: 15 },
//     ]);

//     // Get recent authors
//     const recentAuthors = await Blog.aggregate([
//       { $match: { status: "published" } },
//       { $group: { _id: "$author" } },
//       { $sort: { _id: -1 } },
//       { $limit: 5 },
//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "authorInfo",
//         },
//       },
//       { $unwind: "$authorInfo" },
//       {
//         $project: {
//           _id: "$authorInfo._id",
//           name: "$authorInfo.name",
//           avatar: "$authorInfo.avatar",
//         },
//       },
//     ]);

//     // Add optimized image URLs to blogs
//     const blogsWithImages = blogs.map((blog) => ({
//       ...blog,
//       featuredImageOptimized: blog.featuredImage.url
//         ? blog.featuredImage.url.includes("res.cloudinary.com")
//           ? blog.featuredImage.url.replace(
//               "/upload/",
//               "/upload/c_fill,w_800,h_500,q_auto,f_auto/"
//             )
//           : blog.featuredImage.url
//         : "",
//     }));

//     res.json({
//       success: true,
//       data: blogsWithImages,
//       featuredPosts: featuredPosts.map((post) => ({
//         ...post,
//         featuredImageOptimized: post.featuredImage.url
//           ? post.featuredImage.url.includes("res.cloudinary.com")
//             ? post.featuredImage.url.replace(
//                 "/upload/",
//                 "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
//               )
//             : post.featuredImage.url
//           : "",
//       })),
//       trendingPosts: trendingPosts.map((post) => ({
//         ...post,
//         featuredImageOptimized: post.featuredImage.url
//           ? post.featuredImage.url.includes("res.cloudinary.com")
//             ? post.featuredImage.url.replace(
//                 "/upload/",
//                 "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
//               )
//             : post.featuredImage.url
//           : "",
//       })),
//       categories,
//       tags,
//       recentAuthors,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(total / limit),
//         totalPosts: total,
//         hasNext: page * limit < total,
//         hasPrev: page > 1,
//       },
//     });
//   } catch (error) {
//     console.error("Get blog posts error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Get single blog post by slug
// // @route   GET /api/blog/:slug
// // @access  Public
// export const getBlogPost = async (req, res) => {
//   try {
//     const { slug } = req.params;

//     const blog = await Blog.findOne({
//       slug,
//       status: "published",
//     })
//       .populate("author", "name email bio avatar socialLinks")
//       .populate("comments.user", "name email avatar")
//       .populate("comments.replies.user", "name email avatar")
//       .lean();

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     // Increment view count (using findOneAndUpdate for atomic operation)
//     await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

//     // Mark as trending if views threshold reached
//     if (blog.views + 1 >= 1000 && !blog.isTrending) {
//       await Blog.findByIdAndUpdate(blog._id, { isTrending: true });
//       blog.isTrending = true;
//     }

//     // Add optimized image URL
//     const blogWithImage = {
//       ...blog,
//       featuredImageOptimized: blog.featuredImage.url
//         ? blog.featuredImage.url.includes("res.cloudinary.com")
//           ? blog.featuredImage.url.replace(
//               "/upload/",
//               "/upload/c_fill,w_1200,h_630,q_auto,f_auto/"
//             )
//           : blog.featuredImage.url
//         : "",
//       featuredImageThumbnail: blog.featuredImage.url
//         ? blog.featuredImage.url.includes("res.cloudinary.com")
//           ? blog.featuredImage.url.replace(
//               "/upload/",
//               "/upload/c_fill,w_300,h_200,q_auto,f_auto/"
//             )
//           : blog.featuredImage.url
//         : "",
//     };

//     // Get related posts (by category and tags)
//     const relatedPosts = await Blog.find({
//       _id: { $ne: blog._id },
//       $or: [{ category: blog.category }, { tags: { $in: blog.tags } }],
//       status: "published",
//     })
//       .populate("author", "name")
//       .sort({ publishedAt: -1, views: -1 })
//       .limit(4)
//       .select("title slug excerpt featuredImage publishedAt readTime views")
//       .lean();

//     // Add optimized images to related posts
//     const relatedPostsWithImages = relatedPosts.map((post) => ({
//       ...post,
//       featuredImageOptimized: post.featuredImage.url
//         ? post.featuredImage.url.includes("res.cloudinary.com")
//           ? post.featuredImage.url.replace(
//               "/upload/",
//               "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
//             )
//           : post.featuredImage.url
//         : "",
//     }));

//     res.json({
//       success: true,
//       data: blogWithImage,
//       relatedPosts: relatedPostsWithImages,
//     });
//   } catch (error) {
//     console.error("Get blog post error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Create a new blog post
// // @route   POST /api/blog
// // @access  Private/Admin
// export const createBlogPost = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized to create blog posts",
//       });
//     }

//     const {
//       title,
//       content,
//       excerpt,
//       category,
//       tags,
//       metaTitle,
//       metaDescription,
//       isFeatured,
//       isTrending,
//       status,
//     } = req.body;

//     // Use the image URL from the upload middleware
//     let featuredImage = {};
//     if (req.imageUrl) {
//       featuredImage = {
//         url: req.imageUrl,
//         public_id: req.cloudinaryResult?.public_id || "",
//       };
//     }

//     // Generate slug
//     const slug = title
//       .toLowerCase()
//       .replace(/[^a-zA-Z0-9]/g, "-")
//       .replace(/-+/g, "-")
//       .replace(/^-|-$/g, "");

//     // Calculate read time
//     const wordCount = content.split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / 200);

//     const blogData = {
//       title,
//       slug,
//       content,
//       excerpt: excerpt || content.substring(0, 200) + "...",
//       author: req.user.id,
//       category: category || "lifestyle",
//       tags: tags ? tags.split(",").map((tag) => tag.trim().toLowerCase()) : [],
//       metaTitle: metaTitle || title,
//       metaDescription: metaDescription || excerpt || content.substring(0, 160),
//       isFeatured: isFeatured === "true",
//       isTrending: isTrending === "true",
//       status: status || "draft",
//       readTime,
//       publishedAt: status === "published" ? new Date() : null,
//     };

//     if (req.imageUrl) {
//       blogData.featuredImage = featuredImage;
//     }

//     const blog = await Blog.create(blogData);

//     res.status(201).json({
//       success: true,
//       data: blog,
//       message: "Blog post created successfully",
//     });
//   } catch (error) {
//     console.error("Create blog post error:", error);

//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: "Slug already exists. Please use a different title.",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Update a blog post
// // @route   PUT /api/blog/:id
// // @access  Private/Admin
// export const updateBlogPost = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized to update blog posts",
//       });
//     }

//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     const {
//       title,
//       content,
//       excerpt,
//       category,
//       tags,
//       metaTitle,
//       metaDescription,
//       status,
//       isFeatured,
//       isTrending,
//     } = req.body;

//     // Handle new image upload if provided
//     if (req.imageUrl) {
//       // Delete old image from Cloudinary if exists
//       if (blog.featuredImage.public_id) {
//         await deleteFromCloudinary(blog.featuredImage.public_id);
//       }

//       blog.featuredImage = {
//         url: req.imageUrl,
//         public_id: req.cloudinaryResult?.public_id || "",
//       };
//     }

//     // Update fields
//     if (title) {
//       blog.title = title;
//       // Slug will be updated by pre-save hook
//     }

//     if (content) blog.content = content;
//     if (excerpt) blog.excerpt = excerpt;
//     if (category) blog.category = category;
//     if (tags)
//       blog.tags = tags.split(",").map((tag) => tag.trim().toLowerCase());
//     if (metaTitle) blog.metaTitle = metaTitle;
//     if (metaDescription) blog.metaDescription = metaDescription;
//     if (isFeatured !== undefined) blog.isFeatured = isFeatured === "true";
//     if (isTrending !== undefined) blog.isTrending = isTrending === "true";

//     if (status && status !== blog.status) {
//       blog.status = status;
//       if (status === "published" && !blog.publishedAt) {
//         blog.publishedAt = new Date();
//       }
//     }

//     await blog.save();

//     res.json({
//       success: true,
//       data: blog,
//       message: "Blog post updated successfully",
//     });
//   } catch (error) {
//     console.error("Update blog post error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Delete a blog post
// // @route   DELETE /api/blog/:id
// // @access  Private/Admin
// export const deleteBlogPost = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized to delete blog posts",
//       });
//     }

//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     // Delete featured image from Cloudinary if exists
//     if (blog.featuredImage.public_id) {
//       await deleteFromCloudinary(blog.featuredImage.public_id);
//     }

//     await blog.deleteOne();

//     res.json({
//       success: true,
//       message: "Blog post deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete blog post error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Add a comment to blog post
// // @route   POST /api/blog/:id/comments
// // @access  Private
// export const addComment = async (req, res) => {
//   try {
//     const { text, parentCommentId } = req.body;

//     if (!text || text.trim().length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Comment text is required",
//       });
//     }

//     const blog = await Blog.findById(req.params.id);

//     if (!blog || blog.status !== "published") {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     if (parentCommentId) {
//       // This is a reply to an existing comment
//       const parentComment = blog.comments.id(parentCommentId);
//       if (!parentComment) {
//         return res.status(404).json({
//           success: false,
//           message: "Parent comment not found",
//         });
//       }

//       const reply = {
//         user: req.user.id,
//         text: text.trim(),
//       };

//       parentComment.replies.push(reply);
//     } else {
//       // This is a new top-level comment
//       const comment = {
//         user: req.user.id,
//         text: text.trim(),
//       };

//       blog.comments.push(comment);
//     }

//     await blog.save();

//     // Populate user info for response
//     const updatedBlog = await Blog.findById(req.params.id)
//       .populate("comments.user", "name email avatar")
//       .populate("comments.replies.user", "name email avatar");

//     let newComment;
//     if (parentCommentId) {
//       const parentComment = updatedBlog.comments.id(parentCommentId);
//       newComment = parentComment.replies[parentComment.replies.length - 1];
//     } else {
//       newComment = updatedBlog.comments[updatedBlog.comments.length - 1];
//     }

//     res.status(201).json({
//       success: true,
//       data: newComment,
//       message: parentCommentId
//         ? "Reply added successfully"
//         : "Comment added successfully",
//     });
//   } catch (error) {
//     console.error("Add comment error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Like/Unlike a blog post
// // @route   POST /api/blog/:id/like
// // @access  Private
// export const toggleLike = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);

//     if (!blog || blog.status !== "published") {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     const userId = req.user.id;
//     const likeIndex = blog.likes.indexOf(userId);

//     if (likeIndex === -1) {
//       // Add like
//       blog.likes.push(userId);
//     } else {
//       // Remove like
//       blog.likes.splice(likeIndex, 1);
//     }

//     await blog.save();

//     res.json({
//       success: true,
//       liked: likeIndex === -1,
//       likeCount: blog.likes.length,
//       message: likeIndex === -1 ? "Post liked" : "Post unliked",
//     });
//   } catch (error) {
//     console.error("Toggle like error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Get blog statistics (for admin dashboard)
// // @route   GET /api/blog/stats
// // @access  Private/Admin
// export const getBlogStats = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized",
//       });
//     }

//     const [
//       totalPosts,
//       publishedPosts,
//       draftPosts,
//       totalViews,
//       totalComments,
//       popularPosts,
//       monthlyStats,
//     ] = await Promise.all([
//       Blog.countDocuments(),
//       Blog.countDocuments({ status: "published" }),
//       Blog.countDocuments({ status: "draft" }),
//       Blog.aggregate([
//         { $match: { status: "published" } },
//         { $group: { _id: null, total: { $sum: "$views" } } },
//       ]),
//       Blog.aggregate([{ $unwind: "$comments" }, { $count: "total" }]),
//       Blog.find({ status: "published" })
//         .populate("author", "name")
//         .sort({ views: -1 })
//         .limit(5)
//         .select("title slug views likes comments featuredImage publishedAt"),
//       Blog.aggregate([
//         {
//           $match: {
//             status: "published",
//             publishedAt: {
//               $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
//             },
//           },
//         },
//         {
//           $group: {
//             _id: {
//               year: { $year: "$publishedAt" },
//               month: { $month: "$publishedAt" },
//             },
//             count: { $sum: 1 },
//             views: { $sum: "$views" },
//             likes: { $sum: { $size: "$likes" } },
//             comments: { $sum: { $size: "$comments" } },
//           },
//         },
//         { $sort: { "_id.year": 1, "_id.month": 1 } },
//       ]),
//     ]);

//     // Get category distribution
//     const categoryDistribution = await Blog.aggregate([
//       { $match: { status: "published" } },
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ]);

//     // Get author contribution
//     const authorContribution = await Blog.aggregate([
//       { $match: { status: "published" } },
//       {
//         $group: {
//           _id: "$author",
//           count: { $sum: 1 },
//           totalViews: { $sum: "$views" },
//         },
//       },
//       { $sort: { totalViews: -1 } },
//       { $limit: 10 },
//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "authorInfo",
//         },
//       },
//       { $unwind: "$authorInfo" },
//       {
//         $project: {
//           authorName: "$authorInfo.name",
//           authorEmail: "$authorInfo.email",
//           postCount: "$count",
//           totalViews: "$totalViews",
//         },
//       },
//     ]);

//     res.json({
//       success: true,
//       data: {
//         totalPosts,
//         publishedPosts,
//         draftPosts,
//         totalViews: totalViews[0]?.total || 0,
//         totalComments: totalComments[0]?.total || 0,
//         popularPosts,
//         monthlyStats,
//         categoryDistribution,
//         authorContribution,
//         performance: {
//           avgViewsPerPost: totalViews[0]?.total / publishedPosts || 0,
//           avgCommentsPerPost: totalComments[0]?.total / publishedPosts || 0,
//           engagementRate:
//             (totalComments[0]?.total / totalViews[0]?.total) * 100 || 0,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Get blog stats error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Search blog posts
// // @route   GET /api/blog/search
// // @access  Public
// export const searchBlogPosts = async (req, res) => {
//   try {
//     const { q, limit = 10 } = req.query;

//     if (!q || q.trim().length < 3) {
//       return res.status(400).json({
//         success: false,
//         message: "Search query must be at least 3 characters long",
//       });
//     }

//     const results = await Blog.find(
//       {
//         $text: { $search: q },
//         status: "published",
//       },
//       { score: { $meta: "textScore" } }
//     )
//       .populate("author", "name")
//       .sort({ score: { $meta: "textScore" }, publishedAt: -1 })
//       .limit(parseInt(limit))
//       .select(
//         "title slug excerpt featuredImage publishedAt readTime category tags"
//       )
//       .lean();

//     // Add optimized image URLs
//     const resultsWithImages = results.map((post) => ({
//       ...post,
//       featuredImageOptimized: post.featuredImage.url
//         ? post.featuredImage.url.includes("res.cloudinary.com")
//           ? post.featuredImage.url.replace(
//               "/upload/",
//               "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
//             )
//           : post.featuredImage.url
//         : "",
//     }));

//     res.json({
//       success: true,
//       data: resultsWithImages,
//       query: q,
//       total: results.length,
//     });
//   } catch (error) {
//     console.error("Search blog posts error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Get similar posts
// // @route   GET /api/blog/:id/similar
// // @access  Public
// export const getSimilarPosts = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id)
//       .select("category tags")
//       .lean();

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     const similarPosts = await Blog.find({
//       _id: { $ne: req.params.id },
//       status: "published",
//       $or: [{ category: blog.category }, { tags: { $in: blog.tags } }],
//     })
//       .populate("author", "name")
//       .sort({ publishedAt: -1, views: -1 })
//       .limit(6)
//       .select("title slug excerpt featuredImage publishedAt readTime views")
//       .lean();

//     // Add optimized image URLs
//     const similarPostsWithImages = similarPosts.map((post) => ({
//       ...post,
//       featuredImageOptimized: post.featuredImage.url
//         ? post.featuredImage.url.includes("res.cloudinary.com")
//           ? post.featuredImage.url.replace(
//               "/upload/",
//               "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
//             )
//           : post.featuredImage.url
//         : "",
//     }));

//     res.json({
//       success: true,
//       data: similarPostsWithImages,
//     });
//   } catch (error) {
//     console.error("Get similar posts error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Get blog archive by month/year
// // @route   GET /api/blog/archive
// // @access  Public
// export const getBlogArchive = async (req, res) => {
//   try {
//     const archive = await Blog.aggregate([
//       { $match: { status: "published" } },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$publishedAt" },
//             month: { $month: "$publishedAt" },
//           },
//           count: { $sum: 1 },
//           posts: {
//             $push: {
//               title: "$title",
//               slug: "$slug",
//               publishedAt: "$publishedAt",
//             },
//           },
//         },
//       },
//       { $sort: { "_id.year": -1, "_id.month": -1 } },
//       {
//         $project: {
//           year: "$_id.year",
//           month: "$_id.month",
//           count: 1,
//           posts: { $slice: ["$posts", 5] },
//         },
//       },
//     ]);

//     // Get all tags with counts
//     const tags = await Blog.aggregate([
//       { $match: { status: "published" } },
//       { $unwind: "$tags" },
//       { $group: { _id: "$tags", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ]);

//     res.json({
//       success: true,
//       data: {
//         archive,
//         tags,
//       },
//     });
//   } catch (error) {
//     console.error("Get blog archive error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // @desc    Update blog post status (publish/draft/archive)
// // @route   PATCH /api/blog/:id/status
// // @access  Private/Admin
// export const updateBlogStatus = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized",
//       });
//     }

//     const { status } = req.body;

//     if (!["draft", "published", "archived"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       });
//     }

//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     const updateData = { status };

//     if (status === "published" && !blog.publishedAt) {
//       updateData.publishedAt = new Date();
//     }

//     if (status === "draft") {
//       updateData.publishedAt = null;
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     ).populate("author", "name");

//     res.json({
//       success: true,
//       data: updatedBlog,
//       message: `Blog post ${status} successfully`,
//     });
//   } catch (error) {
//     console.error("Update blog status error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
// // @desc    Get single blog post by ID (for editing)
// // @route   GET /api/blog/post/:id
// // @access  Private/Admin
// export const getBlogPostById = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized",
//       });
//     }

//     const blog = await Blog.findById(req.params.id)
//       .populate("author", "name email")
//       .lean();

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: blog,
//     });
//   } catch (error) {
//     console.error("Get blog post by ID error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
import mongoose from "mongoose";
import Blog from "../models/Blog.model.js";
import User from "../models/User.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

// @desc    Get all published blog posts
// @route   GET /api/blog
// @access  Public
export const getBlogPosts = async (req, res) => {
  console.log("📝 Getting blog posts...");
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(Math.max(1, parseInt(req.query.limit) || 9), 50);
    const skip = (page - 1) * limit;

    const category = req.query.category;
    const tag = req.query.tag;
    const search = req.query.search;
    const author = req.query.author;
    const featured = req.query.featured === "true";
    const trending = req.query.trending === "true";

    let query = { status: "published" };

    // Validate category if provided
    const validCategories = [
      "fashion",
      "lifestyle",
      "beauty",
      "trends",
      "tips",
      "news",
      "style-guide",
    ];
    if (category && validCategories.includes(category)) {
      query.category = category;
    }

    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }

    // Filter by author
    if (author) {
      if (mongoose.Types.ObjectId.isValid(author)) {
        query.author = author;
      }
    }

    // Filter by featured
    if (featured) {
      query.isFeatured = true;
    }

    // Filter by trending
    if (trending) {
      query.isTrending = true;
    }

    // Search using regex
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    console.log("🔍 Query:", query);
    console.log("📊 Page:", page, "Limit:", limit, "Skip:", skip);

    // Get blogs
    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .populate("author", "name email avatar")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query),
    ]);

    console.log(`✅ Found ${blogs.length} blogs out of ${total} total`);

    // Get additional data
    let featuredPosts = [];
    let trendingPosts = [];
    let categories = [];
    let tags = [];
    let recentAuthors = [];

    try {
      // Get featured posts
      featuredPosts = await Blog.find({
        isFeatured: true,
        status: "published",
        _id: { $nin: blogs.map((b) => b._id) },
      })
        .populate("author", "name")
        .sort({ publishedAt: -1 })
        .limit(3)
        .select("title slug excerpt featuredImage publishedAt readTime")
        .lean();

      // Get trending posts
      trendingPosts = await Blog.find({
        isTrending: true,
        status: "published",
      })
        .populate("author", "name")
        .sort({ views: -1 })
        .limit(3)
        .select("title slug excerpt featuredImage publishedAt views readTime")
        .lean();

      // Get categories with counts
      categories = await Blog.aggregate([
        { $match: { status: "published" } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      // Get popular tags
      tags = await Blog.aggregate([
        { $match: { status: "published" } },
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 15 },
      ]);

      // Get recent authors
      recentAuthors = await Blog.aggregate([
        { $match: { status: "published" } },
        { $group: { _id: "$author" } },
        { $sort: { _id: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "authorInfo",
          },
        },
        { $unwind: "$authorInfo" },
        {
          $project: {
            _id: "$authorInfo._id",
            name: "$authorInfo.name",
            avatar: "$authorInfo.avatar",
          },
        },
      ]);
    } catch (error) {
      console.error("⚠️ Error fetching additional data:", error);
    }

    // Add optimized image URLs
    const blogsWithImages = blogs.map((blog) => {
      let featuredImageOptimized = "";
      if (blog.featuredImage?.url) {
        if (blog.featuredImage.url.includes("res.cloudinary.com")) {
          featuredImageOptimized = blog.featuredImage.url.replace(
            "/upload/",
            "/upload/c_fill,w_800,h_500,q_auto,f_auto/"
          );
        } else {
          featuredImageOptimized = blog.featuredImage.url;
        }
      }

      return {
        ...blog,
        featuredImageOptimized,
      };
    });

    res.json({
      success: true,
      data: blogsWithImages,
      featuredPosts: featuredPosts.map((post) => ({
        ...post,
        featuredImageOptimized: post.featuredImage?.url
          ? post.featuredImage.url.includes("res.cloudinary.com")
            ? post.featuredImage.url.replace(
                "/upload/",
                "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
              )
            : post.featuredImage.url
          : "",
      })),
      trendingPosts: trendingPosts.map((post) => ({
        ...post,
        featuredImageOptimized: post.featuredImage?.url
          ? post.featuredImage.url.includes("res.cloudinary.com")
            ? post.featuredImage.url.replace(
                "/upload/",
                "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
              )
            : post.featuredImage.url
          : "",
      })),
      categories: categories || [],
      tags: tags || [],
      recentAuthors: recentAuthors || [],
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("❌ Get blog posts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getBlogPost = async (req, res) => {
  console.log("📝 Getting blog post by slug:", req.params.slug);
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug,
      status: "published",
    })
      .populate("author", "name email bio avatar socialLinks")
      .populate("comments.user", "name email avatar")
      .populate("comments.replies.user", "name email avatar")
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Increment view count
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    // Add optimized image URL
    let featuredImageOptimized = "";
    let featuredImageThumbnail = "";

    if (blog.featuredImage?.url) {
      if (blog.featuredImage.url.includes("res.cloudinary.com")) {
        featuredImageOptimized = blog.featuredImage.url.replace(
          "/upload/",
          "/upload/c_fill,w_1200,h_630,q_auto,f_auto/"
        );
        featuredImageThumbnail = blog.featuredImage.url.replace(
          "/upload/",
          "/upload/c_fill,w_300,h_200,q_auto,f_auto/"
        );
      } else {
        featuredImageOptimized = blog.featuredImage.url;
        featuredImageThumbnail = blog.featuredImage.url;
      }
    }

    const blogWithImage = {
      ...blog,
      featuredImageOptimized,
      featuredImageThumbnail,
    };

    // Get related posts
    let relatedPosts = [];
    try {
      relatedPosts = await Blog.find({
        _id: { $ne: blog._id },
        $or: [{ category: blog.category }, { tags: { $in: blog.tags } }],
        status: "published",
      })
        .populate("author", "name")
        .sort({ publishedAt: -1, views: -1 })
        .limit(4)
        .select("title slug excerpt featuredImage publishedAt readTime views")
        .lean();
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }

    // Add optimized images to related posts
    const relatedPostsWithImages = relatedPosts.map((post) => ({
      ...post,
      featuredImageOptimized: post.featuredImage?.url
        ? post.featuredImage.url.includes("res.cloudinary.com")
          ? post.featuredImage.url.replace(
              "/upload/",
              "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
            )
          : post.featuredImage.url
        : "",
    }));

    res.json({
      success: true,
      data: blogWithImage,
      relatedPosts: relatedPostsWithImages,
    });
  } catch (error) {
    console.error("❌ Get blog post error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Create a new blog post
// @route   POST /api/blog
// @access  Private/Admin
export const createBlogPost = async (req, res) => {
  console.log("📝 Creating new blog post");
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to create blog posts",
      });
    }

    const {
      title,
      content,
      excerpt,
      category,
      tags,
      metaTitle,
      metaDescription,
      isFeatured,
      isTrending,
      status,
    } = req.body;

    // Use the image URL from the upload middleware
    let featuredImage = {};
    if (req.imageUrl) {
      featuredImage = {
        url: req.imageUrl,
        public_id: req.cloudinaryResult?.public_id || "",
      };
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Calculate read time
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const blogData = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 200) + "...",
      author: req.user.id,
      category: category || "lifestyle",
      tags: tags ? tags.split(",").map((tag) => tag.trim().toLowerCase()) : [],
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt || content.substring(0, 160),
      isFeatured: isFeatured === "true",
      isTrending: isTrending === "true",
      status: status || "draft",
      readTime,
      publishedAt: status === "published" ? new Date() : null,
    };

    if (req.imageUrl) {
      blogData.featuredImage = featuredImage;
    }

    console.log("📝 Blog data:", blogData);

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      data: blog,
      message: "Blog post created successfully",
    });
  } catch (error) {
    console.error("❌ Create blog post error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Please use a different title.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updateBlogPost = async (req, res) => {
  console.log("📝 Updating blog post:", req.params.id);
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update blog posts",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    const {
      title,
      content,
      excerpt,
      category,
      tags,
      metaTitle,
      metaDescription,
      status,
      isFeatured,
      isTrending,
    } = req.body;

    // Handle new image upload if provided
    if (req.imageUrl) {
      // Delete old image from Cloudinary if exists
      if (blog.featuredImage.public_id) {
        try {
          await deleteFromCloudinary(blog.featuredImage.public_id);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }

      blog.featuredImage = {
        url: req.imageUrl,
        public_id: req.cloudinaryResult?.public_id || "",
      };
    }

    // Update fields
    if (title) {
      blog.title = title;
    }

    if (content) blog.content = content;
    if (excerpt) blog.excerpt = excerpt;
    if (category) blog.category = category;
    if (tags)
      blog.tags = tags.split(",").map((tag) => tag.trim().toLowerCase());
    if (metaTitle) blog.metaTitle = metaTitle;
    if (metaDescription) blog.metaDescription = metaDescription;
    if (isFeatured !== undefined) blog.isFeatured = isFeatured === "true";
    if (isTrending !== undefined) blog.isTrending = isTrending === "true";

    if (status && status !== blog.status) {
      blog.status = status;
      if (status === "published" && !blog.publishedAt) {
        blog.publishedAt = new Date();
      }
    }

    await blog.save();

    res.json({
      success: true,
      data: blog,
      message: "Blog post updated successfully",
    });
  } catch (error) {
    console.error("❌ Update blog post error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deleteBlogPost = async (req, res) => {
  console.log("📝 Deleting blog post:", req.params.id);
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete blog posts",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Delete featured image from Cloudinary if exists
    if (blog.featuredImage.public_id) {
      try {
        await deleteFromCloudinary(blog.featuredImage.public_id);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete blog post error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Add a comment to blog post
// @route   POST /api/blog/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  console.log("📝 Adding comment to blog post:", req.params.id);
  try {
    const { text, parentCommentId } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    if (parentCommentId) {
      // This is a reply to an existing comment
      const parentComment = blog.comments.id(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({
          success: false,
          message: "Parent comment not found",
        });
      }

      const reply = {
        user: req.user.id,
        text: text.trim(),
        createdAt: new Date(),
      };

      parentComment.replies.push(reply);
    } else {
      // This is a new top-level comment
      const comment = {
        user: req.user.id,
        text: text.trim(),
        createdAt: new Date(),
      };

      blog.comments.push(comment);
    }

    await blog.save();

    // Populate user info for response
    const updatedBlog = await Blog.findById(req.params.id)
      .populate("comments.user", "name email avatar")
      .populate("comments.replies.user", "name email avatar");

    let newComment;
    if (parentCommentId) {
      const parentComment = updatedBlog.comments.id(parentCommentId);
      newComment = parentComment.replies[parentComment.replies.length - 1];
    } else {
      newComment = updatedBlog.comments[updatedBlog.comments.length - 1];
    }

    res.status(201).json({
      success: true,
      data: newComment,
      message: parentCommentId
        ? "Reply added successfully"
        : "Comment added successfully",
    });
  } catch (error) {
    console.error("❌ Add comment error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Like/Unlike a blog post
// @route   POST /api/blog/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  console.log("📝 Toggling like for blog post:", req.params.id);
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    const userId = req.user.id;
    const likeIndex = blog.likes.indexOf(userId);

    if (likeIndex === -1) {
      // Add like
      blog.likes.push(userId);
    } else {
      // Remove like
      blog.likes.splice(likeIndex, 1);
    }

    await blog.save();

    res.json({
      success: true,
      liked: likeIndex === -1,
      likeCount: blog.likes.length,
      message: likeIndex === -1 ? "Post liked" : "Post unliked",
    });
  } catch (error) {
    console.error("❌ Toggle like error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get blog statistics (for admin dashboard)
// @route   GET /api/blog/stats/all
// @access  Private/Admin
export const getBlogStats = async (req, res) => {
  console.log("📈 Getting blog statistics");
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    let totalPosts = 0;
    let publishedPosts = 0;
    let draftPosts = 0;
    let totalViews = 0;
    let totalComments = 0;
    let popularPosts = [];
    let monthlyStats = [];
    let categoryDistribution = [];
    let authorContribution = [];

    try {
      // Get basic counts
      totalPosts = await Blog.countDocuments();
      publishedPosts = await Blog.countDocuments({ status: "published" });
      draftPosts = await Blog.countDocuments({ status: "draft" });

      // Get total views
      const viewsResult = await Blog.aggregate([
        { $match: { status: "published" } },
        { $group: { _id: null, total: { $sum: "$views" } } },
      ]);
      totalViews = viewsResult[0]?.total || 0;

      // Get total comments
      const commentsResult = await Blog.aggregate([
        { $match: { status: "published" } },
        { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } },
        { $count: "total" },
      ]);
      totalComments = commentsResult[0]?.total || 0;

      // Get popular posts
      popularPosts = await Blog.find({ status: "published" })
        .populate("author", "name")
        .sort({ views: -1 })
        .limit(5)
        .select(
          "title slug views likes comments featuredImage publishedAt category"
        );

      // Get monthly stats
      monthlyStats = await Blog.aggregate([
        {
          $match: {
            status: "published",
            publishedAt: { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$publishedAt" },
              month: { $month: "$publishedAt" },
            },
            count: { $sum: 1 },
            views: { $sum: "$views" },
            likes: { $sum: { $size: "$likes" } },
            comments: { $sum: { $size: "$comments" } },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      // Get category distribution
      categoryDistribution = await Blog.aggregate([
        { $match: { status: "published" } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      // Get author contribution
      authorContribution = await Blog.aggregate([
        { $match: { status: "published" } },
        {
          $group: {
            _id: "$author",
            count: { $sum: 1 },
            totalViews: { $sum: "$views" },
          },
        },
        { $sort: { totalViews: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "authorInfo",
          },
        },
        { $unwind: "$authorInfo" },
        {
          $project: {
            authorName: "$authorInfo.name",
            authorEmail: "$authorInfo.email",
            postCount: "$count",
            totalViews: "$totalViews",
          },
        },
      ]);
    } catch (error) {
      console.error("⚠️ Error fetching stats:", error);
    }

    res.json({
      success: true,
      data: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews,
        totalComments,
        popularPosts: popularPosts || [],
        monthlyStats: monthlyStats || [],
        categoryDistribution: categoryDistribution || [],
        authorContribution: authorContribution || [],
        performance: {
          avgViewsPerPost:
            publishedPosts > 0 ? (totalViews || 0) / publishedPosts : 0,
          avgCommentsPerPost:
            publishedPosts > 0 ? (totalComments || 0) / publishedPosts : 0,
          engagementRate:
            totalViews > 0 ? ((totalComments || 0) / totalViews) * 100 : 0,
        },
      },
    });
  } catch (error) {
    console.error("❌ Get blog stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Search blog posts
// @route   GET /api/blog/search
// @access  Public
export const searchBlogPosts = async (req, res) => {
  console.log("🔍 Searching blog posts:", req.query.q);
  try {
    const { q, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters long",
      });
    }

    const searchQuery = q.trim();

    // Use regex search
    const results = await Blog.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } },
      ],
      status: "published",
    })
      .populate("author", "name")
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .select(
        "title slug excerpt featuredImage publishedAt readTime category tags"
      )
      .lean();

    // Add optimized image URLs
    const resultsWithImages = results.map((post) => ({
      ...post,
      featuredImageOptimized: post.featuredImage?.url
        ? post.featuredImage.url.includes("res.cloudinary.com")
          ? post.featuredImage.url.replace(
              "/upload/",
              "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
            )
          : post.featuredImage.url
        : "",
    }));

    res.json({
      success: true,
      data: resultsWithImages,
      query: searchQuery,
      total: results.length,
    });
  } catch (error) {
    console.error("❌ Search blog posts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get similar posts
// @route   GET /api/blog/:id/similar
// @access  Public
export const getSimilarPosts = async (req, res) => {
  console.log("📝 Getting similar posts for:", req.params.id);
  try {
    const blog = await Blog.findById(req.params.id)
      .select("category tags")
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    const similarPosts = await Blog.find({
      _id: { $ne: req.params.id },
      status: "published",
      $or: [{ category: blog.category }, { tags: { $in: blog.tags || [] } }],
    })
      .populate("author", "name")
      .sort({ publishedAt: -1, views: -1 })
      .limit(6)
      .select("title slug excerpt featuredImage publishedAt readTime views")
      .lean();

    // Add optimized image URLs
    const similarPostsWithImages = similarPosts.map((post) => ({
      ...post,
      featuredImageOptimized: post.featuredImage?.url
        ? post.featuredImage.url.includes("res.cloudinary.com")
          ? post.featuredImage.url.replace(
              "/upload/",
              "/upload/c_fill,w_400,h_250,q_auto,f_auto/"
            )
          : post.featuredImage.url
        : "",
    }));

    res.json({
      success: true,
      data: similarPostsWithImages,
    });
  } catch (error) {
    console.error("❌ Get similar posts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get blog archive by month/year
// @route   GET /api/blog/archive
// @access  Public
export const getBlogArchive = async (req, res) => {
  console.log("📝 Getting blog archive");
  try {
    const archive = await Blog.aggregate([
      { $match: { status: "published", publishedAt: { $exists: true } } },
      {
        $group: {
          _id: {
            year: { $year: "$publishedAt" },
            month: { $month: "$publishedAt" },
          },
          count: { $sum: 1 },
          posts: {
            $push: {
              title: "$title",
              slug: "$slug",
              publishedAt: "$publishedAt",
            },
          },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
          posts: { $slice: ["$posts", 5] },
        },
      },
    ]);

    // Get all tags with counts
    const tags = await Blog.aggregate([
      { $match: { status: "published" } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        archive: archive || [],
        tags: tags || [],
      },
    });
  } catch (error) {
    console.error("❌ Get blog archive error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Update blog post status (publish/draft/archive)
// @route   PATCH /api/blog/:id/status
// @access  Private/Admin
export const updateBlogStatus = async (req, res) => {
  console.log("📝 Updating blog status for:", req.params.id);
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const { status } = req.body;

    if (!["draft", "published", "archived"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    const updateData = { status };

    if (status === "published" && !blog.publishedAt) {
      updateData.publishedAt = new Date();
    }

    if (status === "draft") {
      updateData.publishedAt = null;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("author", "name");

    res.json({
      success: true,
      data: updatedBlog,
      message: `Blog post ${status} successfully`,
    });
  } catch (error) {
    console.error("❌ Update blog status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get single blog post by ID (for editing)
// @route   GET /api/blog/post/:id
// @access  Private/Admin
export const getBlogPostById = async (req, res) => {
  console.log("📝 Getting blog post by ID:", req.params.id);
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("❌ Get blog post by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
