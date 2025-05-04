const Machine = require('../model/machineModel');
const Request = require('../model/requestModel');
const User = require('../model/userModel');
const client = require('../util/whatsapp-web');

const AddRequest = async (req, res, next) => {
    try {
        const request = new Request(req.body)
        await request.save()

        res.status(201).json({
            status: true,
            message: "request successfully",
            data: request // Return the saved driver object
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error adding ',
            error: error.message
        });
    }
}

const getRequest = async (req, res, next) => {
    try {
        const requests = await Request.find().populate({
            path: 'users',
            select:
              'firstName lastName mobileNo address email ',
          }).exec();

        res.status(200).json({
            status: true,
            data: requests 
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error fetching data',
            error: error.message
        });
    }
};


const getRequestById = async (req, res, next) => {
    try {

        const requests = await Request.find({users:req.params.id});

        res.status(200).json({
            status: true,
            data: requests 
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error fetching data',
            error: error.message
        });
    }
};

const updateRequestStatus = async (req, res, next) => {
    try {
        const requests = await Request.findByIdAndUpdate(req.params.id,req.body,{new:true});
        const user = await User.findById(requests.users)
        const response = await client.sendMessage(`91${
            user.mobileNo
        }@c.us`, `Hello ${user.firstName}, your Waste Collect Request status has been ${req.body.status}.`);
        console.log('Message sent:', response);

        console.log(req.body);
        
        if (!requests) {
            return res.status(404).json({ status: false, error: 'Request not found.' });
        }

        res.status(200).json({
            status: true,
            data: requests 
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error status update',
            error: error.message
        });
    }
};

module.exports = { AddRequest, getRequest, getRequestById,updateRequestStatus };