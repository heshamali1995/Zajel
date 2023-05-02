import "./aside.scss";
// Images
import AsideLogo from "../../../assets/images/aside/logo.png";
import User from "../../../assets/images/aside/user.png";

const Aside = () => {
  return (
    <aside className="bg-white">
      <div className="aside-logo mb-12">
        <img src={AsideLogo} alt="logo" className="mx-auto" />
      </div>
      <p className="apply mb-2.5 font-normal">إدارة المتقدمين</p>
      <div className="aside-text flex flex-col sm:flex-row items-center gap-2 bg-button cursor-pointer text-white">
        <div>
          <img src={User} alt="user" />
        </div>
        <p>المتقدمين</p>
      </div>
    </aside>
  );
};

export default Aside;
