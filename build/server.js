'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const http_1 = __importDefault(require('http'));
const express_1 = __importDefault(require('express'));
const body_parser_1 = __importDefault(require('body-parser'));
const mongoose_1 = __importDefault(require('mongoose'));
const logging_1 = __importDefault(require('./config/logging'));
const config_1 = __importDefault(require('./config/config'));
const sample_1 = __importDefault(require('./routes/sample'));
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const docs = require('./docs');
const NAMESPACE = 'Server';
const router = (0, express_1.default)();
router.use(cors());
mongoose_1.default
    .connect(config_1.default.mongo.url, { retryWrites: true, w: 'majority' })
    .then((res) => {
        console.log('connected database');
    })
    .catch((err) => console.log(err));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
router.get('/', (req, res) => {
    res.json({
        a: 'dsadsa'
    });
});
router.use('/sample', sample_1.default);
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, () => {
    logging_1.default.info(NAMESPACE, `Server is running on ${config_1.default.server.hostname}:${config_1.default.server.port}`);
});
