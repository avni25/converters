const inputs = document.querySelectorAll(".buck-values");
const buck_btn = document.getElementById("buck-btn");
const buck_contaier = document.getElementById("buck-inputs-container");

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
        vals.push(parseFloat(input.value));
    });
    console.log(vals);
    console.table(calculateBuckComps(vals[0],vals[1],vals[2],vals[3],vals[4]));
    var obj = calculateBuckComps(vals[0],vals[1],vals[2],vals[3],vals[4]);

    const label = document.createElement("label");
    label.setAttribute("class", "buck-results");
    label.textContent = `ìnductor: ${obj.inductor}`; 
    buck_contaier.appendChild(label);
})



