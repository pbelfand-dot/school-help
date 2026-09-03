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
   ["Illusory correlation","perceiving a relationship between two things where none actually exists",["illusorycorrelation","illusorycorrelations"]],
   ["Falsifiability","the requirement that some possible observation could prove a claim wrong",["falsifiability","falsifiable"]],
   ["Theory","a broad, well-supported explanation that organizes observations and generates predictions",["theory","atheory"]],
   ["Convenience sampling","choosing whoever is easiest to reach, which makes the sample unrepresentative",["conveniencesampling","conveniencesample"]],
   ["Representative sample","a sample that mirrors the population's relevant characteristics",["representativesample","representative"]],
   ["Sampling bias","a sample that systematically differs from the population it is meant to represent",["samplingbias","biasedsample"]],
   ["Meta-analysis","a study that statistically combines the results of many separate studies",["metaanalysis","meta-analysis","meta"]],
   ["Longitudinal study","following the same people over an extended period of time",["longitudinal","longitudinalstudy","longitudinalstudies"]],
   ["Cross-sectional study","comparing different age groups at a single point in time",["crosssectional","cross-sectional","crosssectionalstudy"]],
   ["Framing effect","when the wording of a question changes the answers people give",["framingeffect","framing","wordingeffect"]],
   ["Confirmation bias","seeking out and noticing evidence that supports what you already believe",["confirmationbias"]],
   ["Hindsight bias","the 'I knew it all along' feeling once you already know the outcome",["hindsightbias","hindsight","iknewitallalongphenomenon"]],
   ["Overconfidence","being more certain of your judgments than their accuracy warrants",["overconfidence","overconfidencebias"]],
   ["Statistical significance","a result unlikely to have occurred by chance alone, conventionally p < .05",["statisticalsignificance","significance","statisticallysignificant","pvalue"]],
   ["Effect size","how large a difference is, independent of how big the sample was",["effectsize"]],
   ["Replication","repeating a study to see whether the original finding holds up",["replication","replicate","replicating"]],
   ["Regression toward the mean","the tendency for extreme scores to drift back toward average on retesting",["regressiontowardthemean","regressiontothemean","regression"]],
   ["Gambler's fallacy","believing past independent chance outcomes change the odds of the next one",["gamblersfallacy","gamblerfallacy","thegamblersfallacy"]],
   ["Normal curve","the symmetric bell-shaped distribution where mean, median and mode coincide",["normalcurve","normaldistribution","bellcurve","normal"]],
   ["Positive skew","a distribution whose tail stretches toward the high end, pulling the mean above the median",["positiveskew","positivelyskewed","rightskew","skewedright"]],
   ["Negative skew","a distribution whose tail stretches toward the low end, pulling the mean below the median",["negativeskew","negativelyskewed","leftskew","skewedleft"]],
   ["Percentile","the percentage of scores at or below a given score",["percentile","percentilerank"]],
   ["Standard deviation","the typical distance of scores from the mean, a measure of spread",["standarddeviation","sd"]],
   ["Range","the highest score minus the lowest score",["range","therange"]],
   ["Mode","the most frequently occurring score, and the only measure usable for categories",["mode","themode"]],
   ["Median","the middle value once the scores are put in order, resistant to outliers",["median","themedian"]],
   ["Directionality problem","when a correlation cannot tell you which of two variables came first",["directionalityproblem","directionality"]],
   ["Single-blind procedure","the participants do not know which condition they are in, but the researchers do",["singleblind","singleblindprocedure"]],
   ["Placebo group","participants given an inert treatment so expectation effects can be measured",["placebogroup","placebocondition"]],
   ["IRB","the review board that must approve a study's ethics before it may be run",["irb","institutionalreviewboard"]],
   ["Qualitative measure","descriptive, non-numeric data such as interviews or open-ended responses",["qualitative","qualitativemeasure","qualitativedata"]],
   ["Quantitative measure","numeric data such as scores, counts or reaction times",["quantitative","quantitativemeasure","quantitativedata"]]
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

/* ---- Real problems from the class handouts, with worked solutions.
   Review answers were checked against Mr. Haruthunian's answer key;
   the rest were solved here and verified numerically. ---- */
