import { Link } from "react-router-dom";

const SearchSuggestion = ({ results, onSelect }) => {
  return (
    <div className="absolute top-full mt-[8px] pt-[8px] w-full bg-white border border-neutral-200 rounded-[8px] shadow-lg z-50">
      {results.length > 0 ? (
        results.map((item) => (
          <Link
            key={item.id}
            to={`/article/${item.id}`}
            onClick={onSelect}
            className="block mx-[6px] px-[12px] py-[10px] hover:bg-neutral-200 hover:rounded-[16px]"
          >
            <p className="text-body-2 text-neutral-600 ">
              {item.title}
            </p>
          </Link>
        ))
      ) : (
        <p className="px-[12px] py-[10px] text-body-2 text-neutral-400">
          No results found
        </p>
      )}
    </div>
  );
};

export default SearchSuggestion;
