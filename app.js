const inputs = document.querySelectorAll(".buck-values");
const buck_btn = document.getElementById("buck-btn");
const buck_results_contaier = document.getElementById("buck-results-container");
const spans = document.querySelectorAll(".buck-result-text");


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
    arr = arr.concat(lmin, c, il_rms, imax, imin);
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
    


})



