(function() {
    'use strict';

    var env = process.env.NODE_ENV || 'development';
    var vkbeautify        = require('vkbeautify');

    function getAllClients(req, res) {
        var requestXML = req.body.XML;
        console.log('########## => '+requestXML);
        var response = beautifyYourCode(requestXML);
        console.log('########## => '+response);
		res.send(response);
    }

    function beautifyYourCode(requestXML){
        requestXML = '<?xml version="1.0" encoding="UTF-8"?> <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:enterprise.soap.sforce.com" xmlns:sf="urn:sobject.enterprise.soap.sforce.com"> <soapenv:Header> <SessionHeader> <sessionId>00D1N000001ByJk!AQUAQI3VTTlskb7tkvOSu6dg4TZipV309GglluF3RrCvuDLn_IIfCUQar9uvoFddaZQYeCOnCYKrq2oZbNGdBMSGy9lkZiNz</sessionId> </SessionHeader> </soapenv:Header> <soapenv:Body></soapenv:Body> </soapenv:Envelope>';
        return vkbeautify.xml(requestXML,4);
    }

    
    function getJSONTOXML(req, res) {
        var responseMapToSerialize4 = req.body.JSON;
        var masterXML = '';
        console.log('########## => '+responseMapToSerialize4);
        var response = JSONTOXML(responseMapToSerialize4);
        console.log('########## => '+response);
		res.send(response);
    }


    function JSONTOXML(responseMapToSerialize4,checkAndGetCustomSettingsFromSourceORGCallBack){

        convertJSMAP(responseMapToSerialize4,(myMap2) => {
            debugger;
            console.log('convertJSMAP CALLED ***************** responseMapToSerialize2   => ' + myMap2);
            console.log('##convertJSMAP CALLED1 ***************** responseMapToSerialize2   => ' +Object.keys(myMap2).length);
            
            
            convertJSMAP(responseMapToSerialize3,(myMap3) => {
                console.log('convertJSMAP myMap3  CALLED ***************** responseMapToSerialize3   => ' + myMap3);
                console.log('##convertJSMAP CALLED2 ***************** responseMapToSerialize2   => ' +Object.keys(myMap3).length);
                
                debugger;
                generateXMLMap(myMap3,(myMap4) => {

                    console.log("@@##$$$%% myMap4 ==> ");
                    
                    if(myMap4){
                          var myMap2 = new Map();
                          var mapKeys = Array.from( myMap4.keys() );
            
                          for(var a=0;a<mapKeys.length;a++){
                            var keyStr = mapKeys[a];
                            if(keyStr){
                                console.log("@@##$$$%% generateXMLMap KEY ==> "+keyStr );
                                console.log("@@##$$$%% generateXMLMap VALUE ==> "+myMap4.get(keyStr));
                                masterXML += myMap4.get(keyStr);
                            }              
                            
                          }
                    
                    }                        
            
                    checkAndGetCustomSettingsFromSourceORGCallBack(masterXML);
                    
                });
                console.log('convertJSMAP myMap4  CALLED ***************** myMap4  XML ERROR => ' + myMap4 );                            
                console.log('##convertJSMAP CALLED4 ***************** responseMapToSerialize2   => ' +Object.keys(myMap4).length);
            });
            
            
        });


    }

    var client = {
        getAllClients: getAllClients,
        getJSONTOXML:getJSONTOXML
    };

    module.exports = client;

})();