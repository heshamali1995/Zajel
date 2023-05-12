import { useEffect, useState } from "react";
import "./navbar.scss";
// Components
import FilterNames from "../../../utils/FilterTable";
// Images
import Egypt from "../../../assets/images/navbar/egypt.png";
import Arrow from "../../../assets/images/navbar/arrow.png";
import Search from "../../../assets/images/navbar/search.png";

const Navbar = ({ filter, setFilter, id }) => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const resp = JSON.parse(sessionStorage.getItem("admin"));
    setResponse(resp);
  }, []);

  return (
    <nav className="bg-white gap-x-4 px-3 lg:px-6 py-4 flex flex-col md:flex-row gap-y-8 md:gap-y-0 items-center justify-between">
      {/* Nav Text */}
      <div className="nav-text flex flex-wrap sm:flex-nowrap gap-y-4 sm:gap-y-0 items-center justify-between sm:justify-start">
        {/* User Image */}
        <div className="user-image rounded-full bg-main-bg relative ml-3">
          <p className="center text-button font-medium text-sm">
            {response?.user?.name?.trimStart().slice(0, 1)}
          </p>
        </div>
        {/* Admin */}
        <div className="admin ml-5 lg:ml-8">
          <p className="mb-1.5 font-light text-left text-secondary whitespace-nowrap">
            {response?.user?.name}
          </p>
          <p className="font-normal text-secondary">مدير النظام</p>
        </div>
        {/* Language */}
        <div className="lang flex gap-2 items-center cursor-pointer">
          <div className="img">
            <img src={Egypt} alt="flag" />
          </div>
          <div className="type flex lg:gap-2 items-center">
            <ul>
              <li>العربية</li>
            </ul>
            <img src={Arrow} alt="arrow" />
          </div>
        </div>
      </div>
      {/* Nav Search */}
      <form
        className="nav-search justify-between bg-main-bg px-2 sm:px-4 py-1.5 rounded-lg"
        style={{ display: id ? "none" : "flex" }}
      >
        <FilterNames filter={filter} setFilter={setFilter} />
        <div>
          <img src={Search} alt="search-icon" />
        </div>
      </form>
    </nav>
  );
};

export default Navbar;
