// Images
import BurgerMenu from "../assets/images/users/fi_list.png";
import Phone from "../assets/images/users/phone.png";
import Calendar from "../assets/images/users/fi_calendar.png";

export const COLUMNS = [
  {
    Header: () => {
      return (
        <div className="flex items-center">
          <div className="img-holder ml-2">
            <img src={BurgerMenu} alt="burger-menu" />
          </div>
          <p>العدد</p>
        </div>
      );
    },
    id: "numbers-cells",
    accessor: (row, index) => {
      return index + 1;
    },
  },
  {
    Header: "الإسم",
    Footer: "الإسم",
    accessor: "codeName",
  },
  {
    Header: () => {
      return (
        <div className="flex items-center">
          <div className="img-holder ml-2">
            <img src={Phone} alt="phone" />
          </div>
          <p>رقم التليفون</p>
        </div>
      );
    },
    accessor: "phoneNumber",
  },
  {
    Header: () => {
      return (
        <div className="flex items-center">
          <div className="img-holder ml-2">
            <img src={BurgerMenu} alt="burger-menu" />
          </div>
          <p>رقم البطاقة</p>
        </div>
      );
    },
    accessor: "nationalID",
  },
  {
    Header: () => {
      return (
        <div className="flex items-center">
          <div className="img-holder ml-2">
            <img src={Calendar} alt="calendar" />
          </div>
          <p>نوع المركبة</p>
        </div>
      );
    },
    accessor: "vehicleType",
  },
  {
    Header: () => {
      return (
        <div className="flex items-center">
          <div className="img-holder ml-2">
            <img src={Calendar} alt="calendar" />
          </div>
          <p>تاريخ الطلب</p>
        </div>
      );
    },
    accessor: "createdAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      const fullYear = date.getFullYear();
      const month = date.getMonth() + 1;
      const days = date.getDate();
      const newDate = `${days} / ${month} / ${fullYear}`;
      return newDate;
    },
  },
];
