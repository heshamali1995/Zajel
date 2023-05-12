import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import Select from "react-select";
import "./users.scss";
// Components
import Aside from "../../components/Shared/Aside/Aside";
import Navbar from "../../components/Shared/Navbar/Navbar";
import { fetchDrivers } from "../../redux/drivers/driverSlice";
import Spinner from "../../components/Spinner/Spinner";
import { COLUMNS } from "../../utils/columns";
import Table from "../../components/Table/Table";
// Images
import LeftArrow from "../../assets/images/users/left-arrow.png";
import RightArrow from "../../assets/images/users/right-arrow.png";
import UsersIcon from "../../assets/images/users/users.png";

// Select Box Options
const options = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 50, label: 50 },
];

const Users = () => {
  // Dispatch The Fetch Function
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDrivers());
  }, []);
  const count = useSelector((state) => state.data.count);
  const driverState = useSelector((state) => state.data);
  const drivers = useSelector((state) => state.data.drivers);
  // React Table Props
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => drivers, [drivers]);
  const {
    getTableProps,
    getTableBodyProps,
    page,
    prepareRow,
    headerGroups,
    state,
    setPageSize,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, usePagination);
  const { pageIndex, pageSize, globalFilter } = state;
  console.log(drivers);
  return (
    <section className="flex gap-3 sm:gap-10 bg-main-bg min-h-screen">
      {/* Aside Section */}
      <Aside />
      {driverState.loading ? (
        <Spinner />
      ) : driverState.drivers ? (
        <div className="whole-wrapper flex-grow pt-5">
          <Navbar filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="users-section pt-8">
            {/* Number Of Applicants */}
            <div className="applicants bg-white flex justify-between items-center p-4 mb-6">
              <div className="numbers">
                <p className="font-medium mb-2">{count} </p>
                <p className="text-sm">عدد المتقدمين</p>
              </div>
              <div className="image relative rounded-full">
                <img src={UsersIcon} alt="users" className="center" />
              </div>
            </div>
            {/* Users Container */}
            <div className="users-container bg-white p-2 sm:p-6">
              {/* Table Section */}
              <Table
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                page={page}
                prepareRow={prepareRow}
                headerGroups={headerGroups}
              />
              {/* Table Footer Section */}
              <div className="table-footer flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-between items-center">
                <div className="show flex gap-2 items-center">
                  <p className="text-sm font-normal text-secondary">عرض</p>
                  <Select
                    menuPlacement="auto"
                    options={options}
                    placeholder={pageSize}
                    className="select"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.value))}
                  />
                  <p className="text-sm font-normal text-secondary">صفوف</p>
                </div>
                <div className="pagination flex items-center gap-2 px-4">
                  <button
                    className="right-arrow"
                    disabled={!canNextPage}
                    onClick={() => nextPage()}
                  >
                    <img src={RightArrow} alt="right-arrow" />
                  </button>
                  <div className="page-number rounded-full bg-button flex justify-center items-center text-sm font-normal text-white">
                    {pageIndex + 1}
                  </div>
                  <button
                    className="left-arrow"
                    disabled={!canPreviousPage}
                    onClick={() => previousPage()}
                  >
                    <img src={LeftArrow} alt="left-arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        console.log(state.error)
      )}
    </section>
  );
};

export default Users;
