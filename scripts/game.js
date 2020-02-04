function begin(){
    slowFrame()
    setInterval(function(){
        koziars = koziars + (gen*.04)*genModifier + (nuss*.04)*nussModifier
        counter.innerHTML="Koziars: " + numberFixer(Math.floor(koziars));
    }, 40)
}

function slowFrame(){
    setInterval(function(){
        document.getElementById("kps").innerHTML=numberFixer(((genModifier*gen)+(nuss*nussModifier)).toFixed(1))+" KPS";
	if (gen!==0& koziars>=100){
            buttonAppear(3);
        }
        if (koziars>=2000){
            upgradeAppear(7);
        }
        if (koziars>=1700){
            upgradeAppear(6);
        }
        if (koziars>=1000){
            upgradeAppear(4);
        }
        if (koziars>=550){
            upgradeAppear(3);
        }
        if (koziars>=75){
            upgradeAppear(0);
            upgradeAppear(1);
            upgradeAppear(2);
        }
        if (unlocks === 0 & koziars>=10){
            unlocks=1;
            buttonAppear(1);
            buttonAppear(2);
            say("Gen and David are now employable to destroy Koziar.");
        }
    }, 500)
}

function disstrack(){
        document.getElementById("audio13").play();
}
function kozy(){
    audio++;
    if (audio==13){
        audio=1;
    }
    
    
    document.getElementById("audio"+audio).volume=.15;
    document.getElementById("audio"+audio).play(); 
    koziars= koziars+1+(david*davidModifier);
    var counter = document.getElementById('counter');
    var koziar = document.getElementById('koziar');
    counter.innerHTML="Koziars: " + numberFixer(Math.floor(koziars));
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

function nussUpdate(){
    document.getElementById('desc3').innerHTML="Is that NUSS? Nuss nuss nuss! Produces "+nussModifier+" Kozis a second each. ("+(nussModifier*nuss).toFixed(1)+" KpS)";
    document.getElementById('title3').innerHTML= "Maxwell Nuss: "+nuss;
}

function buttonAppear(number){
    document.getElementById('shop'+number).style="visibility:visible;";
}
function upgradeAppear(number){
    document.getElementById('item'+number).style="visibility:visible;";
}
function buy(thing){
    if (thing=="gen" & koziars>=gprice){
        gen++;
        koziars=koziars-gprice;
        gprice=Math.round((1.0002*gen+gprice*1.0015)*.96);
        document.getElementById('buy1').innerHTML="BUY: "+numberFixer(gprice);
        document.getElementById('title1').innerHTML= "Gen Nagamatsu: "+gen;
        genUpdate();
    }
    else if (thing=="david" & koziars>=dprice){
        david++;
        koziars=koziars-dprice;
        dprice=Math.round(54.9*david+dprice*1.51);
        document.getElementById('buy2').innerHTML="BUY: "+numberFixer(dprice);
        document.getElementById('title2').innerHTML= "David Liu : "+david;
    }
    if (thing=="nuss" & koziars>=nprice){
        nuss++;
        koziars=koziars-nprice;
        nprice=Math.round(1.14*nuss+nprice*1.07);
        document.getElementById('buy3').innerHTML="BUY: "+numberFixer(nprice);
        document.getElementById('title3').innerHTML= "Maxwell Nuss: "+nuss;
        nussUpdate();
    }
    else {
        say("Insufficient funds.")
    }
}

function lightmodeAppear() {
    document.getElementById('mode').style="visibility:visible;";
}
function upgrade(number){
    if (number==1 & koziars>=100){
        genModifier=genModifier*2;
        koziars=koziars-100;
        document.getElementById('item1').remove();
        genUpdate();
    }
    if (number==2 & koziars>=750){
        davidModifier=davidModifier*2;
        koziars=koziars-750;
        document.getElementById('item2').remove();
        davidUpdate();
    }
    if (number==3 & koziars>=1200){
        genModifier=genModifier*2;
        koziars=koziars-1200;
        document.getElementById('item3').remove();
        genUpdate();
    }
    if (number==4 & koziars>=2500){
        nussModifier=nussModifier*2;
        koziars=koziars-2500;
        document.getElementById('item4').remove();
        nussUpdate();
    }
    if (number==5 & koziars>=1000){
        lightmode = 1;
        document.getElementById('item5').remove();
        lightmodeAppear();
    }
    if (number==6 & koziars>=1000){
        koziars=koziars-1000;
        koziars=koziars*2
        document.getElementById('item6').remove();
    }
    if (number==7 & koziars>=10000){
        genModifier=genModifier*5;
        koziars=koziars-10000;
        document.getElementById('item7').remove();
        genUpdate();
    }
}

function noenter(e) {
		    e = e || window.event;
		    var key = e.keyCode || e.charCode;
		    //alert('e.type: ' + e.type + '; key: ' + key);
		    return key !== 13; 
		}
		
function numberFixer(number) {
    // what tier? (determines SI symbol) Yeah I copied this script from the internet.
    var tier = Math.log10(number) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(2) + suffix;
}
