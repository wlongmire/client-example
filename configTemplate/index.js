'use strict'

const config = {
    env: '@stageEnv',
    name: 'ownersEdge',
    argoEmail: '@argoEmail',
    sgsOIEmail: '@sgsOIEmail',
    sgsOCPEmail: '@sgsOCPEmail',
    underwriterBrokerId: '220bcd0c-bf6e-4189-98b6-fada97d30633',
    ownerEdgeEmail: '@ownerEdgeEmail',
    clearanceFailEmail:'@clearanceFailEmail',
    clearanceFailFlag: '@clearanceFailFlag',
    sendGridKey: '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',
    argoTemplateId: '21b98629-1c78-4de5-81a0-431f6666bc98',
    brokerTemplateId: '365b9c92-9e3d-4699-88ff-d9ea688e769b',
    argoNonQuoteTemplate: '52173414-ee4e-42cd-a609-38b3c180ddfe',
    brokerNonQuoteTemplate: '9fa37d89-9241-4795-b662-1d424a432701',
    ownersEdgeQuotationPDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-GL.html',
    ownersBindOrderPDFUrl: 'http://assets.ownersedge.us/templates/owners_bind-order_2.html',
    ocpBindOrderPDFUrl: 'http://assets.ownersedge.us/templates/ocp_bind-order_2.html',
    assetsURL: '@assetsURL',
    excessPDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-excess_2.html',
    colonyOwnersInterestQuestionnairePDFUrl: 'http://assets.ownersedge.us/templates/colonyOwnersInterestQuestionnaire2.html',
    ownersContractorsProtectivePDFUrl: 'http://assets.ownersedge.us/templates/owners_edge-GL-OCP.html',
    formSetUrl:'https://7xipl8fsz2.execute-api.us-east-1.amazonaws.com/dev/ownersedge/',
    formSetAPIKey:'TvNEPSgZQC9ZQivUv5JMZ3gi2iHFZtOA3imfivUL',

    awsCognito:{
        identityPoolId: '@identityPoolId',
        identityProvider: '@identityProvider',
        userPoolId: '@userPoolId',
        region: '@region',
        clientId: '@clientId'
    },

    apiGateway: {
        stage: '@stageEnv'
    },

    underwriters:[{
        name: 'Jessica Buelow',
        position: 'Supervisor',
        location: 'New York',
        phone: '212-607-8829'
    }],

    analytics: {
        ua: 'xxxxx-xxxxx',
        host: 'www.domain.com'
    },

    pdfOptions: {
        height: '11in', // allowed units: mm, cm, in, px
        width: '8.5in', // allowed units: mm, cm, in, px
        format: 'Letter', // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        orientation: 'portrait', // portrait or landscape
        border: {
            top: '12mm', // default is 0, units: mm, cm, in, px
            right: '6mm',
            bottom: '12mm',
            left: '6mm'
        }
    },

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

module.exports = config;