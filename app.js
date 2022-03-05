const inputs = document.querySelectorAll(".buck-values");
const buck_btn = document.getElementById("buck-btn");

console.log(inputs[0])

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
    var obj = {
        inductor: lmin,
        capacitor: c,
        currentOnInd: il_rms,
        maxCurrent: imax,
        minCurrent: imin
    };

    return obj;

}

buck_btn.addEventListener("click", ()=>{
    var vals=[];
    inputs.forEach((input)=>{
        input.textContent
    })
})


console.table(calculateBuckComps(12, 5, 0.005, 40000, 10));

