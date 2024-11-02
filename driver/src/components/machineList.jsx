import React, { useEffect, useState } from 'react'
import Drawer from "react-bottom-drawer";
import { getMachine } from '../services/machine';

export default function MachineList({ machineclick }) {
    const [isShow, setIsShow] = useState(false)
    const [machines, setMachines] = useState([])

    useEffect(() => {
        getMachine().then((res) => {
            if (res.status) {
                setMachines(res.data)
            }
        })
    }, [])


    const closeDrawer = () => {
        setIsShow(false)
    }
    return (
        <div className='dustbin-list'>
            <button type="button" class="btn btn-primary view-btn" onClick={() => { setIsShow(true) }}>
                Dustbins
            </button>

            <Drawer
                duration={250}
                hideScrollbars={true}
                onClose={closeDrawer}
                isVisible={isShow}
                
                >
                <div>
                    <h3>Machines</h3>
                    <div className='machines-view-list'>
                        {
                            machines.map((dt) => {
                                return (
                                    <button className='btn' onClick={() => {
                                        machineclick && machineclick(dt);
                                        closeDrawer()
                                    }}>{dt.machineId}</button>
                                )
                            })
                        }
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
