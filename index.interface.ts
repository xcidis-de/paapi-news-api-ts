
    export enum NewsApiCountries {
        ae = 'ae',
        ar = 'ar',
        at = 'at',
        au = 'au',
        be = 'be',
        bg = 'bg',
        br = 'br',
        ca = 'ca',
        ch = 'ch',
        cn = 'cn',
        co = 'co',
        cu = 'cu',
        cz = 'cz',
        de = 'de',
        eg = 'eg',
        fr = 'fr',
        gb = 'gb',
        gr = 'gr',
        hk = 'hk',
        hu = 'hu',
        id = 'id',
        ie = 'ie',
        il = 'il',
        in = 'in',
        it = 'it',
        jp = 'jp',
        kr = 'kr',
        lt = 'lt',
        lv = 'lv',
        ma = 'ma',
        mx = 'mx',
        my = 'my',
        ng = 'ng',
        nl = 'nl',
        no = 'no',
        nz = 'nz',
        ph = 'ph',
        pl = 'pl',
        pt = 'pt',
        ro = 'ro',
        rs = 'rs',
        ru = 'ru',
        sa = 'sa',
        se = 'se',
        sg = 'sg',
        si = 'si',
        sk = 'sk',
        th = 'th',
        tr = 'tr',
        tw = 'tw',
        ua = 'ua',
        us = 'us',
        ve = 've',
        za = 'za',
    }


    export enum NewsApiSearchIn {
        title = 'title',
        description = 'description',
        content = 'content',
    }

    export interface NewsApiTopHeadlineRequestParams {
        sources?: string;
        q?: string;
        category?: string;
        country?: NewsApiCountries;
        pageSize?: number;
        page?: number;
    }

    export interface NewsApiEverythingRequestParams {
        query?: string;
        searchIn?: NewsApiSearchIn;
        sources?: string; // sources endpoint "source1,source2,source3"
        domains?: string; // "bbc.co.uk,techcrunch.com,engadget.com"
        excludeDomains?: string; // "bbc.co.uk,techcrunch.com,engadget.com"
        from?: Date; // Oldest according to plan
        to?: Date; // defaults now
        language?: string; // 'en', 'es', 'fr', etc.
        sortBy?: string;
        pageSize?: number // 20 is the default, 100 is the maximum;
        page?: number; // 1 is the default
    }
    
    export interface NewsApiSourcesRequestParams {
        category?: string;
        language?: string;
        country?: NewsApiCountries;
    }

    export interface NewsApiOptions {
        apiKey: string;
    }

    export interface NewsApiSourcesResponse {
        status: string;
        sources: NewsApiSource[];
    }

    export interface NewsApiSource {
        id: string;
        name: string;
        description: string;
        url: string;
        category: string;
    }

    export interface NewsApiQueryResponse {
        status: string;
        totalResults: number;
        articles: NewsApiArticle[];
    }

    export interface NewsApiArticleSource {
        id: string;
        name: string;
    }
    
    export interface NewsApiArticle {
        source: NewsApiArticleSource;
        author?: string;
        title: string;
        description: string;
        url?: string;
        urlToImage?: string;
        publishedAt: string;
        content: string;
    }