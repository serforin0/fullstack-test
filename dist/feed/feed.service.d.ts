import { AxiosInstance } from 'axios';
export declare class FeedService {
    private readonly axios;
    constructor(axios: AxiosInstance);
    getFeaturedContent(language?: string, date?: Date): Promise<any>;
    getTranslatedFeaturedContent(text: string, targetLanguage: string): Promise<any>;
    private getDateFormat;
}
