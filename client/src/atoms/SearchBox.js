
import _debounce from "lodash/debounce";
import { useCallback, useState } from "react";
const SearchBox = ({
  inputWidth = "",
  id,
  name,
  type,
  maxLength = 256,
  placeholder,
  bg = "bg-lightGrey",
  fontSize = "text-base",
  borderColor = "border-gray-200",
  borderRadius = "rounded",
  className = "",
  value = "",
  onClearSearch,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const debounceFn = useCallback(_debounce(onSearch, 300), []);

  function handleChange(event) {
    setSearchValue(event.target.value);
    debounceFn(event);
  };

  function clearSearch() {
    setSearchValue('');
    onClearSearch()
  }

  return (
    <div className={`relative w-full ${inputWidth}`}>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full border text-gray-900 h-12 px-4 pr-10 outline-none placeholder:text-grey-400 ${bg} ${borderColor} ${borderRadius} ${fontSize} ${className}`}
        maxLength={maxLength}
        onChange={handleChange}
        value={searchValue}
      />
      <div className="absolute top-3.5 right-4">
        {value === "" ? (
          <img
            src="/images/icons/search.svg"
            width="20"
            height="20"
            alt="search"
          />
        ) : (
          <div onClick={clearSearch} className="cursor-pointer">
            <img
              src="/images/icons/close.svg"
              width="20"
              height="20"
              alt="search"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
