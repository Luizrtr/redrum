import mongoose, { Schema, models } from "mongoose"

const servicesTypesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    is_enabled: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

const ServicesTypes =
  models.ServicesTypes || mongoose.model("ServicesTypes", servicesTypesSchema)
export default ServicesTypes
