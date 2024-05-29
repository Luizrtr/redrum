import mongoose, { Schema, models } from "mongoose";

const salesSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Services",
      required: true,
    },
    name_client: {
      type: String,
      required: true,
    },
    email_client: {
      type: String,
      required: true,
    },
    description_client: {
      type: String,
      required: true,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "SalesStatus",
      required: true,
    },
  },
  { timestamps: true }
);

const Sales = models.Sales || mongoose.model("Sales", salesSchema);
export default Sales;
