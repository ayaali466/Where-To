function Wishlists(state = {}, action) {
  switch (action.type) {
    case "AllWishlists": {
      return action.payload;
    }
    case "WishlistDetails": {
      return { ...state, wishlist_details: action.payload };
    }
    case "deleteByIDwithtoken": {
      return action.payload;
    }
    case "deleteByID": {
      return action.payload;
    }
    case "addWishlist": {
      return { ...state, addWishlist: action.payload };
    }
    case "Wishlist_By_user": {
      return { ...state, wishlistsByUserId: action.payload };
    }
    default: {
      return state;
    }
  }
}

export default Wishlists;
