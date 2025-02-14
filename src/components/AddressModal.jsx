import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import axios from "axios";
import { debounce } from "lodash";
import "./searchlocationmodal.css"; 
import { BASE_URL } from "../config";
import CloseIcon from "@mui/icons-material/Close";
const AddressModal = ({ isOpen, onClose, onSelectAddress }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaces = async (searchTerm) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/googlemap/searchlocation`,
        {
          query: searchTerm,
        }
      );
    //   // Filter Indian addresses
    //   const indianSuggestions = response.data.data.filter((prediction) =>
    //     prediction.description.includes("India")
    //   );
    //   return indianSuggestions;
     // Filter addresses to include only Kerala
     const keralaSuggestions = response.data.data.filter((prediction) =>
        prediction.description.includes("Kerala")
      );
      return keralaSuggestions;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsLoading(true);
      fetchPlaces(searchTerm).then((data) => {
        setSuggestions(data);
        setIsLoading(false);
      });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchLocation = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length < 3) {
      setSuggestions([]);
    } else {
      debouncedSearch(value);
    }
  };

  const clearSearchInput = () => {
    setInputValue("");
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleSelectAddress = async (placeId) => {
    try {
      const placeDetails = await axios.post(
        `${BASE_URL}/googlemap/fetchplacedata`,
        {
          placeId,
        }
      );
      const { lat, lng } = placeDetails.data;
      const geocodeResponse = await axios.post(
        `${BASE_URL}/googlemap/getcurrentlocation`,
        { lat, lng }
      );
      const { formattedAddress, postalCode } = geocodeResponse.data;
      onSelectAddress({ formattedAddress, postalCode, lat, lng });
      onClose();
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  return (
    // <Modal open={isOpen} onClose={onClose}>
    //   <div
    //     className="setlocationmodal"
    //     style={{ WebkitTapHighlightColor: "transparent" }}
    //   >
    //     <div className="modal-header">
    //       <button className="close-button" onClick={onClose}>
    //         <CloseIcon />
    //       </button>
    //     </div>
    //     <div className="searchmoblocation">
    //       <input
    //         type="text"
    //         onChange={handleSearchLocation}
    //         placeholder="Search Location"
    //         maxLength={40}
    //         value={inputValue}
    //       />
    //       <i className="ri-search-2-line searchmoblocationi"></i>
    //       {inputValue && (
    //         <i
    //           onClick={clearSearchInput}
    //           className="ri-close-line searchmoblocationicross"
    //         ></i>
    //       )}
    //     </div>
    //     {inputValue.length > 2 && suggestions.length > 0 && (
    //       <div className="searchlocationsuggestionscontainer">
    //         {suggestions.map((data, index) => (
    //           <div
    //             key={index}
    //             className="searchlocationsuggestionplaces"
    //             onClick={() => handleSelectAddress(data.place_id)}
    //           >
    //             <i className="ri-map-pin-line"></i> <h3>{data.description}</h3>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //     {isLoading && <p className="loading-text">Loading...</p>}
    //     {!inputValue && (
    //       <div>
    //         {/* <button
    //           className="use-currentlocation-btn"
    //           onClick={() => {
    //             // Implement "Use my location" functionality if needed
    //           }}
    //         >
    //           <i className="ri-focus-3-line"></i>
    //           Use my location
    //         </button> */}

    //         {/* <div className="avilablelocation">
    //           <h3>Recent Locations</h3>
    //           <div className="flex">
    //             <i className="ri-map-pin-line"></i> <h4>Kozhikode</h4>
    //           </div>
    //           <div className="flex">
    //             <i className="ri-map-pin-line"></i> <h4>Kannur</h4>
    //           </div>
    //           <div className="flex">
    //             <i className="ri-map-pin-line"></i> <h4>Malappuram</h4>
    //           </div>
    //         </div> */}
    //       </div>
    //     )}
    //   </div>
    // </Modal>
    <Modal open={isOpen} onClose={onClose}>
  <div
    className="setlocationmodal"
    style={{ WebkitTapHighlightColor: "transparent" }}
  >
    <div className="modal-header">
      <button className="close-button" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
    <div className="searchmoblocation">
      <input
        type="text"
        onChange={handleSearchLocation}
        placeholder="Search Location"
        maxLength={40}
        value={inputValue}
      />
      <i className="ri-search-2-line searchmoblocationi"></i>
      {inputValue && (
        <i
          onClick={clearSearchInput}
          className="ri-close-line searchmoblocationicross"
        ></i>
      )}
    </div>
    {inputValue.length > 2 && suggestions.length > 0 && (
      <div className="searchlocationsuggestionscontainer">
        {suggestions.map((data, index) => (
          <div
            key={index}
            className="searchlocationsuggestionplaces"
            onClick={() => handleSelectAddress(data.place_id)}
          >
            <i className="ri-map-pin-line"></i> <h3>{data.description}</h3>
          </div>
        ))}
      </div>
    )}
    {isLoading && <p className="loading-text">Loading...</p>}
    {!inputValue && (
      <div>
        {/* Optional content */}
      </div>
    )}
  </div>
</Modal>
  );
};

export default AddressModal;
