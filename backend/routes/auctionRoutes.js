const express = require("express");
const multer = require("multer");
const {
	createAuctionItem,
	getAuctionItems,
	updateAuctionItem,
	deleteAuctionItem,
	getAuctionItemById,
	getAuctionItemsByUser,
	getAuctionWinner,
	getAuctionsWonByUser,
} = require("../controllers/auctionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this path is correct relative to the backend folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage });

// Use multer as middleware for creating auction items
router.route("/")
	.get(getAuctionItems)
	.post(authMiddleware, upload.single('image'), createAuctionItem);

router.post("/user", authMiddleware, getAuctionItemsByUser);
router.get("/winner/:id", authMiddleware, getAuctionWinner);
router.post("/won", authMiddleware, getAuctionsWonByUser);

router
	.route("/:id")
	.get(authMiddleware, getAuctionItemById)
	.put(authMiddleware, updateAuctionItem)
	.delete(authMiddleware, deleteAuctionItem);

module.exports = router;
