import axios from 'axios';
import { 
    NewsApiSourcesRequestParams, 
    NewsApiTopHeadlineRequestParams, 
    NewsApiEverythingRequestParams,
    NewsApiSourcesResponse,
    NewsApiQueryResponse
} from './index.interface';
import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

const BASE_URL = 'https://newsapi.org/v2';

@Injectable()
export class NewsApiService {
    private API_KEY: string;
    constructor(private configService: ConfigService) {
        this.API_KEY = this.configService.get<string>('newsApi.apiKey') as string;
    }

    async getTopHeadlines(params: NewsApiTopHeadlineRequestParams): Promise<NewsApiQueryResponse> {
        try {
            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                headers: {
                    'X-Api-Key': this.API_KEY
                },
                params
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching top headlines:', error);
            throw error;
        }
    }

    async getEverything(params: NewsApiEverythingRequestParams): Promise<NewsApiQueryResponse> {
        try {
            const response = await axios.get(`${BASE_URL}/everything`, {
                headers: {
                    'X-Api-Key': this.API_KEY
                },
                params
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching everything:', error);
            throw error;
        }
    }

    async getSources(params: NewsApiSourcesRequestParams = {}): Promise<NewsApiSourcesResponse> {
        try {
            const response = await axios.get(`${BASE_URL}/sources`, {
                headers: {
                    'X-Api-Key': this.API_KEY
                },
                params
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
    providers: [NewsApiService, ConfigService],
    exports: [NewsApiService, ConfigService]
  })
export class NewsApiServiceModule {}
  