const HANDOUTS = {
 "hw11": {
  "label": "Handout 1-1: Introduction to Limits",
  "subject": "math",
  "topic": "Limits — the idea",
  "items": [
   {
    "q": "1.  A table for f(x) = (x³−1)/(x−1) gives:\n   x     .75    .9    .999   1     1.001   1.1    1.25\n  f(x)  2.313  2.710  2.997  DNE   3.003  3.310  3.813\n\nWhat is lim(x→1) f(x)?",
    "ans": "3",
    "accept": [
     "3"
    ],
    "steps": [
     "Read the table from both directions and see what the outputs close in on.",
     "From the left: 2.313 → 2.710 → 2.997.  From the right: 3.003 → 3.310 → 3.813 read backwards toward 3.",
     "Both sides converge on 3.",
     "f(1) itself is undefined — the table says DNE — and that does not matter.",
     "Answer: 3.  This is the informal definition: f(x) gets arbitrarily close to a single number L as x approaches c from either side."
    ]
   },
   {
    "q": "2.  f(x) = { 1 for x ≠ 2 ;  0 for x = 2 }\n\nFind lim(x→2) f(x).",
    "ans": "1",
    "accept": [
     "1"
    ],
    "steps": [
     "Everywhere near 2 — but not at 2 — the function equals 1.",
     "The limit only cares about the neighborhood, never the point.",
     "Answer: 1, even though f(2) = 0."
    ]
   },
   {
    "q": "3.  Consider  lim(x→0)  |x| / x",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist",
     "none",
     "nolimit",
     "no limit"
    ],
    "steps": [
     "For x > 0, |x| = x, so the expression is x/x = 1.",
     "For x < 0, |x| = −x, so the expression is −x/x = −1.",
     "Right-hand limit 1, left-hand limit −1.  They disagree.",
     "Answer: DNE — the graph is a jump between the lines y = 1 and y = −1."
    ]
   },
   {
    "q": "4.  Consider  lim(x→0)  1 / x²",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne",
     "doesnotexist",
     "does not exist"
    ],
    "steps": [
     "x² is positive on BOTH sides of 0.",
     "So 1/x² grows without bound from either direction — the sides agree.",
     "This is unbounded behavior: there is no real number L being approached.",
     "Answer: ∞  (formally the limit does not exist, but ∞ is the specific description)"
    ]
   },
   {
    "q": "5.  Consider  lim(x→0)  sin(1/x)",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist",
     "none",
     "nolimit",
     "no limit"
    ],
    "steps": [
     "As x → 0, the inside 1/x races off to infinity.",
     "So sin(1/x) keeps sweeping between −1 and 1, faster and faster.",
     "It never settles on a single value — oscillating behavior.",
     "Answer: DNE"
    ]
   },
   {
    "q": "6.  Show that  lim(x→3) (x² + 5x) = 24  using the properties of limits.",
    "ans": "24",
    "accept": [
     "24"
    ],
    "steps": [
     "Sum rule: lim(x² + 5x) = lim(x²) + lim(5x).",
     "Power rule: lim(x²) = (lim x)² = 3² = 9.",
     "Scalar multiple rule: lim(5x) = 5·lim(x) = 5(3) = 15.",
     "Add: 9 + 15 = 24.",
     "Answer: 24"
    ]
   },
   {
    "q": "7a.  Given lim f(x) = 4 and lim g(x) = 3/2, find  lim [ f(x) / g(x) ]",
    "ans": "8/3",
    "accept": [
     "8/3"
    ],
    "steps": [
     "Quotient rule — allowed because lim g = 3/2 ≠ 0.",
     "4 ÷ (3/2) = 4 × (2/3).",
     "Answer: 8/3"
    ]
   },
   {
    "q": "7b.  Given lim f(x) = 4 and lim g(x) = 3/2, find  lim [ f(x) · g(x) ]",
    "ans": "6",
    "accept": [
     "6"
    ],
    "steps": [
     "Product rule: (lim f)(lim g).",
     "4 × 3/2 = 6.",
     "Answer: 6"
    ]
   },
   {
    "q": "7c.  Given lim f(x) = 4 and lim g(x) = 3/2, find  lim [ 3f(x) + 4g(x) ]",
    "ans": "18",
    "accept": [
     "18"
    ],
    "steps": [
     "Scalar multiple then sum: 3(lim f) + 4(lim g).",
     "3(4) + 4(3/2) = 12 + 6.",
     "Answer: 18"
    ]
   }
  ]
 },
 "hw13": {
  "label": "Handout 1-3: Evaluating Limits",
  "subject": "math",
  "topic": "The four techniques for evaluating limits",
  "items": [
   {
    "q": "1.  lim(x→0)  sin 4x / x",
    "ans": "4",
    "accept": [
     "4"
    ],
    "steps": [
     "The inside of the sine is 4x but the bottom is x — make them match.",
     "Multiply top and bottom by 4:  4 · sin(4x)/(4x).",
     "lim sin(4x)/(4x) = 1.",
     "Answer: 4"
    ]
   },
   {
    "q": "2.  lim(x→0)  sin x / (5x)",
    "ans": "1/5",
    "accept": [
     "1/5",
     "0.2"
    ],
    "steps": [
     "Pull the constant out: (1/5) · sin x / x.",
     "sin x / x → 1.",
     "Answer: 1/5"
    ]
   },
   {
    "q": "3.  lim(x→π)  cos 3x",
    "ans": "−1",
    "accept": [
     "-1",
     "−1"
    ],
    "steps": [
     "cosine is continuous everywhere, so just substitute.",
     "cos(3π) = cos(π) = −1.",
     "Answer: −1"
    ]
   },
   {
    "q": "4.  lim(x→1)  (x² − 1)/(x − 1)",
    "ans": "2",
    "accept": [
     "2"
    ],
    "steps": [
     "0/0 — factor.  x² − 1 = (x−1)(x+1).",
     "Cancel (x−1), leaving x + 1.",
     "Substitute 1.",
     "Answer: 2"
    ]
   },
   {
    "q": "5.  lim(x→−3)  (x² − x − 12)/(x + 3)",
    "ans": "−7",
    "accept": [
     "-7",
     "−7"
    ],
    "steps": [
     "0/0 — factor the top: x² − x − 12 = (x − 4)(x + 3).",
     "Cancel (x+3), leaving x − 4.",
     "Substitute −3: −3 − 4.",
     "Answer: −7"
    ]
   },
   {
    "q": "6.  lim(x→−2)  (x + 2)/(x² − x − 6)",
    "ans": "−1/5",
    "accept": [
     "-1/5",
     "−1/5",
     "-0.2"
    ],
    "steps": [
     "0/0 — factor the bottom: x² − x − 6 = (x − 3)(x + 2).",
     "Cancel (x+2), leaving 1/(x − 3).",
     "Substitute −2: 1/(−5).",
     "Answer: −1/5"
    ]
   },
   {
    "q": "7.  lim(x→1)  (x³ − 1)/(x² − 1)",
    "ans": "3/2",
    "accept": [
     "3/2",
     "1.5"
    ],
    "steps": [
     "0/0 — factor both.  Difference of cubes on top: x³ − 1 = (x−1)(x² + x + 1).",
     "Difference of squares on the bottom: x² − 1 = (x−1)(x+1).",
     "Cancel (x−1): (x² + x + 1)/(x + 1).",
     "Substitute 1: (1+1+1)/2.",
     "Answer: 3/2"
    ]
   },
   {
    "q": "8.  lim(h→0)  [(3+h)² − 9]/h",
    "ans": "6",
    "accept": [
     "6"
    ],
    "steps": [
     "Expand: (3+h)² = 9 + 6h + h², so the top is 6h + h².",
     "Factor out h and cancel: 6 + h.",
     "Substitute 0.",
     "Answer: 6"
    ]
   },
   {
    "q": "9.  lim(x→9)  (9 − x)/(3 − √x)",
    "ans": "6",
    "accept": [
     "6"
    ],
    "steps": [
     "0/0 with a radical — rationalize by multiplying top and bottom by (3 + √x).",
     "The bottom becomes (3−√x)(3+√x) = 9 − x.",
     "That cancels the top, leaving 3 + √x.",
     "Substitute 9: 3 + 3.",
     "Answer: 6"
    ]
   },
   {
    "q": "10.  lim(t→0)  (√(2−t) − √2)/t",
    "ans": "−√2/4",
    "accept": [
     "-sqrt2/4",
     "−√2/4",
     "-√2/4",
     "-1/(2sqrt2)",
     "-0.35355"
    ],
    "steps": [
     "Rationalize: multiply top and bottom by (√(2−t) + √2).",
     "The top becomes (2 − t) − 2 = −t.",
     "Cancel the t: −1/(√(2−t) + √2).",
     "Substitute 0: −1/(√2 + √2) = −1/(2√2).",
     "Rationalize the denominator.  Answer: −√2/4"
    ]
   },
   {
    "q": "11.  lim(x→9)  (x² − 81)/(√x − 3)",
    "ans": "108",
    "accept": [
     "108"
    ],
    "steps": [
     "Rationalize with (√x + 3); the bottom becomes x − 9.",
     "The top factors as (x−9)(x+9), so the (x−9) cancels.",
     "Left with (x + 9)(√x + 3).",
     "Substitute 9: (18)(6).",
     "Answer: 108"
    ]
   },
   {
    "q": "12.  lim(x→2)  (1/x − 1/2)/(x − 2)",
    "ans": "−1/4",
    "accept": [
     "-1/4",
     "−1/4",
     "-0.25"
    ],
    "steps": [
     "A complex fraction — combine the top over a common denominator first.",
     "1/x − 1/2 = (2 − x)/(2x).",
     "Now divide by (x − 2): (2 − x) / [2x(x − 2)].",
     "Note 2 − x = −(x − 2), so this is −1/(2x).",
     "Substitute 2: −1/4.",
     "Answer: −1/4"
    ]
   },
   {
    "q": "13.  lim(x→6)  (1/x − 1/6)/(x − 6)",
    "ans": "−1/36",
    "accept": [
     "-1/36",
     "−1/36"
    ],
    "steps": [
     "Combine the top: 1/x − 1/6 = (6 − x)/(6x).",
     "Divide by (x − 6): (6 − x)/[6x(x − 6)] = −1/(6x).",
     "Substitute 6: −1/36.",
     "Answer: −1/36"
    ]
   },
   {
    "q": "14.  lim(θ→0)  3(1 − cos θ)/θ",
    "ans": "0",
    "accept": [
     "0"
    ],
    "steps": [
     "Pull the 3 out: 3 · (1 − cos θ)/θ.",
     "This is the OTHER special trig limit, and its value is 0, not 1.",
     "3 × 0 = 0.",
     "Answer: 0"
    ]
   },
   {
    "q": "15.  lim(x→0)  cos x · tan x / x",
    "ans": "1",
    "accept": [
     "1"
    ],
    "steps": [
     "Rewrite tan x as sin x / cos x.",
     "cos x · (sin x / cos x) = sin x — the cosines cancel.",
     "Left with sin x / x.",
     "Answer: 1"
    ]
   },
   {
    "q": "16.  lim(x→0)  (sec x − 1)/(x · sec x)",
    "ans": "0",
    "accept": [
     "0"
    ],
    "steps": [
     "sec x = 1/cos x. Top: 1/cos x − 1 = (1 − cos x)/cos x.",
     "Bottom: x · sec x = x/cos x.",
     "Dividing, the cos x factors cancel, leaving (1 − cos x)/x.",
     "That is the special limit equal to 0.",
     "Answer: 0"
    ]
   }
  ]
 },
 "hw14": {
  "label": "Handout 1-4: Evaluating Limits 2",
  "subject": "math",
  "topic": "The four techniques for evaluating limits",
  "items": [
   {
    "q": "1a.  f(x) = { x for x < 1 ;  3 for 1 ≤ x < 3 ;  x for x > 3 }\n\nFind lim(x→1⁻) f(x).",
    "ans": "1",
    "accept": [
     "1"
    ],
    "steps": [
     "From the LEFT of 1 the rule is f(x) = x.",
     "Substitute 1.",
     "Answer: 1"
    ]
   },
   {
    "q": "1b.  f(x) = { x for x < 1 ;  3 for 1 ≤ x < 3 ;  x for x > 3 }\n\nFind lim(x→1⁺) f(x).",
    "ans": "3",
    "accept": [
     "3"
    ],
    "steps": [
     "From the RIGHT of 1 the rule is the constant 3.",
     "Answer: 3"
    ]
   },
   {
    "q": "1c.  f(x) = { x for x < 1 ;  3 for 1 ≤ x < 3 ;  x for x > 3 }\n\nFind lim(x→1) f(x).",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist",
     "none",
     "nolimit",
     "no limit"
    ],
    "steps": [
     "Left gives 1, right gives 3.",
     "They disagree, so no single value is approached.",
     "Answer: DNE — a jump"
    ]
   },
   {
    "q": "1d.  f(x) = { x for x < 1 ;  3 for 1 ≤ x < 3 ;  x for x > 3 }\n\nFind f(1).",
    "ans": "3",
    "accept": [
     "3"
    ],
    "steps": [
     "Which piece actually contains x = 1?  The middle one, since 1 ≤ x < 3 includes 1.",
     "That piece is the constant 3.",
     "Answer: 3"
    ]
   },
   {
    "q": "1e.  f(x) = { x for x < 1 ;  3 for 1 ≤ x < 3 ;  x for x > 3 }\n\nFind lim(x→3⁻) f(x).",
    "ans": "3",
    "accept": [
     "3"
    ],
    "steps": [
     "Just below 3 the rule is the constant 3.",
     "Answer: 3"
    ]
   },
   {
    "q": "1f.  f(x) = { x for x < 1 ;  3 for 1 ≤ x < 3 ;  x for x > 3 }\n\nFind lim(x→3⁺) f(x).",
    "ans": "3",
    "accept": [
     "3"
    ],
    "steps": [
     "Just above 3 the rule is f(x) = x.",
     "Substitute 3.",
     "Answer: 3"
    ]
   },
   {
    "q": "1g.  f(x) = { x for x < 1 ;  3 for 1 ≤ x < 3 ;  x for x > 3 }\n\nFind lim(x→3) f(x).",
    "ans": "3",
    "accept": [
     "3"
    ],
    "steps": [
     "Left gives 3 and right gives 3.",
     "They agree, so the two-sided limit exists.",
     "Answer: 3"
    ]
   },
   {
    "q": "1h.  f(x) = { x for x < 1 ;  3 for 1 ≤ x < 3 ;  x for x > 3 }\n\nFind f(3).",
    "ans": "undefined",
    "accept": [
     "undefined",
     "dne",
     "doesnotexist",
     "does not exist",
     "none"
    ],
    "steps": [
     "Check each piece: x < 1 excludes 3.  1 ≤ x < 3 excludes 3.  x > 3 excludes 3.",
     "No piece covers x = 3, so the function has no value there.",
     "This is the nice case where the LIMIT exists (it is 3) but f(3) does not.",
     "Answer: undefined"
    ]
   },
   {
    "q": "2a.  From the graph: lim(x→7) f(x)\n\n[The curve dips to an OPEN circle at (7,−1) and comes back up.]",
    "ans": "−1",
    "accept": [
     "-1",
     "−1"
    ],
    "steps": [
     "The curve approaches the same height from both sides.",
     "The circle being open does not change the limit.",
     "Answer: −1"
    ]
   },
   {
    "q": "2d.  From the graph: lim(x→5) f(x)\n\n[A peak with a FILLED dot at (5,4).]",
    "ans": "4",
    "accept": [
     "4"
    ],
    "steps": [
     "The curve rises to the peak from the left and falls from it on the right.",
     "Both sides approach 4.",
     "Answer: 4"
    ]
   },
   {
    "q": "2f.  From the graph: lim(x→0) f(x)\n\n[Left branch rises to an OPEN circle at (0,4); right branch starts at a FILLED dot (0,0).]",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist",
     "none",
     "nolimit",
     "no limit"
    ],
    "steps": [
     "Left-hand limit: 4.  Right-hand limit: 0.",
     "The sides disagree.",
     "Answer: DNE"
    ]
   },
   {
    "q": "2g.  From the graph: lim(x→3) f(x)\n\n[Left branch rises to an OPEN circle at (3,2); right branch starts at a FILLED dot (3,−1).]",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist",
     "none",
     "nolimit",
     "no limit"
    ],
    "steps": [
     "Left-hand limit: 2.  Right-hand limit: −1.",
     "The sides disagree.",
     "Answer: DNE"
    ]
   },
   {
    "q": "2h.  From the graph: lim(x→3⁺) f(x)\n\n[The right branch leaves from a FILLED dot at (3,−1).]",
    "ans": "−1",
    "accept": [
     "-1",
     "−1"
    ],
    "steps": [
     "The ⁺ means approach from the RIGHT only.",
     "That branch starts at height −1.",
     "Answer: −1"
    ]
   },
   {
    "q": "3.  lim(h→0)  [ 3(x+h)² − 3x² ] / h\n  a. 6xh   b. 6   c. 6x   d. 3x   e. 3",
    "ans": "c",
    "accept": [
     "c",
     "6x",
     "choicec"
    ],
    "steps": [
     "Expand: 3(x² + 2xh + h²) − 3x² = 6xh + 3h².",
     "Factor out h and cancel: 6x + 3h.",
     "Let h → 0.",
     "Answer: (c) 6x   — this is the derivative of 3x²"
    ]
   },
   {
    "q": "4.  lim(h→0)  [ 7(x+h)² − 7x² ] / h\n  a. 14xh   b. 14   c. 14x   d. 7x   e. 7",
    "ans": "c",
    "accept": [
     "c",
     "14x",
     "choicec"
    ],
    "steps": [
     "Expand: 7(x² + 2xh + h²) − 7x² = 14xh + 7h².",
     "Cancel the h: 14x + 7h.",
     "Let h → 0.",
     "Answer: (c) 14x"
    ]
   },
   {
    "q": "5.  lim(h→0)  (√(x+h) − √x)/h\n  a. 2√x   b. −2√x   c. 1/(2√x)   d. −1/(2√x)   e. 2x",
    "ans": "c",
    "accept": [
     "c",
     "1/(2sqrtx)",
     "choicec"
    ],
    "steps": [
     "Rationalize with the conjugate (√(x+h) + √x).",
     "The top becomes (x + h) − x = h.",
     "Cancel the h: 1/(√(x+h) + √x).",
     "Let h → 0: 1/(√x + √x).",
     "Answer: (c) 1/(2√x)"
    ]
   },
   {
    "q": "6.  lim(x→9)  (x − 9)/(√x − 3)\n  a. 0   b. ∞   c. 6   d. No limit   e. 6x",
    "ans": "c",
    "accept": [
     "c",
     "6",
     "choicec"
    ],
    "steps": [
     "Rationalize with (√x + 3); the bottom becomes x − 9.",
     "That cancels the top entirely, leaving √x + 3.",
     "Substitute 9.",
     "Answer: (c) 6"
    ]
   },
   {
    "q": "7.  lim(h→0)  [ 1/(x+h) − 1/x ] / h\n  a. 1/x²   b. −x²   c. −1/x²   d. x²   e. −1/x",
    "ans": "c",
    "accept": [
     "c",
     "-1/x^2",
     "−1/x²",
     "choicec"
    ],
    "steps": [
     "Combine the top over a common denominator: [x − (x+h)] / [x(x+h)] = −h / [x(x+h)].",
     "Divide by h — that cancels the h: −1 / [x(x+h)].",
     "Let h → 0.",
     "Answer: (c) −1/x²"
    ]
   },
   {
    "q": "8.  f(x) = { −7 for x = 4 ;  2x + 7 for x ≠ 4 }\n\nFind lim(x→4) f(x).",
    "ans": "15",
    "accept": [
     "15"
    ],
    "steps": [
     "The limit ignores the single point x = 4 entirely.",
     "Everywhere near 4 the rule is 2x + 7.",
     "2(4) + 7 = 15.",
     "Answer: 15 — note f(4) = −7, so f is not continuous there."
    ]
   },
   {
    "q": "9.  lim(x→3)  (1/x − 1/3)/(x − 3)\n  a. 0   b. −1/9   c. 1/27   d. 1/9   e. 1/3",
    "ans": "b",
    "accept": [
     "b",
     "-1/9",
     "−1/9",
     "choiceb"
    ],
    "steps": [
     "Combine the top: 1/x − 1/3 = (3 − x)/(3x).",
     "Divide by (x − 3): (3 − x)/[3x(x − 3)].",
     "Since 3 − x = −(x − 3), this is −1/(3x).",
     "Substitute 3: −1/9.",
     "Answer: (b) −1/9"
    ]
   },
   {
    "q": "10.  lim(x→1/2)  (8x³ − 1)/(10x² − 7x + 1)\n  a. 0   b. 1/2   c. 2   d. 10/7   e. 8/3",
    "ans": "c",
    "accept": [
     "c",
     "2",
     "choicec"
    ],
    "steps": [
     "Substituting 1/2 gives 0/0, so factor both.",
     "Difference of cubes: 8x³ − 1 = (2x − 1)(4x² + 2x + 1).",
     "Bottom: 10x² − 7x + 1 = (2x − 1)(5x − 1).",
     "Cancel (2x − 1): (4x² + 2x + 1)/(5x − 1).",
     "Substitute 1/2: (1 + 1 + 1)/(3/2) = 3 ÷ 3/2.",
     "Answer: (c) 2"
    ]
   },
   {
    "q": "11.  Find A so that  lim(x→2)  (x² + Ax − 10)/(x − 2)  exists.",
    "ans": "3",
    "accept": [
     "3",
     "a=3"
    ],
    "steps": [
     "The bottom is 0 at x = 2, so the only way the limit can exist is if the TOP is 0 there too.",
     "That way (x − 2) cancels instead of blowing up.",
     "Set the top to zero at x = 2:  4 + 2A − 10 = 0.",
     "2A = 6, so A = 3.",
     "Check: x² + 3x − 10 = (x − 2)(x + 5), so the limit is 7.",
     "Answer: A = 3"
    ]
   },
   {
    "q": "12.  If  lim(x→0)  (√(Ax + B) − 2)/x = 3,  find A and B.",
    "ans": "A = 12, B = 4",
    "accept": [
     "a=12,b=4",
     "a=12b=4",
     "12,4",
     "12and4",
     "a=12 b=4"
    ],
    "steps": [
     "The bottom → 0, so for a finite limit the top must → 0 as well.",
     "√B − 2 = 0, so B = 4.",
     "Now rationalize: (√(Ax+4) − 2)/x × (√(Ax+4) + 2)/(√(Ax+4) + 2).",
     "The top becomes (Ax + 4) − 4 = Ax, so you get Ax / [x(√(Ax+4) + 2)] = A/(√(Ax+4) + 2).",
     "Let x → 0: A/(2 + 2) = A/4.",
     "Set A/4 = 3, so A = 12.",
     "Answer: A = 12, B = 4"
    ]
   }
  ]
 },
 "hwReview": {
  "label": "Unit 1 Review (the real handout)",
  "subject": "math",
  "topic": "The four techniques for evaluating limits",
  "items": [
   {
    "q": "1.  lim(x→0)  sin x / (x² − 2x)",
    "ans": "−1/2",
    "accept": [
     "-1/2",
     "-0.5",
     "−1/2"
    ],
    "steps": [
     "Factor the bottom: x² − 2x = x(x − 2).",
     "Split it: [sin x / x] · [1/(x − 2)].",
     "lim sin x / x = 1, and 1/(x−2) → 1/(0−2) = −1/2.",
     "Answer: −1/2"
    ]
   },
   {
    "q": "2.  lim(x→0)  (√(x+1) − 1) / x",
    "ans": "1/2",
    "accept": [
     "1/2",
     "0.5"
    ],
    "steps": [
     "Substitution gives 0/0, and there is a radical — use the RATIONALIZING technique.",
     "Multiply top and bottom by the conjugate (√(x+1) + 1).",
     "Top becomes (x+1) − 1 = x, so you get x / [x(√(x+1)+1)].",
     "Cancel the x: 1/(√(x+1)+1) → 1/(1+1).",
     "Answer: 1/2"
    ]
   },
   {
    "q": "3.  lim(x→0)  [(3+x)² − 9] / x",
    "ans": "6",
    "accept": [
     "6"
    ],
    "steps": [
     "Expand the top: (3+x)² = 9 + 6x + x², so the top is 6x + x².",
     "That gives (6x + x²)/x.",
     "Cancel the x: 6 + x.",
     "Substitute 0.  Answer: 6"
    ]
   },
   {
    "q": "4.  lim(x→9)  (x² − 81) / (√x − 3)",
    "ans": "108",
    "accept": [
     "108"
    ],
    "steps": [
     "0/0 with a radical in the bottom — rationalize by multiplying top and bottom by (√x + 3).",
     "The bottom becomes (√x−3)(√x+3) = x − 9.",
     "The top factors: (x−9)(x+9)(√x+3).",
     "Cancel (x − 9), leaving (x+9)(√x+3).",
     "Substitute 9: (18)(6).  Answer: 108"
    ]
   },
   {
    "q": "5.  lim(x→2⁻)  (x − 3) / (x − 2)",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "Substituting gives −1/0 — a vertical asymptote, so decide the sign.",
     "Coming from the LEFT of 2, (x − 2) is a tiny NEGATIVE.",
     "The top approaches −1, also negative.  Negative ÷ negative = positive.",
     "Answer: +∞  (your teacher accepts DNE, but ∞ is the more specific answer)"
    ]
   },
   {
    "q": "6.  lim(x→∞)  x³ / e^(−3x)",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "A negative exponent in the bottom flips up: x³ / e^(−3x) = x³ · e^(3x).",
     "Both factors grow without bound.",
     "Answer: ∞  (DNE is accepted; ∞ is more specific)"
    ]
   },
   {
    "q": "7.  lim(x→∞)  √x / 2^(3x)",
    "ans": "0",
    "accept": [
     "0"
    ],
    "steps": [
     "2^(3x) is the same as 8^x.",
     "An exponential grows faster than any root.",
     "The bottom outruns the top, so the fraction is squeezed to zero.",
     "Answer: 0"
    ]
   },
   {
    "q": "8.  lim(x→∞)  sin( 1/(x−2) )",
    "ans": "0",
    "accept": [
     "0"
    ],
    "steps": [
     "Work from the inside out. As x → ∞, the denominator (x−2) → ∞.",
     "So 1/(x−2) → 0.",
     "sin is continuous, so the limit is sin(0).",
     "Answer: 0"
    ]
   },
   {
    "q": "9.  lim(x→0)  sin 2x / sin 3x",
    "ans": "2/3",
    "accept": [
     "2/3"
    ],
    "steps": [
     "Divide top and bottom by x to build two special trig limits.",
     "Top: sin2x / x = 2 · (sin2x / 2x) → 2.   Bottom: sin3x / x = 3 · (sin3x / 3x) → 3.",
     "Answer: 2/3"
    ]
   },
   {
    "q": "10.  lim(x→+∞)  e^(x/2)",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "As x → ∞, the exponent x/2 → ∞.",
     "An exponential with a growing positive exponent grows without bound.",
     "Answer: ∞  (the key notes: DNE is acceptable, but infinity is more specific)"
    ]
   },
   {
    "q": "11.  lim(x→∞)  |x| / e^(x²)",
    "ans": "0",
    "accept": [
     "0"
    ],
    "steps": [
     "The top grows like x. The bottom grows like e^(x²), which is far faster.",
     "The denominator goes to infinity faster than the numerator.",
     "Answer: 0"
    ]
   },
   {
    "q": "12.  lim(x→∞)  ln x / e^(−x)",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "e^(−x) in the denominator flips up: ln x / e^(−x) = ln x · e^x.",
     "Both factors grow without bound.",
     "Answer: ∞  (DNE accepted; ∞ is more specific)"
    ]
   },
   {
    "q": "13.  lim(x→∞)  [ 1/(x+1) ] / e^x",
    "ans": "0",
    "accept": [
     "0"
    ],
    "steps": [
     "Rewrite as 1 / [ (x+1) · e^x ].",
     "The denominator goes to infinity much faster than the numerator, which is just 1.",
     "Answer: 0"
    ]
   },
   {
    "q": "14.  lim(x→∞)  cos( 1/(x+5) )",
    "ans": "1",
    "accept": [
     "1"
    ],
    "steps": [
     "Inside first: as x → ∞, 1/(x+5) → 0.",
     "cos is continuous, so the limit is cos(0).",
     "Answer: 1"
    ]
   },
   {
    "q": "15.  f(x) = { (x²+3x)/x  for x > 0 ;  3  for x ≤ 0 }\n\nIs f continuous at x = 0?  (Yes or No)",
    "ans": "Yes",
    "accept": [
     "yes",
     "y",
     "continuous",
     "true"
    ],
    "steps": [
     "Simplify the top piece: (x²+3x)/x = x(x+3)/x = x + 3 for x > 0.",
     "f(0) uses the x ≤ 0 piece: f(0) = 3.  Defined ✓",
     "Left limit: the constant piece → 3.  Right limit: x + 3 → 3.  Limit = 3 ✓",
     "Limit 3 equals f(0) = 3 ✓",
     "All three conditions hold.  Answer: Yes, continuous at x = 0"
    ]
   },
   {
    "q": "16.  f(x) = { 3x + 1  for x ≠ 2 ;  5  for x = 2 }\n\nFind lim(x→2) f(x).",
    "ans": "7",
    "accept": [
     "7"
    ],
    "steps": [
     "The limit never looks at the point itself, only at the neighborhood.",
     "Near x = 2 (but not at it) the rule is 3x + 1.",
     "3(2) + 1 = 7.",
     "Answer: 7.  Note f(2) = 5, so 7 ≠ 5 and f is NOT continuous at 2 — a removable discontinuity."
    ]
   },
   {
    "q": "17.  f(x) = { (3x²+10x−8)/(x+4)  for x ≠ −4 ;  k  for x = −4 }\n\nFind the value of k that makes f continuous everywhere.",
    "ans": "−14",
    "accept": [
     "-14",
     "−14"
    ],
    "steps": [
     "Continuity needs k to equal the limit as x → −4.",
     "Factor the top: 3x² + 10x − 8 = (3x − 2)(x + 4).",
     "Cancel (x + 4), leaving 3x − 2.",
     "Substitute −4: 3(−4) − 2 = −14.",
     "Answer: k = −14"
    ]
   },
   {
    "q": "18.  f(x) = { 2x − 3  for x ≤ 2 ;  x² + 1  for x > 2 }\n\nFind lim(x→2) f(x).  (Write DNE if it does not exist.)",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist",
     "undefined",
     "none"
    ],
    "steps": [
     "Left piece at 2: 2(2) − 3 = 1.",
     "Right piece at 2: (2)² + 1 = 5.",
     "1 ≠ 5, so the one-sided limits disagree.",
     "Answer: DNE — a jump discontinuity"
    ]
   },
   {
    "q": "19.  h is continuous, with h(0) = −10 and h(5) = 4.\nWhy must there be a c in 0 < c < 5 with h(c) = −5?\n\n(Name the theorem.)",
    "ans": "Intermediate Value Theorem",
    "accept": [
     "intermediatevaluetheorem",
     "ivt",
     "intermediate value theorem",
     "intermediatevalue"
    ],
    "steps": [
     "h is continuous on [0, 5].",
     "−10 < −5 < 4, so the target value −5 lies between h(0) and h(5).",
     "The INTERMEDIATE VALUE THEOREM guarantees the function takes every value between its endpoint values.",
     "Full justification: 'Since h is continuous and −10 < −5 < 4, the IVT guarantees a value c in 0 < c < 5 such that h(c) = −5.'"
    ]
   },
   {
    "q": "21a.  From the graph: lim(x→0⁻) f(x)\n\n[Curve rises from (−6,1) to an OPEN circle at (0,4); a FILLED dot sits at (0,0).]",
    "ans": "4",
    "accept": [
     "4"
    ],
    "steps": [
     "Approaching 0 from the LEFT, follow the curve coming up from (−6, 1).",
     "It heads toward the open circle at (0, 4).",
     "The circle being open does not matter — the limit is the height approached.",
     "Answer: 4"
    ]
   },
   {
    "q": "21c.  From the graph: lim(x→0) f(x)\n\n[Left branch rises to an OPEN circle at (0,4); right branch starts at a FILLED dot (0,0).]",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist",
     "undefined",
     "none"
    ],
    "steps": [
     "Left-hand limit: 4.   Right-hand limit: 0.",
     "The two sides disagree, so no single value is approached.",
     "Answer: DNE   (and f(0) = 0, which is a separate question)"
    ]
   },
   {
    "q": "22.  lim(x→−3⁻) f(x) = −1, lim(x→−3⁺) f(x) = −1, and f(−3) is undefined.\nWhich are true?\n  I. lim(x→−3) f(x) = −1\n  II. f is continuous everywhere except x = −3\n  III. f has a discontinuity at x = −3",
    "ans": "d",
    "accept": [
     "d",
     "iandiiionly",
     "i and iii only",
     "i,iii",
     "iandiii"
    ],
    "steps": [
     "I is TRUE — both one-sided limits equal −1, so the two-sided limit is −1.",
     "II is FALSE — you were told nothing about any other point, so you cannot claim continuity everywhere else.",
     "III is TRUE — f(−3) is undefined, so condition 1 of continuity fails.",
     "Answer: (d) I and III only"
    ]
   }
  ]
 },
 "hw110": {
  "label": "Handout 1-10: Limits at Infinity",
  "subject": "math",
  "topic": "Limits at infinity (horizontal asymptotes)",
  "items": [
   {
    "q": "1.  lim(x→∞)  (3 − x) / (4 + x + x²)",
    "ans": "0",
    "accept": [
     "0"
    ],
    "steps": [
     "Top degree 1, bottom degree 2.",
     "The bottom grows faster.",
     "Answer: 0  (horizontal asymptote y = 0)"
    ]
   },
   {
    "q": "2.  lim(x→∞)  (4x⁴ + 5x + 1) / (37x³ − 9)",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "Top degree 4, bottom degree 3.",
     "The top grows faster, so the fraction is unbounded.",
     "There is no horizontal asymptote.",
     "Answer: ∞ (DNE)"
    ]
   },
   {
    "q": "3.  lim(x→∞)  (x³ − 4x² + 7) / (3 − 6x − 2x³)",
    "ans": "−1/2",
    "accept": [
     "-1/2",
     "−1/2",
     "-0.5"
    ],
    "steps": [
     "Both are degree 3, so use the ratio of leading coefficients.",
     "Top leading coefficient 1; bottom leading coefficient −2.",
     "Answer: −1/2"
    ]
   },
   {
    "q": "4.  lim(x→∞)  sin x",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist",
     "none"
    ],
    "steps": [
     "sin x keeps oscillating between −1 and 1 forever.",
     "It never settles toward one value.",
     "Answer: DNE"
    ]
   },
   {
    "q": "5.  lim(x→∞)  (2x² + 1) / [(2 − x)(2 + x)]",
    "ans": "−2",
    "accept": [
     "-2",
     "−2"
    ],
    "steps": [
     "Expand the bottom: (2−x)(2+x) = 4 − x².",
     "Both are degree 2, so take leading coefficients: 2 on top, −1 on the bottom.",
     "Answer: −2"
    ]
   },
   {
    "q": "6.  lim(x→∞)  √(x² + 1) / (3x)",
    "ans": "1/3",
    "accept": [
     "1/3"
    ],
    "steps": [
     "For large positive x, √(x²+1) behaves like √(x²) = x.",
     "So the fraction behaves like x/(3x).",
     "Answer: 1/3   (careful: as x → −∞ this would be −1/3, since √(x²) = |x|)"
    ]
   },
   {
    "q": "7.  lim(x→∞)  √(x + 1) / (3x)",
    "ans": "0",
    "accept": [
     "0"
    ],
    "steps": [
     "The top grows like x^(1/2); the bottom grows like x.",
     "Degree 1/2 < degree 1, so the bottom wins.",
     "Answer: 0"
    ]
   },
   {
    "q": "8.  lim(x→∞)  x² / √(3x + 1)",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "Top degree 2; bottom degree 1/2.",
     "The top grows far faster.",
     "Answer: ∞ (DNE)"
    ]
   },
   {
    "q": "9.  lim(x→2)  ( 1 + 3/(x+2) )",
    "ans": "7/4",
    "accept": [
     "7/4",
     "1.75"
    ],
    "steps": [
     "Nothing is indeterminate here — just substitute.",
     "1 + 3/(2+2) = 1 + 3/4.",
     "Answer: 7/4"
    ]
   },
   {
    "q": "10.  lim(x→0⁺)  1 / (3x)",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "From the RIGHT, 3x is a tiny POSITIVE number.",
     "1 divided by a tiny positive is huge and positive.",
     "Answer: +∞"
    ]
   },
   {
    "q": "11.  lim(x→0⁻)  2 / x",
    "ans": "−∞",
    "accept": [
     "-infinity",
     "−∞",
     "-∞",
     "negativeinfinity",
     "-inf",
     "dne",
     "doesnotexist",
     "does not exist"
    ],
    "steps": [
     "From the LEFT, x is a tiny NEGATIVE number.",
     "2 divided by a tiny negative is huge and negative.",
     "Answer: −∞"
    ]
   },
   {
    "q": "12.  lim(x→0)  5 / (2x)",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist"
    ],
    "steps": [
     "From the right: 5/(tiny positive) → +∞.",
     "From the left: 5/(tiny negative) → −∞.",
     "The two sides disagree — an ODD power in the denominator always does this.",
     "Answer: DNE"
    ]
   },
   {
    "q": "13.  lim(x→2⁺)  (x² + 4) / (x − 2)",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "The top approaches 8, a nonzero number.",
     "From the RIGHT of 2, (x−2) is a tiny POSITIVE.",
     "Positive ÷ tiny positive → +∞.",
     "Answer: +∞"
    ]
   },
   {
    "q": "14.  lim(x→2⁻)  x / (x − 2)",
    "ans": "−∞",
    "accept": [
     "-infinity",
     "−∞",
     "-∞",
     "negativeinfinity",
     "-inf",
     "dne",
     "doesnotexist",
     "does not exist"
    ],
    "steps": [
     "The top approaches 2, positive.",
     "From the LEFT of 2, (x−2) is a tiny NEGATIVE.",
     "Positive ÷ tiny negative → −∞.",
     "Answer: −∞"
    ]
   },
   {
    "q": "15.  lim(x→−1)  x / (x + 1)",
    "ans": "DNE",
    "accept": [
     "dne",
     "doesnotexist",
     "does not exist"
    ],
    "steps": [
     "The top approaches −1, nonzero.",
     "From the RIGHT of −1: (x+1) is a tiny positive, so −1/positive → −∞.",
     "From the LEFT of −1: (x+1) is a tiny negative, so −1/negative → +∞.",
     "The sides disagree.  Answer: DNE"
    ]
   },
   {
    "q": "16.  lim(x→0)  1 / |x|",
    "ans": "∞",
    "accept": [
     "infinity",
     "∞",
     "+∞",
     "inf",
     "dne"
    ],
    "steps": [
     "|x| is POSITIVE on both sides of 0.",
     "So 1/|x| → +∞ from both directions — the sides agree.",
     "This is the difference from 1/x, where the sides disagree.",
     "Answer: +∞"
    ]
   },
   {
    "q": "17.  lim(θ→0)  cos θ · tan θ / θ",
    "ans": "1",
    "accept": [
     "1"
    ],
    "steps": [
     "Rewrite tan θ as sin θ / cos θ.",
     "cos θ · (sin θ / cos θ) = sin θ — the cosines cancel.",
     "Left with sin θ / θ, the special trig limit.",
     "Answer: 1"
    ]
   },
   {
    "q": "18.  lim(x→0)  sin x / (x² + 3x)",
    "ans": "1/3",
    "accept": [
     "1/3"
    ],
    "steps": [
     "Factor the bottom: x² + 3x = x(x + 3).",
     "Split: (sin x / x) · 1/(x + 3).",
     "The first factor → 1; the second → 1/3.",
     "Answer: 1/3"
    ]
   },
   {
    "q": "19.  lim(x→0)  (x·csc x + 1) / (x·csc x)",
    "ans": "2",
    "accept": [
     "2"
    ],
    "steps": [
     "csc x = 1/sin x, so x·csc x = x / sin x.",
     "As x → 0, x/sin x → 1 (it is the reciprocal of sin x / x).",
     "So the expression → (1 + 1)/1.",
     "Answer: 2"
    ]
   },
   {
    "q": "20.  The graph of f(x) = 4/(x² − 1) has:\n  a. one vertical asymptote at x = 1\n  b. the y-axis as a vertical asymptote\n  c. the x-axis as a horizontal asymptote and vertical asymptotes at x = ±1\n  d. two vertical asymptotes at x = ±1, but no horizontal asymptote\n  e. no asymptotes",
    "ans": "c",
    "accept": [
     "c",
     "choicec"
    ],
    "steps": [
     "Vertical asymptotes where the bottom is zero: x² − 1 = 0 → x = 1 and x = −1.  That is TWO.",
     "Horizontal: the top is degree 0, the bottom degree 2, so the bottom wins and the limit is 0.",
     "y = 0 is the x-axis.",
     "Answer: (c)"
    ]
   },
   {
    "q": "CHALLENGE.  lim(x→0)  (cos²x − 1) / (3x · sin 2x)\n  a. 1   b. 3   c. −3   d. 1/3   e. −1/6",
    "ans": "e",
    "accept": [
     "e",
     "-1/6",
     "−1/6",
     "choicee"
    ],
    "steps": [
     "Use the Pythagorean identity: cos²x − 1 = −(1 − cos²x) = −sin²x.",
     "Expand the bottom with the double-angle identity: sin 2x = 2 sin x cos x.",
     "So the expression is −sin²x / (3x · 2 sin x cos x) = −sin x / (6x cos x).",
     "Split: −(1/6) · (sin x / x) · (1/cos x) → −(1/6)(1)(1).",
     "Answer: (e) −1/6"
    ]
   }
  ]
 },
 "hw16": {
  "label": "Handout 1-6: Continuity",
  "subject": "math",
  "topic": "Continuity",
  "items": [
   {
    "q": "1.  f(x) = { 1/(x−1)  for x < 1 ;  x³ − 2x + 5  for x ≥ 1 }\n\nIs f continuous at x = 1?  (Yes or No)",
    "ans": "No",
    "accept": [
     "no",
     "n",
     "notcontinuous",
     "discontinuous",
     "false"
    ],
    "steps": [
     "Condition 1 — f(1) uses the x ≥ 1 piece: 1 − 2 + 5 = 4.  Defined ✓",
     "Condition 2 — the left-hand limit uses 1/(x−1). As x → 1⁻, (x−1) is a tiny negative, so this → −∞.",
     "The left-hand limit does not exist, so the limit does not exist.",
     "Answer: No — an infinite discontinuity from the left"
    ]
   },
   {
    "q": "2.  f(x) = { 3 − x  for x < 2 ;  2  for x = 2 ;  x/2  for x > 2 }\n\nIs f continuous at x = 2?  (Yes or No)",
    "ans": "No",
    "accept": [
     "no",
     "n",
     "notcontinuous",
     "discontinuous",
     "false"
    ],
    "steps": [
     "Condition 1 — f(2) = 2.  Defined ✓",
     "Condition 2 — left: 3 − 2 = 1.  Right: 2/2 = 1.  Limit = 1 ✓",
     "Condition 3 — the limit is 1 but f(2) = 2.  1 ≠ 2 ✗",
     "Answer: No — a removable discontinuity. Redefining f(2) = 1 would fix it."
    ]
   },
   {
    "q": "3.  f(x) = { (x²+2x−15)/(x²−9)  for x > 3 ;  4/3  for x ≤ 3 }\n\nIs f continuous at x = 3?  (Yes or No)",
    "ans": "Yes",
    "accept": [
     "yes",
     "y",
     "continuous",
     "true"
    ],
    "steps": [
     "Condition 1 — f(3) uses the x ≤ 3 piece: 4/3.  Defined ✓",
     "Condition 2 — left limit is the constant 4/3.  For the right, factor: (x+5)(x−3) / [(x−3)(x+3)] → (x+5)/(x+3).",
     "Substitute 3: 8/6 = 4/3.  Both sides give 4/3 ✓",
     "Condition 3 — the limit 4/3 equals f(3) = 4/3 ✓",
     "Answer: Yes, continuous at x = 3"
    ]
   },
   {
    "q": "4.  f(x) = { x² − 1  for x < 3 ;  2kx  for x ≥ 3 }\n\nFind k so that f is continuous at x = 3.",
    "ans": "4/3",
    "accept": [
     "4/3"
    ],
    "steps": [
     "The two pieces must meet at x = 3.",
     "Left at 3: 3² − 1 = 8.",
     "Right at 3: 2k(3) = 6k.",
     "Set equal: 6k = 8 → k = 8/6.",
     "Answer: k = 4/3"
    ]
   },
   {
    "q": "5.  f(x) = { kx²  for x ≤ 2 ;  2x + k  for x > 2 }\n\nFind k so that f is continuous everywhere.",
    "ans": "4/3",
    "accept": [
     "4/3"
    ],
    "steps": [
     "The only place continuity can fail is the boundary x = 2 (both pieces are polynomials).",
     "Left at 2: k(2)² = 4k.",
     "Right at 2: 2(2) + k = 4 + k.",
     "Set equal: 4k = 4 + k → 3k = 4.",
     "Answer: k = 4/3"
    ]
   },
   {
    "q": "6.  f(x) = { (x²−x)/(2x)  for x ≠ 0 ;  k  for x = 0 }\nIf f is continuous at x = 0, then k =\n  a. −1   b. −1/2   c. 0   d. 1/2   e. 2",
    "ans": "b",
    "accept": [
     "b",
     "-1/2",
     "−1/2",
     "choiceb"
    ],
    "steps": [
     "k must equal the limit as x → 0.",
     "Factor the top: x(x − 1) / (2x).",
     "Cancel the x: (x − 1)/2.",
     "Substitute 0: (0 − 1)/2 = −1/2.",
     "Answer: (b) −1/2"
    ]
   },
   {
    "q": "7.  f(x) = { (x²−1)/(x−1)  for x ≠ 1 ;  4  for x = 1 }\nWhich are true?\n  I. lim(x→1) f(x) exists\n  II. f(1) exists\n  III. f is continuous at x = 1\n  a. I only  b. II only  c. I and II only  d. all  e. none",
    "ans": "c",
    "accept": [
     "c",
     "iandiionly",
     "i and ii only",
     "choicec"
    ],
    "steps": [
     "I — factor and cancel: (x−1)(x+1)/(x−1) → x + 1 → 2.  The limit EXISTS ✓",
     "II — f(1) is given as 4.  It EXISTS ✓",
     "III — continuity needs the limit to equal f(1). But 2 ≠ 4 ✗",
     "Answer: (c) I and II only — a removable discontinuity"
    ]
   },
   {
    "q": "8.  f(x) = { (x²+x)/x  for x ≠ 0 ;  1  for x = 0 }\nWhich are true?\n  I. lim(x→0) f(x) exists\n  II. f(0) exists\n  III. f is continuous at x = 0\n  a. I only  b. II only  c. I and II only  d. all  e. none",
    "ans": "d",
    "accept": [
     "d",
     "allofthem",
     "all",
     "choiced"
    ],
    "steps": [
     "I — factor and cancel: x(x+1)/x → x + 1 → 1.  EXISTS ✓",
     "II — f(0) is given as 1.  EXISTS ✓",
     "III — the limit is 1 and f(0) is 1. They agree ✓",
     "All three conditions hold.  Answer: (d) all of them"
    ]
   }
  ]
 },
 "hw17": {
  "label": "Handout 1-7: Continuity & Limits",
  "subject": "math",
  "topic": "Continuity",
  "items": [
   {
    "q": "1a.  True or False:  If lim(x→c) f(x) = L, then f(c) = L.",
    "ans": "False",
    "accept": [
     "false",
     "f",
     "no"
    ],
    "steps": [
     "The limit describes the neighborhood around c, never the point itself.",
     "f(c) can be undefined, or defined as some completely different value.",
     "Counterexample: f(x) = (x²−1)/(x−1) has limit 2 at x = 1 but f(1) is undefined.",
     "Answer: FALSE"
    ]
   },
   {
    "q": "1b.  True or False:  If f(c) = L, then lim(x→c) f(x) = L.",
    "ans": "False",
    "accept": [
     "false",
     "f",
     "no"
    ],
    "steps": [
     "Being defined at a point says nothing about what happens around it.",
     "A jump discontinuity has f(c) defined while the one-sided limits disagree.",
     "Counterexample: f(x) = 2x−3 for x ≤ 2 and x²+1 for x > 2. f(2) = 1, but the limit does not exist.",
     "Answer: FALSE"
    ]
   },
   {
    "q": "2.  Which of the following is NOT true?\n  a. continuous at a → the limit at a exists\n  b. continuous at a → f is defined at a\n  c. f defined at a → f is continuous at a\n  d. lim(x→a) f(x) = f(a) → continuous at a\n  e. f is a polynomial → continuous at a",
    "ans": "c",
    "accept": [
     "c",
     "choicec"
    ],
    "steps": [
     "a, b and d are all restatements of the three continuity conditions — true.",
     "e is true: polynomials are continuous everywhere.",
     "c reverses the implication. Being defined is necessary but nowhere near sufficient.",
     "Answer: (c)"
    ]
   },
   {
    "q": "3.  From the graph on [1,7]:  filled (1,1) rising to an OPEN circle (3,3); filled dot (3,1); the line falls to an OPEN circle (4,1.5); filled (4,3) across to filled (5,3); rising to an OPEN circle (6,4); filled (6,1) rising to filled (7,2).\n\nWhich is TRUE?\n  a. lim(x→3) f(x) = 1\n  b. lim(x→4) f(x) = 3\n  c. f is continuous at x = 3\n  d. f is continuous at x = 5\n  e. lim(x→6) f(x) = f(6)",
    "ans": "d",
    "accept": [
     "d",
     "choiced"
    ],
    "steps": [
     "a — both sides approach 3 at x = 3, so the limit is 3, not 1.  FALSE",
     "b — at x = 4 the left limit is 1.5 and the right is 3. The limit does not exist.  FALSE",
     "c — f(3) = 1 (the filled dot) but the limit is 3, so not continuous.  FALSE",
     "d — at x = 5 the left is 3, the right is 3, and f(5) = 3. All three conditions hold.  TRUE",
     "e — at x = 6 the left limit is 4, the right is 1. The limit does not exist.  FALSE",
     "Answer: (d)"
    ]
   },
   {
    "q": "4.  f(x) = 3x(x−1)/(x²−3x+2) for x ∉ {1,2}, with f(1) = 3 and f(2) = 4.\nf is continuous:\n  a. except at x = 1\n  b. except at x = 2\n  c. except at x = 1 or x = 2\n  d. except at x = 0, 1, or 2\n  e. everywhere",
    "ans": "c",
    "accept": [
     "c",
     "choicec"
    ],
    "steps": [
     "Factor the bottom: x² − 3x + 2 = (x−1)(x−2).",
     "Cancel the (x−1): the function is 3x/(x−2) away from 1 and 2.",
     "At x = 1: the limit is 3(1)/(1−2) = −3, but f(1) = 3.  −3 ≠ 3, so discontinuous.",
     "At x = 2: the bottom is still zero — a vertical asymptote, so no finite limit exists. Discontinuous.",
     "Answer: (c) except at x = 1 or x = 2"
    ]
   },
   {
    "q": "5.  f is continuous on [0,2] with f(0) = 1, f(1) = k, f(2) = 2.\nThe equation y = 1/2 must have at least TWO solutions on [0,2] if k =\n  a. 0   b. 1/2   c. 1   d. 2   e. 3",
    "ans": "a",
    "accept": [
     "a",
     "0",
     "choicea"
    ],
    "steps": [
     "The endpoints are f(0) = 1 and f(2) = 2, both ABOVE 1/2.",
     "For the graph to cross the line y = 1/2 twice, it has to dip BELOW 1/2 in between and come back up.",
     "That requires k < 1/2.",
     "Then IVT applies twice: once between x = 0 and x = 1, once between x = 1 and x = 2.",
     "Only choice (a), k = 0, is below 1/2.",
     "Answer: (a) 0"
    ]
   }
  ]
 }
};

