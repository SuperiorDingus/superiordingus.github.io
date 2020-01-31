function begin(){
    setInterval(function(){
        koziars = koziars + (gen*.01)*genModifier
        counter.innerHTML="Koziars: " + Math.floor(koziars);
        document.getElementById("kps").innerHTML=(genModifier*gen).toFixed(1)+" KPS";
        if (unlocks === 0 & koziars>=10){
            unlocks=1;
            buttonAppear(1);
            buttonAppear(2);
            say("Gen and David are now employable to destroy Koziar.");
        }
        if (koziars>=100){
            upgradeAppear(0);
            upgradeAppear(1);
            upgradeAppear(2);
        }
        if (koziars>=500){
            upgradeAppear(3);
        }
        if (koziars>=1000000){
            
        }
    }, 10)
}


function kozy(){
    audio++;
    if (audio==13){
        audio=1;
    }
    
    
    document.getElementById("audio"+audio).play(); 
    koziars= koziars+1+(david*davidModifier);
    var counter = document.getElementById('counter');
    var koziar = document.getElementById('koziar');
    counter.innerHTML="Koziars: " + Math.floor(koziars);
    koziar.classList.add('expand');
    setTimeout(function(){
        koziar.classList.remove('expand');
    }, 30);
}

function say(message){
    var board = document.getElementById('messageBoard');
    board.classList.remove('fade');
    board.innerHTML=message;
    setTimeout(function(){
        board.classList.add('fade');
    }, 3600);
}

function genUpdate(){
    document.getElementById('desc1').innerHTML="Automatically produces Koziars for you by making him angry. Produces "+genModifier+" Koziars a second each. ("+(genModifier*gen).toFixed(1)+" KpS)";
    document.getElementById('title1').innerHTML= "Gen Nagamatsu: "+gen;
}
function davidUpdate(){
    document.getElementById('desc2').innerHTML="Absolutely destroys Koziar with facts and logic. Increases Kozis by "+davidModifier+" every click."
}
function buttonAppear(number){
    document.getElementById('shop'+number).style="visibility:visible;"
}
function upgradeAppear(number){
    document.getElementById('item'+number).style="visibility:visible;"
}
function buy(thing){
    if (thing=="gen" & koziars>=gprice){
        gen++;
        koziars=koziars-gprice;
        gprice=Math.round(1.08*gen+gprice*1.04);
        document.getElementById('buy1').innerHTML="BUY: "+gprice;
        document.getElementById('title1').innerHTML= "Gen Nagamatsu: "+gen;
        genUpdate();
    }
    else if (thing=="david" & koziars>=dprice){
        david++;
        koziars=koziars-dprice;
        dprice=Math.round(53.1*david+dprice*1.27);
        document.getElementById('buy2').innerHTML="BUY: "+dprice;
        document.getElementById('title2').innerHTML= "David Liu : "+david;
    }
    else {
        say("Insufficient funds.")
    }
}

function upgrade(number){
    if (number==1 & koziars>=100){
        genModifier=genModifier*2;
        koziars=koziars-100;
        document.getElementById('item1').remove();
        genUpdate();
    }
    if (number==2 & koziars>=1000){
        davidModifier=davidModifier*1.5;
        koziars=koziars-1000;
        document.getElementById('item2').remove();
        davidUpdate();
    }
    if (number==3 & koziars>=1500){
        gen=gen+8;
        koziars=koziars-1500;
        document.getElementById('item3').remove();
        genUpdate();
    }
}

function noenter(e) {
		    e = e || window.event;
		    var key = e.keyCode || e.charCode;
		    //alert('e.type: ' + e.type + '; key: ' + key);
		    return key !== 13; 
		}
