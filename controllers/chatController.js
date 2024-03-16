const Message = require("../models/message"); 

exports.sendMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { sender, receiver, content, media } = req.body; 
    const newMessage = new Message({ sender, receiver, content, media });
    await newMessage.save();

   

    res.json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
     console.log()
    const messages = await Message.find({
      $or: [{ sender: chatId }, { receiver: chatId }],
    }).sort({ createdAt: 1 }); // Sort messages 

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
