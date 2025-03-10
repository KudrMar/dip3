import { useState } from 'react';

const StarRate = () => {
    const [rating, setRating] = useState(0); 
  
    return (
      <div className="main-successPageMain-rate-stars">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
  
          return (
            <div
              key={starValue}
              className={`main-successPageMain-star-${starValue <= (rating) ? 'full' : 'empty'}`}
              onClick={() => setRating(starValue)}
            >
            </div>
          );
        })}
      </div>
    );
  };

  export default StarRate;