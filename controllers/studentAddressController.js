var StudentaddressModel = require('../models/studentAddressModel.js');
const StudentModel = require('../models/studentModel.js');

/**
 * studentAddressController.js
 *
 * @description :: Server-side logic for managing studentAddresss.
 */
module.exports = {
    /**
     *studentAddressController.show()
    */
    show: function (req, res) {
        var student = res.locals.student;
        StudentaddressModel.findOne({_id: student.studentAddress}, function (err, studentAddress) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting studentAddress.',
                    error: err
                });
            }
            if (!studentAddress) {
                return res.status(404).json({
                    success:false,
                    message: "No such studentAddress"
                });
            }
            return res.status(200).json({
                success:true,
                studentAddress:studentAddress});
        });
    },

    /**
     * studentAddressController.update()
     */
    update: function (req, res) {
        var studentData = res.locals.student;
        StudentModel.findOne({_id:studentData._id},(err,student)=>{
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting student',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    success:false,
                    message: 'No such student'
                });
            }

            StudentaddressModel.findOne({_id: student.studentAddress}, async function (err, studentAddress) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when getting studentAddress',
                        error: err
                    });
                }
                console.log(studentAddress)
                if (!studentAddress) {
                   studentAddress = new StudentaddressModel();
                }
                studentAddress.country = req.body.country ? req.body.country : studentAddress.country;
                studentAddress.state = req.body.state ? req.body.state : studentAddress.state;
                studentAddress.city = req.body.city ? req.body.city : studentAddress.city;
                studentAddress.address = req.body.address ? req.body.address : studentAddress.address;
                studentAddress.zipcode = req.body.zipcode ? req.body.zipcode : studentAddress.zipcode;
                studentAddress.communication_address = req.body.communication_address ? req.body.communication_address : studentAddress.communication_address;
                try{
                    await studentAddress.save();
                    student.studentAddress = studentAddress._id;
                    console.log(studentAddress)
                    student.save(function (err, student) {
                            if (err) {
                                return res.status(500).json({
                                    success:false,
                                    message: 'Error when updating student.',
                                    error: err
                                });
                            }
                            return res.status(200).json({
                            success:true,
                            message:"Student Address updated"
                        });
                    });
                }
                catch(e){
                    return res.status(500).json({
                        success:false,
                        message: 'Error when updating studentAddress.',
                        error: err
                    });
                }
            });
        })
    },
};