Object.entries(HANDOUTS).forEach(([key,bank])=>{
  GENERATORS[key] = {
    label: bank.label, subject: bank.subject, topic: bank.topic,
    make(){
      const it = pick(bank.items);
      /* The stored text keeps the handout's own numbering so it can be matched
         against the paper. Move that number into the corner label so the test's
         own numbering does not print twice. */
      const m = it.q.match(/^([0-9]+[a-z]?|CHALLENGE)\.\s+/);
      return {
        q: m ? it.q.slice(m[0].length) : it.q,
        ans: it.ans, accept: it.accept, steps: it.steps,
        label: bank.label + (m ? "  \u00b7  #" + m[1] : "")
      };
    }
  };
});

/* ---- Class assignment. The catalog is entered by class, so every generator
   states which class it belongs to. Anything off the schedule is removed. ---- */
const GEN_CLASS = {
  calc: ["trigLimit","piecewiseLimit","oneSidedLimit","discontinuity","limitProperties",
         "limitFactor","rationalLimit","limitAtInfinity","infiniteLimit","continuityTest","findK",
         "rationalize","simplifyRadical","complexFraction","diffSquares","factorTrinomial",
         "quadratic","slope","pythagoras","exponents","system",
         "hw11","hw13","hw14","hw16","hw17","hw110","hwReview"],
  psych: ["psychExperiment","psychVocab","meanMedian","probability"]
};
["moles","newton","punnett"].forEach(k => { delete GENERATORS[k]; });
Object.entries(GEN_CLASS).forEach(([cls,keys]) => {
  keys.forEach(k => { if(GENERATORS[k]) GENERATORS[k].cls = cls; });
});
Object.keys(GENERATORS).forEach(k => { if(!GENERATORS[k].cls) delete GENERATORS[k]; });

