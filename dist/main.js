"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const winston_1 = require("winston");
const path = __importStar(require("path"));
const getTransports = () => {
    const baseTransports = [
        new winston_1.transports.File({
            filename: `${electron_1.app.getPath('appData')}/error.log`,
            level: 'error',
        }),
        new winston_1.transports.File({ filename: `${electron_1.app.getPath('appData')}/ssshh.log` }),
    ];
    if (process.env.NODE_ENV !== 'production') {
        baseTransports.push(new winston_1.transports.Console({
            format: winston_1.format.simple(),
        }));
    }
    return baseTransports;
};
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.json(),
    defaultMeta: { service: 'MainWindow' },
    transports: getTransports(),
});
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts'),
        },
    });
    win.loadFile('index.html');
};
electron_1.app.whenReady().then(() => {
    createWindow();
    logger.info('Main app has started');
});
//# sourceMappingURL=main.js.map