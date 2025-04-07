import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Assuming req.user is populated with the logged-in user's data from the middleware protectRoute
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }) // Exclude the logged-in user
      .select("--password"); // Excluding password field for security
    // .limit(10);  Limit to 10 users for performance reasons
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users for sidebar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // The ID of the user whose messages we want to fetch
    const senderId = req.user._id; // The ID of the logged-in user

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body; // Extracting text and image from the request body
    const { id: receiverId } = req.params; // The ID of the user to whom the message is being sent
    const senderId = req.user._id; // The ID of the logged-in user

    let imageUrl;
    // Check if an image is provided in the request body
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image); // Upload the image to Cloudinary
      imageUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
    }

    // Create a new message instance
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl, // Use the secure URL of the uploaded image
    });

    // Save the message to the database
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage); // Respond with the saved message
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