/* ---- Term drills for the classes that are read rather than computed ---- */
function termDrill(bank, promptText){
  const [term, def, acc] = pick(bank);
  return {
    q: `${promptText}\n\n   "${def}"`,
    ans: term,
    accept: acc.concat([term.toLowerCase().replace(/[^a-z]/g,"")]),
    steps: [`Definition: ${def}`, `Term: ${term}`]
  };
}

GENERATORS.litTerms = {
 label:"Literary terms and devices", subject:"english", topic:"Common literary devices",
 make(){ return termDrill([
  ["Simile","a comparison between two unlike things using like or as",["simile"]],
  ["Metaphor","a direct comparison that says one thing IS another, with no like or as",["metaphor"]],
  ["Personification","giving human qualities to something that is not human",["personification"]],
  ["Situational irony","the outcome is the opposite of what was expected",["situationalirony","situational"]],
  ["Dramatic irony","the audience knows something a character does not",["dramaticirony","dramatic"]],
  ["Verbal irony","a speaker says the opposite of what they actually mean",["verbalirony","verbal"]],
  ["Symbolism","an object or image standing for a larger idea",["symbolism","symbol"]],
  ["Imagery","sensory description that makes a reader see, hear or feel something",["imagery"]],
  ["Alliteration","repetition of the same initial consonant sound across nearby words",["alliteration"]],
  ["Hyperbole","deliberate exaggeration for effect, not meant literally",["hyperbole"]],
  ["Foreshadowing","an early hint at something that happens later",["foreshadowing","foreshadow"]],
  ["Allusion","a passing reference to another work, person or event",["allusion"]],
  ["Motif","a recurring image or idea that builds meaning across a work",["motif"]],
  ["Tone","the author's attitude toward the subject",["tone"]],
  ["Mood","the atmosphere a text creates in the reader",["mood"]],
  ["Diction","an author's specific word choice",["diction"]],
  ["Syntax","the arrangement of words and the structure of sentences",["syntax"]],
  ["Ethos","a persuasive appeal based on the speaker's credibility",["ethos"]],
  ["Pathos","a persuasive appeal to the audience's emotions",["pathos"]],
  ["Logos","a persuasive appeal built on logic and evidence",["logos"]],
  ["Theme","a complete statement about life that a work conveys, not a single word",["theme"]],
  ["Formalist criticism","a lens reading only the text itself — structure, imagery, irony — ignoring author and context",["formalist","newcriticism","formalistcriticism"]],
  ["Feminist criticism","a lens examining how a text constructs gender and power",["feminist","feministcriticism","gendercriticism"]],
  ["Marxist criticism","a lens reading a text through class, money and who holds power",["marxist","marxistcriticism"]],
  ["Reader-response criticism","a lens holding that meaning is created in the encounter between reader and text",["readerresponse","reader-response"]]
 ], "Which term does this define?"); }, cls:"lit"
};

