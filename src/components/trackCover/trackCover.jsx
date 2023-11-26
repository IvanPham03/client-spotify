import React from "react";

import withPlayer from "../../hoc/playerHoc";
import meomeo from "../../utilities/ass/meomeo.jpg";
const trackCover = props => {
  return (
    <div className="cover h-full w-full mt-6">
      <img
        alt="cover"
        src={meomeo}
        // style={{ width: "100%" height}}
        className="h-full w-full"
      />
    </div>
  );
};

// export default withPlayer(trackCover);
export default trackCover;
