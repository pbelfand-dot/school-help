/* Study Sorter — practice problem generators.
   Every generator returns: {type,label,q,ans,accept[],steps[],num?}
   `accept` holds normalized strings that count as correct.
   `num` (optional) enables numeric tolerance grading. */

const R = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick = a => a[R(0,a.length-1)];
const gcd = (a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;};
const sign = n => n<0 ? "− "+Math.abs(n) : "+ "+n;
const coef = (n,v)=> n===1? v : n===-1? "−"+v : n+v;

/* radical string helpers */
function radStr(num,rad,den){
  let top = num===1 ? "√"+rad : num+"√"+rad;
  return den===1 ? top : top+"/"+den;
}
function radAccept(num,rad,den){
  const n = num===1?"":String(num);
  const forms=[];
  const tops=[n+"√"+rad, n+"sqrt"+rad, n+"sqrt("+rad+")", n+"rad"+rad];
  tops.forEach(t=>{
    if(den===1){forms.push(t);}
    else{forms.push(t+"/"+den, "("+t+")/"+den);}
  });
  return forms;
}

const lin = (m,k)=>{
  const mx = m===1 ? "x" : `${m}x`;
  if(k===0) return mx;
  return k<0 ? `${mx} \u2212 ${-k}` : `${mx} + ${k}`;
};
const sq = d => d===0 ? "x\u00b2" : (d<0 ? `x\u00b2 \u2212 ${-d}` : `x\u00b2 + ${d}`);

const term = (v,unit)=>{
  if(v===0) return "";
  const a=Math.abs(v);
  const coef=(unit && a===1)?"":String(a);
  return ` ${v<0?"−":"+"} ${coef}${unit}`;
};
const quadStr = (a,b,c)=> (a===1?"":a===-1?"−":String(a))+"x²"+term(b,"x")+term(c,"");
const facStr  = v => v===0 ? "x" : `x${term(v,"")}`;

