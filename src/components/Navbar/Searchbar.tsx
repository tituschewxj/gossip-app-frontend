import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";

import { getTags } from "../../api/forumApi";

const useStyles = makeStyles({
  // style for search bar
  searchStyle: {
    backgroundColor: "white",
    borderRadius: 5,
  },
});

/**
 * Displays the search bar.
 * @returns 
 */
export default function Searchbar() {
  const classes = useStyles();
  const location = useLocation();
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  useQuery("get_all_tags", () => getTags(), {
    onSuccess: (res: ForumTag[]) => {
      setAllTags(res.map((tag) => tag.name));
      // console.log(res)
    },
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    // directs to a new page with the search results
    if (tags.length === 0) {
      console.log("error");
      setHasError(true);
    } else {
      setHasError(false);
      navigate({
        pathname: `search`,
        search: `${createSearchParams({ tags })}`,
      });
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    setHasError(false);
  }, [location, tags]);

  return (
    <Box sx={{ width: "60%", margin: 1 }}>
      <Autocomplete
        options={allTags}
        limitTags={5}
        multiple
        onChange={(event, value) => setTags(value)}
        autoHighlight
        renderInput={(params) => (
          <>
            <TextField
              error={hasError}
              {...params}
              className={classes.searchStyle}
              variant="outlined"
              color="secondary"
              fullWidth
              onKeyDown={(e) => handleKeyPress(e)}
              placeholder={
                hasError ? "Search field cannot be empty" : "Search by tags"
              }
              sx={{}}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          </>
        )}
      />
    </Box>
  );
}