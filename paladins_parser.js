const fs = require("fs");
const request = require('request');
const JSON5 = require('json5');

function get_players(){
    let fdata = fs.readFileSync("nicknames.txt", "utf8");
    var lines = fdata.split('\n');
    return lines;
}

var ret;

async function get_player_info(nick){
    var req = { 
        url: 'https://paladins.guru/search?term=' + nick + '&type=Player',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
        'upgrade-insecure-requests': 1
    };
    
    function do_request(reque) {
        return new Promise((resolve, reject) => {
            request(reque, (error, response, body) => {
                if (error) {
                    console.error('Could not send request: ${error.message}');
                    ret = 'error';
                    return;
                }

                if (response.statusCode != 200) {
                    console.error('Expected status code 200 but received ${response.statusCode}.');
                    ret = 'error';
                    return;
                }
                var splitted = body.split('\n');
                var start_index = splitted[11].indexOf('layout') - 1;
                var open_brackets = 0;
                var json_str = '';
                for(var i = start_index; i < splitted[11].length; i++){
                    if(splitted[11][i] == '{') open_brackets++;
                    if(splitted[11][i] == '}') open_brackets--;
                    json_str += splitted[11][i]; 
                    if(open_brackets <= 0) break;           
                }
                json_str = json_str.replace(/:a,/g, ':"hui s nim",').replace(/:b,/g, ':"hui bi s nim",').replace(/:c,/g, ':"huc s nim",').replace(/:d,/g, ':"hud s nim",').replace(/:c}/g, ':"zaebalo"}').replace(/:b}/g, ':"zaebalo"}').replace(/:d}/g, ':"zaebalo"}').replace(/:e,/g, ':"zaebalo",').replace(/:g,/g, ':"zaebalo",').replace(/:g}/g, ':"zaebalo"}').replace(/:a}/g, ':"hui s nim"}').replace(/:f,/g, ':"f",').replace(/:f}/g, ':"f"}').replace(/:h,/g, ':"zaebalo",').replace(/:h}/g, ':"zaebalo"}');
               // console.log(json_str);
                try{ 
                    var parsed = JSON5.parse(json_str).data[0].results;                
                    ret = parsed;
                    resolve(1);
                    return;
                }
                catch(e){
                    ret = 'error';
                    console.log(json_str);
                    return;                
                }
            });
        });
    }
    await do_request(req);
    return ret;
}

async function show_player_info(player){
    var info = await get_player_info(player);
    if(info != 'error' && info != undefined){
        //console.log(info);
        try{
            let js_f = {
                "nickname": player,
                "playtime": info[0].playtime,
                "seen": info[0].seen,
                "level": info[0].level
            };
            fs.appendFileSync("parsed.txt", JSON5.stringify(js_f) + '\n');
            console.log(JSON5.stringify(js_f));
        } catch(e){
            console.log('something went wrong with ' + player + ' info: ' + info);        
        }
        
    }
}

function main(){
    fs.writeFileSync("parsed.txt", "");
    var players = get_players();
    for(var i = 0; i < players.length; i++){
        show_player_info(players[i]);
    }
}

main();


