'use client'

import Navbar from "../components/navbar";
import DraggableContainer from "./drag_component";
import { DesignArea } from "./design_area";
import { useState, useRef, useEffect } from "react";

export default function Design() {
  const containerRef = useRef(null);
  const [boundaries, setBoundaries] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  
  useEffect(()=>{
    const updateBoundaries = () => {
      setTimeout(()=>{
        if (containerRef.current) {
          const designRect = containerRef.current.getBoundingClientRect();
          setBoundaries({
            top:designRect.top,
            right: designRect.right,
            bottom: designRect.bottom,
            left:designRect.left
          });
        }else{
          console.log("still null");
        }
      },100);
      }


    updateBoundaries();
    console.log(boundaries);
    window.addEventListener("resize",updateBoundaries);
    return ()=> window.removeEventListener("resize",updateBoundaries);
  }, []);

  

  return (
    <>
      <Navbar/>
      <div 
      className="flex align-middle justify-center relative"
      style={{
        position:'relative',
        width:'100%',
        height:'100vh'
      }}
      >

      <div
        ref={containerRef}
        className="relative w-full h-3/5 m-4 bg-white"
      >

      </div>
        <DraggableContainer boundaries={boundaries}>

          <h2>Drag me!</h2>
          <p>This is a draggable container</p>
        </DraggableContainer>

        <DraggableContainer boundaries={boundaries}>
          <h2>Drag me2!</h2>
          <p>This is a draggable container</p>
        </DraggableContainer>
      </div>

    </>
  );

}
