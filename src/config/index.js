'use strict';

var config = {
    env: process.env.NODE_ENV,
    name: 'ownersEdge',
    appId: '57ab6abcf36d2840aa667f6e',
    argoEmail: 'intake@ownersedge.us',
    sgsEmail: 'owners@colonyspecialty.com',
    mongoURI: 'mongodb://xxread:xxread@52.25.41.113:27017/ownersedgedev',
    sendGridKey: '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',
    argoTemplateId: '21b98629-1c78-4de5-81a0-431f6666bc98',
    brokerTemplateId: '365b9c92-9e3d-4699-88ff-d9ea688e769b',
    argoNonQuoteTemplate: '52173414-ee4e-42cd-a609-38b3c180ddfe',
    brokerNonQuoteTemplate: '9fa37d89-9241-4795-b662-1d424a432701',
    ownersEdgeQuotationPDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-GL.html',
    ownersBindOrderPDFUrl: 'http://assets.ownersedge.us/templates/Owners_Bind_Order.html',
    excessPDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-excess.html',
    colonyOwnersInterestQuestionnairePDFUrl: 'http://assets.ownersedge.us/templates/colonyOwnersInterestQuestionnaire2.html',
    ownersContractorsProtectivePDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-GL-OCP.html',
    ratingsUrl:'https://oe-rating-engine.herokuapp.com',


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
            "top": "12mm", // default is 0, units: mm, cm, in, px
            "right": "6mm",
            "bottom": "12mm",
            "left": "6mm"
        }
    },

    app: {},

    server: {
        url: 'http://www.ownersedge.us',
        port: null
    },

    webpackserver: {
        port: 7777
    },

    apiserver: {
        url: 'http://www.ownersedge.us',
        port:  null
    }
};

if (config.env === 'development') {
    config.server.port = 8888
    config.apiserver.port = 8888
    config.server.url += ':' + config.server.port;
    config.apiserver.url += ':' + config.apiserver.port;

    config.server.cors = {
        origin: 'http://localhost:' + config.webpackserver.port
    };
}

// else if (config.env === 'devdeploy') {
//     config.server.url = 'http://dev.ownersedge.us';
//     config.apiserver.url = 'http://dev.ownersedge.us';
//     config.apiserver.port = null;
// } else if (config.env === 'production') {
//     config.server.url = 'http://ownersedge.us';
//     config.apiserver.url = 'http://ownersedge.us';
//     config.apiserver.port = null;
// } else if (config.env === 'qaDeploy') {
//     config.server.url = 'http://beta.ownersedge.us';
//     config.apiserver.url = 'http://beta.ownersedge.us';
//     config.apiserver.port = null;
// }

module.exports = config;