GENERATORS.microTerms = {
 label:"Microeconomics terms", subject:"economics", topic:"Supply and demand",
 make(){ return termDrill([
  ["Opportunity cost","the value of the next best alternative given up when you choose",["opportunitycost"]],
  ["Scarcity","limited resources set against unlimited wants, which is what forces choice",["scarcity"]],
  ["Sunk cost","money already spent that cannot be recovered and should not affect a decision",["sunkcost"]],
  ["Equilibrium","the price at which quantity supplied equals quantity demanded",["equilibrium","marketequilibrium"]],
  ["Surplus","the excess that results when price sits above equilibrium",["surplus","excesssupply"]],
  ["Shortage","the gap that results when price sits below equilibrium",["shortage","excessdemand"]],
  ["Elastic demand","demand that responds a lot to a change in price",["elastic","elasticdemand"]],
  ["Inelastic demand","demand that barely responds to a change in price",["inelastic","inelasticdemand"]],
  ["Substitute good","a good buyers switch to when the price of another rises",["substitute","substitutegood","substitutes"]],
  ["Complement good","a good bought alongside another, so their demands move together",["complement","complementgood","complements"]],
  ["Inferior good","a good people buy LESS of as their income rises",["inferiorgood","inferior"]],
  ["Normal good","a good people buy more of as their income rises",["normalgood","normal"]],
  ["Law of demand","as price rises, quantity demanded falls, all else equal",["lawofdemand"]],
  ["Law of supply","as price rises, quantity supplied rises, all else equal",["lawofsupply"]],
  ["Ceteris paribus","the assumption that all other factors are held constant",["ceterisparibus","allelseequal"]],
  ["Price ceiling","a legal maximum price, which creates a shortage when set below equilibrium",["priceceiling","ceiling"]],
  ["Price floor","a legal minimum price, which creates a surplus when set above equilibrium",["pricefloor","floor"]],
  ["Marginal cost","the additional cost of producing one more unit",["marginalcost"]]
 ], "Which term does this define?"); }, cls:"micro"
};

