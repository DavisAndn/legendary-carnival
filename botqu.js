require('cache-require-paths');

var screenshot = require('desktop-screenshot');
var gm = require('gm');
var nodecr = require('nodecr');
var google = require('google');
var request = require("request");
var cheerio = require('cheerio');
var question;
var answers;
var pointsAnswer0=0;
var pointsAnswer1=0;
var pointsAnswer2=0;

 var opn = require('opn');
//var windowObjectReference;
//var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

 //var ks = require('node-key-sender');

sw = require('stopword')
count=0

screenshot("screenshot.jpg", {width: 1600}, function(error, complete) {
    if(error)
        console.log("Screenshot failed", error);
    else
        console.log("Screenshot done");
       
              gm('screenshot.jpg')
                    .crop('396','93', '600', '310')
                    .write('question.jpg', function (err) {
                      if (!err) {
                        console.log("Question resized");
                        nodecr.process('question.jpg',function(err, text) {
          	              if(err) {
          		              console.error(err);
          	              } else {
                            question = text.replace(/\n/g, " ");
                            
                            question=question.toLowerCase();
                            question=question.split("?")[0];
                            question=question.split("_.")[0];
                            
                            fqustn="https://www.google.co.in/search?q=";

                            //question=question.replace("_.", "*");
                            //question=question.split("*")[0];
                           // question=question.replace("  ", "*");
                           // question=question.split("*")[1];
                            if ( /"/.test(question) ){
                              part = question.match( /"(.*?)"/ )[1];
                              opn(fqustn + part, {app: 'chrome'});
                            }
                            if ( /most/.test(question) ){
                              addit= "most ";
                              count=1;
                            }

                            question=question.replace(" not ", " ");
                            question=question.replace(" among ", " ");
                            question=question.replace(" following ", " ");
                            //question=question.replace("eeavianated", " ");

                            question=question.replace("__", " ");
                            
                            question=question.replace("[fm @", " ");
                            question=question.replace("[", " ");
                            question=question.replace("@", " ");
                            question=question.replace("&", " ");
                              question = question.split(' ');
                            question = sw.removeStopwords(question);
                            question = question.toString();
                            question = question.replace(/,/g, ' ');

                            if(count==1)
                            {
                              question = question + addit;
                            }

                            console.log('The question is "' + question + '"');
                            

                            
                            
                            fqustn=fqustn+question;
                             //question=question.substring(question.indexOf('?') + 1);
                            //opn(fqustn, {app: 'chrome'});
                             
                             gm('screenshot.jpg')
                              .crop('317', '272', '600', '460')
                              .write('answers.jpg', function (err) {
                                if (!err) {
                                  console.log("Answers resized");
                                  nodecr.process('answers.jpg',function(err, text) {
                                    if(err) {
                                      console.error(err);
                                    } else {
                                      answers = text.replace(/^\s*$[\n\r]{1,}/gm, '');
                                      answers = answers.split(/\n/g);
                                      answers = answers.filter(function(e){ return e === 0 || e });
                                      
                                      //opn(fqustn+" "+answers[0]+" OR "+answers[1]+" OR "+answers[2], {app: 'chrome'});
                                      //opn(fqustn+' "'+answers[0]+'" OR "'+answers[1]+'" OR "'+answers[2]+'"', {app: 'chrome'});

                                      for(var i = 0; i < answers.length; i++) {
                                        console.log(answers[i]);
                                      }
                                      //opn(fqustn+" "+answers[0], {app: 'chrome'});
                                      //opn(fqustn+" "+answers[1], {app: 'chrome'});
                                      //opn(fqustn+" "+answers[2], {app: 'chrome'});
                                      
                                      opn(fqustn, {app: 'chrome'});
                                      
                                      //ks.setOption('startDelayMillisec', 1500);
                                      //ks.setOption('globalDelayBetweenMillisec', 500);

                                      //ks.sendCombination(['control', 'tab']);
                                      //ks.sendCombination(['control', 'tab']);




                            google.resultsPerPage = 25;
                            var nextCounter = 0;
                            

                             //windowObjectReference = window.open(question);
                           

                            


                            

                            google(question, function (err, res){
                              if (err) console.error(err)

                              for (var i = 0; i < res.links.length; ++i) {
                                var link = res.links[i];
                                if(link.link != null) {
                                  if(link.link.indexOf("wikipedia") != -1) {
                                    console.log("Wikipedia link FOUND FOUND FOUND!!!!: " + link.link);
                                    request(link.link, function (error, response, body) {
                                      if (!error) {
                                        var $ = cheerio.load(body);
                                        if($('body').text().toLowerCase().indexOf(answers[0].toLowerCase()) != -1) {
                                          console.log(answers[0] + " FOUND FOUND FOUND!!!! in Wikipedia page!")
                                          pointsAnswer0++;
                                        }

                                        if($('body').text().toLowerCase().indexOf(answers[1].toLowerCase()) != -1) {
                                          console.log(answers[1] + " FOUND FOUND FOUND!!!! in Wikipedia page!")
                                          pointsAnswer1++;
                                        }

                                        if($('body').text().toLowerCase().indexOf(answers[2].toLowerCase()) != -1) {
                                          console.log(answers[2] + " FOUND FOUND FOUND!!!! in Wikipedia page!")
                                          pointsAnswer2++;
                                        }
                                      } else {
                                        console.log("Error: " + error);
                                      }
                                    });
                                  }
                                }
                                if(link.title.indexOf(answers[0]) != -1) {
                                  pointsAnswer0++;
                                  console.log(answers[0] + " FOUND FOUND FOUND!!!!!");
                                }
                                if(link.title.indexOf(answers[1]) != -1) {
                                  pointsAnswer1++;
                                  console.log(answers[1] + " FOUND FOUND FOUND!!!!!");
                                }
                                if(link.title.indexOf(answers[2]) != -1) {
                                  pointsAnswer2++;
                                  console.log(answers[2] + " FOUND FOUND FOUND!!!!!");
                                }
                                if(link.description.indexOf(answers[0]) != -1) {
                                  pointsAnswer0++;
                                  console.log(answers[0] + " FOUND FOUND FOUND!!!!!");
                                }
                                if(link.description.indexOf(answers[1]) != -1) {
                                  pointsAnswer1++;
                                  console.log(answers[1] + " FOUND FOUND FOUND!!!!!");
                                }
                                if(link.description.indexOf(answers[2]) != -1) {
                                  pointsAnswer2++;
                                  console.log(answers[2] + " FOUND FOUND FOUND!!!!!");
                                }

                              }
                            console.log(answers[0] ,"                     AAA ",answers[0], pointsAnswer0);
                            console.log(answers[1] ,"                     BBB ",answers[1],pointsAnswer1);
                            console.log(answers[2] ,"                     CCC ",answers[2],pointsAnswer2);
                              if (nextCounter < 4) {
                                nextCounter += 1
                                if (res.next) res.next()
                              }
                            })
          	              }
                        });
                      } else {
                        console.log(err);
                      }
                    });
                }
              });
            } else {
              console.log(err);
            }
          });
});


