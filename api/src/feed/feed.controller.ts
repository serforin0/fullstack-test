import {
  Controller,
  Get,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  private readonly languages = [
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
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeed(@Query() query: any) {
    return this.getFeeds(query);
  }


  @Get('/translate/:language')
  async getTranslatedFeed(@Param('language') language: string, @Query() query: any) {

    if (this.languages.indexOf(language) === -1) {
      throw new BadRequestException('El parámetro de idioma debe ser uno de los siguientes: ' + this.languages.join(', '));
    }

    const feeds = await this.getFeeds(query);
    const translatedFeeds = await Promise.all(feeds.map(async (feed: any) => {
      return {
        title: await this.feedService.getTranslatedFeaturedContent(feed.title, language),
        description: await this.feedService.getTranslatedFeaturedContent(feed.description, language),
        image: feed.image
      };
    }))
    return translatedFeeds;
  }

  private async getFeeds(query: any): Promise<any> {
    const { lang, date } = query;
    const parsedDate: Date = new Date(date);
    console.log(parsedDate);

    if (this.languages.indexOf(lang) === -1) {
      throw new BadRequestException('El parámetro [lang] debe ser uno de los siguientes: ' + this.languages.join(', '));
    }

    if ( isNaN(parsedDate.getTime()) && parsedDate.toString() === 'Invalid Date') {
      throw new BadRequestException('El parámetro [date] debe ser una cadena de fecha válida [YYYY-MM-DD].');
    }

    const feeds = await this.feedService.getFeaturedContent(lang, parsedDate);

    if (!feeds) {
      throw new BadRequestException('No se encontraron resultados.');
    }

    return feeds.map((article: any) => ({
      title: article.titles.normalized,
      description: article.extract,
      image: article?.thumbnail?.source,
    }));
  }
}
