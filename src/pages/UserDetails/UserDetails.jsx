import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./details.scss";
// Components
import Aside from "../../components/Shared/Aside/Aside";
import Navbar from "../../components/Shared/Navbar/Navbar";
import { fetchDetails } from "../../redux/singleDriver/singleDriverSlice";
import { removeStatus } from "../../redux/status/status";
import { removeText } from "../../redux/textarea/textarea";
import Spinner from "../../components/Spinner/Spinner";
// Images
import LeftArrow from "../../assets/images/details/left-arrow.png";

const UserDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.details);

  // Fetch The Driver Details
  useEffect(() => {
    dispatch(fetchDetails(id));
    if (location.pathname !== "/") {
      dispatch(removeStatus());
      dispatch(removeText());
    }
  }, []);

  // Date Formatting Handler
  const handleDate = () => {
    const date = new Date(state.data?.data?.dateOfBirth);
    if (date.toLocaleDateString() !== "Invalid Date") {
      const fullYear = date.getFullYear();
      const month = date.getMonth() + 1;
      const days = date.getDate();
      const dateFormat = `${days} / ${month} / ${fullYear}`;
      return dateFormat;
    } else {
      const arabicDate = state?.data?.data?.dateOfBirth;
      return arabicDate?.replace(/-/g, " / ");
    }
  };

  // Driver Information
  const userInfo = [
    { id: 1, name: "الإسم", text: state.data?.data?.codeName },
    {
      id: 2,
      name: "رقم التليفون",
      text: state.data?.data?.phoneNumber,
      left: true,
    },
    { id: 3, name: "رقم البطاقة", text: state.data?.data?.nationalID },
    {
      id: 4,
      name: "البريد الإلكتروني",
      text: state.data?.data?.email,
      left: true,
    },
    { id: 5, name: "نوع المركبة", text: state.data?.data?.vehicleType },
    {
      id: 6,
      name: "تاريخ الميلاد",
      text: handleDate(),
      left: true,
    },
    {
      id: 7,
      name: "خبرة المندوب",
      text: state.data?.data?.experience,
    },
  ];
  return (
    <section className="flex gap-2 sm:gap-10 bg-main-bg min-h-screen">
      <Aside />
      <div className="flex-grow pt-5">
        <Navbar id={id} />
        {state.loading ? (
          <Spinner />
        ) : state.data ? (
          <div className="user-details pt-6">
            {/* User Path */}
            <div className="user-path hidden sm:flex items-center mb-6">
              <p className="relative text-secondary ml-8">عرض المتقدم</p>
              <p
                className="text-secondary ml-4 text-sm cursor-pointer"
                onClick={() => navigate("/")}
              >
                الصفحة الرئيسية
              </p>
              <div className="ml-4">
                <img src={LeftArrow} alt="arrow" />
              </div>
              <p className="text-button text-sm">صفحة المتقدم </p>
            </div>
            {/* User Info */}
            <div className="user-info bg-white">
              {/* Image And Voice */}
              <div className="user-image flex flex-col sm:flex-row items-center gap-10 mb-8 flex-wrap">
                <div className="image rounded-lg">
                  <img
                    src={state?.data?.data?.imageUrl}
                    alt="user"
                    className="w-full h-full object-fill rounded-lg"
                  />
                </div>
                <div className="voice px-2 sm:px-6 py-2 bg-button rounded-md flex items-center gap-2 justify-center flex-wrap">
                  <div className="voice-image">
                    <img
                      src={state?.data?.data?.imageUrl}
                      alt="User"
                      className="rounded-full w-full h-full"
                    />
                  </div>
                  <div className="voicenote flex items-center gap-2 grow sm:grow-0">
                    <audio
                      src={state?.data?.data?.voiceRecord}
                      controls
                      className="grow sm:grow-0"
                    />
                  </div>
                </div>
              </div>
              {/* Form */}
              <div className="user-form md:grid md:grid-cols-2 md:gap-8 mb-8">
                {userInfo.map((user) => {
                  return (
                    <div className="info mb-8 md:mb-0" key={user.id}>
                      <p className="text-sm text-secondary mb-2">{user.name}</p>
                      <div className="px-2 py-4">
                        <p
                          dir={`${user.left ? "ltr" : ""}`}
                          className={`text-sm text-secondary ${
                            user.left ? "text-left" : ""
                          }`}
                        >
                          {user.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="national-id flex gap-8 flex-col sm:flex-row">
                <div>
                  <img
                    src={state?.data?.data?.nationalIDImage}
                    alt="ID"
                    className="w-full h-full object-fill"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          console.log(state.error)
        )}
      </div>
    </section>
  );
};

export default UserDetails;
