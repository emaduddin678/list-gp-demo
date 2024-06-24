import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import DataGridPage from "./DataGridPage/DataPage";
import ExportToExcel from "./ExcelSheet/ExcelFile";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItem, setSearchedItem] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  

  const handleKeyDown = (event) => {
    if (!data || data.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((prevIndex) =>
          prevIndex < data.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : data.length - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0 && highlightedIndex < data.length) {
          // console.log(data[highlightedIndex]);
          setSearchedItem(data[highlightedIndex]); // Assuming the item has a 'name' property
          // setAllProduct((prev) => [...prev, data[highlightedIndex]]);
          setIsFocused(false);
        }
        break;
      case "Escape":
        setIsFocused(false);
        break;
      default:
        break;
    }
  };

  // Queries
  const { data, error } = useQuery({
    queryKey: ["searchTerm", searchTerm],
    queryFn: async () => {
      // console.log("hello");
      const response = await axios.get(
        `https://boq-backend.xri.com.bd/search-by-item-name/${searchTerm}`
      );

      return response.data;
    },
    enabled: !!searchTerm,
  });
  // console.log(data);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handelQuantity = (event) => {
    setSearchedItem((prev) => {
      return {
        ...prev,
        quantity: event.target.value,
        totalAmount: event.target.value * prev.price,
      };
    });
  };
  const handelAcP = (event) => {
    setSearchedItem((prev) => {
      return {
        ...prev,
        acP: event.target.value,
        ac: (event.target.value * prev.totalAmount) / 100,
      };
    });
  };
  const handleRemark = (event) => {
    setSearchedItem((prev) => {
      return {
        ...prev,
        remark: event.target.value,
      };
    });
  };
  const handleItemClick = (item) => {
    setSearchedItem(item); // Adjust according to the structure of your data
    setIsFocused(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    if (Object.keys(searchedItem).length !== 0) {
      setAllProduct((prev) => [...prev, searchedItem]);
      setSearchTerm("");
      setSearchedItem({});
    }
  };

  console.log(searchedItem);
  console.log(allProduct);

  //  useEffect(() => {
  //    const fetchData = async () => {
  //      try {
  //        const response = await axios.get(
  //          `https://boq-backend.xri.com.bd/search-by-item-name/s`
  //        );

  //        console.log(response.data); // Log the data directly
  //      } catch (error) {
  //        console.error("Error fetching data:", error);
  //      }
  //    };

  //    fetchData();
  //  }, []);
  return (
    <>
      <form className="searchField flex gap-2 justify-between items-end">
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="itName" className="text-sm">
            Item Name
          </label>
          <input
            id="itName"
            type="text"
            placeholder="Search..."
            value={
              Object.keys(searchedItem).length !== 0
                ? searchedItem?.item_name
                : searchTerm
            }
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
            className="w-full rounded-md focus:ring focus:ring-opacity-75  "
          />
          {isFocused && data && (
            <ul className="absolute z-50 bg-white border border-gray-300 w-1/5 rounded-md mt-1">
              {data.map((item, index) => (
                <li
                  key={index}
                  className={`p-2 cursor-pointer flex justify-start ${
                    highlightedIndex === index ? "bg-gray-200" : ""
                  }`}
                  onMouseDown={() => handleItemClick(item)} // Use onMouseDown to avoid blur event
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span>{item.item_name} </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="itCode" className="text-sm">
            Item Code
          </label>
          <input
            id="itCode"
            type="text"
            disabled
            value={
              Object.keys(searchedItem).length !== 0
                ? searchedItem.item_code
                : "Item Code"
            }
            placeholder="Item Code"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="itQuantity" className="text-sm">
            Quantity
          </label>
          <input
            id="itQuantity"
            type="number"
            min={1}
            value={
              Object.keys(searchedItem).length !== 0
                ? searchedItem.quantity
                : ""
            }
            onChange={handelQuantity}
            placeholder="Enter Quantity..."
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="unitRate" className="text-sm">
            Unit Rate
          </label>
          <input
            id="unitRate"
            type="text"
            placeholder={
              Object.keys(searchedItem).length !== 0
                ? searchedItem.price
                : "0.00 BDT"
            }
            disabled
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="totalRate" className="text-sm">
            Total Amount
          </label>
          <input
            id="totalRate"
            type="text"
            placeholder={
              Object.keys(searchedItem).length !== 0
                ? searchedItem.totalAmount
                : "0.00 BDT"
            }
            disabled
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="acP" className="text-sm">
            AC %
          </label>
          <input
            id="acP"
            type="text"
            placeholder="0%"
            // value={acP}
            onChange={handelAcP}
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="ac" className="text-sm">
            AC
          </label>
          <input
            id="ac"
            type="text"
            disabled
            value={
              Object.keys(searchedItem).length !== 0
                ? searchedItem.ac
                : "0.00 BDT"
            }
            placeholder="0.00 BDT"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="remark" className="text-sm">
            Remark
          </label>
          <input
            id="remark"
            type="text"
            placeholder="type a comment here..."
            // value={remark}
            onChange={handleRemark}
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <button
          type="button"
          onClick={handleFormSubmit}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Save
        </button>
        
      </form>
      <DataGridPage data={allProduct} />
    </>
  );
}

export default App;
