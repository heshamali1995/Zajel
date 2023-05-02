import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./details.scss";
// Components
import Aside from "../../components/Shared/Aside/Aside";
import Navbar from "../../components/Shared/Navbar/Navbar";
import { fetchDetails } from "../../redux/singleDriver/singleDriverSlice";
import Spinner from "../../components/Spinner/Spinner";
// Images
import LeftArrow from "../../assets/images/details/left-arrow.png";
import UserImage from "../../assets/images/details/user.png";
import Voice from "../../assets/images/details/voice.png";
import FrontID from "../../assets/images/details/front-id.png";
import BackID from "../../assets/images/details/back-id.png";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.details);
  useEffect(() => {
    dispatch(fetchDetails(id));
  }, []);

  // Date Formatting Handler
  const handleDate = () => {
    const date = new Date(state.data?.data?.dateOfBirth);
    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const days = date.getDate();
    const dateFormat = `${fullYear} / ${month} / ${days}`;
    return dateFormat;
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
      text: "أعمل كمندوب شحن منذ خمس سنوات، وأقوم بتوصيل الطرود والبضائع إلى العملاء في مختلف المناطق. أحب عملي لأنه يتيح لي التعرف على أشخاص جدد وزيارة أماكن مختلفة. أواجه في عملي بعض التحديات، مثل الزحام المروري والتأخير في الشحن والشكاوى من العملاء، لكني أحاول دائماً التعامل معها بمهنية وصبر. أعتقد أن مندوب الشحن يجب أن يكون مسؤولاً وملتزماً ومتعاوناً مع الزملاء والعملاء. أسعى لتطوير مهاراتي وخبرتي في هذا المجال، وأطمح للحصول على فرص أفضل في المستقبل.",
    },
  ];
  return (
    <section className="flex gap-3 sm:gap-10 bg-main-bg min-h-screen">
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
              <p className="text-secondary ml-4 text-sm">الصفحة الرئيسية</p>
              <div className="ml-4">
                <img src={LeftArrow} alt="arrow" />
              </div>
              <p className="text-button text-sm">صفحة المتقدم </p>
            </div>
            {/* User Info */}
            <div className="user-info bg-white">
              {/* Image And Voice */}
              <div className="user-image flex flex-col sm:flex-row items-center gap-10 mb-8">
                <div className="image">
                  <img src={UserImage} alt="user" />
                </div>
                <div className="voice">
                  <img src={Voice} alt="voice-note" />
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
              <div className="flex gap-8 flex-col sm:flex-row">
                <div>
                  <img src={FrontID} alt="ID" />
                </div>
                <div>
                  <img src={BackID} alt="ID" />
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
