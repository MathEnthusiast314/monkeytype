// ==UserScript==
// @name        MonkeyType Stats
// @namespace   MathEnthusiast314
// @grant       none
// @version     1.0
// @author      MathEnthusiast314
// @match       https://monkeytype.com/*
// @description Posts monkeytype test stats to discord as a webhook
// @require     https://statswebhook.glitch.me/socket.io/socket.io.min.js
// @downloadURL https://github.com/MathEnthusiast314/monkeytype/raw/main/monkeytype-discord-integration.user.js
// @updateURL   https://github.com/MathEnthusiast314/monkeytype/raw/main/monkeytype-discord-integration.user.js
// ==/UserScript==
const socket = io("https://statswebhook.glitch.me/")
setTimeout(after, 5000)
function after(){
    var proxied = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function() {
        if(arguments[0]!=null){
            var p=JSON.parse(arguments[0]);
            if (typeof(p)=='object'){
                if(Object.keys(p).includes('result')){
                    var name=`${document.getElementsByClassName('view-account')[0].children[3].textContent} (${document.getElementsByClassName('view-account')[0].children[4].textContent})`;
                    var nameNum=0;
                    for (var char of name){nameNum+=char.charCodeAt(0)}
                    var emitdata={setText:[`${p.result.mode} ${p.result.mode2} | ${p.result.language}${p.result.punctuation?" | punctuation":""}${p.result.numbers?" | numbers":""}`],setAuthor:[name, `https://cdn.discordapp.com/embed/avatars/${nameNum%6}.png`, 'https://monkeytype.com/profile/'+p.result.uid],
                                   setTitle:[p.result.wpm+' wpm'],setURL:['https://monkeytype.com'],
                                   addField:[['Raw wpm',`\`\`\`ansi\n[0;34m${p.result.rawWpm} wpm\`\`\``, true],['Accuracy',`\`\`\`ansi\n[0;36m${p.result.acc}%\`\`\``, true],['Time ⌚️',`\`\`\`ansi\n[0;32m${p.result.testDuration}s\`\`\``, true],
                                             ['Consistency',`\`\`\`ansi\n[0;36m${p.result.consistency}%[0m ([0;36m${p.result.keyConsistency}%[0m key)\`\`\``, true],['Wpm Consistency',`\`\`\`ansi\n[0;34m${p.result.wpmConsistency} wpm\`\`\``, true],
                                             ['Characters\n(correct / incorrect / extra / missed)',`\`\`\`ansi\n[0;32m${p.result.charStats[0]}[0;37m / [0;31m${p.result.charStats[1]}[0;37m / [0;33m${p.result.charStats[2]}[0;37m / [0;35m${p.result.charStats[3]}\`\`\``, false]],
                                   setTimestamp:p.result.timestamp}
                    
                    var pointer = this
                    var intervalId = window.setInterval(function(){
                        if(pointer.readyState != 4){
                            return;
                        }
                        JSON.parse(pointer.responseText).data.isPb?emitdata.setFooter=['Personal Best!', 'https://i.imgur.com/rY8b7Ja.png']:0;
                        socket.emit("log",[emitdata,'monkeytypeme314server'])
                        clearInterval(intervalId);
                    }, 1);
                }
            }
        }
        return proxied.apply(this, [].slice.call(arguments));
    };
}
