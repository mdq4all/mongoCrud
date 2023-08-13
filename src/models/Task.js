import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es requerido"],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, "La descripcion es requerida"],
    trim: true,
    minLength: [3, "Al menos debe tener 3 caracteres"],
    maxLength: [50, "No puede tener mas de 30 caracteres"],
  }
},{
    timestamps: true
  });

export default models.Task || model('Task', taskSchema , 'tasks3')
