import mongoose, {Schema, Document} from "mongoose";
import { isEmail } from "validator";
export interface IUser extends Document {
    fullname: string;
    email: string;
    password: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    fullname: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    email: {type: String, required: true, lowercase: true, unique: true, Validate: [isEmail, "Please enter a valid email address"] },
}, {timestamps: true},)

export const UserModel = mongoose.model<IUser>("User", UserSchema);