GENERATORS.macroTerms = {
 label:"Macroeconomics terms", subject:"economics", topic:"GDP, inflation, and unemployment",
 make(){ return termDrill([
  ["GDP","the total market value of all final goods and services produced in a country in a year",["gdp","grossdomesticproduct"]],
  ["Real GDP","output measured in constant prices, so inflation is stripped out",["realgdp","real"]],
  ["Nominal GDP","output measured at current prices, so inflation is still baked in",["nominalgdp","nominal"]],
  ["CPI","the index tracking the price of a fixed basket of consumer goods over time",["cpi","consumerpriceindex"]],
  ["Inflation","a general rise in the price level, so each dollar buys less",["inflation"]],
  ["Deflation","a general FALL in the price level",["deflation"]],
  ["Disinflation","prices still rising, but more slowly than before",["disinflation"]],
  ["Labor force","everyone employed plus everyone actively looking for work",["laborforce","labourforce"]],
  ["Unemployment rate","the unemployed divided by the labor force, not by the whole population",["unemploymentrate","unemployment"]],
  ["Discouraged worker","someone who stopped looking for work and so left the labor force entirely",["discouragedworker","discouraged"]],
  ["Recession","commonly defined as two consecutive quarters of falling real GDP",["recession"]],
  ["Fiscal policy","government use of spending and taxation to steer the economy",["fiscalpolicy","fiscal"]],
  ["Monetary policy","central bank use of interest rates and the money supply to steer the economy",["monetarypolicy","monetary"]],
  ["Business cycle","the recurring pattern of expansion, peak, contraction and trough",["businesscycle"]],
  ["Aggregate demand","total spending on domestic output at each price level",["aggregatedemand","ad"]],
  ["Net exports","exports minus imports, the X − M term in GDP",["netexports","xminusm"]],
  ["Fallacy of composition","assuming what is true for one person must be true for the whole economy",["fallacyofcomposition"]]
 ], "Which term does this define?"); }, cls:"macro"
};
