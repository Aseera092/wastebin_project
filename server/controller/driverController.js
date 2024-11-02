const Driver = require("../model/driverModel");
const Machine = require("../model/machineModel");
const Request = require("../model/requestModel");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { firebaseDatabase } = require("../util/firebase-conn");

const { RoutesClient } = require('@googlemaps/routing').v2;

const routingClient = new RoutesClient({
    keyFilename: './my-project-11472-1728468919587-a50c58416484.json',
});

const AddDriver = async (req, res, next) => {
    try {
        console.log(req.body);
        
        // Validate password and confirmPassword
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                status: false,
                message: "Passwords do not match"
            });
        }

        // Check if a driver with the same mobile already exists
        const existingNumber = await Driver.findOne({ mobileNo: req.body.mobileNo });
        if (existingNumber) {
            return res.status(400).json({
                status: false,
                message: "Mobile Already exists"
            });
        }
        // Check if a driver with the same email already exists
        const existingEmail = await Driver.findOne({ emailId: req.body.emailId });
        if (existingEmail) {
            return res.status(400).json({
                status: false,
                message: "Email Already exists"
            });
        }
        // Check if a driver with the same vehicle number already exists
        const existingVehicleNo = await Driver.findOne({ emailId: req.body.vehicleNo });
        if (existingVehicleNo) {
            return res.status(400).json({
                status: false,
                message: "Vehicle Number Already exists"
            });
        }

        // Create a new driver instance
        const driver = new Driver(req.body);
        await driver.save(); // Wait for the save to complete

        res.status(201).json({
            status: true,
            message: "Driver added successfully",
            data: driver // Return the saved driver object
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error adding driver',
            error: error.message
        });
    }
}

const getDriver = async (req, res, next) => {
    try {
        // Fetch all Drivers from MongoDB
        const drivers = await Driver.find();

        res.status(200).json({
            status: true,
            data: drivers // Return the list of drivers
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error fetching data',
            error: error.message
        });
    }
};

const updateDriver = async (req, res, next) => {
    try {
        // Fetch and update Driver by ID
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!driver) {
            return res.status(404).json({
                status: false,
                message: 'Driver not found'
            });
        }

        res.status(200).json({
            status: true,
            message: "Driver updated successfully",
            data: driver // Return the updated driver object
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error updating driver data',
            error: error.message
        });
    }
};

const deleteDriver = async (req, res, next) => {
    try {
        // Find and delete the driver by ID
        const driver = await Driver.findByIdAndDelete(req.params.id);

        if (!driver) {
            return res.status(404).json({
                status: false,
                message: 'Driver not found'
            });
        }

        res.status(200).json({
            status: true,
            message: "Driver deleted successfully",
            data: driver // Return the deleted driver object
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error deleting driver',
            error: error.message
        });
    }
};




async function callComputeRoutes(origin, destination) {
    // Construct request
    const request = {
        origin: { location: { latLng: origin.latLng } },
        destination: { location: { latLng: destination.latLng } },
        travelMode: 'DRIVING',
        routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false,
        },

        computeAlternativeRoutes: false,
        // Provide FieldMask to specify what fields should be returned
        routeLabels: ['ROUTE_LABEL_PREFERRED'],
        travelMode: 'DRIVE',
        // Include required fields for the response
        routeObjective: {
            unit: 'METRIC'
        },
    };

    // Run request
    const response = await routingClient.computeRoutes(request, {
        otherArgs: {
            headers: {
                "X-Goog-FieldMask": "*",
            },
        },
    });

    // console.log(response[0].routes[0].distanceMeters);
    return response[0].routes[0] ? response[0].routes[0].distanceMeters : undefined
}

const machineDirection = async (req, res, next) => {
    const storageLimit = 0 //Waste collection Limit that can be updated
    try {
        // Get current location from request body
        console.log(req.body);
        
        const currentLocation = req.body.location;
        console.log('Current Location:', currentLocation);
        const machines = await Machine.find()
        let shortDistance = 0
        let shortDistanceMachine = undefined
        let machineUser = ""
        if (!currentLocation || !currentLocation.latLng) {
            throw new Error("Invalid location format. Expecting { latLng: { latitude, longitude } }");
        }

        if (machines) {
            // Use Promise.all to resolve all promises in the map
            const mech = await Promise.all(machines.map(async (machine) => {
                const snapshot = await firebaseDatabase.ref(`${machine.machineId}/status`).once('value');
                const storage = snapshot.val();
                if (storage >= storageLimit) {
                    return {
                        ...machine._doc,
                        storage
                    };
                }
            }));
            const filteredMech = mech.filter(machine => machine !== undefined && machine !== null);
            console.log(filteredMech);
            
            for (const dt of filteredMech) {
                console.log("latitude", dt.latitude, "longitude", dt.longitude);

                const distance = await callComputeRoutes(currentLocation,
                    { latLng: { latitude: dt.latitude, longitude: dt.longitude } }
                );

                if (distance && shortDistance == 0) {
                    shortDistance = distance
                    shortDistanceMachine = dt
                }
                if (distance && shortDistance > distance) {
                    shortDistance = distance
                    shortDistanceMachine = dt
                }
                console.log(distance);
                console.log("short distance", shortDistance);
                machineUser = "Machine"
                // console.log("short distance machine",shortDistanceMachine);
            }
        }

        const requests  = await Request.find({status:"Approved"}).populate('users').exec();

        for (const dt of requests) {
            console.log("latitude", dt.latitude, "longitude", dt.longitude);

            const distance = await callComputeRoutes(currentLocation,
                { latLng: { latitude: dt.latitude, longitude: dt.longitude } }
            );

            if (distance && shortDistance == 0) {
                shortDistance = distance
                shortDistanceMachine = dt
            }
            if (distance && shortDistance > distance) {
                shortDistance = distance
                shortDistanceMachine = dt
            }
            console.log(distance);
            console.log("short distance", shortDistance);
            machineUser = "User"
            // console.log("short distance machine",shortDistanceMachine);
        }
        
        if (shortDistanceMachine) {
            res.status(200).json({
                status: true,
                message: "Route computed successfully",
                type:machineUser,
                data: shortDistanceMachine
            });
        }else{
            res.status(200).json({
                status: false,
                message: "There is no waste found to collect waste",
            });
        }
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Route error',
            error: error.message
        });
    }
};

const driverLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const driver = await Driver.findOne({ emailId:username });
        
        if (!driver) return res.status(404).json({ error: 'User not found' });

        // Check password
        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: driver._id }, "ASEERA123456", { expiresIn: '1h' });

        res.status(200).json({status:true, token, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({status:false, error: 'Login failed' });
        console.log(err);
        
    }
}



module.exports = { AddDriver, getDriver, updateDriver, deleteDriver, machineDirection, driverLogin };
