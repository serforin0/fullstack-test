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
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const feed_service_1 = require("./feed.service");
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
        this.languages = [
            'ar',
            'az',
            'bg',
            'bn',
            'ca',
            'cs',
            'da',
            'de',
            'el',
            'en',
            'eo',
            'es',
            'et',
            'fa',
            'fi',
            'fr',
            'ga',
            'he',
            'hi',
            'hu',
            'id',
            'it',
            'ja',
            'ko',
            'lt',
            'lv',
            'ms',
            'nb',
            'nl',
            'pl',
            'pt',
            'ro',
            'ru',
            'sk',
            'sl',
            'sq',
            'sr',
            'sv',
            'th',
            'tl',
            'tr',
            'uk',
            'ur',
            'vi',
            'zh',
            'zt',
        ];
    }
    async getFeed(query) {
        return this.getFeeds(query);
    }
    async getTranslatedFeed(language, query) {
        if (this.languages.indexOf(language) === -1) {
            throw new common_1.BadRequestException('El parámetro de idioma debe ser uno de los siguientes: ' + this.languages.join(', '));
        }
        const feeds = await this.getFeeds(query);
        const translatedFeeds = await Promise.all(feeds.map(async (feed) => {
            return {
                title: await this.feedService.getTranslatedFeaturedContent(feed.title, language),
                description: await this.feedService.getTranslatedFeaturedContent(feed.description, language),
                image: feed.image
            };
        }));
        return translatedFeeds;
    }
    async getFeeds(query) {
        const { lang, date } = query;
        const parsedDate = new Date(date);
        console.log(parsedDate);
        if (this.languages.indexOf(lang) === -1) {
            throw new common_1.BadRequestException('El parámetro [lang] debe ser uno de los siguientes: ' + this.languages.join(', '));
        }
        if (isNaN(parsedDate.getTime()) && parsedDate.toString() === 'Invalid Date') {
            throw new common_1.BadRequestException('El parámetro [date] debe ser una cadena de fecha válida [YYYY-MM-DD].');
        }
        const feeds = await this.feedService.getFeaturedContent(lang, parsedDate);
        if (!feeds) {
            throw new common_1.BadRequestException('No se encontraron resultados.');
        }
        return feeds.map((article) => ({
            title: article.titles.normalized,
            description: article.extract,
            image: article?.thumbnail?.source,
        }));
    }
};
exports.FeedController = FeedController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getFeed", null);
__decorate([
    (0, common_1.Get)('/translate/:language'),
    __param(0, (0, common_1.Param)('language')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getTranslatedFeed", null);
exports.FeedController = FeedController = __decorate([
    (0, common_1.Controller)('feed'),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedController);
//# sourceMappingURL=feed.controller.js.map