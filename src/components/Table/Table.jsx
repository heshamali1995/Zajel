import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../../redux/showModal/showModal";
import { deleteOne } from "../../redux/deleteDriver/deleteDriver";
import { updateDriver } from "../../services/auth.update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeSingleText } from "../../redux/textarea/textarea";
import { removeSingleStatus } from "../../redux/status/status";

const Table = ({
  getTableProps,
  getTableBodyProps,
  page,
  prepareRow,
  headerGroups,
}) => {
  const navigate = useNavigate();
  const status = useSelector((state) => state.status);
  const notes = useSelector((state) => state.text);
  const dispatch = useDispatch();

  // React Toaster For Updating The Data
  const notifySuccess = () => {
    toast.success("Updated successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      theme: "light",
      rtl: false,
    });
  };

  const notifyFailure = () => {
    toast.error("Error in updating data!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      theme: "light",
      rtl: false,
    });
  };

  // Click On Bin To Show Modal
  const handleClickOnBin = (e) => {
    if (
      e.target.className?.baseVal?.includes("bin") ||
      e.target.parentElement.className?.baseVal?.includes("bin")
    ) {
      dispatch(toggleModal());
    } else {
      return;
    }
  };

  // Send Driver ID To Global Redux State
  const handleDeleteDriver = (e, cell) => {
    if (
      e.target.className?.baseVal?.includes("bin") ||
      e.target.parentElement.className?.baseVal?.includes("bin")
    ) {
      dispatch(deleteOne(cell.row.original._id));
    } else {
      return;
    }
  };

  // Submit Button
  const handleSubmit = (e, cell) => {
    if (
      e.target.className?.baseVal?.includes("send") ||
      e.target.parentElement.className?.baseVal?.includes("send")
    ) {
      // Fetch Specific Note And Status From Redux State
      const note = notes?.find((elem) => elem.id === cell.row.original._id);
      const state = status?.find((elem) => elem.id === cell.row.original._id);
      updateDriver(state?.status, note?.notes, cell.row.original._id).then(
        (resp) => {
          if (resp.status === 200) {
            notifySuccess();
            dispatch(removeSingleText(note));
            dispatch(removeSingleStatus(state));
          } else {
            notifyFailure();
          }
        }
      );
    } else {
      return;
    }
  };
  return (
    <div className="table-container overflow-x-auto">
      <ToastContainer />
      <table {...getTableProps()} className="mb-8">
        <thead className="bg-main-bg text-right">
          {headerGroups.map((header) => {
            return (
              <tr {...header.getHeaderGroupProps()}>
                {header.headers.map((col) => {
                  return (
                    <th
                      {...col.getHeaderProps(col.getSortByToggleProps())}
                      className="py-6 px-2 whitespace-nowrap"
                    >
                      <div className="flex gap-2">
                        {col.render("Header")}
                        <span>
                          {col.isSorted ? (col.isSortedDesc ? " ▼" : " ▲") : ""}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`px-2 py-8 text-right whitespace-nowrap ${
                        cell.column?.id === "textarea-cells" ||
                        cell.column?.id === "remove-driver" ||
                        cell.column?.id === "status" ||
                        cell.column?.id === "submit"
                          ? ""
                          : "cursor-pointer"
                      }`}
                      dir="ltr"
                      onClick={(e) => {
                        handleClickOnBin(e);
                        handleDeleteDriver(e, cell);
                        handleSubmit(e, cell);
                        if (
                          cell.column?.id === "textarea-cells" ||
                          cell.column?.id === "remove-driver" ||
                          cell.column?.id === "status" ||
                          cell.column?.id === "submit"
                        ) {
                          return;
                        } else {
                          navigate(`/drivers/${row.original._id}`);
                        }
                      }}
                    >
                      {cell.render("Cell", {
                        columnID: cell.row.original._id,
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
