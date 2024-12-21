import {SpeedDial, SpeedDialIcon, SpeedDialAction} from "@mui/material"
import { Save, Add } from "@mui/icons-material"


export const SpeedDialComponent = ({addComponentFunc, generateFileFunc}) => {

    const actions = [
        { icon: <Add/>, name: "Add Component", action: addComponentFunc  },
        { icon: <Save/>, name: "Generate File", action: generateFileFunc },
    ];

    return (  
        <SpeedDial
        icon={<SpeedDialIcon/>}
        ariaLabel="speedDial"
        >
            {actions.map( (action)=> (
                <SpeedDialAction
                key={action.name}
                tooltipTitle={action.name}
                tooltipOpen
                icon={action.icon}
                aria-label="speedDial"
                onClick={action.action}
                />
            ))}
        </SpeedDial>
    )
}