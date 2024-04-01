import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';

describe('FeedController', () => {
  let controller: FeedController;
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [FeedService],
    }).compile();

    controller = module.get<FeedController>(FeedController);
    service = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTranslatedFeed', () => {
    it('should throw BadRequestException if invalid language is provided', async () => {
      const invalidLanguage = 'xx';
      const query = {};

      await expect(controller.getTranslatedFeed(invalidLanguage, query)).rejects.toThrowError(BadRequestException);
    });

    it('should return translated feeds', async () => {
      const language = 'es';
      const query = {};
      const feeds = [
        { title: 'Title 1', description: 'Description 1', image: 'Image 1' },
        { title: 'Title 2', description: 'Description 2', image: 'Image 2' },
      ];

      jest.spyOn(service, 'getTranslatedFeaturedContent').mockResolvedValue('Translated Title');

      const translatedFeeds = await controller.getTranslatedFeed(language, query);

      expect(translatedFeeds).toHaveLength(2);
      expect(translatedFeeds[0].title).toBe('Translated Title');
      expect(translatedFeeds[0].description).toBe('Description 1');
      expect(translatedFeeds[0].image).toBe('Image 1');
    });
  });

  describe('getFeeds', () => {
    it('should throw BadRequestException if invalid language is provided', async () => {
      const invalidLanguage = 'xx';
      const query = {};

      await expect(controller.getFeed(query)).rejects.toThrowError(BadRequestException);
    });

    it('should throw BadRequestException if invalid date is provided', async () => {
      const validLanguage = 'es';
      const invalidDate = '2022-02-30';
      const query = { lang: validLanguage, date: invalidDate };

      await expect(controller.getFeed(query)).rejects.toThrowError(BadRequestException);
    });

    it('should return feeds', async () => {
      const validLanguage = 'es';
      const validDate = '2022-04-01';
      const query = { lang: validLanguage, date: validDate };
      const feeds = [
        { titles: { normalized: 'Title 1' }, extract: 'Description 1', thumbnail: { source: 'Image 1' } },
        { titles: { normalized: 'Title 2' }, extract: 'Description 2', thumbnail: { source: 'Image 2' } },
      ];

      jest.spyOn(service, 'getFeaturedContent').mockResolvedValue(feeds);

      const result = await controller.getFeed(query);

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Title 1');
      expect(result[0].description).toBe('Description 1');
      expect(result[0].image).toBe('Image 1');
    });
  });
});
