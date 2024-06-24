import React from "react";
import ExportToExcel from "../ExcelSheet/ExcelFile";

const DataPage = ({ data }) => {
  const fileName = "myfile";
  return (
    <div className="mt-8 relative overflow-x-auto shadow-md sm:rounded-lg">
      <ExportToExcel apiData={data} fileName={fileName} />

      <table className="w-full text-sm text-left rtl:text-right  text-gray-200">
        <thead className="text-xs uppercase  bg-green-700 text-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Item Name
            </th>
            <th scope="col" className="px-6 py-3">
              Item Code
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Unit Price
            </th>
            <th scope="col" className="px-6 py-3">
              Total Amount
            </th>
            <th scope="col" className="px-6 py-3">
              AC %
            </th>
            <th scope="col" className="px-6 py-3">
              AC
            </th>
            <th scope="col" className="px-6 py-3">
              Remark
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          {data.length > 0 &&
            data.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="odd:bg-white  even:bg-gray-50  border-b "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.item_name}
                  </th>
                  <td className="px-6 py-4">{item.item_code}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.price} BDT</td>
                  <td className="px-6 py-4">{item.totalAmount} BDT</td>
                  <td className="px-6 py-4">{item.acP} %</td>
                  <td className="px-6 py-4">{item.ac} BDT</td>
                  <td className="px-6 py-4">{item.remark}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default DataPage;
