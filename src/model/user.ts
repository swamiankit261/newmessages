import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
};

export interface Iuser extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean,
    isAcceptingMessages: boolean;
    messages: Message[];
};

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, "message content is required"],
        trim: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const UserSchema: Schema<Iuser> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: [true, 'username shuld be unique'],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, 'email shuld be unique'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please give me a valid email Id'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: [true, 'verify Code is required']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'verify code expriy is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]
});


const userModel = (mongoose.models.User as mongoose.Model<Iuser>) || mongoose.model<Iuser>("User", UserSchema);

export default userModel;