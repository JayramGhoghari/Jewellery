"use client";

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, User, Sparkles, ArrowRight } from 'lucide-react';

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
  helpful: number;
}

const sampleReviews: Review[] = [
  {
    id: 1,
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely stunning piece! The craftsmanship is exceptional and it arrived exactly as shown. Highly recommend!",
    date: "2024-12-20",
    productName: "Diamond Ring",
    helpful: 12,
  },
  {
    id: 2,
    userName: "Michael Chen",
    rating: 4,
    comment: "Beautiful design and great quality. The only minor issue was the delivery time, but the product itself is perfect.",
    date: "2024-12-18",
    productName: "Gold Necklace",
    helpful: 8,
  },
  {
    id: 3,
    userName: "Emily Rodriguez",
    rating: 5,
    comment: "Exceeded my expectations! The jewelry is even more beautiful in person. Customer service was also excellent.",
    date: "2024-12-15",
    productName: "Pearl Earrings",
    helpful: 15,
  },
  {
    id: 4,
    userName: "David Thompson",
    rating: 3,
    comment: "Good quality but the sizing was slightly off. Had to get it adjusted, but overall satisfied with the purchase.",
    date: "2024-12-10",
    productName: "Silver Bracelet",
    helpful: 5,
  },
  {
    id: 5,
    userName: "Lisa Anderson",
    rating: 5,
    comment: "Perfect gift for my mother! She loved it. The packaging was elegant and the piece itself is gorgeous.",
    date: "2024-12-08",
    productName: "Diamond Ring",
    helpful: 20,
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    comment: "",
    productName: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.userName && newReview.rating > 0 && newReview.comment && newReview.productName) {
      const review: Review = {
        id: reviews.length + 1,
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        productName: newReview.productName,
        helpful: 0,
      };
      setReviews([review, ...reviews]);
      setNewReview({ userName: "", rating: 0, comment: "", productName: "" });
      setShowForm(false);
      alert("Thank you for your review!");
    }
  };

  const handleHelpful = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, helpful: review.helpful + 1 } : review
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100,
  }));

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-light tracking-widest text-cyan-400 uppercase">Customer Reviews</span>
          </div>
          <h1 className="text-6xl lg:text-5xl font-light text-white leading-tight tracking-tight mb-4">
            Reviews &
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text lg:text-5xl">
              Ratings
            </span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mt-4"></div>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mt-8 font-light">
            See what our customers are saying about our jewelry collection
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Rating Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-6xl font-light text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(averageRating)
                          ? "fill-cyan-400 text-cyan-400"
                          : "text-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-400 font-light">
                  Based on {reviews.length} reviews
                </p>
              </div>

              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-20">
                      <span className="text-sm text-slate-400 font-light">{rating}</span>
                      <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                    </div>
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 font-light w-8 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="group relative w-full px-8 py-4 rounded-lg font-light uppercase tracking-widest text-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-2 text-slate-900">
                <MessageSquare className="w-4 h-4" />
                Write a Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Right Side - Reviews List */}
          <div className="lg:col-span-2">
            {/* Review Form */}
            {showForm && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-light mb-6 text-white">
                  Write Your Review
                </h2>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-slate-300 mb-2 uppercase tracking-widest">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={newReview.userName}
                      onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                      className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all backdrop-blur-sm"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-slate-300 mb-2 uppercase tracking-widest">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={newReview.productName}
                      onChange={(e) => setNewReview({ ...newReview, productName: e.target.value })}
                      className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all backdrop-blur-sm"
                      placeholder="Product name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-slate-300 mb-2 uppercase tracking-widest">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoveredRating || newReview.rating)
                                ? "fill-cyan-400 text-cyan-400"
                                : "text-slate-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-slate-300 mb-2 uppercase tracking-widest">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-cyan-500/30 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none backdrop-blur-sm"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="group relative flex-1 px-8 py-3 rounded-lg font-light uppercase tracking-widest text-sm overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                      <div className="relative flex items-center justify-center gap-2 text-slate-900">
                        Submit Review
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setNewReview({ userName: "", rating: 0, comment: "", productName: "" });
                      }}
                      className="px-6 py-3 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-400/10 transition-all font-light uppercase tracking-widest text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 shadow-lg shadow-cyan-500/20">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-light text-white text-lg">
                          {review.userName}
                        </h3>
                        <p className="text-sm text-cyan-400 font-light">
                          {review.productName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "fill-cyan-400 text-cyan-400"
                                : "text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 font-light">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4 font-light leading-relaxed">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-light"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-light">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
