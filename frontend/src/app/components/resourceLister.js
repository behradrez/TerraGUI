import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";


const ListResources = ({resourceType, availableResources, setResourceFunc}) => {
    
    const label = resourceType === "" ? "Select Resource Type" : "Change Resource Type";
    
    return (
    <>
        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
            <InputLabel id="resource-selector">{label}</InputLabel>
            <Select
                labelId="resource-selector"
                id="resource-selector"
                value={resourceType}
                label={label}
                onChange={setResourceFunc}
                >
                {availableResources.map((label, idx) => {
                    return <MenuItem key={idx} value={label.resource_name}>{label.resource_name}</MenuItem>
                })}
            </Select>
        </FormControl>
    </>
    )
}

export default ListResources;