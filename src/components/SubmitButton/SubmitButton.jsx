import { useSelector } from "react-redux";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SubmitButton = ({ columnID }) => {
  const notes = useSelector((state) => state.text);
  const status = useSelector((state) => state.status);
  const note = notes?.find((elem) => elem.id === columnID);
  const state = status?.find((elem) => elem.id === columnID);
  return (
    <IoMdCheckmarkCircleOutline
      className="send text-button"
      style={{
        opacity: note || state ? "1" : "0.5",
        cursor: note || state ? "pointer" : "",
        pointerEvents: note || state ? "all" : "none",
      }}
    />
  );
};

export default SubmitButton;
