import mongoose, { Schema, models } from "mongoose";

const servicesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "ServicesTypes",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    is_enabled: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Services = models.Services || mongoose.model("Services", servicesSchema);
export default Services;
