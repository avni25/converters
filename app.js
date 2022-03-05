const inputs = document.querySelectorAll(".buck-values");
const boostInputs = document.querySelectorAll(".boost-values");
const buck_btn = document.getElementById("buck-btn");
const boost_btn = document.getElementById("boost-btn");
const buck_results_contaier = document.getElementById("buck-results-container");
const spans = document.querySelectorAll(".buck-result-text");
const boostSpans = document.querySelectorAll(".boost-result-text");


function calculateBuckComps(v_in, v_out, rippleRatio, freq, res){

    var D = v_out /v_in;
    var lmin = (((1-D) * res) / (2*freq)) * 1.25;
    // console.log("lmin: "+lmin);
    var i = v_out / res;
    var delta_i_l = ((v_in - v_out) / lmin) * D * (1 / freq);
    // console.log("delta il: "+delta_i_l);

    var imax = i + (delta_i_l / 2);
    var imin = i - (delta_i_l / 2);

    var il_rms = Math.sqrt(Math.pow(i, 2) + Math.pow(((delta_i_l / 2) / Math.pow(3, 1/3)),2));
    // console.log("il rms: "+il_rms);
    var c = (1-D) / (8 * lmin * (rippleRatio) * Math.pow(freq, 2));
    // console.log("c: "+c);
    
    var arr = [];
    arr = arr.concat(lmin, c, il_rms, imax, imin, D);
    return arr;

}

function calculateBoostComps(v_in, v_out, rippleRatio, freq, res){
    var D = 1-(v_in / v_out);
    var lmin = ((D * Math.pow(1-D, 2) * res) / (2*freq) ) * 1.2;
    var IL = v_in / (Math.pow(1-D, 2) * res);
    var delta_il = (v_in * D) / (lmin * freq);

    var c = D / (res * rippleRatio * freq);
    var arr = [];
    arr = arr.concat(lmin, c, IL, D);

    return arr;

}




buck_btn.addEventListener("click", ()=>{
    var vals=[];
    inputs.forEach((input)=>{        
        vals.push(parseFloat(input.value));
    });
    // console.table(calculateBuckComps(vals[0],vals[1],vals[2],vals[3],vals[4]));
    var arr = calculateBuckComps(vals[0],vals[1],vals[2],vals[3],vals[4]);


    for(var i=0;i<spans.length; i++){
        spans[i].textContent =  arr[i];
        console.log(arr[i]);
    }
});

boost_btn.addEventListener("click", ()=>{
    var vals =[];
    boostInputs.forEach((input)=>{
        vals.push(parseFloat(input.value))
    });
    if(vals[0] >= vals[1]){
        boostSpans[0].textContent =  "wrong input";
    }else{
        var arr = calculateBoostComps(vals[0],vals[1],vals[2],vals[3],vals[4]);
    for(var i=0;i<spans.length; i++){
        boostSpans[i].textContent =  arr[i];
        console.log(arr[i]);
    }
    }
    
});




