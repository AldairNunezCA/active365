"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusOrder = exports.statusClass = exports.statusUser = exports.statusProduct = exports.statusGym = exports.statusAppointment = void 0;
var statusAppointment;
(function (statusAppointment) {
    statusAppointment["active"] = "active";
    statusAppointment["cancelled"] = "cancelled";
})(statusAppointment || (exports.statusAppointment = statusAppointment = {}));
var statusGym;
(function (statusGym) {
    statusGym["active"] = "active";
    statusGym["inactive"] = "inactive";
})(statusGym || (exports.statusGym = statusGym = {}));
var statusProduct;
(function (statusProduct) {
    statusProduct["active"] = "active";
    statusProduct["inactive"] = "inactive";
})(statusProduct || (exports.statusProduct = statusProduct = {}));
var statusUser;
(function (statusUser) {
    statusUser["active"] = "active";
    statusUser["inactive"] = "inactive";
})(statusUser || (exports.statusUser = statusUser = {}));
var statusClass;
(function (statusClass) {
    statusClass["active"] = "active";
    statusClass["inactive"] = "inactive";
})(statusClass || (exports.statusClass = statusClass = {}));
var statusOrder;
(function (statusOrder) {
    statusOrder["pending"] = "pending";
    statusOrder["cancelled"] = "cancelled";
    statusOrder["completed"] = "completed";
})(statusOrder || (exports.statusOrder = statusOrder = {}));
//# sourceMappingURL=status.enum.js.map