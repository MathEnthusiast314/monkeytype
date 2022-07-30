// ==UserScript==
// @name         MonkeyType Stats
// @namespace    MathEnthusiast314
// @grant       none
// @version     1.0
// @author      MathEnthusiast314
// @match        https://monkeytype.com
// @description Posts monkeytype test stats to discord as a webhook
// @require     https://statswebhook.glitch.me/socket.io/socket.io.min.js
// ==/UserScript==
const socket = io("https://statswebhook.glitch.me/")
//socket.emit("log",['hi','monkeytype'])

setTimeout(after, 5000)

function after(){
    //https://stackoverflow.com/a/20714771
    console.log('aaaa');
    var proxied = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function() {
        if(arguments[0]!=null){
            var p=JSON.parse(arguments[0]);
            if (typeof(p)=='object'){
                if(Object.keys(p).includes('result')){
                    /*console.log(p);
                    window.p=p;
                    var canvas = document.getElementById('wpmChart');
                    var dataURL = canvas.toDataURL();*/
                    var emitdata={setText:[`${p.result.mode} ${p.result.mode2} | ${p.result.language}${p.result.punctuation?" | punctuation":""}${p.result.numbers?" | numbers":""}`],setAuthor:[document.getElementsByClassName('view-account')[0].children[2].textContent, 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://monkeytype.com/profile/'+p.result.uid],
                                   setTitle:[p.result.wpm+' wpm'],setURL:['https://monkeytype.com'],
                                   addField:[['Raw wpm',`\`\`\`ansi\n[0;34m${p.result.rawWpm} wpm\`\`\``, true],['Accuracy',`\`\`\`ansi\n[0;36m${p.result.acc}%\`\`\``, true],['Time ⌚️',`\`\`\`ansi\n[0;32m${p.result.testDuration}s\`\`\``, true],
                                             ['Consistency',`\`\`\`ansi\n[0;36m${p.result.consistency}%[0m ([0;36m${p.result.keyConsistency}%[0m key)\`\`\``, true],['Wpm Consistency',`\`\`\`ansi\n[0;34m${p.result.wpmConsistency} wpm\`\`\``, true],
                                             ['Characters\n(correct / incorrect / extra / missed)',`\`\`\`ansi\n[0;32m${p.result.charStats[0]}[0;37m / [0;31m${p.result.charStats[1]}[0;37m / [0;33m${p.result.charStats[2]}[0;37m / [0;35m${p.result.charStats[3]}\`\`\``, false]],
                                   setTimestamp:p.result.timestamp}
                    socket.emit("log",[emitdata,'monkeytypeme314server'])
                }
            }
        }
        return proxied.apply(this, [].slice.call(arguments));
    };
}
