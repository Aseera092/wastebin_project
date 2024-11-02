import React from 'react'
import { Commet} from 'react-loading-indicators';

export default function Loader({show = false}) {

    if (show) {
        return (
            <div style={{
                position:"absolute",
                top:0,
                left:0,
                width:'100%',
                height:'100vh',
                background: '#0008',
                zIndex:99999,
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Commet color="#32cd32" size="medium" text="" textColor="" />
            </div>
          )
    }
}
