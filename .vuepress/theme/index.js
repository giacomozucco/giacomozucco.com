const path = require('path')

module.exports = {
	plugins: [
        ['@vuepress/google-analytics', { ga: '' }],
        ['@vuepress/blog', {
            frontmatters: [
                {
                    id: 'tag',
                    title: 'Tag',
                    keys: ['tags'],
                    path: '/tag/',
                    layout: 'Tags',
                    scopeLayout: 'ArticlesPaginated',
                    pagination: {
                        layout: 'ArticlesPaginated',
                        getPaginationPageTitle: (_, key) => `${key} Tag`,
                    }
                },
            ],
            globalPagination: {
                lengthPerPage: 11,
            },
            sitemap: {
                hostname: 'https://giacomozucco.com',
            },
            feed: {
                canonical_base: 'https://giacomozucco.com',
            },
        }],
        'seo',
        'disqus',
        require('./extendPageData.js'),
    ],
    enhanceAppFiles: [
        path.resolve(__dirname, 'articles.js'),
        path.resolve(__dirname, 'search.js'),
    ],
}
