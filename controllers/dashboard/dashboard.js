const questions = require('../../model/questionSchema')
const Profile = require("../../model/profileSchema");

module.exports.adding = async (req, res) => {
    try {
        // console.log(22)
        const { question, tag, usn } = req.body
        // console.log(usn);
        await questions.create({ question: question, tag: tag, usn: usn, comment: [] })
        res.status(200).json();
    }
    catch (e) {
        console.log(e)
    }
}

module.exports.allquerydash = async (req, res) => {
    try {
        if (req.query.id == 'n') {
            const result = await questions.find({}).sort({ createdAt: -1 });
            var a = [];
            result.forEach((element) => {
                // console.log(element);
                let b = {};
                b._id = element._id;
                b.question = element.question;
                b.tag = element.tag;
                b.usn = element.usn;
                b.name = "";
                b.comment = element.comment;
                b.createdAt = element.createdAt.toString().slice(3, 16)
                // console.log(2222, b.createdAt);
                a.push(b);
            });

            var profile = await Profile.find();
            a.forEach(e => {
                let k = profile.map(j => {
                    if (j.usn == e.usn) {
                        e.name = j.name;
                    }
                })
            })
            return a;
        }


        var result = await questions.find({});
        var a = [];
        result.forEach((element) => {
            // console.log(element);
            let b = {};
            b._id = element._id;
            b.question = element.question;
            b.tag = element.tag;
            b.usn = element.usn;
            b.name = "";
            b.comment = element.comment;
            b.createdAt = element.createdAt.toString().slice(3, 16)
            // console.log(2222, b.createdAt);
            a.push(b);
        });

        var profile = await Profile.find();
        a.forEach(e => {
            let k = profile.map(j => {
                if (j.usn == e.usn) {
                    e.name = j.name;
                }
            })
        })

        // console.log("aaa", a)
        return a;
    }
    catch (e) {
        console.log(e)
    }
}


module.exports.singlequery = async (req, res) => {
    try {
        // console.log(req)
        // console.log(222, req.query.id);
        const result = await questions.findOne({ _id: req.query.id })
        // console.log(result)
        // console.log(result.comment)

        var a = [result];
        console.log("a",a)
        console.log("b.push(a)",result)
        result.comment.forEach((element) => {
            // console.log(element);
            let b = {};
            b._id = element._id;
            b.usn = element.usn;
            b.name = "";
            b.text = element.text;
            b.createdAt = element.createdAt.toString().slice(3, 16)
            // console.log(2222, b.createdAt);
            a.push(b);
            // console.log(a)
        });

        var profile = await Profile.find();
        a.forEach(e => {
            let k = profile.map(j => {
                if (j.usn == e.usn) {
                    e.name = j.name;
                }
            })
        })
        console.log("A", a)
        return a;
    }
    catch (e) {
        console.log(e)
    }
}
module.exports.addcomment = async (req, res) => {
    try {
        // console.log(req)
        
        // console.log(222, req.query.id);
        const result = await questions.findOne({ _id: req.query.id })
        if (!result) {
            res.status(400).json();
            return
        }
        // console.log(result)
        const { usn } = req.body
        // console.log(usn)
        result.comment.push({ text: req.body.text, usn: usn })
        await result.save();
        res.status(200).json();
        return;

    }
    catch (e) {
        console.log(e)
    }
}

