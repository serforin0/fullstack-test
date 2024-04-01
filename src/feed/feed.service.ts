import { Injectable, Inject, Param } from '@nestjs/common';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs'; // Importa Observable y from de RxJS
import { map } from 'rxjs/operators';

@Injectable()
export class FeedService {
  constructor(@Inject('AxiosInstance') private readonly axios: AxiosInstance) {}

  async getFeaturedContent(language: string = 'en', date: Date = new Date()): Promise<any> {
    const apiUrl = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${this.getDateFormat(date)}`;
       console.log(apiUrl);
    try {
      const response = await this.axios.get(apiUrl);
      return response.data.mostread?.articles || [];
    } catch (error) {
      throw error;
    }
  }

  async getTranslatedFeaturedContent(text: string, targetLanguage: string): Promise<any> {
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
    } catch (error) {
      throw error;
    }
  }

  private getDateFormat(date: Date): string {
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${(date.getDate()+1).toString().padStart(2, '0')}`
  }
}
