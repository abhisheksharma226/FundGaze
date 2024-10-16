const { Schema, model } = require("mongoose");

const multiFormSchema = new Schema({
    founderName: {
        type: String, 
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    jobStatus: {
        type: String,
    },
    founderStake: {
        type: Number,
    },
    companyName: {
        type: String,
    },
    sector: {
        type: String,
    },
    companyWebsite: {
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    patentCompleted: {
        type: Boolean,
    },
    valuation: {
        type: Number,
    },
    fundsNeeded: {
        type: Number,
    },
    equitySharing: {
        type: Number,
    },
    investor: {
        type: String,
    },
    fundingRound: {
        type: String,
    },
    productName: {
        type: String,
    },
    totalSales: {
        type: Number,
    },
    productDescription: {
        type: String,
    },
    productMaturity: {
        type: String,
    },
    usersCount: {
        type: Number,
    },
}, { timestamps: true });

const MultistepForm = model("MultistepForm", multiFormSchema);

module.exports = MultistepForm;
