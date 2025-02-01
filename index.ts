import axios from 'axios';
import { 
    NewsApiSourcesRequestParams, 
    NewsApiTopHeadlineRequestParams, 
    NewsApiEverythingRequestParams,
    NewsApiSourcesResponse,
    NewsApiQueryResponse
} from './index.interface';
import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const BASE_URL = 'https://newsapi.org/v2';

@Injectable()
export class NewsApiLibService {
    private API_KEY: string;
    private HEADER_KEY: string = 'X-API-KEY';
    constructor(private configService: ConfigService) {
        const key = this.configService.getOrThrow<string>('newsApi.apiKey');
        this.API_KEY = key
    }

    async getTopHeadlines(filter: NewsApiTopHeadlineRequestParams): Promise<NewsApiQueryResponse> {
        try {
            if (filter['query']) {
                filter.q = filter['query'];
                delete filter['query'];
            }
            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                headers: {
                    [this.HEADER_KEY]: this.API_KEY
                },
                params: filter
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching top headlines:', error);
            throw error;
        }
    }

    async getEverything(filter: NewsApiEverythingRequestParams): Promise<NewsApiQueryResponse> {
        try {
            if (filter['query']) {
                filter.q = filter['query'];
                delete filter['query'];
            }
            const response = await axios.get(`${BASE_URL}/everything`, {
                headers: {
                    [this.HEADER_KEY]: this.API_KEY
                },
                params: filter
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching everything:', error);
            throw error;
        }
    }

    async getSources(filter: NewsApiSourcesRequestParams = {}): Promise<NewsApiSourcesResponse> {
        try {
            const response = await axios.get(`${BASE_URL}/sources`, {
                headers: {
                    [this.HEADER_KEY]: this.API_KEY
                },
                params: filter
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching sources:', error);
            throw error;
        }
    }
}

export * from './index.interface';

@Module({
    imports: [],
    providers: [NewsApiLibService, ConfigService],
    exports: [NewsApiLibService, ConfigService]
  })
export class NewsApiLibServiceModule {}
  