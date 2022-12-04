import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { MdDateRange } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";

function ListingItem({ listing, id, onDelete }) {
  //const [img, setImg] = useState("");

  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingPrice">
            ₦
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Week"}
          </p>
          <div className="categoryListingInfoDiv">
            <div className="categoryListflex">
              <MdDateRange />
              <p className="categoryListingInfoText">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Model`
                  : "Production year not included"}
              </p>
            </div>
            <div className="categoryListflex">
              <BsSpeedometer />
              <p className="categoryListingInfoText">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Top Speed`
                  : "Top speed not included"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          onClick={() => {
            onDelete(listing.id, listing.name);
          }}
          fill="rgb(231, 76, 60)"
        />
      )}
    </li>
  );
}

export default ListingItem;
