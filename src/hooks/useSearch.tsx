import { useLocation, useNavigate } from "react-router-dom";

export function useSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchHandler = (searchQuery: string) => {
    if (searchQuery !== "") {
      searchParams.set("searchTerm", searchQuery);
    } else if (searchQuery === "") {
      searchParams.delete("searchTerm");
    }
    navigate(`?${searchParams.toString()}`);
  };

  return { searchHandler };
}
