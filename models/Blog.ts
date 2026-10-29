import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, default: '', trim: true },
    content: { type: String, default: '' },
    category: { type: String, default: 'Insights', trim: true },
    author: { type: String, default: 'JP Technology Team', trim: true },
    authorRole: { type: String, default: 'Product & engineering', trim: true },
    tags: { type: [String], default: [] },
    coverTone: { type: String, default: 'orange' },
    coverImage: { type: String, default: '', trim: true },
    readTime: { type: Number, default: 5 },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Common admin/public access patterns: published feed sorted by publish date,
// slug lookups, and newest-first admin lists.
BlogSchema.index({ published: 1, publishedAt: -1 });
BlogSchema.index({ createdAt: -1 });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
