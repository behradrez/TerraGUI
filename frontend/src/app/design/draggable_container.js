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

const DraggableContainer = ({ deleteFunc, availableResources, containerRef }) => {
    
    // Dragging logic

    const [position, setPosition] = useState({x:100,y:100});
    const [isDragging, setIsDragging] = useState(false);
    const [dimensions, setDimensions] = useState({width:100, height:100});
    const [xPosPercent, setXPosPercent] = useState(0.5);
    const [yPosPercent, setYPosPercent] = useState(0.5);
    
    const dragOffset = useRef({x:0, y:0});
    const currObject = useRef(null);

    const [boundaries, setBoundaries] = useState({left:0, top:0, right:0, bottom:0});
    useEffect(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setBoundaries({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom
          });
        }
      }, [containerRef]);

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
        const handleMouseMoveGlobal = (e) => {
            if (isDragging) {
                const containerWidth = boundaries.right - boundaries.left;
                const containerHeight = boundaries.bottom - boundaries.top;        

                let newX = e.clientX - dragOffset.current.x;
                let newY = e.clientY - dragOffset.current.y;

                newX = Math.max(0, Math.min(newX, containerWidth - dimensions.width));
                newY = Math.max(0, Math.min(newY,containerHeight - dimensions.height));
                
                let xLimits = boundaries.right - boundaries.left;
                let yLimits = boundaries.bottom  - boundaries.top;
                
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
    const recalcDimensions = () => {
    setTimeout(() => {
        if (currObject.current) {
            const rect = currObject.current.getBoundingClientRect();
            setDimensions({ width: rect.width, height: rect.height });
        }
        },300); 
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

        <Accordion 
        className="bg-gray-100 flex flex-col"
        onChange={recalcDimensions}
        >
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


