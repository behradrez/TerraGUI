'use client'

import ListResources from "../../queries/ListResources";
import Header from "../components/header";
import { SpeedDialComponent } from "../components/speedDial";
import DraggableContainer from "./draggable_container";
import { useState, useRef, useEffect } from "react";


export default function Design() {
  const containerRef = useRef(null);
  const [boundaries, setBoundaries] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [containers, setContainers] = useState([]);
  const [containerID, setContainerID] = useState(0);

  const {data: availableResources, isLoading, isError} = ListResources();

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

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error loading resources</div>
  }


  return (
    <>
      <Header/>

      <div 
    className="relative flex items-center justify-center w-full h-screen bg-gradient-to-br from-[#F7F4FA] to-white font-nunito text-[#2D2D2D]"
  >
    
    <div
      ref={containerRef}
      className="overflow-hidden relative w-full h-[60vh] m-4 bg-gray-400 flex flex-col-reverse rounded-lg shadow p-4 max-w-5xl"
    >
      <div className="absolute bottom-0 right-0 m-4">
        <SpeedDialComponent 
          className="max-w-12 w-12"
          addComponentFunc={addContainer}
        />
      </div>
    {containers.map((container, index) => (
      <DraggableContainer
        key={container.id}
        deleteFunc={() => deleteContainer(container.id)}
        boundaries={boundaries}
        container={container}
        availableResources={availableResources.data}
        containerRef={containerRef}
      />
    ))}
        </div>

  </div>
</>
  );

}
