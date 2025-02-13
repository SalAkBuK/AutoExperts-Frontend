export const formatPrice = (price) => {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(2) + " Crore";
    } else if (price >= 100000) {
      return (price / 100000).toFixed(2) + " Lac";
    } else {
      return price.toLocaleString("en-IN"); // Formats in Indian numbering system
    }
  };