import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DirectionsRenderer, DirectionsService, GoogleMap, InfoWindow, Marker, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { collectWasteAPI, getMachine } from '../services/machine';
import Truck from '../assets/truck.svg'
import dustbin from '../assets/dustbin.svg'
import MachineList from './machineList';
import { getDirectionWastebin } from '../services/driver';
import Loader from '../UI/loader';
import { toast } from 'react-toastify';



export default function MapView() {

    const [currentLocation, setCurrentLocation] = useState();
    const [defaultLocation, setDefaultLocation] = useState({ lat: 10, lng: 96 });
    const [zoom, setZoom] = useState(7);
    const [machines, setMachines] = useState([]);
    const [currentMachine, setCurrentMachine] = useState();
    const [direction, setDirection] = useState();
    const [isDirection, setIsDirection] = useState(false);
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [isShow, setIsShow] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [mapReload, setMapReload] = useState(true);

    const count = useRef(0);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            console.error("Geolocation is not available in your browser.");
        }
        getMachine().then((res => {
            setMachines(res.data.map((dt) => ({ lat: dt.latitude, lng: dt.longitude, storage: dt.storage })))
            if (res.data.length > 0) {
                setDefaultLocation({ lat: res.data[0].latitude, lng: res.data[0].longitude })
            }
        }))



    }, []);

    useEffect(() => {
      count.current = 0
    }, [isStart])
    

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyB_D6SgHRz8T6y2fPiVtAS4uYq0eUfkBUQ'
    })

    const setToCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setDefaultLocation()
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setZoom(18)
            });
        } else {
            console.error("Geolocation is not available in your browser.");
        }

    }

    const collectWasteHandle = () => {
        setIsShow(true)
        if (!currentLocation) {
            toast.error("current Location not found . Pls turn on GPS");
        }
        getDirectionWastebin({
            location: {
                latLng: {
                    latitude: currentLocation.lat,
                    longitude: currentLocation.lng
                }
            }
        }).then(res => {
            console.log(res);
            if (res.status) {
                setOrigin(currentLocation)
                setDestination({ lat: res.data.latitude, lng: res.data.longitude })
                setIsDirection(true)
                setIsShow(false)
                setCurrentMachine(res.data)
                if (res.type === 'User') {
                    setIsUser(true)
                }
            } else {
                setIsDirection(false)
            }
        })
    }

    const directionsCallback = useCallback((
        result,
        status
    ) => {
        
        if (status === "OK" && count.current === 0) {
            count.current++;
            console.count();
            setDirection(result);
        }else{
            isStart && setDirection()
        }
        setIsShow(false)
    },[]);

    const moveToMachine = (machineData) => {
        setDefaultLocation({
            lat: machineData.latitude,
            lng: machineData.longitude,
        });
        setZoom(18)
    }
    const onStart = ()=>{
        if (!isStart) {
            const url = `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${destination.lat},${destination.lng}`
            window.open(url,'_blank');
            setIsStart(true)
            
        }else{
            setIsDirection(false)
            setIsStart(false)
            setDefaultLocation(currentLocation)
            setMapReload(false)
            setIsUser(false)
            collectWasteAPI(currentMachine._id).then((res)=>{
                console.log(res);
                
                if (res.status) {
                    toast.success("Good Job")
                }else{
                    toast.success(res.message)
                }
            })
            setTimeout(() => {
                setMapReload(true)
            }, 200);
        }
    }

    return (

        <div style=
            {{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                height: '100vh', width: '100%'
            }}>
            {
                machines[0]?.lat && isLoaded && mapReload ?
                    <GoogleMap
                        mapContainerStyle={{
                            height: "100%",
                            width: "100%"
                        }}
                        zoom={zoom}
                        center={
                            defaultLocation
                                ? defaultLocation
                                : currentLocation
                        }
                        options={{ streetViewControl: false }}
                    >
                        {
                            machines.map((dt) => {
                                console.log(dt);

                                return (
                                    <MarkerF position={dt}
                                        icon={{
                                            url: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="${dt.storage > 50 ? 'red' : 'black'}"><path d="M432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.9a24 24 0 00-21.5 13.3L136 32H16A16 16 0 000 48v16a16 16 0 0016 16h16l21.2 339.3A48 48 0 00100.8 480h246.4a48 48 0 0047.6-42.7L416 80h16a16 16 0 0016-16V48a16 16 0 00-16-16zM166.9 48h114.3l7.2 14.7H159.7L166.9 48zM368 432H80L59 80h330l-21 352z"/></svg>`,
                                            scaledSize: new window.google.maps.Size(45, 45), // Scale the icon size
                                            anchor: new window.google.maps.Point(10, 10), // Anchor the icon
                                        }}
                                        label={{
                                            text: `${dt.storage}%`, // Show storage percentage as text
                                            color: dt.storage > 50 ? "red" : "black", // Customize label color
                                            fontSize: "12px", // Customize font size
                                            fontWeight: "bold",
                                        }}
                                    //   onClick={() => setSelectedCenter({position,...item})}
                                    />
                                )
                            })
                        }

                        {currentLocation && (
                            <MarkerF
                                position={currentLocation}
                                icon={{
                                    url: Truck,
                                    scaledSize: new window.google.maps.Size(45, 45), // Scale the icon size
                                    anchor: new window.google.maps.Point(20, 20), // Custom icon for current location
                                }}
                            />
                        )}
                        {isDirection &&
                            <DirectionsService
                                options={{
                                    origin: origin,
                                    destination: destination,
                                    travelMode: window.google.maps.TravelMode.DRIVING
                                }}
                                callback={directionsCallback}
                            />}

                        {isDirection && direction && <DirectionsRenderer directions={direction} />}


                        {/* {selectedCenter && <InfoWindow
            onCloseClick={() => {
              setSelectedCenter(null);
            }}
            position={selectedCenter.position}
          >
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <img src={`${selectedCenter.image}`} height={'100px'} width={'100%'} style={{ objectFit: 'cover' }} />
              </Grid>
              <Grid item xs={9} >
                <Stack sx={{ justifyContent: "center", height: '100%' }}>
                  <Typography variant='body2' color={'#000'} sx={{ fontWeight: '500' }}>{selectedCenter.name}</Typography>
                  <Typography variant='body2' color={'#000'} sx={{ fontWeight: '300' }}>{selectedCenter.address}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </InfoWindow>} */}
                    </GoogleMap> : <div className="d-flex v-100 h-100 justify-content-center align-items-center">
                        <h1>Loading...</h1>
                    </div> 
            }
            <div className='current-location-button' onClick={setToCurrentLocation}><i className='fa fa-location-arrow'></i></div>
            <div className='collect-waste-button' onClick={collectWasteHandle}><h3>Collect Waste</h3></div>
            {isDirection && <button className='direction-start' onClick={onStart}>{isStart ? "Collected" : "Start" }</button>}
            {isUser && <button className='call-btn' onClick={()=>{window.open(`tel:${currentMachine.users.mobileNo}`)}}><i className='fa fa-phone'></i></button>}
            {/* <a className='direction-start' target='_blank' >Start</a> */}

            <MachineList machineclick={moveToMachine} />
            <Loader show={isShow} />
        </div>
    );
}
