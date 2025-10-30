import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";


const BerryListItem = ({ berry }) => {

  return (
        <ListItem
            key={berry.id}
            className="berryItem"
            divider
            disableGutters
            secondaryAction={
              <Stack direction="row" spacing={1} className="berryTags">
                {berry.flavors.map((f) => (
                  <Chip
                    key={`${berry.id}-${f.name}`}
                    size="small"
                    label={f.name}
                    variant="outlined"
                  />
                ))}
              </Stack>
            }
          >
            <ListItemAvatar>
              <Avatar className="berryItem__avatar">🍓</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={berry.name}
              primaryTypographyProps={{ className: "berryItem__name" }}
            />
        </ListItem>
  );
};

export default BerryListItem;
