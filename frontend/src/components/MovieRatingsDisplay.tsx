import "./MovieRatingsDisplay.css"

interface MovieRatingsProps {
  vote_average: number;
  vote_count: number;
}

function MovieRatings({ vote_average, vote_count }: MovieRatingsProps) {
  // Convert 10-point scale to 5-star scale
  const starRating = (vote_average / 2).toFixed(1);
  const percentage = (vote_average * 10).toFixed(0);
  
  return (
    <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 ratings-container">
      {/* Star Rating */}
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl text-yellow-400">★</span>
          <span className="text-2xl font-bold text-white">{starRating}</span>
          <span className="text-lg text-gray-300">/ 5</span>
        </div>
        
        {/* Vote Count */}
        <div className="flex items-center gap-2 text-gray-300">
          <span className="text-lg grayscale">👥</span>
          <span className="text-sm">
            {vote_count.toLocaleString()} votes
          </span>
        </div>
      </div>
      
      {/* Percentage Score */}
      <div className="flex items-center gap-2">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-lg font-semibold text-white min-w-[3rem]">
          {percentage}%
        </span>
      </div>
    </div>
  );
}

export default MovieRatings;