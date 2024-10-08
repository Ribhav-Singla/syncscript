"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./auth");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_1 = __importDefault(require("./socket/socket"));
const middleware_1 = require("./middleware");
const controllers_1 = require("./controllers");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: '*', // For testing purposes, allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Only needed if you're sending cookies or credentials
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
const server = (0, http_1.createServer)(app);
(0, socket_1.default)(server);
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Healthy server!',
    });
});
app.use('/auth', auth_1.authRouter);
app.get('/mydocuments', middleware_1.isLoggedIn, controllers_1.getMyDocuments);
app.post('/deleteDocument/:documentId', middleware_1.isLoggedIn, controllers_1.deleteMyDocument);
app.get('/verifyDocumentId/:documentId', middleware_1.isLoggedIn, controllers_1.verifyDocumentId);
app.post('/makeShareableDocument/:documentId', middleware_1.isLoggedIn, controllers_1.makeShareableDocument);
app.post('/makeNotShareableDocument/:documentId', middleware_1.isLoggedIn, controllers_1.makeNotShareableDocument);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
