(function() {
    'use strict';

    var env = process.env.NODE_ENV || 'development';
    var vkbeautify        = require('vkbeautify');
    var parseString = require('xml2js').parseString;
    var $ = require('jquery');
    var request = require('request');
    var TOOLING_QUERY = '/services/data/v39.0/tooling/query/?q=';
    var EXPORT_QUERY = '/services/data/v39.0/query/?q=';
    var COBJECT_DESCRIBE_QUERY = '/services/data/v39.0/sobjects/';

    var soap = require('soap');


    //FINAL BLUKIFY API CALL FOR CUSTOM SETTING RESTORE ( IMPORT /DELETE )
    // INPUT => endPoint,sessionID,List<String> importXml, SOAPAction (IMPORT XML STRING)
    // OUTPUT => finalOUTPUT => String => success/fail
    function doImportAPICall(req, res) {
        console.log('########## req => '+req);
        console.log('########## req.body=> '+req.body);
        console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
        
        console.log('########## => req.body.instanceURL => '+req.body.endPoint);
        console.log('########## => req.body.sessionID => '+req.body.sessionID);
        console.log('########## => req.body.importXml => '+req.body.importXml);
        console.log('########## => req.body.SOAPAction => '+req.body.SOAPAction);

    
        var importXmlList = req.body.importXml;
        var endPoint = req.body.endPoint;
        var sessionID = req.body.sessionID;
        var SOAPAction = req.body.SOAPAction;


        var importXmlListLen = importXmlList.length;

        console.log('########## => importXmlListLen => '+importXmlListLen);

        var finallyyy = false;
        var finalllList = [];

        for (var i = 0; i < importXmlListLen; i++) {

            var indexx = 0;
            console.log('########## importXmlList[i] => '+importXmlList[i]);

     
            IMPORT_XML_CALL(importXmlList[i],endPoint,sessionID,SOAPAction,(OUTPUT) => { 
                
                console.log('##########1333dgsdgsdgsgd 0 IMPORT_XML_CALL indexx => '+indexx); 
                console.log('##########1333dgsdgsdgsgd 1 IMPORT_XML_CALL OUTPUT => '+OUTPUT);
                finalllList.push(OUTPUT);
                indexx ++;

                 console.log('##########4 END CALLLLLLLLLLLL  2=> '+indexx);
                 console.log('##########5 END CALLLLLLLLLLLL  3 => '+importXmlListLen);

                if( indexx ===  importXmlListLen ){
                    console.log('##########FINALAAAAAAALLL END CALLLLLLLLLLLL => ');
                    if( !!finalllList.reduce(function(a, b){ return (a === b) ? a : NaN; }) ){
                        finallyyy = true;
                    }
                    console.log('##########1333dgsdgsdgsgd 4 finalllList=> '+JSON.stringify(finalllList));
                    console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
                    res.send({"finalOUTPUT":finallyyy});
                }

                  
             });


        }

     
    }



    /*function doReprice(req, res) {
        console.log('########## req => '+req);
        console.log('########## req.body=> '+req.body);
        console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
        
        console.log('########## => req.body.endPoint => '+req.body.endPoint);
        console.log('########## => req.body.sessionID => '+req.body.sessionID);
        console.log('########## => req.body.CartId => '+req.body.CartId);

    
        var endPoint = req.body.endPoint;
        var sessionID = req.body.sessionID;
        var CartId = req.body.CartId;

        console.log('########## => CartId => '+CartId);

        var finallyyy = false;
          var clientOptions = {};
          clientOptions.wsdl_headers = {"sessionId": sessionID};
          clientOptions.endpoint = endPoint;           
          
          var url = 'MyWebService.xml';
          
          
          var args = {"cartID": CartId};

          soap.createClientAsync(url,clientOptions).then((client) => {
            client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
			return client.first(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
                // result is a javascript object
                // rawResponse is the raw xml response string
                // soapHeader is the response soap header as a javascript object
                // rawRequest is the raw xml request string
                console.log('@@@@@@@@@@@@@ soapHeader => '+soapHeader);
                console.log('@@@@@@@@@@@@@ rawRequest => '+rawRequest);

                debugger;
                console.log('@@@@@@@@@@@@@ => _________________________________________');
                //console.log('@@@@@@@@@@@@@ => '+result);
                //console.log(rawResponse);
                //console.log(rawRequest);
				console.log('##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
				//console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
				
				
				  soap.createClientAsync(url,clientOptions).then((client) => {
					client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
					return client.first(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
						// result is a javascript object
						// rawResponse is the raw xml response string
						// soapHeader is the response soap header as a javascript object
						// rawRequest is the raw xml request string
						console.log('@@@@@@@@@@@@@ soapHeader => '+soapHeader);
						console.log('@@@@@@@@@@@@@ rawRequest => '+rawRequest);

						debugger;
						console.log('@@@@@@@@@@@@@ => _________________________________________');
						//console.log('@@@@@@@@@@@@@ => '+result);
						//console.log(rawResponse);
						//console.log(rawRequest);
						console.log('##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
						//console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
						
						
						  soap.createClientAsync(url,clientOptions).then((client) => {
							client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
							return client.second(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
								// result is a javascript object
								// rawResponse is the raw xml response string
								// soapHeader is the response soap header as a javascript object
								// rawRequest is the raw xml request string
								console.log('@@@@@@@@@@@@@ soapHeader => '+soapHeader);
								console.log('@@@@@@@@@@@@@ rawRequest => '+rawRequest);

								debugger;
								console.log('@@@@@@@@@@@@@ => _________________________________________');
								//console.log('@@@@@@@@@@@@@ => '+result);
								//console.log(rawResponse);
								//console.log(rawRequest);
								console.log('##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
								//console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
								
								
							  soap.createClientAsync(url,clientOptions).then((client) => {
								client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
								return client.third(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
									// result is a javascript object
									// rawResponse is the raw xml response string
									// soapHeader is the response soap header as a javascript object
									// rawRequest is the raw xml request string
									console.log('@@@@@@@@@@@@@ soapHeader => '+soapHeader);
									console.log('@@@@@@@@@@@@@ rawRequest => '+rawRequest);

									debugger;
									console.log('@@@@@@@@@@@@@ => _________________________________________');
									//console.log('@@@@@@@@@@@@@ => '+result);
									//console.log(rawResponse);
									//console.log(rawRequest);
									console.log('##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
									//console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
									res.send({"IsPricePending":finallyyy});                
								});
							  }).then((result) => {
								console.log('############ => '+result);
								console.log('##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
								//res.send({"IsPricePending":finallyyy});  
							  });								
								
								
								
								//res.send({"IsPricePending":finallyyy});                
							});
						  }).then((result) => {
							console.log('############ => '+result);
							console.log('##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
							//res.send({"IsPricePending":finallyyy});  
						  });						
						
						
						
						
						//res.send({"IsPricePending":finallyyy});                
					});
				  }).then((result) => {
					console.log('############ => '+result);
					console.log('##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
					//res.send({"IsPricePending":finallyyy});  
				  });				
				
				
				
				//res.send({"IsPricePending":finallyyy});                
            });
          }).then((result) => {
            console.log('############ => '+result);
            console.log('##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
            //res.send({"IsPricePending":finallyyy});  
          });          

		     
    }*/


    /*function doReprice(req, res) {
		console.log('########## req => '+req);
		console.log('########## req.body=> '+req.body);
		console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
			
		console.log('########## => req.body.endPoint => '+req.body.endPoint);
		console.log('########## => req.body.sessionID => '+req.body.sessionID);
		console.log('########## => req.body.CartId => '+req.body.CartId);

		
		var endPoint = req.body.endPoint;
		var sessionID = req.body.sessionID;
		var CartId = req.body.CartId;

		console.log('########## => CartId => '+CartId);

		var finallyyy = false;
		var clientOptions = {};
		clientOptions.wsdl_headers = {"sessionId": sessionID};
		clientOptions.endpoint = endPoint;           
			  
		var url = 'MyWebService.xml';
			  
			  
		var args = {"cartID": CartId};
		
		

		var tracker = 0; // use the tracker upto the time we need to call first API (based on repricecount length)
		var firstStop = false;
		var secondStop = true;
		var i = 0;
		var repricecount = 3;

			
		do {
			
		   if(i == 0 && firstStop == false &&  (tracker < repricecount) ){
				firstStop = true;
                //var res = callAPI1(CartId,endPoint,sessionID);
                var res =  999;
                console.log('callAPI1 @@@@@@@@@@@@@ firstStop => '+firstStop);
                console.log('callAPI1 @@@@@@@@@@@@@ tracker => '+tracker);
                console.log('callAPI1 @@@@@@@@@@@@@ i => '+i);

                soap.createClientAsync(url,clientOptions).then((client) => {
                    client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
                    return client.doCustomPrice1(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
                        // result is a javascript object
                        // rawResponse is the raw xml response string
                        // soapHeader is the response soap header as a javascript object
                        // rawRequest is the raw xml request string
                        ///console.log('callAPI1 @@@@@@@@@@@@@ soapHeader => '+soapHeader);
                        ///console.log('callAPI1 @@@@@@@@@@@@@ rawRequest => '+rawRequest);
                        ///console.log('callAPI1 @@@@@@@@@@@@@ => _________________________________________');
                        //console.log('@@@@@@@@@@@@@ => '+result);
                        //console.log(rawResponse);
                        //console.log(rawRequest);
                        console.log('callAPI1 ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
                        //console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);

                        res = 2;
                        
                        //IF response == 99 => ERROR 
                        //IF response == 1 => REC Call 
                        //IF response == 2 => NO REC Call Needed bz it is DONE (NE-CR DONE)	
                                    
                        console.log('########## firstStop res => '+res);
                        if(res == 1){
                            //DO REC CALL
                            firstStop = false;
                            console.log('########## firstStop res DO REC CALL => '+res);
                        }else if(res == 2 && tracker == 0){
                            //NO REC Call Needed bz it is DONE (NE-CR DONE) 1st TIME
                            firstStop = false;
                            tracker = tracker + 1;
                            i = 8;
                            console.log('########## firstStop res NO REC Call Needed bz it is DONE (NE-CR DONE) 1st TIME => '+res);
                        }else if(res == 2 && tracker == 1){
                            //NO REC Call Needed bz it is DONE (NE-CR DONE) 2nd TIME
                            secondStop = false;
                            tracker = tracker + 1;
                            console.log('########## firstStop res NO REC Call Needed bz it is DONE (NE-CR DONE) 2nd TIME => '+res);
                        } 

                    });
                    }).then((result) => {
                        ///console.log('callAPI1 ############ => '+result);
                        console.log('callAPI1 ##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
                    });

		   }
		   
		   /*if(i == 0 && secondStop == false && tracker == (repricecount - 1)){
				secondStop = true;
				//IF response == 99 => ERROR 
				//IF response == 1 => DO REC Call 
				//IF response == 0 => NO REC Call Needed bz it is DONE				
                //var res2 = callAPI2(CartId,endPoint,sessionID);
                var res2 = 99;
                soap.createClientAsync(url,clientOptions).then((client) => {
                    client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
                    return client.doCustomPrice2(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
                        // result is a javascript object
                        // rawResponse is the raw xml response string
                        // soapHeader is the response soap header as a javascript object
                        // rawRequest is the raw xml request string
                        console.log('callAPI2 @@@@@@@@@@@@@ soapHeader => '+soapHeader);
                        console.log('callAPI2 @@@@@@@@@@@@@ rawRequest => '+rawRequest);
                        console.log('callAPI2 @@@@@@@@@@@@@ => _________________________________________');
                        //console.log('@@@@@@@@@@@@@ => '+result);
                        //console.log(rawResponse);
                        //console.log(rawRequest);
                        console.log('callAPI2 ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
                        //console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
                        res2 = 0;
                        console.log('########## secondStop res => '+res2);
                        if(res2 == 1){
                            //DO REC CALL
                            secondStop = false;
                            console.log('########## secondStop res DO REC CALL => '+res);
                        }else if(res2 == 0){
                            //NO REC Call Needed bz it is DONE (Reprice DONE) Last TIME
                            i = 1;
                            console.log('########## secondStop res NO REC Call Needed bz it is DONE (Reprice DONE) Last TIME => '+res);
                            res.send({"IsPricePending":true}); 
                        }                        
                    });
                  }).then((result) => {
                    console.log('callAPI2 ############ => '+result);
                    console.log('callAPI2 ##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));

                  }); 


		   }/   
		   
		}
		while (i < 10); 

	     
    }*/   

    /*function doReprice(req, res) {
        console.log('########## req => '+req);
        console.log('########## req.body=> '+req.body);
        console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
        
        console.log('########## => req.body.endPoint => '+req.body.endPoint);
        console.log('########## => req.body.sessionID => '+req.body.sessionID);
        console.log('########## => req.body.CartId => '+req.body.CartId);

    
        var endPoint = req.body.endPoint;
        var sessionID = req.body.sessionID;
        var CartId = req.body.CartId;

        console.log('########## => CartId => '+CartId);

        var finallyyy = false;
          var clientOptions = {};
          clientOptions.wsdl_headers = {"sessionId": sessionID};
          clientOptions.endpoint = endPoint;           
          
          var url = 'MyWebService.xml';
          
          
          var args = {"cartID": CartId};

          soap.createClientAsync(url,clientOptions).then((client) => {
            client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
			return client.doCustomPrice1(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
                // result is a javascript object
                // rawResponse is the raw xml response string
                // soapHeader is the response soap header as a javascript object
                // rawRequest is the raw xml request string
                console.log('doCustomPrice1 1st @@@@@@@@@@@@@ soapHeader => '+soapHeader);
                console.log('doCustomPrice1 1st@@@@@@@@@@@@@ rawRequest => '+rawRequest);

                debugger;
                console.log('doCustomPrice1 1st@@@@@@@@@@@@@ => _________________________________________');
                console.log('doCustomPrice1 1st@@@@@@@@@@@@@ => '+result);
                //console.log(rawResponse);
                //console.log(rawRequest);
				console.log('doCustomPrice1 1st ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
				//console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
				
				
				  soap.createClientAsync(url,clientOptions).then((client) => {
					client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
					return client.doCustomPrice1(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
						// result is a javascript object
						// rawResponse is the raw xml response string
						// soapHeader is the response soap header as a javascript object
						// rawRequest is the raw xml request string
						console.log('doCustomPrice1 2nd @@@@@@@@@@@@@ soapHeader => '+soapHeader);
						console.log('doCustomPrice1 2nd @@@@@@@@@@@@@ rawRequest => '+rawRequest);

						debugger;
						console.log('doCustomPrice1 2nd @@@@@@@@@@@@@ => _________________________________________');
						console.log('doCustomPrice1 2nd @@@@@@@@@@@@@@ result => '+result);
						//console.log(rawResponse);
						//console.log(rawRequest);
						console.log('doCustomPrice1 2nd @ ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
						//console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
						
						
						  soap.createClientAsync(url,clientOptions).then((client) => {
							client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
							return client.doCustomPrice2(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
								// result is a javascript object
								// rawResponse is the raw xml response string
								// soapHeader is the response soap header as a javascript object
								// rawRequest is the raw xml request string
								console.log('doCustomPrice2 @@@@@@@@@@@@@ soapHeader => '+soapHeader);
								console.log('doCustomPrice2 @@@@@@@@@@@@@ rawRequest => '+rawRequest);

								debugger;
								console.log('doCustomPrice2 @@@@@@@@@@@@@ => _________________________________________');
								console.log('doCustomPrice2 @@@@@@@@@@@@@ => '+result);
								//console.log(rawResponse);
								//console.log(rawRequest);
								console.log('doCustomPrice2 ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
								//console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
								res.send({"IsPricePending":finallyyy}); 
								
							  /*soap.createClientAsync(url,clientOptions).then((client) => {
								client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
								return client.doCustomPrice2(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
									// result is a javascript object
									// rawResponse is the raw xml response string
									// soapHeader is the response soap header as a javascript object
									// rawRequest is the raw xml request string
									console.log('@@@@@@@@@@@@@ soapHeader => '+soapHeader);
									console.log('@@@@@@@@@@@@@ rawRequest => '+rawRequest);

									debugger;
									console.log('@@@@@@@@@@@@@ => _________________________________________');
									//console.log('@@@@@@@@@@@@@ => '+result);
									//console.log(rawResponse);
									//console.log(rawRequest);
									console.log('##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
									//console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
									res.send({"IsPricePending":finallyyy});                
								});
							  }).then((result) => {
								console.log('############ => '+result);
								console.log('##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
								//res.send({"IsPricePending":finallyyy});  
							  });/								
								
								
								
								//res.send({"IsPricePending":finallyyy});                
							});
						  }).then((result) => {
							console.log('############ => '+result);
							console.log('##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
							//res.send({"IsPricePending":finallyyy});  
						  });						
						
						
						
						
						//res.send({"IsPricePending":finallyyy});                
					});
				  }).then((result) => {
					console.log('############ => '+result);
					console.log('##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
					//res.send({"IsPricePending":finallyyy});  
				  });				
				
				
				
				//res.send({"IsPricePending":finallyyy});                
            });
          }).then((result) => {
            console.log('############ => '+result);
            console.log('##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
            //res.send({"IsPricePending":finallyyy});  
          });          

		     
    }*/



    function doReprice(req, res) {
        console.log('########## req => '+req);
        console.log('########## req.body=> '+req.body);
        console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
        
        console.log('########## => req.body.endPoint => '+req.body.endPoint);
        console.log('########## => req.body.sessionID => '+req.body.sessionID);
        console.log('########## => req.body.CartId => '+req.body.CartId);

    
        var endPoint = req.body.endPoint;
        var sessionID = req.body.sessionID;
        var CartId = req.body.CartId;

        console.log('########## => CartId => '+CartId);

        var finallyyy = false;
          var clientOptions = {};
          clientOptions.wsdl_headers = {"sessionId": sessionID};
          clientOptions.endpoint = endPoint;           
          
          var url = 'MyWebService.xml';
          
          
          var args = {"cartID": CartId};

          soap.createClientAsync(url,clientOptions).then((client) => {
            client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
			return client.doCustomPrice1(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {

				console.log('doCustomPrice1 1st ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
				console.log('doCustomPrice1 1st@@@@@@@@@@@@@ => '+result.result);
				
				  soap.createClientAsync(url,clientOptions).then((client) => {
					client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
					return client.doCustomPrice1(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
						console.log('doCustomPrice1 2nd @ ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));						
						console.log('doCustomPrice1 2nd @@@@@@@@@@@@@@ result => '+result.result);
						
						  soap.createClientAsync(url,clientOptions).then((client) => {
							client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
							return client.doCustomPrice2(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
								console.log('doCustomPrice2 ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
								console.log('doCustomPrice2 @@@@@@@@@@@@@ => '+result.result);
								if(result.result == 0){
									res.send({"IsPricePending":true}); 
								}else{
									res.send({"IsPricePending":false}); 
								}
								
							});
						  }).then((result) => {
							console.log('############ => '+result); 
						  });						
						               
					});
				  }).then((result) => {
					console.log('############ => '+result); 
				  });				
				              
            });
          }).then((result) => {
            console.log('############ then => '+result);
          });          

		     
    }



    function callAPI1(CartId,endPoint,sessionID){
        console.log('### callAPI1 CartId => '+CartId);
        console.log('### callAPI1 endPoint => '+endPoint);
        console.log('### callAPI1 sessionID => '+sessionID);

		var clientOptions = {};
		clientOptions.wsdl_headers = {"sessionId": sessionID};
		clientOptions.endpoint = endPoint;           	  
		var url = 'MyWebService.xml';
		var args = {"cartID": CartId};        

        soap.createClientAsync(url,clientOptions).then((client) => {
            client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
            return client.doCustomPrice1(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
                // result is a javascript object
                // rawResponse is the raw xml response string
                // soapHeader is the response soap header as a javascript object
                // rawRequest is the raw xml request string
                console.log('callAPI1 @@@@@@@@@@@@@ soapHeader => '+soapHeader);
                console.log('callAPI1 @@@@@@@@@@@@@ rawRequest => '+rawRequest);
                console.log('callAPI1 @@@@@@@@@@@@@ => _________________________________________');
                //console.log('@@@@@@@@@@@@@ => '+result);
                //console.log(rawResponse);
                //console.log(rawRequest);
                console.log('callAPI1 ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
                //console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
                return 2;              
            });
          }).then((result) => {
            console.log('callAPI1 ############ => '+result);
            console.log('callAPI1 ##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
          });        

    }
    
    function callAPI2(CartId,endPoint,sessionID){
        console.log('### callAPI2 CartId => '+CartId);
        console.log('### callAPI2 endPoint => '+endPoint);
        console.log('### callAPI2 sessionID => '+sessionID);
		var clientOptions = {};
		clientOptions.wsdl_headers = {"sessionId": sessionID};
		clientOptions.endpoint = endPoint;           	  
		var url = 'MyWebService.xml';
		var args = {"cartID": CartId};         

        soap.createClientAsync(url,clientOptions).then((client) => {
            client.addSoapHeader("<AllowFieldTruncationHeader> <allowFieldTruncation>true</allowFieldTruncation> </AllowFieldTruncationHeader> <DebuggingHeader><categories> <category>System</category> <level>Debug</level> </categories> <debugLevel>Debugonly</debugLevel> </DebuggingHeader> <CallOptions> <client>"+endPoint.split("/services")[0]+"</client> </CallOptions> <SessionHeader> <sessionId>"+sessionID+"</sessionId> </SessionHeader> ");             
            return client.doCustomPrice2(args,{},{"sessionId": sessionID}, function(err, result, rawResponse, soapHeader, rawRequest) {
                // result is a javascript object
                // rawResponse is the raw xml response string
                // soapHeader is the response soap header as a javascript object
                // rawRequest is the raw xml request string
                console.log('callAPI2 @@@@@@@@@@@@@ soapHeader => '+soapHeader);
                console.log('callAPI2 @@@@@@@@@@@@@ rawRequest => '+rawRequest);
                console.log('callAPI2 @@@@@@@@@@@@@ => _________________________________________');
                //console.log('@@@@@@@@@@@@@ => '+result);
                //console.log(rawResponse);
                //console.log(rawRequest);
                console.log('callAPI2 ##########1333dgsdgsdgsgd 4!!!!! finalllList=> '+JSON.stringify(result));
                //console.log('##########1333dgsdgsdgsgd 4 finallyyy=> '+finallyyy);
                return 0;              
            });
          }).then((result) => {
            console.log('callAPI2 ############ => '+result);
            console.log('callAPI2 ##########1333dgsdgsdgsgd 4%%%%%%%% finalllList=> '+JSON.stringify(result));
          });         

    }      

    function IMPORT_XML_CALL(finalBody,finalEndpoint,sessionID,SOAPAction,jsMAP2){

        console.log('### IMPORT_XML_CALL 1  finalBody => '+finalBody);
        console.log('### IMPORT_XML_CALL 2  finalEndpoint => '+finalEndpoint);
        console.log('### IMPORT_XML_CALL 3  sessionID => '+sessionID);
        console.log('### IMPORT_XML_CALL 4  SOAPAction => '+SOAPAction);

        request({
            url: finalEndpoint,
            method: "POST",
            headers: {
                "Authorization": "Bearer " + sessionID,  
                "Content-Type": "text/xml",
                "SOAPAction": SOAPAction,
            },
            body: finalBody
        }, function (error, response, body){
            if(response){
                console.log('### SUCCESSSSSSSSSSSSSSSSS=> '+JSON.stringify(response) );
                var objj = false;
                if(response.body && response.statusCode == '200' ){
                    console.log(' FIANLLYYYYYYY SUCCESSS with 200');
                    objj = true;
                }else{
                    console.log(' FIANLLYYYYYYY SUCCESSS with '+response.statusCode);
                    objj = false;
                }
                
                jsMAP2(objj);
            }
            if(error){
                console.log(' FIANLLYYYYYYY error with ');
                console.log(error);
                jsMAP2(null);
            }
           
        });    

 
        console.log('ENDEDDDDD');
        
    
    }


    /*var getText = function(elt) {
        if (typeof(elt) === 'string') return elt;
        if (typeof(elt) === 'object' && elt.hasOwnProperty('_')) return elt._;
    }*/







// _____________________________________________________________________________________________________________________________


    //FINAL BLUKIFY API CALL FOR LIST OF Custom Setting Objects
    // INPUT IF APIType == 'EXPORT' => validAPINamesSet (validAPINameToFieldsStringMap => APIName & Fields),Endpoint,sourcesessionID
    // INPUT IF APIType == 'DESCRIBE' => validAPINamesSet =>String,Endpoint,sourcesessionID
    // CALL_FROM => FOR_EXPORT FOR_IMPORT
    // OUTPUT => validAPINamesMap
    function getBulkified_COBJECT_DESCRIBE(req, res) {
        console.log('########## req => '+req);
        console.log('########## req.body=> '+req.body);
        console.log('########## JSON.stringify(req.body) => '+JSON.stringify(req.body));
        
        console.log('########## => req.body.validAPINamesSet => '+req.body.validAPINamesSet);
        console.log('########## => req.body.validAPINamesSet => '+req.body.validAPINameToFieldsStringMap);
        console.log('########## => req.body.Endpoint => '+req.body.Endpoint);
        console.log('########## => req.body.sourcesessionID => '+req.body.sourcesessionID);
        console.log('########## => req.body.APIType => '+req.body.APIType);
        console.log('########## => req.body.CALL_FROM => '+req.body.CALL_FROM);

        var requestJsonStringList;
        if(req.body.APIType == 'DESCRIBE'){
            requestJsonStringList = req.body.validAPINamesSet;
        }else{
            requestJsonStringList = req.body.validAPINameToFieldsStringMap;
        }
    
        var CALL_FROM = req.body.CALL_FROM;


        var Endpoint = req.body.Endpoint;
        var sourcesessionID = req.body.sourcesessionID;
        var APIType = req.body.APIType;

        var jsonStringListLen = requestJsonStringList.length;

        console.log('########## => jsonStringListLen => '+jsonStringListLen);

        var finalXMLList = new Map();
        var finallyyy = false;
        var finalllList = [];
        for (var i = 0; i < jsonStringListLen; i++) {

            var indexx = 0;
            console.log('########## requestJsonStringList[i] => '+requestJsonStringList[i]);
            
             //var replaceQuotRegex = new RegExp('&'+'qu'+'ot;', 'g');
             //var abc = requestJsonStringList[i].replace( replaceQuotRegex,'"');
     
             COBJECT_DESCRIBE_CALL(requestJsonStringList[i],Endpoint,sourcesessionID,APIType,CALL_FROM,(soObjectString) => { 
                
                console.log('##########1333dgsdgsdgsgd 0 soObjectString=> '+indexx);
                console.log('##########1333dgsdgsdgsgd 1 soObjectString=> '+soObjectString);
                //finalllList[indexx] = soObjectString;
                finalllList.push(soObjectString);
                indexx ++;
                //res.send({"validAPINamesMap":soObjectString});
                /* //console.log('##########1 soObjectString=> '+soObjectString);
                 if(soObjectString){
                    //finalXMLList.set(requestJsonStringList[i],soObjectString);
                    indexx ++;
                    console.log('##########1333 999999 soObjectString=> ');
                    //console.log('##########1333 soObjectString=> '+JSON.stringify(soObjectString));
                    
                 }else{
                    console.log('##########1 soObjectString=>  ERRORRRRRR');
                 }*/

                 console.log('##########4 END CALLLLLLLLLLLL  2=> '+indexx);
                 console.log('##########5 END CALLLLLLLLLLLL  3 => '+jsonStringListLen);

                if( indexx ===  jsonStringListLen ){
                    console.log('##########FINALAAAAAAALLL END CALLLLLLLLLLLL => ');
                    finallyyy = true;
                    console.log('##########1333dgsdgsdgsgd 4 soObjectString=> '+JSON.stringify(finalllList));
                    res.send({"validAPINamesMap":finalllList});
                }

                  
             });


        }

        //res.send({"validAPINamesMap":finalXMLList});
        /*if(finallyyy){
            //res.send({"validAPINamesMap":finalXMLList});
            console.log('##########2 END finallyyyfinallyyyfinallyyyfinallyyy => '); 
        }
        console.log('##########2 END => '); */       
    }





    function COBJECT_DESCRIBE_CALL(jsonString,Endpoint,sourcesessionID,APIType,CALL_FROM,jsMAP2){
        
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
        
        //Lets create APICALL URL   sourceInstanceURL+EXPORT_QUERY+EncodingUtil.urlEncode(queryString1, 'UTF-8')
        var API_CALL_URL = '';
        console.log('### COBJECT_DESCRIBE_CALL  APIType => '+APIType);
        if(APIType == 'DESCRIBE'){
            API_CALL_URL = Endpoint+COBJECT_DESCRIBE_QUERY+jsonString+'/describe';
        }else{
            var APIName = jsonString.APIName;
            var queryFields = jsonString.Fields;
            var queryString1 = '';
            if(CALL_FROM == 'FOR_EXPORT'){
                queryString1 = 'select id,Name,CreatedBy.Id,CreatedBy.Name,CreatedDate,LastModifiedBy.Name,LastModifiedBy.Id,LastModifiedDate,'+ queryFields +' from '+APIName;
            }else{
                queryString1 = 'select id,Name,'+ queryFields +' from '+APIName;
            }    
    
            //var queryString1 = 'select id,Name,CreatedBy.Id,CreatedBy.Name,CreatedDate,LastModifiedBy.Name,LastModifiedBy.Id,LastModifiedDate,'+ queryFields +' from '+APIName;
            API_CALL_URL = Endpoint+EXPORT_QUERY+encode_utf8(queryString1);
        }

        console.log('### COBJECT_DESCRIBE_CALL  API_CALL_URL => '+API_CALL_URL);

        request({
            url: API_CALL_URL,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sourcesessionID,  // <--Very important!!!
            }
        }, function (error, response, body){
            if(response){
                console.log('### SUCCESSSSSSSSSSSSSSSSS=> '+response);
                //finalXMLList.set(jsonString,response);
                var objj;
                if(response.body && response.statusCode == '200' ){
                    if(APIType == 'DESCRIBE'){
                        objj = {"APIName":jsonString,"Body":response.body};
                    }else{
                        objj = {"APIName":jsonString.APIName,"Body":response.body};
                    }
                }else{
                    objj = {"APIName":jsonString,"Body":response.body};
                }
                
                jsMAP2(objj);
            }
            if(error){
                console.log(error);
                jsMAP2(null);
            }
           
        });    

 
        console.log('ENDEDDDDD');
        
    
    }



    function encode_utf8(s) {
        return unescape(encodeURIComponent(s));
      }
      
      function decode_utf8(s) {
        return decodeURIComponent(escape(s));
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
        getBulkified_COBJECT_DESCRIBE:getBulkified_COBJECT_DESCRIBE,
        doImportAPICall,doImportAPICall,
        doReprice,doReprice
    };

    module.exports = client;

})();