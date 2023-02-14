import { getIcon } from "../../assets/utils";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { classname } from "../../assets/utils"

const Table = (props: any) => {
  const { id, headers, bodyData } = props;
  const [active, setActive] = useState(-1);
  const tableDataByHeaders = bodyData.map((data: any) => {
    let reader = {};
    headers.forEach((key: string) => {
      reader = { ...reader, [key]: data[key.toLocaleLowerCase()] };
    });
    return reader;
  });
  const copyData = async (header: string, data: string) => {
    toast.dismiss("table-toast-copy");
    try {
      await navigator.clipboard.writeText(data);
      toast.success(`${header} copiado!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "table-toast-copy",
      });
    } catch (err) {
      toast.error(`Não foi possível copiar ${header.toLocaleLowerCase()}!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "table-toast-copy",
      });
    }
  };
  const dataCellActive = (dataRowsIndex: number, dataCellIndex: number) => active !== dataRowsIndex && dataCellIndex !== 0
  const cellClasses = (dataRowsIndex: number, dataCellIndex: number, numberItems: number): string => {
    return classname({
      'cursor-pointer': true,
      'max-md:border-x-2': true,
      'md:border-y-2': true,
      'p-2': true,
      'md:p-4': true, 
      'text-left': true,
      'bg-ui-white': true,
      'max-md:hidden': active !== dataRowsIndex && dataCellIndex !== 0,
      'max-md:block p-2': active === dataRowsIndex,

      'max-md:rounded-t-md': dataCellIndex === 0,
      'max-md:border-t-2': dataCellIndex === 0,

      'md:rounded-l-md': dataCellIndex === 0,
      'md:rounded-r-md': numberItems === dataCellIndex + 1,
      'md:border-l-2': dataCellIndex === 0,
      'md:border-r-2': numberItems === dataCellIndex + 1,

      'max-md:rounded-b-md': (active === dataRowsIndex && (numberItems === dataCellIndex + 1)) || (active !== dataRowsIndex && dataCellIndex === 0),
      'max-md:border-b-2': (active === dataRowsIndex && (numberItems === dataCellIndex + 1)) || (active !== dataRowsIndex && dataCellIndex === 0),
    })
  }
  return (
    <div className="w-full overflow-hidden overflow">
      <table
        id={id}
        className="w-full h-full border-separate border-spacing-y-4"
      >
        <thead className="h-full hidden md:table-header-group">
          <tr>
            {headers.map((header: string) => (
              <th className="static text-left px-2 md:px-4" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="h-full">
          {tableDataByHeaders.map((dataRow: any, dataRowsIndex: number) => (
            <tr key={`dataRow-${dataRowsIndex}`} className={` min-h-[64px] m-2 sticky w-full`} >
              {Object.values(dataRow).map((row: any, dataCellIndex: number, arr) => {
                return (
                  <td
                    key={`row-${dataCellIndex}`}
                    className={cellClasses(dataRowsIndex, dataCellIndex, arr.length)}>
                    <span
                      className={`${dataCellActive(dataRowsIndex, dataCellIndex) && "max-md:hidden" } block md:hidden text-[darkgray] text-[12px]`}>
                      {headers[dataCellIndex]}:
                    </span>
                    <span
                      onClick={() => row && copyData(headers[dataCellIndex], row)}
                      className={`${dataCellActive(dataRowsIndex, dataCellIndex) && "max-md:hidden"}`}>
                      {row || "-"}
                    </span>
                  </td>
                );
              })}
              <td>
                <img
                  onClick={() =>
                    setActive((current) =>
                      current === dataRowsIndex ? -1 : dataRowsIndex
                    )
                  }
                  src={getIcon("arrow-b-icon.svg")}
                  alt="arrow-b-icon"
                  className={`${
                    active !== dataRowsIndex ? "rotate-90" : "rotate-[270deg]"
                  } block md:hidden w-[26px] h-[26px] absolute right-[12px] top-[16px]`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer containerId="table-toast-copy" />
    </div>
  );
};

export default Table;
