'use client'

import ListResources from "../../queries/ListResources";
import usePostGenerateFile from "../../queries/PostGenerateFile";
import Header from "../components/header";
import { SpeedDialComponent } from "../components/speedDial";
import DraggableContainer from "./draggable_container";
import { useState, useRef, useEffect } from "react";


export default function Design() {
  const designPageRef = useRef(null);
  const [boundaries, setBoundaries] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [containers, setContainers] = useState([]);
  const [containerID, setContainerID] = useState(0);

  const {data: availableResources} = ListResources();

  useEffect(()=>{
    const updateBoundaries = () => {
      setTimeout(()=>{
        if (designPageRef.current) {
          const designRect = designPageRef.current.getBoundingClientRect();
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
    window.addEventListener("resize",updateBoundaries);
    return ()=> window.removeEventListener("resize",updateBoundaries);
  }, []);

  const addContainer = () => {
    let newContainer = {resource_type:"S3 Bucket", id:containerID};
    setContainerID(containerID+1);
    setContainers([...containers, newContainer]);
  }

  const deleteContainer = (id) => {
    let newContainers = containers.filter( (container) => container.id !== id );
    setContainers(newContainers);
  }
  
  const mutation = usePostGenerateFile({resources:containers,provider:"aws"});
  const generateFile = async () => {
    try{
      await mutation.mutate();
    }catch(error){
      console.error("Error:"+ error);
    }
  }



  return (
    <>
      <Header/>

      <div 
    className="relative flex items-center justify-center w-full h-screen bg-gradient-to-br from-[#F7F4FA] to-white font-nunito text-[#2D2D2D]"
  >
    
    <div
      ref={designPageRef}
      className="overflow-hidden relative w-full h-[60vh] m-4 bg-gray-400 flex flex-col-reverse rounded-lg shadow p-4 max-w-5xl"
    >
      <div className="absolute bottom-0 right-0 m-4">
        <SpeedDialComponent 
          className="max-w-12 w-12"
          addComponentFunc={addContainer}
          generateFileFunc={()=>generateFile(containers)}
        />
      </div>
    {containers.map((container) => (
      <DraggableContainer
        key={container.id}
        deleteFunc={() => deleteContainer(container.id)}
        boundaries={boundaries}
        container={container}
        availableResources={availableResources.data}
        designPageRef={designPageRef}
      />
    ))}
        </div>

  </div>
</>
  );

}
