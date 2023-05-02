import { useState } from "react";
import { useAsyncDebounce } from "react-table";

const FilterNames = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const handleChange = useAsyncDebounce((val) => {
    setFilter(val);
  }, 500);
  return (
    <>
      <input
        type="text"
        className="bg-main-bg outline-none w-full"
        placeholder="إبحث عن اسم"
        name="search"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
      />
    </>
  );
};

export default FilterNames;
