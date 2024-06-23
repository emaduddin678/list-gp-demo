import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

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
        if (highlightedIndex >= 0) {
          console.log(data[highlightedIndex]);
          setSearchTerm(data[highlightedIndex].name); // Assuming the item has a 'name' property
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
    const value = event.target.value;
    setSearchTerm(value);
  };

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
      <div className="searchField flex gap-2">
        <div className="col-span-full sm:col-span-2">
          <label htmlFor="itName" className="text-sm">
            Item Name
          </label>
          <input
            id="itName"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
            className="w-full rounded-md focus:ring focus:ring-opacity-75  "
          />
          {isFocused && data && (
            <ul className="absolute bg-white border border-gray-300 w-full rounded-md mt-1">
              {data.map((item, index) => (
                <li
                  key={index}
                  className={`p-2 cursor-pointer ${
                    highlightedIndex === index ? "bg-gray-200" : ""
                  }`}
                  onMouseDown={() => handleItemClick(item)} // Use onMouseDown to avoid blur event
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {item.item_name}{" "}
                  {/* {item.name} Adjust according to the structure of your data */}
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
            placeholder="Quantity"
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
            placeholder="0.00 BDT"
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
            placeholder="0.00 BDT"
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
            placeholder="..."
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
            placeholder="..."
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
            placeholder=""
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
      </div>
    </>
  );
}

export default App;
