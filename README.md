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
(async () => {
    try {
        const headlines = await getTopHeadlines('us', 'technology');
        console.log('Top headlines:', headlines);

        const everything = await getEverything('bitcoin');
        console.log('Everything:', everything);

        const sources = await getSources('technology', 'en', 'us');
        console.log('Sources:', sources);
    } catch (error) {
        console.error('Error:', error);
    }
})();


test push protections