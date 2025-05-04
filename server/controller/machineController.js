const Machine = require("../model/machineModel");
const Request = require("../model/requestModel");
const SettingsModel = require("../model/settings");
const User = require("../model/userModel");

const { firebaseDatabase } = require("../util/firebase-conn");
const client = require("../util/whatsapp-web");

const machinFullNotification = async (clients) => {
    const machines = await Machine.find();
    const settings = await SettingsModel.findOne(); // use findOne() if only one settings doc
  
    if (!settings?.notifi_number) {
      console.error("No notification number found in settings");
      return;
    }
  
    const NotificationNumber = `91${settings.notifi_number}`;
    console.log("NotificationNumber", NotificationNumber);
  
    for (const machine of machines) {
      const dataRef = firebaseDatabase.ref(`${machine.machineId}/status`);
  
      dataRef.on("value", async (snapshot) => {
        const data = snapshot.val();
        console.log(`Data from ${machine.machineId}:`, data);
  
        if (data == "100") {
          if (!clients.pupPage) {
            console.error("WhatsApp client is not ready.");
            return;
          }
  
          try {
            await clients.sendMessage(
              `${NotificationNumber}@c.us`,
              `Hello Admin, the machine ${machine.machineId} is full. Please collect the waste.`
            );
            console.log(`Alert sent for machine ${machine.machineId}`);
          } catch (err) {
            console.error("Error sending message:", err);
          }
        }
      });
    }
  };


const addMachine = async (req, res, next) => {
  const { machineId } = req.body;

  // Validate machineId
  if (!machineId) {
    return res
      .status(400)
      .json({ status: false, error: "Machine ID is required." });
  }

  try {
    // Check if the machineId already exists in MongoDB
    const existingMachine = await Machine.findOne({ machineId });
    if (existingMachine) {
      return res.status(400).json({
        status: false,
        error: `Machine ID '${machineId}' already exists. Please choose a different ID.`,
      });
    }

    const machine = new Machine(req.body);
    await machine.save(); // Save to MongoDB

    await firebaseDatabase.ref(machineId).set({ status: 0 }); // Set initial status in Firebase

    res.status(201).json({
      status: true,
      data: machine,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error saving machine",
      error: error.message,
    });
  }
};

const getMachine = async (req, res, next) => {
  try {
    // Fetch machines from MongoDB
    const machines = await Machine.find();
    const settings = await SettingsModel.find();
    var NotificationNumber = "";
    if (!settings[0].notifi_number) {
      NotificationNumber = `91${settings[0].notifi_number}`;
    }

    // Use Promise.all to resolve all promises in the map
    const dt = await Promise.all(
      machines.map(async (machine) => {
        const dataRef = firebaseDatabase.ref(`${machine.machineId}/status`);

        dataRef.on("value", (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Process the data and trigger an alert if necessary
            if (data == "100") {
              client.sendMessage(
                NotificationNumber,
                `Hello Admin, the machine ${machine.machineId} is full. Please collect the waste.`
              );
            }
          }
        });
        const snapshot = await firebaseDatabase
          .ref(`${machine.machineId}/status`)
          .once("value");
        const storage = snapshot.val();
        return {
          ...machine._doc,
          storage,
        };
      })
    );

    res.status(200).json({
      status: true,
      data: dt,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching data",
      error: error.message,
    });
  }
};

const updateMachine = async (req, res, next) => {
  const { machineId } = req.body;

  // Validate machineId

  try {
    // Fetch and update the machine in MongoDB
    const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!machine) {
      return res
        .status(404)
        .json({ status: false, error: "Machine not found." });
    }

    res.status(200).json({
      status: true,
      data: machine,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating data",
      error: error.message,
    });
  }
};

const deleteMachine = async (req, res, next) => {
  try {
    const machine = await Machine.findById(req.params.id);

    // Validate machine existence
    if (!machine) {
      return res
        .status(404)
        .json({ status: false, error: "Machine not found." });
    }

    const { machineId } = machine;

    // Validate machineId

    await Machine.findByIdAndDelete(req.params.id); // Delete from MongoDB
    await firebaseDatabase.ref(machineId).remove(); // Remove from Firebase

    res.status(200).json({
      status: true,
      data: machine,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error deleting data",
      error: error.message,
    });
  }
};

const collectMachineWaste = async (req, res, next) => {
  try {
    const machine = await Machine.findById(req.params.id);
    const request = await Request.findById(req.params.id);

    if (!machine && !request) {
      return res.status(404).json({ status: false, error: "Data not found." });
    }

    if (machine) {
      const updated = await Machine.findByIdAndUpdate(
        machine.id,
        { last_collect: new Date() },
        { new: true }
      );

      if (updated) {
        res.status(200).json({
          status: true,
          data: machine,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "not updated some error",
        });
      }
    } else {
      const updated = await Request.findByIdAndUpdate(
        request.id,
        { status: "Collected" },
        { new: true }
      );
      const machine = await Machine.findById(request.machineId);
      const settings = await SettingsModel.find();
        var NotificationNumber = "";
        if (settings[0].notifi_number) {
          NotificationNumber = `91${settings[0].notifi_number}@c.us`;
        }
        await client.sendMessage(
          NotificationNumber,
          `Hello Admin, the machine ${machine.machineId} has been collected.`
        );
      const user = await User.findById(request.users);
      const response = await client.sendMessage(
        `91${user.mobileNo}@c.us`,
        `Hello ${user.firstName}, your Waste Collect Request status has been updated to ${req.body.status}.`
      );
      console.log("Message sent:", response);
      if (updated) {
        res.status(200).json({
          status: true,
          data: updated,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "not updated some error",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Collecting Waste",
      error: error.message,
    });
  }
};

module.exports = {
  addMachine,
  getMachine,
  updateMachine,
  deleteMachine,
  collectMachineWaste,
  machinFullNotification
};
