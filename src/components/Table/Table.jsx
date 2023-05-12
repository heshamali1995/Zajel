import { useNavigate } from "react-router-dom";

const Table = ({
  getTableProps,
  getTableBodyProps,
  page,
  prepareRow,
  headerGroups,
}) => {
  const navigate = useNavigate();
  return (
    <div className="table-container overflow-x-auto">
      <table {...getTableProps()} className="mb-8">
        <thead className="bg-main-bg text-right">
          {headerGroups.map((header) => {
            return (
              <tr {...header.getHeaderGroupProps()}>
                {header.headers.map((col) => {
                  return (
                    <th
                      {...col.getHeaderProps()}
                      className="py-6 px-2 whitespace-nowrap"
                    >
                      {col.render("Header")}
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
              <tr
                className="cursor-pointer"
                {...row.getRowProps()}
                onClick={() => navigate(`/drivers/${row.original._id}`)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-2 py-8 text-right"
                      dir="ltr"
                    >
                      {cell.render("Cell")}
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