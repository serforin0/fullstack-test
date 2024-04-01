import { FeedService } from './feed.service';
export declare class FeedController {
    private readonly feedService;
    private readonly languages;
    constructor(feedService: FeedService);
    getFeed(query: any): Promise<any>;
    getTranslatedFeed(language: string, query: any): Promise<any[]>;
    private getFeeds;
}
