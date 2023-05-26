import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { toggleModal } from "../../redux/showModal/showModal";
import { deleteDriver } from "../../services/auth.delete";
import { fetchDrivers } from "../../redux/drivers/driverSlice";
import "./confirmation.scss";

const Confirmation = () => {
  const dispatch = useDispatch();
  const driverId = useSelector((state) => state.delete.deleted);

  const closeModal = () => {
    dispatch(toggleModal());
  };

  // Delete Driver
  const handleDelete = () => {
    deleteDriver(driverId);
    dispatch(fetchDrivers());
    dispatch(toggleModal());
  };
  return (
    <div className="overlay fixed top-0 right-0 w-full h-screen z-50">
      <div className="message center bg-white rounded-xl p-6">
        <div className="top-text flex justify-between items-center mb-4">
          <h3 className="text-primary text-xl">تأكيد الحذف</h3>
          <IoCloseOutline className="cursor-pointer" onClick={closeModal} />
        </div>
        <hr />
        <div className="mid-text my-4 p-3 pe-3 sm:pe-10 rounded-lg">
          <p className="text-primary">هل أنت متأكد من حذف هذا السائق؟</p>
        </div>
        <hr />
        <div className="bot-text flex justify-end gap-7 mt-4">
          <button
            className="cancelation rounded-lg bg-white cursor-pointer px-8 py-2 text-primary"
            onClick={closeModal}
          >
            إلغاء
          </button>
          <button
            className="deletion rounded-lg text-white cursor-pointer px-8 py-2"
            onClick={handleDelete}
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
