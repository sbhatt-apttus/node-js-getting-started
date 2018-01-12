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

    function convertJSMAP(customSettingResultReceived2,jsMAP ) {
        
        console.log("customSettingResultReceived2 ==> "+customSettingResultReceived2);
        console.log(Object.entries(customSettingResultReceived2));
        console.log(Object.keys(customSettingResultReceived2).length);
        var myMap2 = new Map();
        var myMap3 = new Map();
        Object.keys(customSettingResultReceived2).forEach(function (key){
    
            console.log("KEY ==> "+key);
            console.log("VALUE ==> "+customSettingResultReceived2[key]);
            console.log("LABEL ==> "+customSettingResultReceived2[key].APTS_Label__c);
            myMap2.set(key,customSettingResultReceived2[key]);
                
          });
        
        localStorage.setItem('customSettingResultReceived2', JSON.stringify(Array.from(myMap2.entries()))  );
    
        jsMAP(myMap2);
    }

    function generateXMLMap(inputMap,jsMAP1 ) {
        debugger;
        console.log(Object.entries(inputMap));
        console.log(Object.keys(inputMap).length);
        if(inputMap){
    
    
            var myMap2 = new Map();
            
              var mapKeys = Array.from( inputMap.keys() );
              for(var a=0;a<mapKeys.length;a++){
            
                
                var keyStr = mapKeys[a];
                if(keyStr){
                
                    console.log("generateXMLMap KEY ==> "+keyStr );
                    console.log("generateXMLMap VALUE ==> "+inputMap.get(keyStr));        
    
                    var replaceQuotRegex = new RegExp('&'+'qu'+'ot;', 'g');
                    var abc = inputMap.get(keyStr).replace( replaceQuotRegex,'"');
                    
                    console.log('***************** generateXMLMap STRING => ' + abc);
                    
                    console.log('***************** generateXMLMap STRING PARSE => ' + JSON.parse(abc) );
                    
                    createXML(abc,(soObjectString) => { 
                        
                        myMap2.set(keyStr,soObjectString );
                        debugger;
                    });
                
                }              
                
              }
            
    
              debugger;
              jsMAP1(myMap2);
    
    
        
        
        }
                      
    }



    function createXML(jsonString,jsMAP2){
        
        debugger;
        var obj1 = JSON.parse( jsonString.replace(/&quot;/g,'"') );
        
        
        var soObjectString = '';
        var recordsLen = Object.keys(obj1.records).length;
    
    
        for(a=0; a<recordsLen; a++){
        
            soObjectString = soObjectString+'<sObjects xsi:type="'+obj1.records[a].attributes.type+'">'
            map = obj1.records[a];
        
            Object.keys(map).forEach(function (key){
        
              if(key != 'attributes' && key != 'Id' && map[key] ){
      
                if(key.includes("__InstanceUrl__c") && t_instanceURL){
                    soObjectString += '<'+ key +'>'+t_instanceURL+'</'+ key +'>';
                //else if(){
                    
                }else{
                    soObjectString += '<'+ key +'>'+map[key]+'</'+ key +'>';
                }
                  
                
        
              }
              
              
                  
        });
        
        soObjectString = soObjectString+'</sObjects>';
        
        
        
        }
    
        console.log(soObjectString);
        jsMAP2(soObjectString);
    
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