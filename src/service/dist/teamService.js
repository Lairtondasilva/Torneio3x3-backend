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
exports.findByUserId = exports.findAll = exports.create = void 0;
var zod_1 = require("zod");
var prisma_1 = require("../lib/prisma");
function create(req) {
    return __awaiter(this, void 0, void 0, function () {
        var teamBody, teamInfo, existingTeams, isNewTeam, team;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("*****************************************" + req.toString() + "******************************************************");
                    teamBody = zod_1.z.object({
                        logo: zod_1.z.string(),
                        teamName: zod_1.z.string(),
                        descricao: zod_1.z.string(),
                        ownerId: zod_1.z.string()
                    });
                    teamInfo = teamBody.parse(req);
                    console.log("*****************************************" + teamInfo + "******************************************************");
                    return [4 /*yield*/, prisma_1.prisma.team.findMany({
                            where: {
                                userId: teamInfo.ownerId
                            }
                        })];
                case 1:
                    existingTeams = _a.sent();
                    if (existingTeams.length > 0) {
                        isNewTeam = existingTeams.some(function (team) { return team.status !== "Finalizado"; });
                        console.log(isNewTeam);
                        if (isNewTeam)
                            throw { status: 400, message: "Você já tem um time cadastrado á espera de um torneio" };
                    }
                    return [4 /*yield*/, prisma_1.prisma.team.create({
                            data: {
                                name: teamInfo.teamName,
                                logo: teamInfo.logo,
                                description: teamInfo.descricao,
                                status: "Novo",
                                userId: teamInfo.ownerId
                            }
                        })];
                case 2:
                    team = _a.sent();
                    if (!team.id)
                        throw { status: 400, message: "Não foi possível criar o seu time tente novamente" };
                    return [2 /*return*/, team];
            }
        });
    });
}
exports.create = create;
function findAll() {
    return __awaiter(this, void 0, void 0, function () {
        var teams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.team.findMany()];
                case 1:
                    teams = _a.sent();
                    return [2 /*return*/, teams];
            }
        });
    });
}
exports.findAll = findAll;
function findByUserId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var team;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.team.findFirst({ where: {
                            userId: id
                        } })];
                case 1:
                    team = _a.sent();
                    return [2 /*return*/, team];
            }
        });
    });
}
exports.findByUserId = findByUserId;
