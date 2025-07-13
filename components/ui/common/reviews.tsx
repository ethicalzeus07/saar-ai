"use client";

import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import BgGradient from './bg-gradient';
import { 
  MotionSection, 
  MotionDiv, 
  MotionH2, 
  MotionH3, 
  MotionP, 
  MotionSpan,
  MotionButton,
  fadeInUp,
  scaleIn,
  staggerContainer,
  fadeInLeft,
  fadeInRight
} from './motion-wrapper';

// Define the review structure
type Review = {
  id: string;
  name: string;
  relationship: string;
  rating: number;
  comment: string;
  avatar: string;
};

// Fake reviews from family members
const familyReviews: Review[] = [

    {
      "id": "1",
      "name": "Yashika",
      "relationship": "Friend",
      "rating": 5,
      "avatar": "👧",
      "comment": "Finals week = 200 pages to read, but your 6-card reel turned it into a 60-second scroll. I actually enjoyed revising (shocking, I know). Those little emoji call-outs kept the key points stuck in my head—chef's kiss!"
    },
    {
      "id": "2",
      "name": "Aadi Pathak",
      "relationship": "Friend",
      "rating": 5,
      "avatar": "👨",
      "comment": "Running from meeting to meeting, I just flick through your summaries like Insta stories—7 cards, boom, done. The emoji's flag what matters, so I walk into the next call sounding like I read the whole report. Total productivity hack!"
    },
    {
      "id": "3",
      "name": "Deepesh Singh",
      "relationship": "Uncle",
      "rating": 5,
      "avatar": "👨",
      "comment": "I can swipe through my assistant's long meeting notes in minutes. The reel-style cards highlight every action item with emoji's, so nothing slips through the cracks. Can't recommend it enough!"
    }
  
  
  
];

// Review card component
function ReviewCard({ avatar, name, relationship, rating, comment }: Review) {
  return (
    <MotionDiv 
      className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
    >
      <MotionDiv className="flex items-start space-x-3 sm:space-x-4">
        <MotionDiv className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl">{avatar}</MotionDiv>
        <MotionDiv className="flex-1">
          <MotionDiv className="flex items-center justify-between mb-2 sm:mb-3">
            <MotionDiv>
              <MotionP className="text-xs sm:text-sm font-semibold text-gray-900">{name}</MotionP>
              <MotionP className="text-xs sm:text-sm text-primary font-medium">{relationship}</MotionP>
            </MotionDiv>
            <MotionDiv className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </MotionDiv>
          </MotionDiv>
          <MotionP className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">{comment}</MotionP>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}

// Leave review form component
function LeaveReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ rating, comment, name, relationship });
    // Reset form fields after submit
    setRating(0);
    setComment('');
    setName('');
    setRelationship('');
  };

  return (
    <MotionDiv 
      className="bg-gradient-to-br from-primary/5 to-yellow-400/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-primary/20"
      variants={scaleIn}
    >
      <MotionDiv className="text-center mb-2 sm:mb-3 lg:mb-4">
        <MotionDiv className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full mb-2 sm:mb-3 lg:mb-4">
          <Send className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
        </MotionDiv>
        <MotionH3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Share Your Experience</MotionH3>
        <MotionP className="text-xs sm:text-sm lg:text-base text-gray-600">Help others discover the power of AI-powered document summaries</MotionP>
      </MotionDiv>
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <MotionDiv>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </MotionDiv>
        <MotionDiv>
          <input
            type="text"
            placeholder="Your relationship (e.g., Student, Professional)"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </MotionDiv>
        <MotionDiv>
          <textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            required
          />
        </MotionDiv>
        <MotionDiv className="flex items-center space-x-2">
          <MotionSpan className="text-sm text-gray-600">Rating:</MotionSpan>
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              className="focus:outline-none"
            >
              <Star
                className={`w-5 h-5 ${
                  i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                } hover:text-yellow-400 transition-colors`}
              />
            </button>
          ))}
        </MotionDiv>
        <MotionDiv>
          <MotionButton
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-4 h-4" />
            <MotionSpan>Submit Review</MotionSpan>
          </MotionButton>
        </MotionDiv>
      </form>
    </MotionDiv>
  );
}

// Main component
export default function ReviewsSection() {
  return (
    <BgGradient>
      <MotionSection 
        className="relative overflow-hidden bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <MotionDiv className="py-4 sm:py-6 lg:py-8 xl:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv className="text-center mb-4 sm:mb-6 lg:mb-8" variants={fadeInUp}>
            <MotionH3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold text-primary mb-1 sm:mb-2 tracking-wider uppercase">
              Testimonials
            </MotionH3>
            <MotionH2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center mb-2 sm:mb-3 lg:mb-4 leading-tight">
              Loved by families everywhere
            </MotionH2>
            <MotionP className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See what our family members and users are saying about their experience with our AI-powered document summarizer
            </MotionP>
          </MotionDiv>
          
          <MotionDiv className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start" variants={staggerContainer}>
            {/* Family Reviews Column */}
            <MotionDiv variants={fadeInLeft}>
              <MotionH3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 text-center lg:text-left">
                What Our Family Says
              </MotionH3>
              <MotionDiv className="space-y-3 sm:space-y-4">
                {familyReviews.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </MotionDiv>
            </MotionDiv>
            
            {/* Leave Review Column */}
            <MotionDiv variants={fadeInRight}>
              <LeaveReviewForm />
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </MotionSection>
    </BgGradient>
  );
} 