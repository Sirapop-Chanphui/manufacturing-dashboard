import { Link } from "react-router-dom";

const SearchSuggestion = ({ suggestions, onClick }) => {
  const searchNumber = 12;
  const topSuggestions = suggestions.slice(0, searchNumber);
  return (
    <div className="absolute top-full mt-[8px] pt-[8px] w-full bg-white border border-neutral-200 rounded-[8px] shadow-lg z-50 max-h-[300px] min-h-[90px] overflow-y-auto">


      { topSuggestions.length > 0 ? (
        topSuggestions.map((item) => (
          <Link
            key={item.id}
            to={`/article/${item.id}`}
            onClick={onClick}
            className="block mx-[6px] px-[12px] py-[10px] hover:bg-neutral-200 hover:rounded-[16px]"
          >
            <p className="text-body-2 text-neutral-600">
              {item.title}
            </p>
          </Link>
        ))
      ) : (
        <p className="px-[12px] py-[20px] text-center text-body-2 text-neutral-400">
          No result found
        </p>
      )}
    </div>
  );
};

export default SearchSuggestion;
