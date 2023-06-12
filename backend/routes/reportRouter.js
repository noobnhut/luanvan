const express = require("express");
const {
    report,
    getReport
} = require("../controller/reportController");
const routerReport = express.Router();
routerReport.post('/api/report/add', report);
routerReport.get('/api/report/get', getReport);
module.exports = {
    routerReport,
};
