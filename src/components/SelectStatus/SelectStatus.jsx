import { useDispatch } from "react-redux";
import Select from "react-select";
import { createStatus } from "../../redux/status/status";

const SelectStatus = ({ columnID }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(createStatus({ id: columnID, status: e.value }));
  };
  const options = [
    { value: "contacted", label: "تم التواصل" },
    { value: "unable to contact", label: "تعذر التواصل" },
    { value: "hired as driver", label: "مندوب" },
    { value: "rejected", label: "تم الإستبعاد" },
    { value: "account deactivated", label: "تم تعطيل حسابه" },
  ];
  return (
    <Select
      options={options}
      className="selectbox"
      placeholder="الحالة"
      onChange={handleChange}
    />
  );
};

export default SelectStatus;
