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
    setRating(5); // NAYA: Submit ke baad rating reset karna acchi practice hai
    toast.success("Review posted successfully!");
  };

  return (
    // NAYA: Dark mode border color aur transition
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 border-t border-gray-200 dark:border-gray-800/60 transition-colors duration-300">
      
      {/* NAYA: Premium Typography */}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-black dark:text-white transition-colors duration-300">
        Customer Reviews
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Write a Review Form */}
        <div className="w-full lg:w-1/3">
          {/* NAYA: Dark mode background and adjusted sticky top position for taller navbar */}
          <div className="bg-[#f4f4f4] dark:bg-[#1a1a1a] p-8 md:p-10 rounded-3xl sticky top-28 transition-colors duration-300 shadow-sm border border-transparent dark:border-gray-800/50">
            <h3 className="text-xl font-bold mb-6 text-black dark:text-white">Write a Review</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 tracking-wide uppercase">Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform duration-200"
                    >
                      {/* NAYA: Stars adapt to dark mode (white in dark mode, black in light mode) */}
                      <Star className={`w-7 h-7 transition-colors ${
                        star <= rating 
                          ? 'fill-black text-black dark:fill-white dark:text-white' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 tracking-wide uppercase">Your Review</label>
                {/* NAYA: Polished Textarea with custom focus borders for both themes */}
                <textarea 
                  rows="4" 
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="What did you like or dislike about this product?"
                  className="w-full rounded-2xl p-4 bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-700 text-black dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none transition-all duration-300 shadow-inner"
                ></textarea>
              </div>
              
              <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 mt-2 shadow-lg">
                Post Review
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Reviews List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {reviews.map((review) => (
            // NAYA: Premium Card styling for reviews
            <div key={review.id} className="bg-white dark:bg-[#151515] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up">
              
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-[#222] rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-inner">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-black dark:text-white leading-tight">{review.author}</h4>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{review.date}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 bg-gray-50 dark:bg-[#111] px-3 py-1.5 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${
                      i < review.rating 
                        ? 'fill-black text-black dark:fill-white dark:text-white' 
                        : 'text-gray-200 dark:text-gray-700'
                    }`} />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
                "{review.comment}"
              </p>
              
              <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-bold hover:text-black dark:hover:text-white transition-colors duration-200 group">
                <ThumbsUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> 
                Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReviewSection;