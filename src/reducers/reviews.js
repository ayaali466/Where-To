function Reviews(state = {}, action) {
  switch (action.type) {
    case "AllReviews": {
      return { ...state, all_reviews: action.payload };
    }
    case "PlaceReviews": {
      return { ...state, place_reviews: action.payload };
    }
    case "PlaceRating": {
      return { ...state, place_ratings: action.payload };
    }
    case "ReviewDetails": {
      return { ...state, review_details: action.payload };
    }
    case "Reviews": {
      return { ...state, allreviews: action.payload };
    }
    case "AddReview": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
export default Reviews;
