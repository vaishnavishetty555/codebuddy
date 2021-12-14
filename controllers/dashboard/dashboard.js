const questions = require('../../model/questionSchema')

module.exports.adding = async (req, res) => {
    try {
        // console.log(22)
        const { question, tag, usn } = req.body
        await questions.create({ question: question, tag: tag, usn: '111', comment: [] })
        res.status(200).json();
    }
    catch (e) {
        console.log(e)
    }
}

module.exports.allquerydash = async (req, res) => {
    try {
        const result = await questions.find({})
        return result;
    }
    catch (e) {
        console.log(e)
    }
}

module.exports.singlequery = async (req, res) => {
    try {
        // console.log(req)
        console.log(222, req.query.id);
        const result = await questions.findOne({ _id: req.query.id })
        // console.log(result)
        return result;
    }
    catch (e) {
        console.log(e)
    }
}
module.exports.addcomment = async (req, res) => {
    try {
        // console.log(req)
        console.log(222, req.query.id);
        const result = await questions.findOne({ _id: req.query.id })
        if (!result) {
            res.status(400).json();
            return
        }
        console.log(result)
        result.comment.push({ text: req.body.text, usn:'111'})
        await result.save();
        res.status(200).json();
        return;

    }
    catch (e) {
        console.log(e)
    }
}

