Requires NestJS Injectables

In this repo

Run `npm i`
Run `npm run build`

In your project where you are installing this library.

Create
config/configuration.ts
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.ENVIRONMENT,
    newsApi: {
        key: process.env.NEWS_API_TOKEN,
    },
    database: {
        mongoDbUri: process.env.MONGO_DB_URI,
        mongoDbName: process.env.MONGO_DB_NAME,
        mongoDbUser: process.env.MONGO_DB_USER,
        mongoDbPass: process.env.MONGO_DB_PASS,
        autoCreate: !!process.env.MONGO_BUFFER_COMMANDS,
        bufferCommands: !!process.env.MONGO_BUFFER_COMMANDS,
    },
    debug: process.env.ENVIROMENT === 'development',
  });

Current versioning
``` 
    "@apollo/server": "^4.11.2",
    "@nestjs/apollo": "^12.2.1",
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.3.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/graphql": "^12.2.1",
    "@nestjs/platform-express": "^10.0.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1"
```

Run `npm i`

Add
import configuration from './config/configuration';

```
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class AppModule {}
```
to your root


// Example usage
    constructor(
        private newsApiLib: NewsApiLibService
    ) {}

    async getTopHeadlines(filter: NewsApiTopHeadlineRequestParams): Promise<GraphQLTopHeadlinesResponse> {
        const response: NewsApiQueryResponse = await this.newsApiLib.getTopHeadlines(filter);

        return {
            articles: response.articles,
            page: {
                pageSize: response.articles.length,
                pageNumber: filter.page
            },
            totalResults: response.totalResults,
        }
    }

    async getEverything(filter: NewsApiEverythingRequestParams): Promise<GraphQLEverythingResponse> {
        const response: NewsApiQueryResponse = await this.newsApiLib.getEverything(filter);
        
        return {
            articles: response.articles,
            page: {
                pageSize: response.articles.length,
                pageNumber: filter.page
            },
            totalResults: response.totalResults,
        }
    }
    
    async getSources(filter): Promise<GraphQLSourcesResponse> {
        const res: NewsApiSourcesResponse = await this.newsApiLib.getSources(filter);
        
        return {
            sources: res.sources,
            totalResults: res.sources.length,
        }
    }