const GENERATORS = {

psychExperiment:{label:"Experimental design (IV / DV / confound)", subject:"psychology", topic:"Experimental design: IV, DV, control, confounds",
 make(){
  const cases=[
   {sc:"A researcher tests whether friendliness from wait staff affects tips. For one month, baseline tip data is collected at several randomly selected restaurants. For the next month, every waiter draws a smiley face on each check. Tips are compared across the two months.",
    iv:"whether a smiley face was drawn on the check", ivA:["smileyface","smiley","drawingasmileyface","friendliness","thesmileyface"],
    dv:"the amount of the tip", dvA:["tipamount","tips","amountoftips","thetip","sizeofthetip"],
    cg:"None \u2014 the same staff serve as their own baseline", cgA:["none","nocontrolgroup","therewasnone","baselinemonth","firstmonth"],
    cf:"time of year \u2014 the two months differ in more than the smiley face", cfA:["timeofyear","season","month","weather","holidays","differentmonths"]},
   {sc:"Four identical wallets are dropped around a city, each containing a different photo: an elderly couple, a young couple, a puppy, and a baby. Researchers record how many of each are returned.",
    iv:"the type of photo inside the wallet", ivA:["photo","typeofphoto","phototype","pictureinthewallet","thephoto","imageinwallet"],
    dv:"the return rate of the wallets", dvA:["returnrate","rateofreturn","howmanywerereturned","numberreturned","wallets returned","whetheritwasreturned"],
    cg:"None \u2014 there is no photo-free wallet condition", cgA:["none","nocontrolgroup","therewasnone","nophoto"],
    cf:"where each wallet was dropped", cfA:["droplocation","location","wherewalletsweredropped","neighborhood","placedropped","whofoundit"]},
   {sc:"Fourth-graders who did poorly through third grade are randomly split into three groups. One teacher is told her students are gifted, one is told nothing, and one is told her students are slow learners. End-of-year test scores are compared.",
    iv:"what the teacher was told about the students", ivA:["whattheteacherwastold","teacherexpectation","teacherexpectations","informationgiventoteacher","whattheteacherbelieved","expectation"],
    dv:"end-of-year test scores", dvA:["testscores","endofyeartestscores","scores","academicperformance","performance","grades"],
    cg:"the group whose teacher was told nothing", cgA:["toldnothing","thegrouptoldnothing","nothing","middlegroup","noinformationgroup","secondgroup"],
    cf:"differences between the individual teachers", cfA:["theteachers","teacherdifferences","teachingability","differentteachers","teacherquality","teacherskill"]},
   {sc:"To test whether background music affects studying, students are randomly assigned to study a word list in silence or with instrumental music playing. All students then take the same recall test.",
    iv:"whether background music was playing", ivA:["music","backgroundmusic","presenceofmusic","musicornot","whethermusicplayed"],
    dv:"score on the recall test", dvA:["recallscore","testscore","score","wordsrecalled","numberofwordsremembered","memory"],
    cg:"the group that studied in silence", cgA:["silence","silentgroup","thesilencegroup","nomusicgroup","nomusic","studiedinsilence"],
    cf:"how much sleep each student had the night before", cfA:["sleep","priorknowledge","studyhabits","noiselevel","timeofday","individualdifferences","intelligence","motivation"]},
   {sc:"A company tests a new sleep supplement. Half the volunteers receive the supplement and half receive an identical-looking sugar pill. Neither the volunteers nor the staff handing out the pills know who got which. Hours slept are recorded for two weeks.",
    iv:"whether the participant received the supplement or the placebo", ivA:["supplement","thesupplement","supplementorplacebo","whethertheygotthesupplement","pilltype","typeofpill"],
    dv:"hours of sleep", dvA:["hoursslept","hoursofsleep","sleep","amountofsleep","sleepduration"],
    cg:"the group given the sugar pill", cgA:["sugarpill","placebo","placebogroup","thesugarpillgroup","thoseonplacebo"],
    cf:"differences in participants' daily caffeine intake", cfA:["caffeine","stress","screentime","preexistingsleepproblems","dailyroutine","individualdifferences","diet","exercise"]}
  ];
  const c = pick(cases);
  const asks = [
   {q:"Identify the INDEPENDENT variable.", ans:c.iv, acc:c.ivA,
    st:["The independent variable is what the researcher deliberately manipulates \u2014 the presumed cause.","Ask: what did the researcher change or assign between conditions?",`Answer: ${c.iv}`]},
   {q:"Identify the DEPENDENT variable.", ans:c.dv, acc:c.dvA,
    st:["The dependent variable is what gets measured \u2014 the data recorded at the end.","Ask: what numbers did they write down?",`Answer: ${c.dv}`]},
   {q:"Identify the CONTROL GROUP, if there is one.", ans:c.cg, acc:c.cgA,
    st:["The control group is the one that does NOT receive the treatment.","Not every design has one \u2014 before/after studies often use a baseline instead.",`Answer: ${c.cg}`]},
   {q:"Identify one possible CONFOUNDING variable.", ans:c.cf, acc:c.cfA,
    st:["A confound is an uncontrolled difference that offers a rival explanation for the results.","Ask: what else differed between the conditions besides the IV?",`One good answer: ${c.cf}  (other reasonable confounds also count \u2014 grade yourself)`]}
  ];
  const a = pick(asks);
  return { q:`${c.sc}\n\n${a.q}`, ans:a.ans, accept:a.acc, steps:a.st };
 }},

psychVocab:{label:"Psych Unit 0 vocabulary", subject:"psychology", topic:"Research methods in psychology",
 make(){
  const bank=[
   ["Operational definition","the exact, measurable way a study defines a variable \u2014 e.g. defining 'stress' as score on a named questionnaire",["operationaldefinition","operationaldefinitions"]],
   ["Random assignment","sorting participants into conditions by chance, which is what allows a cause-and-effect claim",["randomassignment","randomlyassigning"]],
   ["Random sampling","choosing participants from the population by chance, which is what allows results to generalize",["randomsampling","randomsample","randomselection"]],
   ["Confounding variable","an uncontrolled factor that differs between groups and offers a rival explanation for the results",["confoundingvariable","confound","confounds","confoundingvariables","extraneousvariable"]],
   ["Placebo effect","improvement caused purely by a participant's expectation rather than by the treatment itself",["placeboeffect","placebo"]],
   ["Double-blind procedure","neither the participants nor the researchers interacting with them know who is in which condition",["doubleblind","doubleblindprocedure","doubleblindstudy"]],
   ["Demand characteristics","cues that let participants guess the hypothesis, so they adjust their behavior to match it",["demandcharacteristics","demandcharacteristic"]],
   ["Social desirability bias","the tendency to answer self-report questions in whatever way makes you look better",["socialdesirability","socialdesirabilitybias"]],
   ["Naturalistic observation","recording behavior in its real-world setting without intervening in it",["naturalisticobservation","naturalobservation"]],
   ["Case study","an in-depth investigation of a single person or small group, rich in detail but hard to generalize",["casestudy","casestudies"]],
   ["Correlation coefficient","a number from \u22121 to +1 giving the direction and strength of a linear relationship",["correlationcoefficient","r","correlation"]],
   ["Third-variable problem","when an unmeasured factor causes both correlated variables, so neither causes the other",["thirdvariableproblem","thirdvariable","confoundingthirdvariable"]],
   ["Informed consent","telling participants enough about a study beforehand that they can freely choose to take part",["informedconsent","consent"]],
   ["Debriefing","fully explaining a study to participants afterward, required whenever deception was used",["debriefing","debrief"]],
   ["Hypothesis","a testable prediction, usually stated as the expected relationship between two variables",["hypothesis","ahypothesis"]],
   ["Population","the entire group a researcher wants to draw conclusions about",["population","thepopulation"]],
   ["Experimental group","the participants who receive the treatment being tested",["experimentalgroup","treatmentgroup"]],
   ["Illusory correlation","perceiving a relationship between two things where none actually exists",["illusorycorrelation","illusorycorrelations"]]
  ];
  const [term, def, acc] = pick(bank);
  return {
   q:`Which term does this define?\n\n   "${def}"`,
   ans:term, accept:acc.concat([term.toLowerCase().replace(/[^a-z]/g,"")]),
   steps:[`Definition: ${def}`, `Term: ${term}`]};
 }},

findK:{label:"Find k to make it continuous", subject:"math", topic:"Making a piecewise function continuous (solve for k)",
 make(){
  const sgn = v => v<0 ? `\u2212 ${-v}` : `+ ${v}`;
  let c=R(-4,4), d=R(-8,8);
  while(c===0) c=R(-4,4);
  while(d===0) d=R(-8,8);
  /* left piece: x\u00b2 + d   |   right piece: k*x  -> k*c = c\u00b2 + d */
  const target = c*c + d;
  const g = gcd(target, c);
  let n = target/g, den = c/g;
  if(den<0){ n=-n; den=-den; }
  const ansStr = den===1 ? String(n) : `${n}/${den}`;
  return {
   q:`f(x) = { x\u00b2 ${sgn(d)}   for x < ${c}\n         { kx          for x \u2265 ${c}\n\nFind the value of k that makes f continuous at x = ${c}.`,
   ans:ansStr, accept:[ansStr, String(target/c), (target/c).toFixed(4)], num:target/c,
   steps:[
     `Continuity means the two pieces must meet at x = ${c}.`,
     `Left piece at ${c}:  (${c})\u00b2 ${sgn(d)} = ${target}`,
     `Right piece at ${c}:  k(${c}) = ${c}k`,
     `Set them equal: ${c}k = ${target}`,
     `k = ${target}/${c} = ${ansStr}`
   ]};
 }},

continuityTest:{label:"Is it continuous? (3-part test)", subject:"math", topic:"Continuity",
 make(){
  const sgn = v => v<0 ? `\u2212 ${-v}` : `+ ${v}`;
  let c=R(-3,4); const m=R(2,5), k=R(-6,6);
  const left = m*c + k;
  const mode = R(1,3);
  let d, fc, ans, why;
  if(mode===1){ d = left - c*c; fc = left;  ans="Yes";
    why="All three conditions hold, so f is continuous at x = "+c+"."; }
  else if(mode===2){ d = left - c*c; fc = left + pick([-3,-2,2,3]); ans="No";
    why="Conditions 1 and 2 pass, but the limit ("+left+") does not equal f("+c+") = "+fc+" \u2014 a removable discontinuity."; }
  else { d = left - c*c + pick([-4,-3,3,4]); fc = c*c + d; ans="No";
    why="The left limit ("+left+") and right limit ("+(c*c+d)+") disagree, so the limit does not exist \u2014 a jump."; }
  const right = c*c + d;
  return {
   q:`f(x) = { ${lin(m,k)}   for x < ${c}\n         { ${fc}            for x = ${c}\n         { ${sq(d)}       for x > ${c}\n\nIs f continuous at x = ${c}?  (Yes or No)`,
   ans:ans, accept: ans==="Yes" ? ["yes","y","continuous","true"] : ["no","n","notcontinuous","discontinuous","false"],
   steps:[
     `Condition 1 \u2014 is f(${c}) defined?  Yes, f(${c}) = ${fc}.`,
     `Condition 2 \u2014 does the limit exist?  Left: ${left}.  Right: ${right}.  ${left===right?"Equal, so the limit is "+left+".":"They disagree, so the limit does not exist."}`,
     left===right ? `Condition 3 \u2014 does the limit equal f(${c})?  ${left} vs ${fc}: ${left===fc?"equal \u2713":"NOT equal \u2717"}` : `Condition 2 already failed, so stop.`,
     why,
     `Answer: ${ans}`
   ]};
 }},

limitAtInfinity:{label:"Limits at infinity", subject:"math", topic:"Limits at infinity (horizontal asymptotes)",
 make(){
  const sgn = v => v<0 ? `\u2212 ${-v}` : `+ ${v}`;
  const a=R(2,9), b=R(2,9), p=R(2,9), q=R(2,9);
  const kind = R(1,3);
  const sup = n => n===1 ? "" : (n===2 ? "\u00b2" : "\u00b3");

  if(kind===1){
    /* equal degrees -> ratio of leading coefficients */
    const deg = R(1,3);
    const g = gcd(a,b); const n=a/g, d=b/g;
    const ansStr = d===1 ? String(n) : `${n}/${d}`;
    return {
     q:`Evaluate:   lim(x\u2192\u221e)  ( ${a}x${sup(deg)} ${sgn(p)}${deg>1?"x"+sup(deg-1):""} ) / ( ${b}x${sup(deg)} ${sgn(-q)}${deg>1?"x":""} )`,
     ans:ansStr, accept:[ansStr, `${a}/${b}`, (a/b).toFixed(4)], num:a/b,
     steps:[
       `Compare degrees: the top is degree ${deg}, the bottom is degree ${deg}.`,
       `The degrees are EQUAL, so the limit is the ratio of the leading coefficients.`,
       `Leading coefficients: ${a} on top, ${b} on the bottom.`,
       `Answer: ${a}/${b}${g>1?` = ${ansStr}`:""}   (horizontal asymptote y = ${ansStr})`
     ]};
  }
  if(kind===2){
    /* bottom-heavy -> 0 */
    const dTop=R(1,2), dBot=dTop+R(1,2);
    return {
     q:`Evaluate:   lim(x\u2192\u221e)  ( ${a}x${sup(dTop)} ${sgn(p)} ) / ( ${b}x${sup(dBot)} ${sgn(-q)}x )`,
     ans:"0", accept:["0"], num:0,
     steps:[
       `Top degree ${dTop}, bottom degree ${dBot}.`,
       `The bottom grows faster, so the fraction is squeezed toward zero.`,
       `Answer: 0   (horizontal asymptote y = 0)`
     ]};
  }
  /* top-heavy -> infinite */
  const dTop=R(2,3), dBot=dTop-1;
  return {
   q:`Evaluate:   lim(x\u2192\u221e)  ( ${a}x${sup(dTop)} ${sgn(p)}x ) / ( ${b}x${sup(dBot)} ${sgn(q)} )`,
   ans:"DNE", accept:["dne","infinity","\u221e","+\u221e","infinite","doesnotexist","does not exist"],
   steps:[
     `Top degree ${dTop}, bottom degree ${dBot}.`,
     `The top grows faster, so the fraction grows without bound.`,
     `There is NO horizontal asymptote here.`,
     `Answer: \u221e  (the limit does not exist as a number \u2014 either \u221e or DNE is accepted)`
   ]};
 }},

infiniteLimit:{label:"Infinite limits (vertical asymptotes)", subject:"math", topic:"Infinite limits (vertical asymptotes)",
 make(){
  const sgn = v => v<0 ? `\u2212 ${-v}` : `+ ${v}`;
  let c=R(-5,5); const k=pick([1,2,3,5,-1,-2,-4]);
  const xs = facStr(-c);
  const power = pick([1,1,2]);
  const side = pick(["+","-","both"]);
  const kPos = k>0;

  if(power===2){
    const ansStr = kPos ? "\u221e" : "\u2212\u221e";
    return {
     q:`Evaluate:   lim(x\u2192${c}${side==="both"?"":(side==="+"?"\u207a":"\u207b")})  ${k} / (${xs})\u00b2`,
     ans:ansStr,
     accept: kPos ? ["infinity","\u221e","+\u221e","inf","positiveinfinity"] : ["-infinity","\u2212\u221e","-\u221e","negativeinfinity","-inf"],
     steps:[
       `Substituting ${c} gives ${k}/0 \u2014 a vertical asymptote at x = ${c}.`,
       `The denominator is SQUARED, so it is positive on both sides of ${c}.`,
       `The numerator is ${k}, which is ${kPos?"positive":"negative"}.`,
       `${kPos?"Positive":"Negative"} over a tiny positive \u2192 ${ansStr}.`,
       `Answer: ${ansStr}`
     ]};
  }

  if(side==="both"){
    return {
     q:`Evaluate:   lim(x\u2192${c})  ${k} / (${xs})`,
     ans:"DNE", accept:["dne","doesnotexist","does not exist"],
     steps:[
       `Substituting ${c} gives ${k}/0 \u2014 a vertical asymptote at x = ${c}.`,
       `Just to the RIGHT of ${c}, (${xs}) is a tiny POSITIVE \u2192 ${kPos?"+\u221e":"\u2212\u221e"}.`,
       `Just to the LEFT of ${c}, (${xs}) is a tiny NEGATIVE \u2192 ${kPos?"\u2212\u221e":"+\u221e"}.`,
       `The two sides disagree, so the two-sided limit does not exist.`,
       `Answer: DNE`
     ]};
  }

  const fromRight = side==="+";
  const positive = fromRight ? kPos : !kPos;
  const ansStr = positive ? "\u221e" : "\u2212\u221e";
  return {
   q:`Evaluate:   lim(x\u2192${c}${fromRight?"\u207a":"\u207b"})  ${k} / (${xs})`,
   ans:ansStr,
   accept: positive ? ["infinity","\u221e","+\u221e","inf","positiveinfinity"] : ["-infinity","\u2212\u221e","-\u221e","negativeinfinity","-inf"],
   steps:[
     `Substituting ${c} gives ${k}/0 \u2014 a vertical asymptote at x = ${c}.`,
     `Coming from the ${fromRight?"RIGHT":"LEFT"}, (${xs}) is a tiny ${fromRight?"POSITIVE":"NEGATIVE"} number.`,
     `The numerator ${k} is ${kPos?"positive":"negative"}.`,
     `${kPos?"Positive":"Negative"} over a tiny ${fromRight?"positive":"negative"} \u2192 ${ansStr}.`,
     `Answer: ${ansStr}`
   ]};
 }},

rationalLimit:{label:"Limits of rational functions", subject:"math", topic:"Limits of rational functions",
 make(){
  const sgn = v => v<0 ? `\u2212 ${-v}` : `+ ${v}`;
  const kind = R(1,3);

  if(kind===1){
    /* 0/0 that cancels to a live denominator -> a hole, finite limit */
    let a=R(-5,5), b=R(-5,5), k=R(2,9);
    while(a===0 || b===0 || a===b || a+b===0){ a=R(-5,5); b=R(-5,5); }
    const num = a-b;
    const g = gcd(k,num);
    let n = k/g, d = num/g;
    if(d<0){ n=-n; d=-d; }
    const ansStr = d===1 ? String(n) : `${n}/${d}`;
    return {
      q:`Determine the limit in simplest form:\n\n   lim(x\u2192${a})  ( ${k}x ${sgn(-k*a)} ) / ( x\u00b2 ${sgn(-(a+b))}x ${sgn(a*b)} )`,
      ans:ansStr, accept:[ansStr, String(k/num), (k/num).toFixed(4)], num:k/num,
      steps:[
        `Substitute ${a}: top = 0, bottom = 0. That is 0/0 \u2014 indeterminate, so factor.`,
        `Factor: ${k}(x ${sgn(-a)}) / [ (x ${sgn(-a)})(x ${sgn(-b)}) ]`,
        `Cancel the (x ${sgn(-a)}) factors, leaving ${k}/(x ${sgn(-b)}).`,
        `Substitute again: ${k}/(${a} ${sgn(-b)}) = ${k}/${num}`,
        `The denominator is ${num}, not zero \u2014 so this was a HOLE and the limit exists.`,
        `Answer: ${ansStr}`
      ]};
  }

  if(kind===2){
    /* nonzero over zero -> vertical asymptote, DNE */
    let p=R(-6,6), q=R(-6,6);
    while(p===0 || q===0 || p===q){ p=R(-6,6); q=R(-6,6); }
    const c = -q;
    return {
      q:`Determine the limit in simplest form:\n\n   lim(x\u2192${c})  ( x\u00b2 ${sgn(p)}x ) / ( x\u00b2 ${sgn(q)}x )`,
      ans:"DNE", accept:["dne","doesnotexist","does not exist","undefined","infinity"],
      steps:[
        `Factor out an x from both: x(x ${sgn(p)}) / [ x(x ${sgn(q)}) ]`,
        `Cancel the x, leaving (x ${sgn(p)})/(x ${sgn(q)}).`,
        `Substitute ${c}: top = ${c+p} (not zero), bottom = 0.`,
        `A nonzero number over zero is a VERTICAL ASYMPTOTE, not a hole.`,
        `Answer: DNE`
      ]};
  }

  /* 0/0 that is STILL 0 in the denominator after cancelling -> DNE */
  let a=R(-5,5);
  while(a===0) a=R(-5,5);
  return {
    q:`Determine the limit in simplest form:\n\n   lim(x\u2192${a})  ( x\u00b2 \u2212 ${a*a} ) / ( x\u00b2 ${sgn(-2*a)}x ${sgn(a*a)} )`,
    ans:"DNE", accept:["dne","doesnotexist","does not exist","undefined","infinity"],
    steps:[
      `Substitute ${a}: top = 0, bottom = 0. Indeterminate, so factor.`,
      `Top is a difference of squares: (x ${sgn(-a)})(x ${sgn(a)}).`,
      `Bottom is a perfect square: (x ${sgn(-a)})\u00b2.`,
      `Cancel ONE (x ${sgn(-a)}), leaving (x ${sgn(a)})/(x ${sgn(-a)}).`,
      `Substitute again: ${2*a}/0. The denominator is STILL zero.`,
      `Cancelling once did not save it \u2014 this is an asymptote. Answer: DNE`
    ]};
 }},

trigLimit:{label:"Trig limits", subject:"math", topic:"Trig limits",
 make(){
  const a=R(2,9); let b=R(2,9);
  const g=gcd(a,b), n=a/g, d=b/g;
  const frac = d===1? String(n) : `${n}/${d}`;
  const forms=[
   {q:`Evaluate the limit:   lim(x\u21920)  [ ${a}\u00b7cos(x)\u00b7tan(x) ] / (${b}x)`,
    ans:frac, accept:[frac,`${a}/${b}`,(a/b).toFixed(4)], num:a/b,
    steps:[`Substitution gives 0/0, so rewrite tan(x) = sin(x)/cos(x).`,
      `${a}cos(x)\u00b7[sin(x)/cos(x)] / (${b}x) \u2014 the cos(x) cancels.`,
      `= (${a}/${b}) \u00b7 sin(x)/x`,
      `lim(x\u21920) sin(x)/x = 1`,
      `Answer: ${a}/${b}${g>1?` = ${frac}`:""}`]},
   {q:`Evaluate the limit:   lim(x\u21920)  sin(${a}x) / (${b}x)`,
    ans:frac, accept:[frac,`${a}/${b}`,(a/b).toFixed(4)], num:a/b,
    steps:[`Substitution gives 0/0.`,
      `The inside of the sine is ${a}x but the bottom is ${b}x \u2014 make them match.`,
      `Multiply top and bottom by ${a}/${a}: (${a}/${b}) \u00b7 sin(${a}x)/(${a}x)`,
      `lim sin(${a}x)/(${a}x) = 1`,
      `Answer: ${a}/${b}${g>1?` = ${frac}`:""}`]},
   {q:`Evaluate the limit:   lim(x\u21920)  tan(${a}x) / (${b}x)`,
    ans:frac, accept:[frac,`${a}/${b}`,(a/b).toFixed(4)], num:a/b,
    steps:[`tan(${a}x)/(${b}x) = sin(${a}x) / [${b}x\u00b7cos(${a}x)]`,
      `As x\u21920, cos(${a}x) \u2192 1, so it drops out.`,
      `Left with (${a}/${b})\u00b7sin(${a}x)/(${a}x) \u2192 (${a}/${b})(1)`,
      `Answer: ${a}/${b}${g>1?` = ${frac}`:""}`]},
   {q:`Evaluate the limit:   lim(x\u21920)  ( ${a} \u2212 ${a*2}cos(x) ) / (${b}x \u2212 ${b+2})`,
    ans:`${a/gcd(a,b+2)}/${(b+2)/gcd(a,b+2)}`, accept:[`${a}/${b+2}`,(a/(b+2)).toFixed(4),`${a/gcd(a,b+2)}/${(b+2)/gcd(a,b+2)}`], num:a/(b+2),
    steps:[`Try direct substitution FIRST \u2014 this only looks like a special trig limit.`,
      `Top at x=0: ${a} \u2212 ${a*2}cos(0) = ${a} \u2212 ${a*2}(1) = ${-a}`,
      `Bottom at x=0: ${b}(0) \u2212 ${b+2} = ${-(b+2)}`,
      `Not 0/0 \u2014 the denominator isn't zero, so no special limit is needed.`,
      `Answer: ${-a}/${-(b+2)} = ${a}/${b+2}`]},
   {q:`Evaluate the limit:   lim(x\u21920)  [ ${a}(1 \u2212 cos(x)) ] / (${b}x)`,
    ans:"0", accept:["0"], num:0,
    steps:[`This is the OTHER special trig limit, and it is not 1.`,
      `lim(x\u21920) (1 \u2212 cos x)/x = 0`,
      `So (${a}/${b}) \u00b7 0 = 0`,
      `Answer: 0`]}
  ];
  return pick(forms);
 }},

oneSidedLimit:{label:"One-sided limits (piecewise)", subject:"math", topic:"Limits of piecewise functions",
 make(){
  const c=R(-4,4), m=R(2,6), k=R(-8,8), d=R(-9,9);
  const left = m*c + k, right = c*c + d;
  const fromRight = Math.random()<0.5;
  const want = fromRight ? right : left;
  return {
   q:`f(x) = { ${lin(m,k)}    for x < ${c}\n         { ${sq(d)}       for x > ${c}\n\nFind  lim(x\u2192${c}${fromRight?"\u207a":"\u207b"}) f(x).`,
   ans:String(want), accept:[String(want)], num:want,
   steps:[
     `The ${fromRight?"\u207a (plus)":"\u207b (minus)"} superscript means approach from the ${fromRight?"RIGHT":"LEFT"} only.`,
     `From the ${fromRight?"right you use the piece for x > "+c+", which is "+sq(d) : "left you use the piece for x < "+c+", which is "+lin(m,k)}.`,
     fromRight ? `Substitute (${c}) into ${sq(d)}: ${right}` : `Substitute (${c}) into ${lin(m,k)}: ${left}`,
     `The other piece is irrelevant \u2014 a one-sided limit never needs both sides to agree, so it is almost never DNE here.`,
     `Answer: ${want}`
   ]};
 }},

piecewiseLimit:{label:"Limits of piecewise functions", subject:"math", topic:"Limits of piecewise functions",
 make(){
  const c=R(-3,4), m=R(1,5), k=R(-6,6);
  const left = m*c + k;
  const matches = Math.random()<0.5;
  const d = matches ? left - c*c : left - c*c + pick([-4,-3,-2,2,3,4]);
  const right = c*c + d;
  return {
   q:`f(x) = { ${lin(m,k)}   for x < ${c}\n         { ${sq(d)}          for x \u2265 ${c}\n\nFind lim(x\u2192${c}) f(x).  (Write DNE if it does not exist.)`,
   ans: matches ? String(left) : "DNE",
   accept: matches ? [String(left)] : ["dne","doesnotexist","does not exist","undefined"],
   num: matches ? left : undefined,
   steps:[
     `Coming from the LEFT (x < ${c}) use ${lin(m,k)}:  substitute ${c} \u2192 ${left}`,
     `Coming from the RIGHT (x \u2265 ${c}) use ${sq(d)}:  substitute ${c} \u2192 ${right}`,
     matches ? `Both sides give ${left}, so the two-sided limit exists.`
             : `Left gives ${left}, right gives ${right}. They disagree \u2014 this is a jump.`,
     matches ? `Answer: ${left}` : `Answer: DNE (does not exist)`
   ]};
 }},

discontinuity:{label:"Types of discontinuities", subject:"math", topic:"Types of discontinuities",
 make(){
  const k=R(2,8);
  const cases=[
   {q:`What type of discontinuity does f(x) = (x\u00b2 \u2212 ${k*k}) / (x \u2212 ${k}) have at x = ${k}?`,
    ans:"Removable", accept:["removable","hole","removablediscontinuity","removable(hole)"],
    steps:[`Factor the top: (x\u2212${k})(x+${k}) / (x\u2212${k})`,
      `The (x\u2212${k}) cancels, leaving x + ${k}.`,
      `The limit exists and equals ${2*k}, but f(${k}) is undefined \u2014 one missing point.`,
      `Answer: REMOVABLE (a hole at (${k}, ${2*k}))`]},
   {q:`What type of discontinuity does f(x) = 1 / (x \u2212 ${k})\u00b2 have at x = ${k}?`,
    ans:"Infinite", accept:["infinite","infinitediscontinuity","asymptote","verticalasymptote","essential"],
    steps:[`Substituting gives 1/0 \u2014 a nonzero number over zero.`,
      `Nothing cancels, so it cannot be patched.`,
      `As x \u2192 ${k} from either side the values blow up to +\u221e.`,
      `Answer: INFINITE (vertical asymptote at x = ${k})`]},
   {q:`f(x) = { x + ${k}  for x < ${k} ;  x\u00b2  for x \u2265 ${k} }.\nWhat type of discontinuity is at x = ${k}?`,
    ans:"Jump", accept:["jump","jumpdiscontinuity"],
    steps:[`Left-hand limit: ${k} + ${k} = ${2*k}`,
      `Right-hand limit: ${k}\u00b2 = ${k*k}`,
      `${2*k} \u2260 ${k*k}, so both one-sided limits exist but disagree.`,
      `Answer: JUMP discontinuity`]}
  ];
  const c = pick(cases.filter(x=>!/Jump/.test(x.ans) || 2*k !== k*k));
  return c;
 }},

limitProperties:{label:"Limit properties", subject:"math", topic:"Limit properties",
 make(){
  let A=R(-6,6), B=R(-6,6);
  while(B===0) B=R(-6,6);
  const k=R(2,5);
  const forms=[
   {expr:`lim [ ${k}f(x) + g(x) ]`, val:k*A+B,
    st:[`Constant multiple rule: lim ${k}f = ${k}\u00b7${A} = ${k*A}`,`Sum rule: ${k*A} + (${B})`,`Answer: ${k*A+B}`]},
   {expr:`lim [ f(x) \u00b7 g(x) ]`, val:A*B,
    st:[`Product rule: lim(f\u00b7g) = (lim f)(lim g)`,`= (${A})(${B})`,`Answer: ${A*B}`]},
   {expr:`lim [ f(x) \u2212 ${k}g(x) ]`, val:A-k*B,
    st:[`Difference rule with a constant multiple.`,`= ${A} \u2212 ${k}(${B}) = ${A} \u2212 ${k*B}`,`Answer: ${A-k*B}`]},
   {expr:`lim [ f(x) / g(x) ]`, val:+(A/B).toFixed(4),
    st:[`Quotient rule works because lim g = ${B} \u2260 0.`,`= ${A}/${B}`,`Answer: ${A}/${B}${Number.isInteger(A/B)?" = "+(A/B):""}`]}
  ];
  const f=pick(forms);
  const isFrac = f.expr.includes("/") && !Number.isInteger(A/B);
  const g2=gcd(A,B); let nn=A/g2, dd=B/g2; if(dd<0){nn=-nn;dd=-dd;}
  const shown = isFrac ? `${nn}/${dd}` : String(f.val);
  return {
   q:`Given  lim(x\u2192a) f(x) = ${A}  and  lim(x\u2192a) g(x) = ${B},  evaluate:\n\n   ${f.expr}`,
   ans: shown, accept:[shown, String(f.val), String(A/B)], num:isFrac? A/B : f.val,
   steps: f.st};
 }},

limitFactor:{label:"Limits by factoring (0/0)", subject:"math", topic:"Limits \u2014 the idea",
 make(){
  const c=R(-5,5); let r=R(-6,6); while(r===c) r=R(-6,6);
  const b=-(c+r), cc=c*r;
  const s=v=>v<0?`\u2212 ${-v}`:`+ ${v}`;
  const val=c-r;
  return {
   q:`Evaluate the limit:   lim(x\u2192${c})  ( ${quadStr(1,b,cc)} ) / ( ${facStr(-c)} )`,
   ans:String(val), accept:[String(val)], num:val,
   steps:[
     `Direct substitution gives 0/0 \u2014 indeterminate, so factor.`,
     `${quadStr(1,b,cc)} = (${facStr(-c)})(${facStr(-r)})`,
     `The (${facStr(-c)}) cancels top and bottom, leaving ${facStr(-r)}.`,
     `Now substitute x = ${c} into ${facStr(-r)}:  ${val}`,
     `Answer: ${val}`]};
 }},

rationalize:{label:"Rationalize a denominator", subject:"math", topic:"Rationalizing the denominator",
 make(){
  const b = pick([2,3,5,6,7,10,11,13,14,15]);
  const a = R(2,12);
  const g = gcd(a,b), num=a/g, den=b/g;
  return {
    q:`Express in simplest form with a rational denominator:   ${a} / √${b}`,
    ans: radStr(num,b,den),
    accept: radAccept(num,b,den),
    steps:[
      `Multiply the top and the bottom by √${b} (that's multiplying by 1, so the value doesn't change).`,
      `${a}/√${b} × √${b}/√${b} = ${a}√${b} / ${b}   —  because √${b}·√${b} = ${b}.`,
      g>1 ? `Reduce: ${a} and ${b} share a factor of ${g} → ${radStr(num,b,den)}.`
          : `${a} and ${b} share no common factor, so it's already reduced.`,
      `Answer: ${radStr(num,b,den)}`
    ]};
 }},

simplifyRadical:{label:"Simplify a radical", subject:"math", topic:"Simplifying radicals",
 make(){
  const k = R(2,7), m = pick([2,3,5,6,7,10,11,13,14,15]);
  const n = k*k*m;
  return {
    q:`Write in simplest radical form:   √${n}`,
    ans:`${k}√${m}`,
    accept:radAccept(k,m,1),
    steps:[
      `Find the largest perfect square that divides ${n}.  ${n} = ${k*k} × ${m}.`,
      `√${n} = √${k*k} · √${m}`,
      `√${k*k} = ${k}, and ${m} has no perfect-square factors left.`,
      `Answer: ${k}√${m}`
    ]};
 }},

complexFraction:{label:"Complex fractions", subject:"math", topic:"Complex fractions",
 make(){
  const n = R(2,9);
  if(Math.random()<0.5){
    return {
      q:`Fully simplify:   ( 1 − x²/${n*n} ) ÷ ( x/${n} + 1 )`,
      ans:`(${n} − x)/${n}`,
      accept:[`(${n}-x)/${n}`,`${n}-x/${n}`,`1-x/${n}`,`(-x+${n})/${n}`,`-x/${n}+1`],
      steps:[
        `Top over one denominator: 1 − x²/${n*n} = (${n*n} − x²)/${n*n} = (${n}−x)(${n}+x)/${n*n}`,
        `Bottom over one denominator: x/${n} + 1 = (x+${n})/${n}`,
        `Dividing = multiply by the reciprocal: (${n}−x)(${n}+x)/${n*n} × ${n}/(x+${n})`,
        `Cancel the (${n}+x) factors and one ${n} from ${n*n}.`,
        `Answer: (${n} − x)/${n}   [same as 1 − x/${n}],  x ≠ −${n}`
      ]};
  }
  return {
    q:`Fully simplify:   ( x²/${n*n} − 1 ) ÷ ( x/${n} − 1 )`,
    ans:`(x + ${n})/${n}`,
    accept:[`(x+${n})/${n}`,`x+${n}/${n}`,`x/${n}+1`,`1+x/${n}`,`(${n}+x)/${n}`],
    steps:[
      `Top: x²/${n*n} − 1 = (x² − ${n*n})/${n*n} = (x−${n})(x+${n})/${n*n}`,
      `Bottom: x/${n} − 1 = (x−${n})/${n}`,
      `Flip and multiply: (x−${n})(x+${n})/${n*n} × ${n}/(x−${n})`,
      `Cancel (x−${n}) and one ${n}.`,
      `Answer: (x + ${n})/${n}   [same as x/${n} + 1],  x ≠ ${n}`
    ]};
 }},

diffSquares:{label:"Difference of squares", subject:"math", topic:"Difference of squares",
 make(){
  const a=R(1,7), b=R(2,12);
  const ax = a===1?"x":a+"x";
  return {
    q:`Factor completely:   ${a===1?"":a*a}x² − ${b*b}`,
    ans:`(${ax} − ${b})(${ax} + ${b})`,
    accept:[`(${ax}-${b})(${ax}+${b})`,`(${ax}+${b})(${ax}-${b})`],
    steps:[
      `Recognize the shape a² − b² — a subtraction of two perfect squares.`,
      `√(${a===1?"":a*a}x²) = ${ax}   and   √${b*b} = ${b}`,
      `a² − b² = (a − b)(a + b)`,
      `Answer: (${ax} − ${b})(${ax} + ${b})`
    ]};
 }},

factorTrinomial:{label:"Factor a trinomial", subject:"math", topic:"Factoring trinomials",
 make(){
  let p=0,q=0;
  while(p===0||q===0||p+q===0){p=R(-9,9);q=R(-9,9);}
  const b=p+q, c=p*q;
  const lo=Math.min(p,q), hi=Math.max(p,q);
  const s=v=>v<0?`− ${-v}`:`+ ${v}`;
  return {
    q:`Factor:   x² ${s(b)}x ${s(c)}`,
    ans:`(x ${s(lo)})(x ${s(hi)})`,
    accept:[`(x${lo<0?lo:'+'+lo})(x${hi<0?hi:'+'+hi})`,`(x${hi<0?hi:'+'+hi})(x${lo<0?lo:'+'+lo})`],
    steps:[
      `Need two numbers that MULTIPLY to ${c} and ADD to ${b}.`,
      `${p} × ${q} = ${c} ✓   and   ${p} + ${q} = ${b} ✓`,
      `Answer: (x ${s(lo)})(x ${s(hi)})`,
      `Check by FOIL: x² ${s(b)}x ${s(c)} ✓`
    ]};
 }},

quadratic:{label:"Solve with the quadratic formula", subject:"math", topic:"Quadratic formula",
 make(){
  const a=R(1,3); let r1=R(-6,6), r2=R(-6,6);
  const b=-a*(r1+r2), c=a*r1*r2;
  const lo=Math.min(r1,r2), hi=Math.max(r1,r2);
  const s=v=>v<0?`− ${-v}`:`+ ${v}`;
  const disc=b*b-4*a*c;
  return {
    q:`Solve for x:   ${quadStr(a,b,c)} = 0`,
    ans: lo===hi ? `x = ${lo}` : `x = ${lo} and x = ${hi}`,
    accept:[`x=${lo},x=${hi}`,`${lo},${hi}`,`x=${lo}andx=${hi}`,`${lo}and${hi}`,`x=${hi},x=${lo}`,`${hi},${lo}`],
    steps:[
      `a = ${a}, b = ${b}, c = ${c}`,
      `Discriminant: b² − 4ac = ${b*b} − 4(${a})(${c}) = ${disc}  →  √${disc} = ${Math.sqrt(disc)}`,
      `x = ( ${-b} ± ${Math.sqrt(disc)} ) / ${2*a}`,
      `x = ${(-b+Math.sqrt(disc))/(2*a)}   and   x = ${(-b-Math.sqrt(disc))/(2*a)}`,
      lo===hi?`Answer: x = ${lo} (repeated root)`:`Answer: x = ${lo} and x = ${hi}`
    ]};
 }},

slope:{label:"Slope from two points", subject:"math", topic:"Slope and linear equations",
 make(){
  let x1=R(-8,8),y1=R(-8,8),x2=R(-8,8),y2=R(-8,8);
  while(x2===x1){x2=R(-8,8);}
  const dy=y2-y1, dx=x2-x1, g=gcd(dy,dx);
  let n=dy/g, d=dx/g; if(d<0){n=-n;d=-d;}
  const ansStr = d===1? String(n) : `${n}/${d}`;
  return {
    q:`Find the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2}).`,
    ans:ansStr,
    accept:[ansStr, d===1?`${n}/1`:ansStr, String((dy/dx).toFixed(4))],
    num: dy/dx,
    steps:[
      `m = (y₂ − y₁)/(x₂ − x₁)`,
      `m = (${y2} − ${y1}) / (${x2} − ${x1}) = ${dy}/${dx}`,
      g>1?`Reduce by ${g}: ${ansStr}`:`Already in lowest terms.`,
      `Answer: m = ${ansStr}`
    ]};
 }},

pythagoras:{label:"Pythagorean theorem", subject:"math", topic:"Pythagorean theorem",
 make(){
  const t=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  const k=R(1,3), [a,b,c]=t.map(v=>v*k);
  if(Math.random()<0.5){
    return {q:`A right triangle has legs of ${a} and ${b}. Find the hypotenuse.`, ans:String(c), accept:[String(c)], num:c,
     steps:[`a² + b² = c²`,`${a}² + ${b}² = ${a*a} + ${b*b} = ${c*c}`,`c = √${c*c} = ${c}`,`Answer: ${c}`]};
  }
  return {q:`A right triangle has a hypotenuse of ${c} and one leg of ${a}. Find the other leg.`, ans:String(b), accept:[String(b)], num:b,
   steps:[`a² + b² = c²  →  b² = c² − a²`,`b² = ${c*c} − ${a*a} = ${b*b}`,`b = √${b*b} = ${b}`,`Answer: ${b}`]};
 }},

exponents:{label:"Exponent rules", subject:"math", topic:"Exponent rules",
 make(){
  const a=R(2,4), m=R(1,4), n=R(2,3);
  return {
    q:`Simplify:   (${a}x${m===1?"":"^"+m})^${n}`,
    ans:`${Math.pow(a,n)}x^${m*n}`,
    accept:[`${Math.pow(a,n)}x^${m*n}`,`${Math.pow(a,n)}x${m*n}`,`${Math.pow(a,n)}*x^${m*n}`],
    steps:[
      `The outside exponent hits EVERY factor inside — the ${a} too.`,
      `(${a})^${n} = ${Math.pow(a,n)}`,
      `(x^${m})^${n} = x^(${m}·${n}) = x^${m*n}`,
      `Answer: ${Math.pow(a,n)}x^${m*n}`
    ]};
 }},

system:{label:"System of equations", subject:"math", topic:"Systems of equations",
 make(){
  const x=R(-5,5), y=R(-5,5);
  let a1=R(1,4),b1=R(1,4),a2=R(1,4),b2=R(1,4);
  while(a1*b2-a2*b1===0){a2=R(1,4);b2=R(1,4);}
  const c1=a1*x+b1*y, c2=a2*x+b2*y;
  return {
    q:`Solve the system:\n   ${a1}x + ${b1}y = ${c1}\n   ${a2}x + ${b2}y = ${c2}`,
    ans:`x = ${x}, y = ${y}`,
    accept:[`x=${x},y=${y}`,`(${x},${y})`,`${x},${y}`,`x=${x}y=${y}`],
    steps:[
      `Use elimination. Multiply eq1 by ${a2} and eq2 by ${a1} so the x terms match.`,
      `${a1*a2}x + ${b1*a2}y = ${c1*a2}   and   ${a1*a2}x + ${b2*a1}y = ${c2*a1}`,
      `Subtract: ${b1*a2-b2*a1}y = ${c1*a2-c2*a1}  →  y = ${y}`,
      `Back-substitute into ${a1}x + ${b1}(${y}) = ${c1}  →  x = ${x}`,
      `Answer: (${x}, ${y})`
    ]};
 }},

meanMedian:{label:"Mean and median", subject:"math", topic:"Mean, median, mode, range",
 make(){
  const n=pick([5,7]);
  const data=Array.from({length:n},()=>R(1,20));
  const sorted=[...data].sort((p,q)=>p-q);
  const sum=data.reduce((s,v)=>s+v,0);
  const mean=+(sum/n).toFixed(2), median=sorted[(n-1)/2];
  return {
    q:`Find the MEDIAN of this data set:   ${data.join(", ")}`,
    ans:String(median), accept:[String(median)], num:median,
    steps:[
      `Sort it first: ${sorted.join(", ")}`,
      `${n} values, so the middle one is position ${(n+1)/2}.`,
      `Answer: median = ${median}   (for reference, the mean is ${mean})`
    ]};
 }},

probability:{label:"Probability", subject:"math", topic:"Probability basics",
 make(){
  const k=R(2,3);
  const target=R(1,6);
  const num=1, den=Math.pow(6,k);
  const g=gcd(num,den);
  return {
    q:`You roll a fair six-sided die ${k} times. What is the probability you roll a ${target} every single time?`,
    ans:`1/${den}`, accept:[`1/${den}`, (1/den).toFixed(4)], num:1/den,
    steps:[
      `Each roll is independent, so multiply the probabilities.`,
      `P(one ${target}) = 1/6`,
      `P(${k} in a row) = (1/6)${k===2?"²":"³"} = 1/${den}`,
      `Answer: 1/${den} ≈ ${(100/den).toFixed(2)}%`
    ]};
 }},

moles:{label:"Grams to moles", subject:"chemistry", topic:"Moles and stoichiometry",
 make(){
  const subs=[["H₂O",18.02],["CO₂",44.01],["NaCl",58.44],["O₂",32.00],["CH₄",16.04],["C₆H₁₂O₆",180.16],["N₂",28.02]];
  const [name,mm]=pick(subs);
  const moles=pick([0.5,1,1.5,2,2.5,3]);
  const grams=+(moles*mm).toFixed(2);
  return {
    q:`How many moles are in ${grams} g of ${name}?  (molar mass = ${mm} g/mol)`,
    ans:String(moles), accept:[String(moles), moles.toFixed(2)], num:moles,
    steps:[
      `moles = mass ÷ molar mass`,
      `moles = ${grams} g ÷ ${mm} g/mol`,
      `Answer: ${moles} mol`
    ]};
 }},

newton:{label:"Newton's second law", subject:"physics", topic:"Newton's three laws",
 make(){
  const m=R(2,20), a=R(2,10);
  const F=m*a;
  if(Math.random()<0.5)
    return {q:`A ${m} kg object accelerates at ${a} m/s². What net force acts on it?`, ans:`${F} N`,
      accept:[`${F}n`,String(F)], num:F,
      steps:[`F = ma`,`F = (${m} kg)(${a} m/s²)`,`Answer: ${F} N`]};
  return {q:`A net force of ${F} N acts on a ${m} kg object. Find its acceleration.`, ans:`${a} m/s²`,
    accept:[`${a}m/s²`,`${a}m/s2`,String(a)], num:a,
    steps:[`F = ma  →  a = F/m`,`a = ${F} N ÷ ${m} kg`,`Answer: ${a} m/s²`]};
 }},

punnett:{label:"Punnett square ratios", subject:"biology", topic:"Punnett squares and Mendelian genetics",
 make(){
  const cases=[
    {c:"Bb × Bb", ph:"3:1", gt:"1 BB : 2 Bb : 1 bb", pct:"75%",
     st:["Grid the alleles: B,b across the top and B,b down the side.","Boxes: BB, Bb, Bb, bb.","Genotype ratio 1:2:1. Any box with a capital B shows the dominant trait.","Phenotype ratio 3:1 → 75% dominant, 25% recessive."]},
    {c:"Bb × bb", ph:"1:1", gt:"2 Bb : 2 bb", pct:"50%",
     st:["Alleles: B,b across the top; b,b down the side.","Boxes: Bb, bb, Bb, bb.","Genotype 2 Bb : 2 bb.","Phenotype ratio 1:1 → 50% dominant, 50% recessive."]},
    {c:"BB × bb", ph:"all dominant", gt:"4 Bb", pct:"100%",
     st:["Every box gets one B and one b.","All four offspring are Bb.","Every one shows the dominant phenotype → 100%."]}
  ];
  const k=pick(cases);
  return {
    q:`Cross ${k.c}. What percent of the offspring show the DOMINANT phenotype?`,
    ans:k.pct, accept:[k.pct, k.pct.replace("%","")], num:parseFloat(k.pct),
    steps:[...k.st, `Genotypes: ${k.gt}. Phenotype ratio: ${k.ph}. Answer: ${k.pct}`]};
 }}

};

/* normalize a typed answer so formatting differences don't count as wrong */
function normalizeAns(s){
  return String(s||"")
    .toLowerCase()
    .replace(/\s+/g,"")
    .replace(/[−–—]/g,"-")
    .replace(/\*/g,"")
    .replace(/×/g,"")
    .replace(/√/g,"sqrt")
    .replace(/²/g,"^2").replace(/³/g,"^3")
    .replace(/\^\{(\d+)\}/g,"^$1")
    .replace(/sqrt\((\d+)\)/g,"sqrt$1")
    .replace(/^\+/,"")
    .replace(/\.0+$/,"");
}

function gradeAnswer(problem, typed){
  const t = normalizeAns(typed);
  if(!t) return false;
  const ok = (problem.accept||[]).concat([problem.ans]).some(a=>normalizeAns(a)===t);
  if(ok) return true;
  if(typeof problem.num === "number"){
    const v = parseFloat(typed.replace(/[^0-9.\-\/]/g,""));
    if(typed.includes("/")){
      const [p,q]=typed.split("/").map(x=>parseFloat(x));
      if(q) return Math.abs(p/q - problem.num) < 0.011;
    }
    if(!isNaN(v)) return Math.abs(v - problem.num) < 0.011;
  }
  return false;
}
