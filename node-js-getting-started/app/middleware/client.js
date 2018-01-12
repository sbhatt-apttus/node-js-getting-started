(function() {
    'use strict';

    var env = process.env.NODE_ENV || 'development';
    var vkbeautify        = require('vkbeautify');

    function getAllClients(req, res) {
        var requestXML = req.body.XML;
        var response = beautifyYourCode(requestXML);
        console.log('########## => '+response);
		res.send(response);
    }

    function beautifyYourCode(requestXML){
        requestXML = '<?xml version="1.0" encoding="UTF-8"?> <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:enterprise.soap.sforce.com" xmlns:sf="urn:sobject.enterprise.soap.sforce.com"> <soapenv:Header> <SessionHeader> <sessionId>00D1N000001ByJk!AQUAQI3VTTlskb7tkvOSu6dg4TZipV309GglluF3RrCvuDLn_IIfCUQar9uvoFddaZQYeCOnCYKrq2oZbNGdBMSGy9lkZiNz</sessionId> </SessionHeader> </soapenv:Header> <soapenv:Body></soapenv:Body> </soapenv:Envelope>';
        return vkbeautify.xml(requestXML,4);
    }
    

    var client = {
        getAllClients: getAllClients
    };

    module.exports = client;

})();