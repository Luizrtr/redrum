import mongoose, { Schema, models } from "mongoose";

const salesSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service_id: {
      type: Schema.Types.ObjectId,
      ref: "Services",
      required: true,
    },
    name_client: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Sales = models.Sales || mongoose.model("Sales", salesSchema);
export default Sales;
