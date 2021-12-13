const questions = require('../../model/questionSchema')

module.exports.adding = async (req, res) => {
    try {
        console.log(22)
        const { question, tag, usn } = req.body
        await questions.create({ question: question, tag: tag, usn: '111', comment: [] })
        res.status(200).json();
    }
    catch (e) {
        console.log(e)
    }
}

module.exports.allquery = async (req, res) => {
    try {


       const result= await questions.find({})
        return result;
    }
    catch (e) {
        console.log(e)
    }
}