import { FaTv, FaWifi } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { GiFireplace } from "react-icons/gi";
import { IoIosSnow } from "react-icons/io";

const FeaturesIcons = (placeObj) => {
  const place = placeObj.place;
  return (
    <>
      {place.has_tv && <FaTv className="feature-icon" />}
      {place.has_wifi && <FaWifi className="feature-icon" />}
      {place.pets && <MdPets className="feature-icon" />}
      {place.has_airconditioner && <IoIosSnow className="feature-icon" />}
      {place.has_heating_system && <GiFireplace className="feature-icon" />}
    </>
  );
};

export default FeaturesIcons;
