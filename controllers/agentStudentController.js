const agentModel = require('../models/agentModel.js');
const studentModel = require('../models/studentModel.js');

/**
 * agentStudentController.js
 *
 * @description :: Server-side logic for managing agentStudents.
 */
module.exports = {

    /**
     * agentStudentController.list()
     */
    list: async function (req, res) {
        var agentData = res.locals.agent;
        var students = await studentModel.find({_id:{$in:agentData.students}});
        if(!students){
            return res.status(400).json({
                success:false,
                message:"Some error occured fetching student"
            })
        }

        return res.status(200).json({
            success:true,
            students
        })
    },

    /**
     * agentStudentController.create()
     */
    create: async function (req, res) {
        var agentData = res.locals.agent;
        var data = await studentModel.findOne({email:req.body.email});
        console.log(data)        
        if(data){
            return res.status(400).json({
                success:false,
                message:"already exist student"
            })
        }

        var newStudent = new studentModel({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone
        });

        try{
            
            await newStudent.save();
            var agent = await agentModel.findOne({_id:agentData._id});
            if(!agent){
                return res.status(400).json({
                    success:false,
                    message:"cannot find agent"
                })
            }
            if(!agent.students){
                agent.students=[];
            }
            agent.students.push(newStudent._id);
            try{
                await agent.save();
                return res.status(200).json({
                    success:true,
                    message:"student has been saved",
                    id:newStudent._id
                })
            }
            catch(e){
                return res.status(400).json({
                    success:false,
                    message:"cannot create student"
                })
            }
        }
        catch(e){
            return res.status(400).json({
                success:false,
                message:"cannot create student"
            })
        }
    },
    /**
     * agentStudentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentModel.findByIdAndRemove(id, function (err, agentStudent) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when deleting the agentStudent.',
                    error: err
                });
            }

            return res.status(204).json({
                sucess:true,
                message:"Sucessfully Deleted"
            });
        });
    }
};
