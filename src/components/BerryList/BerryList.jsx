import React from "react";
import BerryListItem from "./BerryListItem";
import "./berryList.css";
import Box from "@mui/material/Box";
import List from "@mui/material/List";


const BerryList = ({ berries = [] }) => {

  return (
    <Box className="berryList" sx={{ width: "100%" }}>
      <List className="berryList__list">
        {berries.map((berry) => (
          <BerryListItem key={berry.name} berry={berry} />
        ))}
        {berries.length === 0 && (
          <Box className="placeholder" sx={{ p: 2 }}>
            No berries match
          </Box>
        )}
      </List>
    </Box>
  );
};

export default BerryList;
