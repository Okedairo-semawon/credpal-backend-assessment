import mongoose, {Schema, Document} from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    inStock: boolean;
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    name: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    description: {type: String, required: true},
    inStock: {type: Boolean, default: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true},)

export const Product = mongoose.model<IProduct>("Product", ProductSchema);