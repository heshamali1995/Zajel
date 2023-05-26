import { useDispatch } from "react-redux";
import { createText } from "../../redux/textarea/textarea";

const Textarea = ({ columnID }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(createText({ id: columnID, notes: e.target.value }));
  };
  return <textarea onKeyUp={handleChange}></textarea>;
};

export default Textarea;
