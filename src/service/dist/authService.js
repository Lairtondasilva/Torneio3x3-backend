"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.chooseRoles = exports.googleSignInAndSignUp = void 0;
var zod_1 = require("zod");
var node_fetch_1 = require("node-fetch");
var prisma_1 = require("../lib/prisma");
function googleSignInAndSignUp(req, fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var createUserBody, access_token, userResponse, userData, userBodySchema, userInfo, userInDataBase, user, token, token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    createUserBody = zod_1.z.object({
                        access_token: zod_1.z.string()
                    });
                    access_token = createUserBody.parse(req).access_token;
                    return [4 /*yield*/, node_fetch_1["default"]("https://www.googleapis.com/oauth2/v2/userinfo", {
                            method: 'GET',
                            headers: {
                                Authorization: "Bearer " + access_token
                            }
                        })];
                case 1:
                    userResponse = _a.sent();
                    return [4 /*yield*/, userResponse.json()];
                case 2:
                    userData = _a.sent();
                    userBodySchema = zod_1.z.object({
                        id: zod_1.z.string(),
                        name: zod_1.z.string(),
                        email: zod_1.z.string(),
                        picture: zod_1.z.string() || null || undefined
                    });
                    userInfo = userBodySchema.parse(userData);
                    return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                            where: {
                                googleId: userInfo.id
                            }
                        })];
                case 3:
                    userInDataBase = _a.sent();
                    if (!!userInDataBase) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma_1.prisma.user.create({
                            data: {
                                name: userInfo.name,
                                email: userInfo.email,
                                googleId: userInfo.id,
                                avatarUrl: userInfo.picture
                            }
                        })];
                case 4:
                    user = _a.sent();
                    token = fastify.jwt.sign({
                        name: user.name,
                        avatarUrl: user.avatarUrl,
                        role: user.roles
                    }, {
                        sub: user.id,
                        expiresIn: "1 day"
                    });
                    return [2 /*return*/, { token: token }];
                case 5:
                    token = fastify.jwt.sign({
                        name: userInDataBase.name,
                        avatarUrl: userInDataBase.avatarUrl,
                        roles: userInDataBase.roles
                    }, {
                        sub: userInDataBase.id,
                        expiresIn: "1 day"
                    });
                    return [2 /*return*/, { token: token }];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    return [2 /*return*/, { error: {
                                message: error_1
                            } }];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.googleSignInAndSignUp = googleSignInAndSignUp;
function chooseRoles(id, req, fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var roleBody, roleInfo, user, token, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    roleBody = zod_1.z.object({
                        role: zod_1.z.string()
                    });
                    roleInfo = roleBody.parse(req);
                    return [4 /*yield*/, prisma_1.prisma.user.update({
                            where: {
                                id: id
                            },
                            data: {
                                roles: roleInfo.role
                            }
                        })];
                case 1:
                    user = _a.sent();
                    if (!(user.roles === "Jogador")) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma_1.prisma.player.create({
                            data: {
                                name: user.name,
                                userId: user.id,
                                points: 0
                            }
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    token = fastify.jwt.sign({
                        name: user.name,
                        avatarUrl: user.avatarUrl,
                        roles: user.roles
                    }, {
                        sub: user.id,
                        expiresIn: "1 day"
                    });
                    return [2 /*return*/, { token: token }];
                case 4:
                    e_1 = _a.sent();
                    throw new Error("Estamos com problemas no servidores tente novamente mais tarde!");
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.chooseRoles = chooseRoles;
