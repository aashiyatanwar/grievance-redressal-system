const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    detail: { type: String},
    dateOfSubmission: { type: Date, default: Date.now },
    remarks: { type: String },
    dateOfRedressal: { type: Date },
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("grievance", grievanceSchema);
