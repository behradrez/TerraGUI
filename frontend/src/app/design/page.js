'use client'

import Navbar from "../components/navbar";
import { SpeedDialComponent } from "../components/speedDial";
import DraggableContainer from "./drag_component";
import { useState, useRef, useEffect } from "react";


export default function Design() {
  const containerRef = useRef(null);
  const [boundaries, setBoundaries] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [containers, setContainers] = useState([]);
  const [containerID, setContainerID] = useState(0);

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

  const addContainer = () => {
    let newContainer = {name:"S3 Bucket",text:["First Label","Next Label"], id:containerID};
    setContainerID(containerID+1);
    let newContainers = [...containers, newContainer];
    setContainers(newContainers);
  }

  const deleteContainer = (id) => {
    let newContainers = containers.filter( (container) => container.id !== id );
    setContainers(newContainers);
  }

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
        className="relative w-full h-3/5 m-4 bg-white flex flex-col-reverse"
      >
        <div className="absolute bottom-0 right-0 m-4">
          <SpeedDialComponent className="max-w-12 w-12" addComponentFunc={addContainer}/>
        </div>
      </div>
        {containers.map((container,index) => (
          <DraggableContainer 
          key={container.id}
          deleteFunc={()=>deleteContainer(container.id)} 
          boundaries={boundaries}
          container={container}>
            <h2>Container number {index + 1}!</h2>
          </DraggableContainer>
        ))}
      </div>
      
    </>
  );

}
