import React, { useState } from 'react';
import { Star, User, ThumbsUp } from 'lucide-react';
import toast from 'react-hot-toast';

const ReviewSection = () => {
  // Purane mock reviews
  const [reviews, setReviews] = useState([
    { id: 1, author: "Rahul M.", rating: 5, date: "2 days ago", comment: "Ekdum premium feel hai! Display is mind-blowing.", helpful: 12 },
    { id: 2, author: "Sneha K.", rating: 4, date: "1 week ago", comment: "Battery life could be slightly better, but overall a beast of a device.", helpful: 8 },
    { id: 3, author: "Amit S.", rating: 5, date: "2 weeks ago", comment: "Worth every penny. The camera quality is unmatched.", helpful: 24 }
  ]);

  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newReview.trim() === '') {
      toast.error("Please write a review first!");
      return;
    }
    
    const reviewObj = {
      id: Date.now(),
      author: "Vishal G.", // Default author for portfolio demo
      rating: rating,
      date: "Just now",
      comment: newReview,
      helpful: 0
    };

    setReviews([reviewObj, ...reviews]);
    setNewReview('');
    toast.success("Review posted successfully!");
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 border-t border-gray-200 mt-12">
      <h2 className="text-3xl font-black mb-10 text-black">Customer Reviews</h2>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Write a Review Form */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[#f4f4f4] p-8 rounded-3xl sticky top-24">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-black text-black' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
                <textarea 
                  rows="4" 
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="What did you like or dislike about this product?"
                  className="w-full rounded-2xl p-4 border border-gray-300 focus:outline-none focus:border-black resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors mt-2">
                Post Review
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Reviews List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{review.author}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-black text-black' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{review.comment}"</p>
              <button className="flex items-center gap-2 text-sm text-gray-500 font-bold hover:text-black transition-colors">
                <ThumbsUp className="w-4 h-4" /> Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReviewSection;