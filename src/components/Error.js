import { useRouteError } from "react-router-dom";
import Header from "./Header";
const Error = () => {
  const error = useRouteError(); // Get the error details from React Router

  return (
    <div className="error">
      <h1>Oops! Something went wrong.</h1>
      <p>{error?.statusText || error?.message || "Unknown error occurred."}</p>
      <p>Please try again later.</p>
    </div>
  );
};

export default Error;
