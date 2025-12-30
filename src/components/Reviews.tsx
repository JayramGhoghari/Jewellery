"use client";

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, User } from 'lucide-react';

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-slate-900 dark:text-slate-50 mb-4">
            Reviews & Ratings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            See what our customers are saying about our jewelry collection
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Rating Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-light text-slate-900 dark:text-slate-50 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Based on {reviews.length} reviews
                </p>
              </div>

              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-20">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 w-8 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg font-light tracking-wide hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              Write a Review
            </button>
          </div>

          {/* Right Side - Reviews List */}
          <div className="lg:col-span-2">
            {/* Review Form */}
            {showForm && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-light mb-4 text-slate-900 dark:text-slate-50">
                  Write Your Review
                </h2>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={newReview.userName}
                      onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={newReview.productName}
                      onChange={(e) => setNewReview({ ...newReview, productName: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoveredRating || newReview.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300 dark:text-slate-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-6 rounded-lg font-light tracking-wide hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setNewReview({ userName: "", rating: 0, comment: "", productName: "" });
                      }}
                      className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
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
                  className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-medium">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-50">
                          {review.userName}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
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
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300 dark:text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
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

