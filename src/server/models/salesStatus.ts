import mongoose, { Schema, models } from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

// Inicialize a fábrica de auto-incremento
const AutoIncrement = AutoIncrementFactory(mongoose);

const salesStatusTypesSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
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
);

// Aplica o plugin de auto-incremento ao schema
salesStatusTypesSchema.plugin(AutoIncrement, { inc_field: 'id' });

const SalesStatus =
  models.SalesStatus || mongoose.model("SalesStatus", salesStatusTypesSchema);
export default SalesStatus;