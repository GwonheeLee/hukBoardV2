import { UsersIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HTMLInputTypeAttribute, KeyboardEvent, useState } from "react";

interface IProps {
  placeholder: string;
  inputType: HTMLInputTypeAttribute;
  inputId: string;
  inputClassName?: string;
  buttonClassName?: string;
  onClick?: (keyword: string) => void;
}
const SearchInput: React.FC<IProps> = ({
  placeholder,
  inputType,
  inputId,
  onClick,
  inputClassName = "",
  buttonClassName = "",
}) => {
  const [keyword, setKeyword] = useState("");
  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onClick && onClick(keyword);
    }
  };
  return (
    <div>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type={inputType}
            name={inputId}
            id={inputId}
            className={`block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-main-color focus:ring-main-color sm:text-sm ${inputClassName}`}
            placeholder={placeholder}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
        <button
          type="button"
          className={`relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100  ${buttonClassName}`}
          onClick={() => {
            onClick && onClick(keyword);
          }}
        >
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
