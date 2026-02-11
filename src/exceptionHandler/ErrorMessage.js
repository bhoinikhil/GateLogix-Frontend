

export const getErrorMessage = (error) => {
  console.log(error.response.data.message);
 
  if (!error.response) return "Network error";
  

  switch (error.response.status) {
     case 400:
      return "Bad request. Please check the entered data";

    case 401:
      return "Unauthorized access. Please login again";

    case 403:
      return "Access denied. You do not have permission";

    case 404:
      return "User not found";

    case 405:
      return "Method not allowed";

    case 408:
      return "Request timeout. Try again";

    case 409:
      return "Conflict occurred. Data already exists";

    case 413:
      return "Payload too large";

    case 415:
      return "Unsupported media type";

    case 422:
      return "Validation failed. Check input fields";

    case 429:
      return "Too many requests. Please wait";

    case 500:
      return "Internal server error";

    case 502:
      return "Bad gateway";

    case 503:
      return "Service unavailable. Try later";

    case 504:
      return "Gateway timeout";

    default:
      return "Something went wrong. Please try again";
  }
};