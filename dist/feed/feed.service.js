"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
let FeedService = class FeedService {
    constructor(axios) {
        this.axios = axios;
    }
    async getFeaturedContent(language = 'en', date = new Date()) {
        const apiUrl = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${this.getDateFormat(date)}`;
        console.log(apiUrl);
        try {
            const response = await this.axios.get(apiUrl);
            return response.data.mostread?.articles || [];
        }
        catch (error) {
            throw error;
        }
    }
    async getTranslatedFeaturedContent(text, targetLanguage) {
        const translateUrl = "https://translate.googleapis.com/translate_a/single";
        const params = {
            client: "gtx",
            dt: "t",
            sl: "en",
            tl: targetLanguage,
            q: text,
        };
        try {
            const response = await this.axios.get(translateUrl, { params });
            console.log(response.data[0][0][0]);
            return response.data[0][0][0];
        }
        catch (error) {
            throw error;
        }
    }
    getDateFormat(date) {
        return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${(date.getDate() + 1).toString().padStart(2, '0')}`;
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AxiosInstance')),
    __metadata("design:paramtypes", [Function])
], FeedService);
//# sourceMappingURL=feed.service.js.map