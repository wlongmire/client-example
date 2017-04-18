'use strict';

var config = {
    env: process.env.NODE_ENV,
    name: 'ownersEdge',
    appId: '@appId',
    argoEmail: '@argoEmail',
    sgsEmail: '@sgsEmail',
    mongoURI: '@mongoURI',
    sendGridKey: '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',
    argoTemplateId: '21b98629-1c78-4de5-81a0-431f6666bc98',
    brokerTemplateId: '365b9c92-9e3d-4699-88ff-d9ea688e769b',
    argoNonQuoteTemplate: '52173414-ee4e-42cd-a609-38b3c180ddfe',
    brokerNonQuoteTemplate: '9fa37d89-9241-4795-b662-1d424a432701',
    ownersEdgeQuotationPDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-GL.html',
    ownersBindOrderPDFUrl: 'http://assets.ownersedge.us/templates/Owners_Bind_Order.html',
    ocpBindOrderPDFUrl: 'http://assets.ownersedge.us/templates/OCPnpm r_Bind_Order.html',
    excessPDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-excess.html',
    colonyOwnersInterestQuestionnairePDFUrl: 'http://assets.ownersedge.us/templates/colonyOwnersInterestQuestionnaire2.html',
    ownersContractorsProtectivePDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-GL-OCP.html',
    ratingsUrl:'@ratingsUrl',
    formSetUrl:'https://7xipl8fsz2.execute-api.us-east-1.amazonaws.com/dev/ownersedge/',
    formSetAPIKey:'TvNEPSgZQC9ZQivUv5JMZ3gi2iHFZtOA3imfivUL',
    underwriters:[{
        "name":"Jessica Buelow",
        "position":"Supervisor",
        "location":"New York",
        "phone":"212-607-8829"
    }],

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
        url: '@serverUrl',
        port: null
    },

    webpackserver: {
        port: 7777
    },

    apiserver: {
        url: '@serverUrl',
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
