'use client'

import React, { useEffect } from "react";
import { useState, useRef } from "react";

import {
    Accordion, AccordionSummary, AccordionDetails, 
    AccordionActions, IconButton, TextField
} from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ListResources from "../components/resourceLister";

const DraggableContainer = ({ children, boundaries, deleteFunc, container, availableResources }) => {
    
    // Dragging logic

    const [position, setPosition] = useState({x:100,y:100});
    const [isDragging, setIsDragging] = useState(false);
    const [dimensions, setDimensions] = useState({width:100, height:100});
    const [xPosPercent, setXPosPercent] = useState(0.5);
    const [yPosPercent, setYPosPercent] = useState(0.5);
    
    const dragOffset = useRef({x:0, y:0});
    const currObject = useRef(null);

    // keep draggable elements approximately in same area on frame resize
    // ( i am personally proud of this one );
    useEffect(() => {
        setPosition(
            {x:(boundaries.right - dimensions.width - boundaries.left)*xPosPercent+boundaries.left, 
            y:(boundaries.bottom - 2*dimensions.height - boundaries.top)*yPosPercent + boundaries.top
        });
    }, [boundaries]);

    // Dragging logic
    useEffect(() => {
        if(currObject.current){
            let width = currObject.current.getBoundingClientRect().width;
            let height = currObject.current.getBoundingClientRect().height;
            setDimensions({width, height});
        };

        const handleMouseMoveGlobal = (e) => {
            if (isDragging) {
                let newX = e.clientX - dragOffset.current.x;
                let newY = e.clientY - dragOffset.current.y;
                newX = Math.max(boundaries.left , Math.min(newX, boundaries.right - dimensions.width));
                newY = Math.max(boundaries.top - 0.5*dimensions.height , Math.min(newY,boundaries.bottom - 1.5*dimensions.height));
                
                let xLimits = boundaries.right - dimensions.width - boundaries.left;
                let yLimits = boundaries.bottom - 2*dimensions.height - boundaries.top;
                
                let relativeXPos = (newX - boundaries.left)/xLimits;
                let relativeYPos = (newY - boundaries.top)/yLimits;

                setXPosPercent(relativeXPos);
                setYPosPercent(relativeYPos);
                
                setPosition({x:newX, y:newY});
            }
        };

        const handleMouseUpGlobal = (e) => {
            setIsDragging(false);
        };

        if(isDragging){
            window.addEventListener("mousemove",handleMouseMoveGlobal);
            window.addEventListener("mouseup",handleMouseUpGlobal);
        }
        return () => {
            window.removeEventListener("mousemove",handleMouseMoveGlobal);
            window.removeEventListener("mouseup",handleMouseUpGlobal)
        };

    }, [isDragging]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragOffset.current = {
            x: e.clientX - position.x ,
            y: e.clientY - position.y
        };
    };

    
    // Resource management logic

    const [resourceType, setResourceType] = useState("");
    const [requiredFields, setRequiredFields] = useState([]);

    const handleResourceTypeChange = (e) => {
        setResourceType(e.target.value);
        for(let i=0; i<availableResources.length; i++){
            if(availableResources[i].resource_name == e.target.value){
                setRequiredFields(availableResources[i].required_fields);
            }
        }
    };

    return (
        <div
        ref={currObject}
        onMouseDown={handleMouseDown}
        style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none'
        }}
        >

        <Accordion className="bg-gray-100 flex flex-col">
            <AccordionSummary
            expandIcon={<ArrowDownwardIcon/>}
            aria-controls="panel1-content"
            id="1"
            >
                {resourceType === "" ? "New Resource" : resourceType}
            </AccordionSummary>
            <AccordionDetails className="bg-gray-300">
            <div className="flex flex-col">

                <ListResources resourceType={resourceType} setResourceFunc={handleResourceTypeChange} availableResources={availableResources} />
                {resourceType !== "New Resource" && (
                    <>
                        {requiredFields.map((label, idx) => {
                            return <TextField size="small" className="my-1" key={idx} label={label}></TextField>
                        })}
                    </>
                    )}
                </div>
            </AccordionDetails>
            <AccordionActions className="bg-gray-300">
                <IconButton onClick={deleteFunc} aria-label="delete" color="error">
                    <p>Delete</p><DeleteIcon/>
                </IconButton>
            </AccordionActions>
        </Accordion>
        </div>
    )
};

export default DraggableContainer;


