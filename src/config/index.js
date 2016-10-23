const config = {
    env: process.env.NODE_ENV,
    name: 'ownersEdge',
    appId: process.env.appID || '57ab6abcf36d2840aa667f6e',
    argoEmail: process.env.argoEmail || 'parkerproject@gmail.com',
    mongoURI: process.env.mongoURI || 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev',
    sendGridKey: process.env.sendGridKey || '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',
    argoTemplateId: '21b98629-1c78-4de5-81a0-431f6666bc98',
    brokerTemplateId: '365b9c92-9e3d-4699-88ff-d9ea688e769b',
    argoNonQuoteTemplate: '52173414-ee4e-42cd-a609-38b3c180ddfe',
    brokerNonQuoteTemplate: '9fa37d89-9241-4795-b662-1d424a432701',
    submissionPDFUrl: 'http://assets.ownersedge.us/templates/submission_v2.html',
    ownersBindOrderPDFUrl: 'http://assets.ownersedge.us/templates/Owners_Bind_Order.html',
    colonyOwnersInterestQuestionnairePDFUrl: 'http://assets.ownersedge.us/templates/colonyOwnersInterestQuestionnaire2.html',
    excessPDFUrl: 'http://assets.ownersedge.us/templates/excess.html',

    analytics: {
        ua: 'xxxxx-xxxxx',
        host: 'www.domain.com'
    },

    pdfOptions: {

        "height": "11in", // allowed units: mm, cm, in, px
        "width": "8.5in", // allowed units: mm, cm, in, px
        "format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "orientation": "portrait", // portrait or landscape
        "border": {
            "top": "1in", // default is 0, units: mm, cm, in, px
            "right": "0.5in",
            "bottom": "1in",
            "left": "0.5in"
        }
    },

    app: {},

    server: {
        url: 'http://localhost',
        port: 8888
    },

    webpackserver: {
        port: 7777
    },

    apiserver: {
        url: 'http://localhost',
        port: 8888
    }
};

if (config.env === 'development') {
    config.server.url += ':' + config.server.port;

    config.server.cors = {
        origin: 'http://localhost:' + config.webpackserver.port
    };

} else if (config.env === 'deploydev') {
    config.server.url = 'http://dev.ownersedge.us'
    config.apiserver.url = 'http://dev.ownersedge.us'
    config.apiserver.port = null
} else if (config.env === 'production') {
    config.server.url = 'http://ownersedge.us'
    config.apiserver.url = 'http://dev.ownersedge.us'
    config.apiserver.port = null
}

module.exports = config;