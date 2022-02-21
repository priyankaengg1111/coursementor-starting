var studentScoreModel = require('../models/studentScoreModel.js');
var studentModel = require('../models/studentModel')
/**
 * studentScoreController.js
 *
 * @description :: Server-side logic for managing studentScores.
 */
module.exports = {
    /**
     * studentScoreController.show()
     */
    show: function (req, res) {
        var studentData = res.locals.student;
   
        
        studentModel.findOne({_id:studentData._id},async (err,student)=>{
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when getting student',
                });
            }
            if (!student) {
                return res.status(404).json({
                    success:false,
                    message: 'No such student'
                });
            }
            try{
                var studentScore = await studentScoreModel.findOne({_id:student.studentScore});
                return res.json({
                    success:true,
                    studentScore:studentScore
                });
            }
            catch(e){
                return res.status(404).json({
                    success:false,
                    message: 'Error to fetch student information',
                    error: e
                });
            }
        })
    },

    /**
     * studentScoreController.update()
     */
    update: function (req, res) {
        var studentData = res.locals.student;
        studentModel.findOne({_id: studentData._id}, function (err, student) {
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
            studentScoreModel.findOne({_id: student.studentScore}, async function (err, studentScore) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting studentScore',
                        error: err
                    });
                }

                if (!studentScore) {
                   studentScore = new studentScoreModel()
                }

                studentScore.marks = req.body.marks ? req.body.marks : studentScore.marks;
                studentScore.englishProficiency = req.body.englishProficiency ? req.body.englishProficiency : studentScore.englishProficiency;
                studentScore.gre = req.body.gre ? req.body.gre : studentScore.gre;
                studentScore.sat = req.body.sat ? req.body.sat : studentScore.sat;
                
                try{
                    await studentScore.save();
                    student.studentScore = studentScore._id;
                    console.log(studentScore)
                    student.save(function (err, student) {
                            if (err) {
                                return res.status(500).json({
                                    success:false,
                                    message: 'Error when updating student.',
                                    error: err
                                });
                            }
                            return res.json({
                            success:true,
                            message:"Student Score Updated"
                        });
                    });
                }
                catch(e){
                    return res.status(500).json({
                        success:false,
                        message: 'Error saving student information',
                        error: e
                    });
                }
            });
        });
    },

    /**
     * studentScoreController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentScoreModel.findByIdAndRemove(id, function (err, studentScore) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentScore.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
