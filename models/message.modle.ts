import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sender: {
        type: String,
        required: true,
        enum: ["user", "bot"]
    },
    text: {
        type: String,
        required: true
    },
    stats: {
        type: {
            likes: [Number],
            shares: [Number],
            comments: [Number],
            avg_sentiment_score: [Number]
        },
        default: {},
        required: false
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;