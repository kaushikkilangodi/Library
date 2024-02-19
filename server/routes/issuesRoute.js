const router = require("express").Router();
const Issue = require('../models/issuesModel');
const Book = require('../models/booksModel');
const authMiddleware = require('../middlewares/authMiddleware');


//issue a book
router.post('/issue-new-book', authMiddleware, async (req, res) => {
    try {

        //avaialble copies must be decreased by 1
        await Book.findOneAndUpdate(
            { _id: req.body.book },

            { $inc: { availableCopies: -1 } }
        );

        //issue a bookk to patron
        const newIssue = new Issue(req.body);
        await newIssue.save();
        return res.send({
            success: true,
            message: "Book issued successfully",
            data: newIssue,

        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})

//get  issues
router.post("/get-issues", authMiddleware, async (req, res) => {
    try {

        delete req.body.userIdFromToken;

        const issues = await Issue.find(req.body).populate("book").populate("user").sort({issueDate: -1});
        return res.send({
            success: true,
            message: "Issues fetched successsfully",
            data: issues,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
})

//return a book

router.post("/return-book", authMiddleware, async (req, res) => {
    try {
        //inventory adjustment(available cpies must be incremented by 1)
        await Book.findOneAndUpdate(
            {
                _id: req.body.book,
            },
            {
                $inc: { availableCopies: 1 },
            }


        );
        //return a book  update issue record
        await Issue.findOneAndUpdate(
            {
                _id:req.body._id,
            },
            req.body
        )
        return res.send({
            success:true,
            message:"Book returned Successfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
}
);

//delete a book
router.post("/delete-issue",authMiddleware,async(req,res)=>{
})


//edit an issue
router.post("/edit-issue", authMiddleware, async (req, res) => {
    try {
      await Issue.findOneAndUpdate({
        _id: req.body._id,
      }, req.body);
      res.send({ success: true, message: "Issue updated successfully" });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  });
module.exports = router;