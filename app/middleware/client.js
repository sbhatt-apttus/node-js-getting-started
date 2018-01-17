(function() {
    'use strict';

    var env = process.env.NODE_ENV || 'development';
    var vkbeautify        = require('vkbeautify');
    var $ = require('jquery');
    var request = require('request');

    //FINAL BLUKIFY API CALL FOR LIST OF Custom Setting Objects
    // INPUT => validAPINamesSet,Endpoint,sourcesessionID
    // OUTPUT => validAPINamesMap
    function getBulkified_COBJECT_DESCRIBE(req, res) {
        console.log('########## req => '+req);
        console.log('########## req.body=> '+req.body);
        console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
        
        console.log('########## => req.body.validAPINamesSet => '+req.body.validAPINamesSet);
        console.log('########## => req.body.Endpoint => '+req.body.Endpoint);
        console.log('########## => req.body.sourcesessionID => '+req.body.sourcesessionID);

        var requestJsonStringList = req.body.validAPINamesSet;
        var Endpoint = req.body.Endpoint;
        var sourcesessionID = req.body.sourcesessionID;

        var jsonStringListLen = requestJsonStringList.length;

        console.log('########## => jsonStringListLen => '+jsonStringListLen);

        var finalXMLList = new Map();
        var finallyyy = false;
        for (var i = 0; i < jsonStringListLen; i++) {

            var indexx = 0;
            console.log('########## requestJsonStringList[i] => '+requestJsonStringList[i]);
            
             //var replaceQuotRegex = new RegExp('&'+'qu'+'ot;', 'g');
             //var abc = requestJsonStringList[i].replace( replaceQuotRegex,'"');
     
             COBJECT_DESCRIBE_CALL(requestJsonStringList[i],Endpoint,sourcesessionID,(soObjectString) => { 
                 
                 console.log('##########1 soObjectString=> '+soObjectString);
                 if(soObjectString){
                    finalXMLList.set(requestJsonStringList[i],soObjectString);
                    indexx ++;
                 }else{
                    console.log('##########1 soObjectString=>  ERRORRRRRR');
                 }

                 console.log('##########4 END CALLLLLLLLLLLL => '+indexx);
                 console.log('##########5 END CALLLLLLLLLLLL => '+jsonStringListLen);
                if( indexx ===  jsonStringListLen ){
                    console.log('##########FINALAAAAAAALLL END CALLLLLLLLLLLL => ');
                    finallyyy = true;
                    //res.send({"validAPINamesMap":finalXMLList});
                }

                  
             });


        }

        //res.send({"validAPINamesMap":finalXMLList});
        if(finallyyy){
            res.send({"validAPINamesMap":finalXMLList});
        }
        console.log('##########2 END => ');        
    }





    function COBJECT_DESCRIBE_CALL(jsonString,Endpoint,sourcesessionID,jsMAP2){
        
        /*$.ajax({ 
            url: Endpoint,
            type: 'GET',
            beforeSend: function(xhr) { 
                xhr.setRequestHeader("Authorization", "Bearer " + sourcesessionID);
            }
        }).done(function(response) {
            console.log('### SUCCESSSSSSSSSSSSSSSSS=> '+response);
            jsMAP2(response);
        }).error(function(err) {
            console.log(err);
            jsMAP2(null);
        });	*/
        
        request({
            url: Endpoint,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sourcesessionID,  // <--Very important!!!
            }
        }, function (error, response, body){
            if(response){
                console.log('### SUCCESSSSSSSSSSSSSSSSS=> '+response);
                jsMAP2(response);
            }
            if(error){
                console.log(error);
                jsMAP2(null);
            }
           
        });    

 
        console.log('ENDEDDDDD');
        
    
    }







    //FINAL BLUKIFY API CALL FOR LIST OF JSON STRINGS
    // INPUT => jsonStringList
    // OUTPUT => finalXMLList
    function getBulkifiedBeautifyXMLFromJSON(req, res) {
        console.log('########## req => '+req);
        console.log('########## req.body=> '+req.body);
        console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
        
        console.log('########## => req.body.jsonStringList => '+req.body.jsonStringList);

        var requestJsonStringList = req.body.jsonStringList;

        var jsonStringListLen = requestJsonStringList.length;

        console.log('########## => jsonStringListLen => '+jsonStringListLen);

        var finalXMLList = [];
        
        for (var i = 0; i < jsonStringListLen; i++) {


            console.log('########## requestJsonStringList[i] => '+requestJsonStringList[i]);
            
             var replaceQuotRegex = new RegExp('&'+'qu'+'ot;', 'g');
             var abc = requestJsonStringList[i].replace( replaceQuotRegex,'"');
     
             createXML(abc,(soObjectString) => { 
                 
                 console.log('##########1 soObjectString=> '+soObjectString);
                 var response = beautifyYourCode(soObjectString);
                 console.log('########## response => '+response);
                 finalXMLList.push(response); 
                 
             });


        }

        res.send({"finalXMLList":finalXMLList});
        console.log('##########2 END => ');        
    }



    function getBeautifyXMLFromJSON(req, res) {
        console.log('########## req => '+req);
        console.log('########## req.body=> '+req.body);
        console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
        
        console.log('########## => req.body.jsonString => '+req.body.jsonString);

        var requestXML = req.body.jsonString;

        console.log('########## requestXML => '+requestXML);
       
        var replaceQuotRegex = new RegExp('&'+'qu'+'ot;', 'g');
        var abc = requestXML.replace( replaceQuotRegex,'"');

        createXML(abc,(soObjectString) => { 
            
            console.log('##########1 soObjectString=> '+soObjectString);
            var response = beautifyYourCode(soObjectString);
            console.log('########## response => '+response);
            res.send({"finalXML":response});
        });

        console.log('##########2 END => ');        
    }


    function getAllClients(req, res) {
        console.log('########## => '+req);
        console.log('########## => '+req.body);
        console.log('########## => '+JSON.stringify(req.body));
        
        console.log('########## => '+req.body.XML);

        var requestXML = req.body.XML;

        console.log('########## => '+requestXML);
        var response = beautifyYourCode(requestXML);
        console.log('########## => '+response);
		res.send({"finalXML":response});
    }

    function beautifyYourCode(requestXML){
        //requestXML = '<?xml version="1.0" encoding="UTF-8"?> <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:enterprise.soap.sforce.com" xmlns:sf="urn:sobject.enterprise.soap.sforce.com"> <soapenv:Header> <SessionHeader> <sessionId>00D1N000001ByJk!AQUAQI3VTTlskb7tkvOSu6dg4TZipV309GglluF3RrCvuDLn_IIfCUQar9uvoFddaZQYeCOnCYKrq2oZbNGdBMSGy9lkZiNz</sessionId> </SessionHeader> </soapenv:Header> <soapenv:Body></soapenv:Body> </soapenv:Envelope>';
        return vkbeautify.xml(requestXML,4);
    }

    
    function getJSONTOXML(req, res) {
        console.log('########## => '+req);
        console.log('########## => '+req.body);
        console.log('########## => '+JSON.stringify(req.body));
        var responseMapToSerialize4 = req.body.JSON;
        var masterXML = '';
        console.log('##########0 => '+responseMapToSerialize4);

        //responseMapToSerialize4 = '{"totalSize":1,"done":true,"records":[{"attributes":{"type":"Apttus_XApps__XAuthorForExcelSystemProperties__c","url":"/services/data/v39.0/sobjects/Apttus_XApps__XAuthorForExcelSystemProperties__c/a5A1N000000IEU4UAO"},"Id":"a5A1N000000IEU4UAO","Name":"System Properties","Apttus_XApps__InstanceUrl__c":"https://na78.salesforce.com","Apttus_XApps__LicenseWebserviceEndpoint__c":"https://ls.apttus.net:8443/cgi-bin/LicenseServer/Bin/LSCGI.exe","Apttus_XApps__MergeCallTimeoutMillis__c":50000.0,"APTS_Ext_ID__c":"a5A1N000000IEU4UAO"}]}';

        var replaceQuotRegex = new RegExp('&'+'qu'+'ot;', 'g');
        var abc = responseMapToSerialize4.replace( replaceQuotRegex,'"');

        createXML(abc,(soObjectString) => { 
            
            console.log('##########1 => '+soObjectString);
            res.send({"finalXML":soObjectString});        
            debugger;
        });

        console.log('##########2 END => ');
    }


    function createXML(jsonString,jsMAP2){
        
        debugger;
        var obj1 = JSON.parse( jsonString.replace(/&quot;/g,'"') );
        
        
        var soObjectString = '';
        var recordsLen = Object.keys(obj1.records).length;
    
    
        for(var a=0; a<recordsLen; a++){
        
            soObjectString = soObjectString+'<sObjects xsi:type="'+obj1.records[a].attributes.type+'">'
            var map = obj1.records[a];
        
            Object.keys(map).forEach(function (key){
        
              if(key != 'attributes' && key != 'Id' && map[key] ){
      
                    //soObjectString += '<'+ key +'>'+map[key]+'</'+ key +'>';

                    if(map[key] !== null && typeof map[key] === 'object'){
                        var objId = '<'+ key+'.Id' +'>'+map[key].Id+'</'+ key+'.Id' +'>';
                        var objName = '<'+ key+'.Name' +'>'+map[key].Name+'</'+ key+'.Name' +'>';
                        soObjectString += objId+objName;
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
    
    var client = {
        getAllClients: getAllClients,
        getJSONTOXML:getJSONTOXML,
        getBeautifyXMLFromJSON:getBeautifyXMLFromJSON,
        getBulkifiedBeautifyXMLFromJSON:getBulkifiedBeautifyXMLFromJSON,
        getBulkified_COBJECT_DESCRIBE:getBulkified_COBJECT_DESCRIBE
    };

    module.exports = client;

})();