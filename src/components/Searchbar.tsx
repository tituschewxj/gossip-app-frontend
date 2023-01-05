import React from 'react'

import { Autocomplete, Box, IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    // style for search bar
    searchStyle: {
        backgroundColor: "white",
        borderRadius: 5,
    }
})

function Searchbar(props: { tags: string[], onChange: Function, handleSubmit: Function }) {
    const classes = useStyles()
    return (
        <Box sx={{ width: '50%', margin: 1 }}>
            <Autocomplete
                options={props.tags}
                limitTags={5}
                multiple
                onChange={(event, value) => props.onChange(value)}
                renderInput={(params) =>
                (<>
                    <TextField
                        {...params}
                        className={classes.searchStyle}
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        placeholder='Search'
                        sx={{}}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (<>
                                < InputAdornment position='start'>
                                    <IconButton onClick={() => props.handleSubmit()}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                            </>)
                        }}
                    />
                </>)
                }
            />
        </Box>
    )
}

export default Searchbar