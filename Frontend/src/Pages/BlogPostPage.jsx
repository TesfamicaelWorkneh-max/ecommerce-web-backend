import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  ChevronLeft,
  User,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ThumbsUp,
  Send,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // State
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReply, setActiveReply] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch blog post
  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/blog/${slug}`);
      const data = await response.json();

      if (data.success) {
        setPost(data.data);
        setRelatedPosts(data.relatedPosts || []);

        // Check if user has liked this post
        if (user) {
          const hasLiked = data.data.likes?.includes(user._id);
          setLiked(hasLiked);
        }
      } else {
        toast.error("Blog post not found");
        navigate("/blog");
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
      toast.error("Failed to load blog post");
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  // Handle like
  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like posts");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/blog/${post._id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setLiked(data.liked);
        setPost((prev) => ({
          ...prev,
          likes: data.liked
            ? [...(prev.likes || []), user._id]
            : prev.likes.filter((id) => id !== user._id),
        }));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle save
  const handleSave = () => {
    if (!user) {
      toast.error("Please login to save posts");
      navigate("/login");
      return;
    }
    setSaved(!saved);
    toast.success(saved ? "Removed from saved" : "Saved to reading list");
  };

  // Handle share
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title;
    const text = post?.excerpt;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + url)}`
        );
        break;
      default:
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    }
  };

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to comment");
      navigate("/login");
      return;
    }

    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BACKEND_URL}/api/blog/${post._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: commentText.trim(),
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Comment added successfully");
        setCommentText("");
        fetchBlogPost(); // Refresh comments
      } else {
        toast.error(data.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  // Handle reply submission
  const handleSubmitReply = async (commentId) => {
    if (!user) {
      toast.error("Please login to reply");
      navigate("/login");
      return;
    }

    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BACKEND_URL}/api/blog/${post._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: replyText.trim(),
            parentCommentId: commentId,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Reply added successfully");
        setReplyText("");
        setActiveReply(null);
        fetchBlogPost(); // Refresh comments
      } else {
        toast.error(data.message || "Failed to add reply");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to add reply");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch {
      return "";
    }
  };

  // Get reading time
  const getReadTime = (minutes) => {
    if (!minutes) return "1 min read";
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/4 mb-8"></div>
              <div className="h-96 bg-slate-200 rounded-xl mb-8"></div>
              <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Blog
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Featured Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={post.featuredImageOptimized || "/default-blog.jpg"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-sm font-semibold px-4 py-1.5 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {getReadTime(post.readTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{post.views} views</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4">
                  {post.author?.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {post.author?.name?.charAt(0) || "A"}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-lg">
                      {post.author?.name || "Admin"}
                    </div>
                    {post.author?.bio && (
                      <div className="text-white/80 text-sm">
                        {post.author.bio}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="border-b border-slate-200">
              <div className="px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 ${liked ? "text-rose-600" : "text-slate-600 hover:text-rose-600"}`}
                  >
                    <Heart
                      className={`w-5 h-5 ${liked ? "fill-rose-600" : ""}`}
                    />
                    <span>{post.likes?.length || 0}</span>
                  </button>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments?.length || 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSave}
                    className={`p-2 rounded-lg ${saved ? "bg-purple-50 text-purple-600" : "text-slate-600 hover:bg-slate-50"}`}
                    title={saved ? "Remove from saved" : "Save to reading list"}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${saved ? "fill-purple-600" : ""}`}
                    />
                  </button>
                  <div className="relative group">
                    <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-50">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleShare("facebook")}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="Share on Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="p-2 text-sky-500 hover:bg-sky-50 rounded"
                          title="Share on Twitter"
                        >
                          <Twitter className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="p-2 text-blue-700 hover:bg-blue-50 rounded"
                          title="Share on LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare("email")}
                          className="p-2 text-slate-600 hover:bg-slate-50 rounded"
                          title="Share via Email"
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="px-8 py-12">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700 font-medium">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${tag}`}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Author Bio */}
              {post.author && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-start gap-6 bg-slate-50 rounded-xl p-6">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-20 h-20 rounded-full border-4 border-white shadow"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                        {post.author.name?.charAt(0) || "A"}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900">
                          About {post.author.name}
                        </h3>
                        {post.author.socialLinks && (
                          <div className="flex items-center gap-2">
                            {post.author.socialLinks.twitter && (
                              <a
                                href={post.author.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-sky-500"
                              >
                                <Twitter className="w-5 h-5" />
                              </a>
                            )}
                            {post.author.socialLinks.linkedin && (
                              <a
                                href={post.author.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-blue-700"
                              >
                                <Linkedin className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      {post.author.bio && (
                        <p className="text-slate-600 mb-4">{post.author.bio}</p>
                      )}
                      <div className="text-sm text-slate-500">
                        {post.author.email && (
                          <div className="mb-1">Email: {post.author.email}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Comments Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Comments ({post.comments?.length || 0})
              </h2>
            </div>

            {/* Add Comment Form */}
            <div className="mb-8">
              <form onSubmit={handleSubmitComment}>
                <div className="flex items-start gap-4">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                    />
                    <div className="mt-3 flex items-center justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Comments List */}
            {post.comments && post.comments.length > 0 ? (
              <div className="space-y-8">
                {post.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="border-b border-slate-100 pb-8 last:border-0"
                  >
                    <div className="flex items-start gap-4">
                      {comment.user?.avatar ? (
                        <img
                          src={comment.user.avatar}
                          alt={comment.user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          {comment.user?.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-slate-900">
                              {comment.user?.name || "User"}
                            </h4>
                            <div className="text-xs text-slate-500">
                              {formatDate(comment.createdAt)}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              setActiveReply(
                                activeReply === comment._id ? null : comment._id
                              )
                            }
                            className="text-sm text-slate-600 hover:text-slate-900"
                          >
                            Reply
                          </button>
                        </div>
                        <p className="text-slate-700">{comment.text}</p>

                        {/* Reply Form */}
                        {activeReply === comment._id && (
                          <div className="mt-6">
                            <div className="flex items-start gap-3">
                              {user?.avatar ? (
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                                  {user?.name?.charAt(0) || "U"}
                                </div>
                              )}
                              <div className="flex-1">
                                <textarea
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Write a reply..."
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                                  rows="2"
                                />
                                <div className="mt-2 flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      handleSubmitReply(comment._id)
                                    }
                                    className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                                  >
                                    Post Reply
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveReply(null);
                                      setReplyText("");
                                    }}
                                    className="px-4 py-1.5 text-slate-600 text-sm border border-slate-200 rounded-lg hover:bg-slate-50"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-6 ml-10 space-y-6">
                            {comment.replies.map((reply) => (
                              <div
                                key={reply._id}
                                className="border-l-2 border-slate-200 pl-4"
                              >
                                <div className="flex items-start gap-3">
                                  {reply.user?.avatar ? (
                                    <img
                                      src={reply.user.avatar}
                                      alt={reply.user.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                                      {reply.user?.name?.charAt(0) || "U"}
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <h5 className="font-bold text-slate-900 text-sm">
                                        {reply.user?.name || "User"}
                                      </h5>
                                      <div className="text-xs text-slate-500">
                                        {formatDate(reply.createdAt)}
                                      </div>
                                    </div>
                                    <p className="text-slate-700 text-sm">
                                      {reply.text}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No comments yet
                </h3>
                <p className="text-slate-600">
                  Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related._id}
                    to={`/blog/${related.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-purple-200"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={
                          related.featuredImageOptimized || "/default-blog.jpg"
                        }
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">
                          {related.category}
                        </span>
                        <span>•</span>
                        <span>{getReadTime(related.readTime)}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-purple-700 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
