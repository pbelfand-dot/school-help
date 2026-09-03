/* Study Sorter — built-in explanation library.
   Each entry: t=title, s=subject, k=search keywords, d=plain explanation,
   f=key formula/fact, e=worked example, steps=method walkthrough, m=common mistakes. */

const SUBJECTS = {
  math:"Math", biology:"Biology", chemistry:"Chemistry", physics:"Physics",
  history:"History", english:"English", cs:"Computer Science",
  economics:"Economics", geography:"Geography", general:"Unsorted"
};

/* Words that route an item to a subject when no #tag is given. */
const SUBJECT_HINTS = {
  math:["math","algebra","geometry","calculus","equation","solve","simplify","factor","fraction","polynomial","quadratic","slope","graph","derivative","integral","trig","sine","cosine","tangent","logarithm","exponent","probability","statistics","mean","median","angle","triangle","theorem","inequality","matrix","vector","sequence","function","domain","range","radical","square root","numerator","denominator","x^","y=","limit","lim(","approaches","discontinuity","discontinuities","continuity","continuous","piecewise","asymptote","removable","rationalize","conjugate","cos(","sin(","tan(","one sided","left hand","right hand","indeterminate","factor completely","evaluate the limit"],
  biology:["biology","bio","cell","dna","rna","gene","genetic","organism","photosynthesis","respiration","mitosis","meiosis","enzyme","protein","evolution","natural selection","ecosystem","chromosome","mitochondria","nucleus","bacteria","virus","tissue","organ","species","punnett","allele","homeostasis","immune","osmosis","diffusion","chloroplast","atp"],
  chemistry:["chemistry","chem","atom","molecule","element","compound","reaction","bond","ionic","covalent","mole","stoichiometry","acid","base","ph","periodic","electron","proton","neutron","isotope","solution","solute","catalyst","oxidation","valence","molar","balancing"],
  physics:["physics","force","motion","velocity","acceleration","newton","energy","momentum","gravity","friction","wave","frequency","wavelength","voltage","current","resistance","circuit","ohm","joule","watt","kinetic","potential","mass times","projectile","inertia"],
  history:["history","war","revolution","treaty","empire","president","constitution","amendment","civil","ancient","medieval","century","colonial","independence","dynasty","cold war","depression","holocaust","slavery","suffrage","reconstruction","industrial revolution","renaissance","1776","1861","1914","1939"],
  english:["english","essay","thesis","paragraph","author","novel","poem","poetry","character","plot","theme","metaphor","simile","symbolism","irony","tone","mood","narrator","imagery","rhetorical","ethos","pathos","logos","citation","grammar","comma","clause","literary","protagonist","foreshadow","alliteration","allusion"],
  cs:["code","coding","program","programming","python","javascript","java","variable","loop","function call","array","algorithm","boolean","compile","debug","binary","recursion","big o","syntax","string","integer"],
  economics:["economics","economy","supply","demand","inflation","gdp","market","tariff","tax","scarcity","opportunity cost","monopoly","interest rate","recession","fiscal","monetary"],
  geography:["geography","climate","continent","latitude","longitude","erosion","tectonic","volcano","earthquake","biome","population density","map","hemisphere","water cycle","atmosphere"]
};

const LIB = [

/* ================= MATH ================= */
{t:"Complex fractions",s:"math",k:["complex fraction","fraction inside fraction","stacked fraction","simplify fraction"],
 d:"A complex fraction is a fraction that has fractions inside its numerator, denominator, or both. You never divide them as-is. You turn the top into one single fraction, turn the bottom into one single fraction, then divide — and dividing by a fraction means multiplying by its reciprocal (flip it).",
 f:"(a/b) ÷ (c/d) = (a/b) × (d/c)",
 steps:["Combine the top into ONE fraction over a common denominator.","Combine the bottom into ONE fraction over a common denominator.","Rewrite the stack as top ÷ bottom.","Flip the bottom fraction and multiply.","Factor everything you can and cancel matching factors.","State restrictions: any x that made an original denominator zero is excluded."],
 e:"Simplify (1 − x²/25) ÷ (x/5 + 1).\nTop: 1 − x²/25 = (25 − x²)/25 = (5−x)(5+x)/25\nBottom: x/5 + 1 = (x+5)/5\nDivide → (5−x)(5+x)/25 × 5/(x+5)\nCancel (5+x) and one 5 → (5 − x)/5, with x ≠ −5.",
 m:["Cancelling terms instead of factors — you can only cancel things multiplied, never things added.","Forgetting to flip the bottom fraction before multiplying.","Forgetting the restriction (the x-value that breaks the original denominator)."]},

{t:"Difference of squares",s:"math",k:["difference of squares","a2 - b2","factor squares"],
 d:"Any expression shaped 'something squared minus something else squared' factors instantly into two matching binomials — one with a plus, one with a minus. It only works for SUBTRACTION. A sum of squares (a² + b²) does not factor over real numbers.",
 f:"a² − b² = (a − b)(a + b)",
 e:"25 − x² = (5 − x)(5 + x)\n9y² − 49 = (3y − 7)(3y + 7)\nx⁴ − 16 = (x² − 4)(x² + 4) = (x−2)(x+2)(x²+4)",
 m:["Trying to factor a² + b² — it doesn't factor with real numbers.","Missing that a coefficient is a perfect square (49x² is (7x)²).","Stopping after one round when the result can factor again."]},

{t:"Quadratic formula",s:"math",k:["quadratic formula","quadratic","ax2+bx+c","discriminant","roots"],
 d:"Solves ANY equation shaped ax² + bx + c = 0, even when factoring fails. The part under the square root (the discriminant, b² − 4ac) tells you what kind of answers you'll get before you finish.",
 f:"x = [ −b ± √(b² − 4ac) ] / (2a)",
 steps:["Get the equation into ax² + bx + c = 0 form — everything on one side, zero on the other.","Write down a, b, c with their signs.","Compute the discriminant b² − 4ac.","Plug into the formula and simplify the radical.","Split into the + answer and the − answer."],
 e:"2x² + 5x − 3 = 0 → a=2, b=5, c=−3\nDiscriminant: 25 − 4(2)(−3) = 25 + 24 = 49\nx = (−5 ± 7)/4 → x = 1/2 or x = −3",
 m:["Forgetting the equation must equal zero first.","Losing the sign on a negative c — −4ac with c negative becomes ADDITION.","Dividing only part of the numerator by 2a — the whole top gets divided.","Discriminant > 0: two real roots. = 0: one repeated root. < 0: no real roots (two complex)."]},

{t:"Factoring trinomials",s:"math",k:["factoring","factor trinomial","x2+bx+c","foil backwards"],
 d:"Factoring is FOIL run backwards: you're looking for two binomials that multiply back to the trinomial. When the leading coefficient is 1, you just need two numbers that multiply to c and add to b.",
 f:"x² + bx + c = (x + p)(x + q) where p·q = c and p + q = b",
 steps:["Always pull out a greatest common factor first.","List factor pairs of c.","Find the pair that adds to b.","Write the two binomials.","FOIL it back out to check."],
 e:"x² + 7x + 12 → pairs of 12: (1,12)(2,6)(3,4). 3+4 = 7 ✓ → (x+3)(x+4)\nx² − 5x − 24 → need product −24, sum −5 → (−8)(3) → (x−8)(x+3)",
 m:["Skipping the GCF step, which makes the numbers much uglier.","Getting signs backwards: if c is negative, the two numbers have OPPOSITE signs.","Forgetting that when a ≠ 1 you need grouping or the AC method."]},

{t:"Slope and linear equations",s:"math",k:["slope","y=mx+b","linear equation","rise over run","point slope"],
 d:"Slope is how steep a line is: how much y changes for each step of x. Positive slope goes up left-to-right, negative goes down, zero is flat, and undefined is a vertical line.",
 f:"m = (y₂ − y₁)/(x₂ − x₁)   •   Slope-intercept: y = mx + b   •   Point-slope: y − y₁ = m(x − x₁)",
 e:"Through (2, 3) and (6, 11): m = (11−3)/(6−2) = 8/4 = 2.\nUse point-slope: y − 3 = 2(x − 2) → y = 2x − 1.",
 m:["Subtracting the coordinates in a different order on top and bottom — that flips the sign.","Mixing up which number is the slope and which is the y-intercept in y = mx + b.","Parallel lines share a slope; perpendicular slopes are negative reciprocals (2 and −1/2)."]},

{t:"Systems of equations",s:"math",k:["system of equations","substitution","elimination","two equations"],
 d:"Two equations, two unknowns. The solution is the point where the two lines cross. Substitution is best when one variable is already alone; elimination is best when coefficients line up.",
 f:"Substitution: solve one equation for a variable, plug it into the other. Elimination: add or subtract the equations so one variable cancels.",
 e:"2x + y = 7 and x − y = 2.\nAdd them: 3x = 9 → x = 3. Back-substitute: 3 − y = 2 → y = 1. Solution (3, 1).",
 m:["Only solving for one variable and stopping — you need both.","Forgetting to distribute the negative when subtracting equations.","No solution = parallel lines. Infinitely many = the same line twice."]},

{t:"Exponent rules",s:"math",k:["exponent","power rule","negative exponent","zero exponent"],
 d:"Exponents are repeated multiplication, and every rule comes from that. Multiplying like bases adds exponents because you're just counting factors.",
 f:"xᵃ·xᵇ = xᵃ⁺ᵇ  •  xᵃ/xᵇ = xᵃ⁻ᵇ  •  (xᵃ)ᵇ = xᵃᵇ  •  x⁰ = 1  •  x⁻ᵃ = 1/xᵃ  •  x^(1/n) = ⁿ√x",
 e:"(3x²)³ = 27x⁶   •   x⁵/x⁸ = x⁻³ = 1/x³   •   16^(3/4) = (⁴√16)³ = 2³ = 8",
 m:["Adding exponents when the bases are different — the rule needs the SAME base.","Thinking a negative exponent makes the answer negative; it makes it a reciprocal.","Forgetting the outside exponent hits the coefficient too: (3x)² = 9x², not 3x²."]},

{t:"Logarithms",s:"math",k:["logarithm","log","ln","natural log"],
 d:"A logarithm answers 'what exponent do I need?' log_b(x) = y means b^y = x. Logs and exponentials are inverse operations, which is why logs are the tool for pulling a variable out of an exponent.",
 f:"log_b(xy)=log_b x + log_b y  •  log_b(x/y)=log_b x − log_b y  •  log_b(xⁿ)=n·log_b x  •  change of base: log_b x = ln x / ln b",
 e:"Solve 2^x = 40 → x = log₂40 = ln40/ln2 ≈ 5.32",
 m:["Writing log(x+y) = log x + log y — false. The sum rule applies to a PRODUCT inside.","Taking the log of a negative number or zero (undefined for real logs).","Forgetting log without a base written means base 10, and ln means base e."]},

{t:"Pythagorean theorem",s:"math",k:["pythagorean","right triangle","hypotenuse","a2+b2=c2"],
 d:"In a RIGHT triangle only, the two short sides squared and added equal the longest side squared. c is always the hypotenuse — the side across from the 90° angle.",
 f:"a² + b² = c²",
 e:"Legs 6 and 8: 36 + 64 = 100 → c = 10.\nHypotenuse 13, one leg 5: 25 + b² = 169 → b = 12.",
 m:["Putting the hypotenuse in the a or b slot.","Using it on a triangle that isn't right-angled.","Forgetting the final square root."]},

{t:"Trig ratios (SOHCAHTOA)",s:"math",k:["sohcahtoa","sine","cosine","tangent","trig ratio","trigonometry"],
 d:"In a right triangle, each trig function is a ratio of two sides relative to the angle you picked. Opposite and adjacent change depending on which angle you're standing at; the hypotenuse never changes.",
 f:"sin θ = Opposite/Hypotenuse • cos θ = Adjacent/Hypotenuse • tan θ = Opposite/Adjacent",
 e:"Angle 30°, hypotenuse 10, find the opposite side: sin30 = x/10 → x = 10(0.5) = 5.",
 m:["Labelling opposite/adjacent from the wrong angle.","Calculator in radians when the problem is in degrees (or vice versa).","Using sin⁻¹ when you want sin — the inverse gives you the ANGLE back."]},

{t:"Derivatives",s:"math",k:["derivative","differentiate","calculus","rate of change","dy/dx"],
 d:"A derivative measures instantaneous rate of change — the slope of the curve at one exact point. Physically: position differentiates to velocity, velocity to acceleration.",
 f:"Power rule: d/dx[xⁿ] = n·xⁿ⁻¹  •  Product: (fg)' = f'g + fg'  •  Quotient: (f/g)' = (f'g − fg')/g²  •  Chain: d/dx f(g(x)) = f'(g(x))·g'(x)",
 e:"d/dx[x²] = 2x   •   d/dx[5x³ − 4x + 7] = 15x² − 4   •   d/dx[(3x+1)⁴] = 4(3x+1)³·3 = 12(3x+1)³",
 m:["Forgetting the chain rule's inner derivative.","Thinking the derivative of a constant is the constant — it's 0.","Using the power rule on an exponential: d/dx[2^x] is not x·2^(x−1)."]},

{t:"Mean, median, mode, range",s:"math",k:["mean","median","mode","range","average","central tendency"],
 d:"Four ways to describe a data set. Mean is the balance point but gets dragged by outliers; median is the middle value and ignores outliers, which is why house prices and incomes are reported as medians.",
 f:"Mean = sum ÷ count • Median = middle value of the SORTED list • Mode = most frequent • Range = max − min",
 e:"Data: 3, 7, 7, 2, 11 → sorted 2,3,7,7,11. Mean = 30/5 = 6. Median = 7. Mode = 7. Range = 9.",
 m:["Finding the median without sorting first.","With an even count, the median is the average of the two middle numbers.","A set can have no mode, or more than one."]},

{t:"Probability basics",s:"math",k:["probability","chance","odds","independent events"],
 d:"Probability is favorable outcomes over total outcomes, always between 0 and 1. 'And' usually means multiply, 'or' usually means add — then subtract the overlap so you don't count it twice.",
 f:"P(A) = favorable/total • P(A and B) = P(A)·P(B) if independent • P(A or B) = P(A) + P(B) − P(A and B) • P(not A) = 1 − P(A)",
 e:"Two fair coins both heads: (1/2)(1/2) = 1/4.\nRolling a 2 OR an even number on a die: 1/6 + 3/6 − 1/6 = 3/6 = 1/2.",
 m:["Adding when events happen together instead of multiplying.","Treating dependent events as independent — drawing cards WITHOUT replacement changes the second denominator.","The gambler's fallacy: past coin flips don't change the next one."]},
{t:"Rationalizing the denominator",s:"math",k:["rationalize","rational denominator","radical in denominator","simplest radical form","conjugate"],
 d:"Standard form doesn't allow a square root sitting in the denominator. To clear it you multiply the top and bottom by the same thing — which is really multiplying by 1, so the value never changes, only how it looks. For a single-term (monomial) denominator, multiply by that radical. For a two-term denominator, multiply by its conjugate.",
 f:"Monomial: a/\u221ab = a\u221ab/b, then reduce.  \u2022  Binomial: a/(b + \u221ac) \u00d7 (b \u2212 \u221ac)/(b \u2212 \u221ac), because (b+\u221ac)(b\u2212\u221ac) = b\u00b2 \u2212 c.",
 steps:["Look at the denominator: one term or two?","One term \u2192 multiply top and bottom by that square root.","Two terms \u2192 multiply top and bottom by the conjugate (same terms, flipped sign).","Multiply out. In the denominator \u221ab \u00d7 \u221ab = b, so the radical disappears.","Reduce the fraction by any common factor.","Simplify the radical itself if it hides a perfect square."],
 e:"3/\u221a3 \u2192 multiply by \u221a3/\u221a3 \u2192 3\u221a3/3 \u2192 \u221a3\n5/\u221a2 \u2192 5\u221a2/2 (already reduced)\n6/\u221a3 \u2192 6\u221a3/3 \u2192 2\u221a3\n4/(1+\u221a2) \u2192 \u00d7(1\u2212\u221a2)/(1\u2212\u221a2) \u2192 4(1\u2212\u221a2)/(1\u22122) = \u22124(1\u2212\u221a2) = 4\u221a2 \u2212 4",
 m:["Multiplying only the denominator by the radical \u2014 that changes the value. Top and bottom, always.","Forgetting to reduce afterwards: 3\u221a3/3 is not simplest, \u221a3 is.","Using the same sign instead of the conjugate on a two-term denominator \u2014 the radical won't cancel.","Not simplifying the radical first: \u221a12 = 2\u221a3."]},

{t:"Simplifying radicals",s:"math",k:["simplify radical","square root","surd","perfect square","radical form"],
 d:"To simplify a square root, pull out the largest perfect-square factor. \u221a(a\u00b7b) = \u221aa \u00b7 \u221ab, so any perfect square inside can walk out as a whole number.",
 f:"\u221a(a\u00b7b) = \u221aa\u00b7\u221ab  \u2022  \u221a(a/b) = \u221aa/\u221ab  \u2022  \u221a(x\u00b2) = |x|",
 e:"\u221a72 = \u221a(36\u00b72) = 6\u221a2\n\u221a50 = \u221a(25\u00b72) = 5\u221a2\n\u221a(48x\u00b3) = \u221a(16x\u00b2 \u00b7 3x) = 4x\u221a(3x)",
 m:["Pulling out a factor that isn't a perfect square.","Using a small perfect square and stopping early: \u221a72 = 2\u221a18 is not finished.","Writing \u221a(a+b) = \u221aa + \u221ab \u2014 completely false. The rule works for multiplication only."]},

{t:"Limits — the idea",s:"math",k:["limit","limits","approaches","lim","calculus limit"],
 d:"A limit asks: as x gets arbitrarily close to some value c, what does f(x) get close to? It does NOT ask what f(c) equals. The function can have a hole, a jump, or be undefined at c and the limit can still exist — the limit only cares about the neighborhood around c, never the point itself.",
 f:"lim(x\u2192c) f(x) = L exists only if the left-hand limit and the right-hand limit both exist AND are equal.\nlim(x\u2192c\u207b) f(x) = lim(x\u2192c\u207a) f(x) = L",
 steps:["Try direct substitution first \u2014 plug in c.","If you get a real number, that's the limit. Done.","If you get 0/0, it's indeterminate: factor and cancel, rationalize, or use a known trig limit.","If you get (nonzero)/0, the limit is infinite \u2014 a vertical asymptote; check each side's sign.","Always confirm the left and right sides agree, or the limit does not exist."],
 e:"lim(x\u21923) (x\u00b2\u22129)/(x\u22123): substitution gives 0/0. Factor \u2192 (x\u22123)(x+3)/(x\u22123) \u2192 cancel \u2192 x+3 \u2192 6.\nNote f(3) is undefined, but the limit is still 6.",
 m:["Thinking the limit equals f(c). It usually does for continuous functions, but that's a consequence, not the definition.","Stopping at 0/0 and writing 'does not exist' \u2014 0/0 means do more work.","Forgetting to check both sides at a piecewise boundary or an asymptote."]},

{t:"Trig limits",s:"math",k:["trig limit","sin x over x","limit sin","trigonometric limit","special limit","cos(x)","tan(x)","sin(x)","cosx","tanx","sinx","sin(","cos(","tan("],
 d:"Direct substitution on most trig limits at 0 gives 0/0. Two special limits rescue you, and everything else is algebra to force the expression into one of those shapes. The key move is rewriting tan as sin/cos and matching the argument inside the trig function to the denominator.",
 f:"lim(x\u21920) sin(x)/x = 1   \u2022   lim(x\u21920) (1 \u2212 cos x)/x = 0   \u2022   lim(x\u21920) tan(x)/x = 1\nGeneral: lim(x\u21920) sin(ax)/(bx) = a/b",
 steps:["Substitute 0. If you get 0/0, continue.","Rewrite tan(x) as sin(x)/cos(x) and cancel anything you can.","Make the inside of the sine match the denominator \u2014 multiply top and bottom by whatever it takes.","Replace the matched piece with 1 and simplify the leftover constants."],
 e:"lim(x\u21920) [5cos(x)tan(x)]/(7x)\n= lim 5cos(x)\u00b7[sin(x)/cos(x)]/(7x)   \u2190 the cos(x) cancels\n= lim 5sin(x)/(7x) = (5/7)\u00b7lim sin(x)/x = (5/7)(1) = 5/7\n\nlim(x\u21920) sin(4x)/(9x) = 4/9\nlim(x\u21920) (1\u2212cos x)/(3x) = 0",
 m:["Using sin(x)/x = 1 when the arguments don't match \u2014 sin(3x)/x is 3, not 1.","Forgetting (1\u2212cos x)/x goes to 0, not 1.","Trying L'H\u00f4pital before checking it's actually 0/0 or \u221e/\u221e.","Cancelling cos(x) when it isn't a common factor."]},

{t:"Limits of piecewise functions",s:"math",k:["piecewise","piecewise limit","one sided limit","left hand limit","right hand limit"],
 d:"At a boundary between pieces, you must evaluate each side with its OWN rule. Approach from the left using the piece defined for x < c; approach from the right using the piece for x > c. The two-sided limit exists only if those two answers match \u2014 and the value the function is actually assigned at c is irrelevant to the limit.",
 f:"lim(x\u2192c\u207b) uses the rule for x < c.  lim(x\u2192c\u207a) uses the rule for x > c.\nIf they are equal \u2192 limit exists and equals that value. If not \u2192 limit DNE (jump).",
 steps:["Identify the boundary value c the problem asks about.","Find the piece that applies just BELOW c; plug c into it \u2192 left-hand limit.","Find the piece that applies just ABOVE c; plug c into it \u2192 right-hand limit.","Compare. Equal = the limit. Different = does not exist.","Separately, f(c) is whichever piece explicitly includes the equals sign \u2014 needed for continuity, not for the limit."],
 e:"f(x) = { x + 3 for x < 2 ;  x\u00b2 for x \u2265 2 }\nLeft: 2 + 3 = 5.  Right: 2\u00b2 = 4.  5 \u2260 4, so lim(x\u21922) f(x) does not exist \u2014 a jump.",
 m:["Plugging c into only one piece.","Using the piece that contains the \u2265 sign for BOTH sides.","Saying the limit exists because f(c) is defined \u2014 unrelated.","Away from a boundary, just use whichever single piece applies; no one-sided work needed."]},

{t:"Types of discontinuities",s:"math",k:["discontinuity","removable","jump discontinuity","infinite discontinuity","hole","continuous","continuity"],
 d:"A function is continuous at c when three things all hold: f(c) is defined, the limit exists, and they're equal. Each way that can fail names a different discontinuity.",
 f:"Continuity test at c: (1) f(c) exists, (2) lim(x\u2192c) f(x) exists, (3) lim(x\u2192c) f(x) = f(c).\n\u2022 REMOVABLE (hole): the limit exists but f(c) is missing or set to the wrong value.\n\u2022 JUMP: left and right limits both exist but are different.\n\u2022 INFINITE: one or both sides run to \u00b1\u221e (vertical asymptote).\n\u2022 OSCILLATING: the values never settle, e.g. sin(1/x) at 0.",
 e:"(x\u00b2\u22124)/(x\u22122) at x=2 \u2192 removable hole at (2,4).\nA step function jumping from 1 to 3 \u2192 jump.\n1/(x\u22125)\u00b2 at x=5 \u2192 infinite.",
 m:["Calling a hole a jump \u2014 a hole has a limit, a jump doesn't.","Thinking a vertical asymptote is removable; you can't patch it with one point.","Forgetting the third condition: the limit can exist and f(c) can exist but still differ, which is still removable."]},

{t:"Reading discontinuities off a graph",s:"math",k:["graphically","graph discontinuity","open circle","closed dot","filled dot","jump from graph","hole on graph","read the graph"],
 d:"Graph questions give you the answer visually if you know what the dots mean. A CLOSED (filled) dot means that point is included \u2014 it is f(c). An OPEN circle means the curve approaches that height but the point is excluded. At every break, ignore the dots for a second and ask only: what height does the curve come up to from the left, and what height does it leave from on the right? Those two numbers decide the type.",
 f:"At x = c, read the LEFT branch's ending height and the RIGHT branch's starting height.\n\u2022 Both finite and EQUAL, but a dot is missing or misplaced \u2192 REMOVABLE (hole).\n\u2022 Both finite and DIFFERENT \u2192 JUMP.\n\u2022 Either one runs off to \u00b1\u221e \u2192 INFINITE (vertical asymptote).\nA closed dot = f(c). An open circle = a height approached but not attained.",
 steps:["Find every x where the curve breaks, has a circle, or has an asymptote.","At each one, trace the curve in from the LEFT and note the height it ends at.","Trace the curve out to the RIGHT and note the height it starts at.","Equal heights \u2192 removable. Different finite heights \u2192 jump. Infinite \u2192 infinite.","Only now look at the filled dot \u2014 it tells you f(c), which affects continuity but never the limit."],
 e:"A curve rises to a closed dot at (\u22126, 5), and the next branch begins at an open circle at (\u22126, 0).\nLeft height 5, right height 0 \u2014 both finite, not equal \u2192 JUMP at x = \u22126.\n\nA curve runs smoothly through an open circle at (2, 3) with a closed dot floating at (2, 5).\nLeft height 3, right height 3 \u2014 equal \u2192 REMOVABLE at x = 2, even though f(2) = 5.",
 m:["The classic trap: an open circle and a closed dot stacked at the same x. That is only removable if the curve reaches the SAME height from both sides \u2014 otherwise it is a jump.","Deciding the type from the dots instead of from the two one-sided heights.","Including endpoints of the whole graph. If the interval is open, like \u22129 < x < 9, the ends are not in it.","Forgetting that a removable discontinuity still counts as discontinuous \u2014 'removable' means patchable, not continuous."]},

{t:"Limit properties",s:"math",k:["limit properties","limit laws","sum of limits","limit rules","graphically"],
 d:"Limits distribute over the ordinary operations, as long as each individual limit exists. That's what lets you break a messy expression into pieces, read each piece off a graph or table, and recombine.",
 f:"lim(f + g) = lim f + lim g   \u2022   lim(f \u2212 g) = lim f \u2212 lim g\nlim(k\u00b7f) = k\u00b7lim f   \u2022   lim(f\u00b7g) = (lim f)(lim g)\nlim(f/g) = (lim f)/(lim g), provided lim g \u2260 0\nlim[f(x)]\u207f = (lim f)\u207f",
 e:"Given lim f = 3 and lim g = \u22122:\nlim(2f + g) = 2(3) + (\u22122) = 4\nlim(f\u00b7g) = (3)(\u22122) = \u22126\nlim(f/g) = 3/(\u22122) = \u22123/2",
 m:["Applying the quotient rule when the bottom limit is 0 \u2014 that's indeterminate or infinite, so the rule doesn't apply.","Using a two-sided limit off a graph where the left and right values differ; that limit DNE, so no property applies.","Combining limits when one of them does not exist \u2014 the laws require every piece to exist first."]},

/* ================= BIOLOGY ================= */
{t:"Photosynthesis",s:"biology",k:["photosynthesis","chloroplast","chlorophyll","calvin cycle","light reactions"],
 d:"Plants convert light energy into chemical energy stored in glucose. It happens in the chloroplast in two stages: light-dependent reactions in the thylakoid membranes capture light and make ATP and NADPH (splitting water and releasing O₂), then the Calvin cycle in the stroma uses that ATP and NADPH to build sugar from CO₂.",
 f:"6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
 e:"The oxygen you breathe came from splitting WATER molecules in the light reactions, not from the carbon dioxide.",
 m:["Saying plants 'breathe in CO₂ and breathe out O₂' — plants also do cellular respiration, all the time.","Thinking the Calvin cycle needs darkness. It doesn't need light directly, but it runs during the day off the ATP the light reactions make.","Mixing up where each stage happens: thylakoid = light reactions, stroma = Calvin cycle."]},

{t:"Cellular respiration",s:"biology",k:["cellular respiration","mitochondria","krebs","glycolysis","atp","electron transport"],
 d:"Cells break glucose down to release energy as ATP. Three stages: glycolysis in the cytoplasm splits glucose into two pyruvate; the Krebs (citric acid) cycle in the mitochondrial matrix strips off electrons; the electron transport chain on the inner mitochondrial membrane uses those electrons to pump protons and drive ATP synthase. Oxygen is the final electron acceptor.",
 f:"C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (about 30–32 ATP per glucose)",
 e:"Without oxygen, cells fall back on fermentation — far less ATP, and in your muscles it produces lactic acid.",
 m:["Saying it makes exactly 38 ATP — modern estimates are ~30–32.","Thinking glycolysis happens in the mitochondria; it's in the cytoplasm and needs no oxygen.","Forgetting that it is essentially photosynthesis reversed."]},

{t:"Mitosis vs meiosis",s:"biology",k:["mitosis","meiosis","cell division","chromosome","prophase","metaphase","anaphase"],
 d:"Mitosis makes two identical diploid body cells for growth and repair. Meiosis makes four genetically different haploid gametes (sperm/egg) for reproduction. Meiosis runs the division twice and adds crossing over, which is where genetic variety comes from.",
 f:"Mitosis: 1 cell → 2 identical diploid cells. Meiosis: 1 cell → 4 unique haploid cells. Phases in order: Prophase, Metaphase, Anaphase, Telophase (PMAT).",
 e:"A skin cell healing a cut uses mitosis. Making sperm or eggs uses meiosis.",
 m:["Forgetting meiosis has TWO divisions (meiosis I and II).","Thinking mitosis creates variation — it makes clones.","Metaphase = middle (chromosomes line up), Anaphase = apart (they separate)."]},

{t:"DNA structure and replication",s:"biology",k:["dna","double helix","base pairing","replication","nucleotide","helicase"],
 d:"DNA is a double helix of two antiparallel strands. Each nucleotide has a sugar, a phosphate, and one of four bases. The strands are held together by hydrogen bonds between complementary bases. Replication is semi-conservative: the helix unzips and each old strand templates a new one, so every new DNA molecule is half old, half new.",
 f:"Base pairing: A–T (2 hydrogen bonds), C–G (3 hydrogen bonds). In RNA, uracil (U) replaces thymine (T).",
 e:"Template strand ATGCCG → new strand TACGGC.",
 m:["Pairing A with G — purines pair with pyrimidines, A–T and C–G only.","Forgetting RNA uses U instead of T.","Saying replication is 'conservative' — it's semi-conservative."]},

{t:"Transcription and translation",s:"biology",k:["transcription","translation","protein synthesis","mrna","trna","ribosome","codon"],
 d:"The central dogma: DNA → RNA → protein. Transcription happens in the nucleus, where RNA polymerase copies a gene into mRNA. Translation happens at the ribosome, where tRNA reads mRNA three bases at a time (a codon) and adds the matching amino acid to a growing protein chain.",
 f:"3 mRNA bases = 1 codon = 1 amino acid. Start codon AUG (methionine). Stop codons UAA, UAG, UGA.",
 e:"DNA TAC → mRNA AUG → tRNA anticodon UAC → amino acid methionine, which starts every protein.",
 m:["Swapping the locations: transcription is in the nucleus, translation at the ribosome.","Forgetting to convert T to U when writing the mRNA.","Reading codons in the wrong frame — always start from AUG."]},

{t:"Natural selection and evolution",s:"biology",k:["natural selection","evolution","darwin","adaptation","fitness","survival of the fittest"],
 d:"Populations contain natural variation. Organisms produce more offspring than can survive. Individuals with traits better suited to the environment survive and reproduce more, passing those traits on. Over many generations the population's traits shift. Selection acts on POPULATIONS over time, not on individuals during their lifetime.",
 f:"Variation + Inheritance + Selection + Time = Evolution. 'Fitness' means reproductive success, not strength.",
 e:"Antibiotic resistance: a few bacteria already carry a resistance mutation, the antibiotic kills the rest, and the survivors repopulate.",
 m:["Saying an organism 'evolved a trait because it needed it' — mutations happen randomly first, then get selected.","Thinking individuals evolve. They don't; populations do.","Assuming evolution has a goal or a direction toward 'better'."]},

{t:"Punnett squares and Mendelian genetics",s:"biology",k:["punnett","genetics","allele","dominant","recessive","genotype","phenotype","heterozygous"],
 d:"Each parent passes one allele per gene. A Punnett square charts every possible combination. Dominant alleles (capital letter) mask recessive ones (lowercase), so a recessive trait only shows when both alleles are recessive.",
 f:"Genotype = the letters (BB, Bb, bb). Phenotype = what you see. Homozygous = matching alleles, heterozygous = mixed. Bb × Bb → 1 BB : 2 Bb : 1 bb (75% dominant phenotype).",
 e:"Two brown-eyed heterozygous parents (Bb × Bb) have a 25% chance of a blue-eyed (bb) child.",
 m:["Confusing genotype ratio (1:2:1) with phenotype ratio (3:1).","Thinking dominant means 'more common in the population' — it means it masks the other allele.","Each pregnancy is independent; three brown-eyed kids don't make the fourth more likely to be blue."]},

{t:"Osmosis and diffusion",s:"biology",k:["osmosis","diffusion","hypertonic","hypotonic","isotonic","concentration gradient","passive transport"],
 d:"Diffusion is any particle spreading from high to low concentration. Osmosis is specifically WATER moving across a semipermeable membrane. Both are passive — no ATP needed. Water always moves toward the saltier/more concentrated side.",
 f:"Hypertonic solution = more solute outside → cell shrinks. Hypotonic = less solute outside → water enters, cell swells. Isotonic = no net movement.",
 e:"A red blood cell in pure water bursts (hypotonic). In salt water it shrivels (hypertonic).",
 m:["Thinking osmosis moves solute — it moves water.","Reversing hypo and hyper. Hypo = 'under' = less solute outside.","Assuming diffusion needs energy; active transport does, diffusion doesn't."]},

{t:"Enzymes",s:"biology",k:["enzyme","catalyst","substrate","active site","denature","activation energy"],
 d:"Enzymes are protein catalysts. They lower the activation energy of a reaction so it happens fast enough for life, and they come out unchanged, so one enzyme works over and over. Each enzyme's active site fits one specific substrate shape.",
 f:"Enzyme + substrate → enzyme-substrate complex → enzyme + product. Enzyme is reusable.",
 e:"Amylase in saliva breaks starch into sugar — which is why bread starts tasting sweet if you hold it in your mouth.",
 m:["Saying enzymes get used up — they don't.","Thinking heat always speeds enzymes up. Past the optimum they DENATURE (shape is destroyed) and stop working.","Denaturing is about shape, not about the enzyme being 'killed' — enzymes were never alive."]},

/* ================= CHEMISTRY ================= */
{t:"Ionic vs covalent bonds",s:"chemistry",k:["ionic bond","covalent bond","chemical bond","electronegativity","metallic bond"],
 d:"Ionic bonds TRANSFER electrons — usually a metal gives electrons to a nonmetal, creating charged ions that attract. Covalent bonds SHARE electrons between two nonmetals. Big electronegativity difference means ionic; small difference means covalent.",
 f:"Ionic: metal + nonmetal, transfers electrons, high melting point, conducts when dissolved. Covalent: nonmetal + nonmetal, shares electrons, lower melting point, usually doesn't conduct.",
 e:"NaCl is ionic (sodium hands its electron to chlorine). H₂O is covalent (oxygen and hydrogen share).",
 m:["Thinking ionic compounds conduct electricity as solids — they need to be melted or dissolved so the ions can move.","Forgetting polar covalent bonds exist in between the two extremes.","Calling a covalent compound a 'molecule of salt' — ionic compounds form lattices, not molecules."]},

{t:"Balancing chemical equations",s:"chemistry",k:["balancing equations","chemical equation","coefficient","conservation of mass"],
 d:"Matter can't be created or destroyed, so every element must have the same number of atoms on both sides. You fix this by changing COEFFICIENTS (the big numbers in front), never subscripts — changing a subscript changes the substance itself.",
 f:"Balance in this order: metals, then nonmetals, then hydrogen, then oxygen last.",
 steps:["Write the unbalanced equation with correct formulas.","Count each element on both sides.","Add coefficients to even things out, saving H and O for last.","Recount everything.","Reduce the coefficients if they share a common factor."],
 e:"__CH₄ + __O₂ → __CO₂ + __H₂O\nCarbon balances at 1. Hydrogen: 4 on left needs 2 H₂O. Now oxygen on the right is 2+2=4, so use 2 O₂.\nCH₄ + 2O₂ → CO₂ + 2H₂O",
 m:["Changing a subscript to balance — H₂O and H₂O₂ are completely different substances.","Forgetting a coefficient multiplies EVERY atom in that formula.","Leaving fractional coefficients when the question wants whole numbers."]},

{t:"Moles and stoichiometry",s:"chemistry",k:["mole","stoichiometry","molar mass","avogadro","grams to moles","limiting reactant"],
 d:"A mole is just a counting unit — 6.022×10²³ particles — that lets you connect the mass you can weigh to the number of particles that actually react. Stoichiometry uses the balanced equation's coefficients as a mole ratio between substances.",
 f:"1 mole = 6.022×10²³ particles. Moles = mass(g) ÷ molar mass(g/mol). Path: grams → moles → (mole ratio) → moles → grams.",
 e:"How many grams of H₂O from 32 g of O₂ in 2H₂ + O₂ → 2H₂O?\n32 g ÷ 32 g/mol = 1 mol O₂ → ratio 1 O₂ : 2 H₂O → 2 mol H₂O × 18 g/mol = 36 g.",
 m:["Using an unbalanced equation — the mole ratio comes from the coefficients.","Converting grams straight to grams without going through moles.","Forgetting to check which reactant runs out first (the limiting reactant)."]},

{t:"Acids, bases, and pH",s:"chemistry",k:["acid","base","ph","neutralization","hydrogen ion","alkaline"],
 d:"Acids donate H⁺ ions; bases accept them (or donate OH⁻). pH measures H⁺ concentration on a logarithmic scale from 0 to 14, so each step is a factor of TEN. Below 7 is acidic, 7 is neutral, above 7 is basic.",
 f:"pH = −log[H⁺]. Acid + base → salt + water (neutralization).",
 e:"pH 3 is ten times more acidic than pH 4 and a hundred times more acidic than pH 5. Stomach acid ≈ 2, pure water = 7, bleach ≈ 13.",
 m:["Treating the scale as linear — it's logarithmic.","Thinking 'strong acid' means concentrated. Strong means it fully dissociates; concentration is a separate thing.","Forgetting that pH below 0 and above 14 is possible in extreme solutions."]},

{t:"Periodic table trends",s:"chemistry",k:["periodic table","periodic trend","atomic radius","ionization energy","electronegativity","group","period"],
 d:"Columns (groups) share valence electrons and therefore chemical behavior. Rows (periods) fill the same electron shell. Trends come from two competing pulls: more protons pull electrons in tighter, more shells push them out.",
 f:"Left→right across a period: atomic radius DECREASES, electronegativity and ionization energy INCREASE. Top→bottom down a group: radius INCREASES, electronegativity and ionization energy DECREASE.",
 e:"Fluorine (top right, excluding noble gases) is the most electronegative element. Francium (bottom left) is the least.",
 m:["Expecting atoms to get bigger left-to-right — they get smaller because nuclear charge rises while the shell stays the same.","Applying electronegativity to noble gases, which mostly don't bond.","Confusing groups (vertical) with periods (horizontal)."]},

/* ================= PHYSICS ================= */
{t:"Newton's three laws",s:"physics",k:["newton","laws of motion","inertia","f=ma","action reaction","force"],
 d:"First law (inertia): an object keeps doing what it's doing unless an unbalanced force acts on it. Second law: force causes acceleration in proportion to mass. Third law: forces always come in equal-and-opposite pairs acting on DIFFERENT objects.",
 f:"1st: no net force → constant velocity. 2nd: F = ma. 3rd: F(A on B) = −F(B on A).",
 e:"Rocket: it pushes exhaust gas down, the gas pushes the rocket up (3rd law). Same push on a heavier rocket gives less acceleration (2nd law).",
 m:["Thinking motion requires continuous force — at constant velocity the net force is ZERO.","Saying action-reaction pairs cancel out. They act on different objects, so they never cancel each other.","Mixing up mass (amount of matter) with weight (mass × gravity)."]},

{t:"Kinematics equations",s:"physics",k:["kinematics","velocity","acceleration","projectile","displacement","suvat"],
 d:"Four equations describing motion under CONSTANT acceleration. Pick the one that contains the three things you know plus the one you want. Sign convention matters: pick a positive direction and stick with it.",
 f:"v = v₀ + at  •  x = x₀ + v₀t + ½at²  •  v² = v₀² + 2a(x − x₀)  •  x = x₀ + ½(v₀ + v)t",
 e:"Dropped from rest, how fast after 3 s? v = 0 + (9.8)(3) = 29.4 m/s down.",
 m:["Using these when acceleration isn't constant — they break.","Forgetting gravity is −9.8 m/s² if you called up positive.","In projectile motion, horizontal and vertical are SEPARATE: horizontal acceleration is zero, and the two share only the time."]},

{t:"Work, energy, and power",s:"physics",k:["work","energy","kinetic energy","potential energy","power","joule","conservation of energy"],
 d:"Work is force applied through a distance — no distance, no work. Energy is the capacity to do work and is conserved: it changes form but the total stays the same. Power is how FAST work gets done.",
 f:"W = F·d·cosθ  •  KE = ½mv²  •  PE(gravity) = mgh  •  P = W/t  •  Total energy before = total energy after",
 e:"A 2 kg ball dropped from 5 m: PE = 2(9.8)(5) = 98 J at the top, all converted to KE at the bottom → ½(2)v² = 98 → v ≈ 9.9 m/s.",
 m:["Thinking holding something heavy is work — no displacement means zero work in physics.","Forgetting KE depends on velocity SQUARED, so doubling speed quadruples energy.","Only counting the force component along the motion — a perpendicular force does no work."]},

{t:"Ohm's law and circuits",s:"physics",k:["ohm","voltage","current","resistance","circuit","series","parallel","amps"],
 d:"Voltage is the push, current is the flow, resistance is the opposition. In a SERIES circuit there is one path so current is the same everywhere and resistances add. In a PARALLEL circuit there are multiple paths, so voltage is the same across each branch and total resistance drops below the smallest resistor.",
 f:"V = IR  •  P = IV  •  Series: R_total = R₁ + R₂ + …  •  Parallel: 1/R_total = 1/R₁ + 1/R₂ + …",
 e:"12 V across a 4 Ω resistor: I = 12/4 = 3 A, and P = (3)(12) = 36 W.",
 m:["Adding parallel resistances directly — you add their reciprocals.","Thinking current gets 'used up' as it flows; in series it's identical at every point.","Confusing which quantity is constant: series = same current, parallel = same voltage."]},

/* ================= HISTORY ================= */
{t:"Causes of World War I",s:"history",k:["world war 1","wwi","ww1","great war","franz ferdinand","alliances","1914"],
 d:"Long-term pressures had been building for decades — Militarism (arms races, especially naval), Alliances (two rival blocs), Imperialism (competition for colonies), and Nationalism (ethnic tensions in the Balkans). The assassination of Archduke Franz Ferdinand in Sarajevo on 28 June 1914 was the spark; the alliance system turned a regional dispute into a continental war within weeks.",
 f:"M.A.I.N. — Militarism, Alliances, Imperialism, Nationalism. Spark: Franz Ferdinand assassinated by Gavrilo Princip, 28 June 1914. Triple Alliance (Germany, Austria-Hungary, Italy) vs Triple Entente (France, Russia, Britain).",
 e:"Austria-Hungary declared war on Serbia → Russia mobilized to defend Serbia → Germany declared war on Russia and France → Germany invaded Belgium → Britain entered. One assassination, five weeks, a world war.",
 m:["Saying the assassination CAUSED the war — it triggered it; the causes were structural.","Italy was in the Triple Alliance but entered the war in 1915 on the Allied side instead.","The US did not enter until April 1917."]},

{t:"Causes of World War II",s:"history",k:["world war 2","wwii","ww2","hitler","appeasement","treaty of versailles","1939"],
 d:"The Treaty of Versailles left Germany humiliated and economically crippled. The Great Depression made extremist parties attractive, bringing Hitler to power in 1933. The League of Nations proved powerless, and Britain and France responded to aggression with appeasement. War began when Germany invaded Poland on 1 September 1939.",
 f:"Key causes: harsh Treaty of Versailles (1919), Great Depression, rise of fascism, failure of the League of Nations, appeasement (Munich Agreement 1938). Trigger: invasion of Poland, 1 Sept 1939.",
 e:"At Munich in 1938 Britain and France let Hitler take the Sudetenland to avoid war. He took the rest of Czechoslovakia months later — appeasement bought time, not peace.",
 m:["Thinking the US entered in 1939 — it entered after Pearl Harbor, 7 December 1941.","Forgetting the Nazi-Soviet Pact (Aug 1939) let Germany invade Poland without a two-front war.","Treating the war in Asia as a separate story; Japan had been at war in China since 1937."]},

{t:"The US Constitution and separation of powers",s:"history",k:["constitution","branches of government","checks and balances","legislative","executive","judicial","bill of rights"],
 d:"The Constitution splits federal power into three branches so no one branch dominates. Legislative (Congress) writes laws, Executive (President) enforces them, Judicial (courts) interprets them. Checks and balances let each branch limit the others.",
 f:"Legislative = Congress (House + Senate). Executive = President. Judicial = Supreme Court. First 10 amendments = Bill of Rights. Amending requires 2/3 of both houses plus 3/4 of the states.",
 e:"Congress passes a bill → the President can veto it → Congress can override with a 2/3 vote in both houses → the Supreme Court can still rule it unconstitutional.",
 m:["Thinking the Supreme Court's power to strike down laws is written in the Constitution — judicial review was established by Marbury v. Madison (1803).","Confusing the Declaration of Independence (1776) with the Constitution (written 1787, ratified 1788).","Forgetting the Articles of Confederation came first and failed because the federal government was too weak."]},

{t:"The Cold War",s:"history",k:["cold war","soviet union","ussr","containment","nato","berlin wall","cuban missile crisis"],
 d:"A roughly 45-year standoff between the capitalist US and the communist USSR after WWII. It was 'cold' because the two never fought each other directly — instead they competed through proxy wars, an arms race, a space race, and economic pressure, under the shadow of nuclear weapons.",
 f:"c.1947–1991. US policy: containment (Truman Doctrine, Marshall Plan). Alliances: NATO (1949) vs Warsaw Pact (1955). Flashpoints: Berlin Blockade, Korean War, Cuban Missile Crisis (1962), Vietnam. Ends: Berlin Wall falls 1989, USSR dissolves 1991.",
 e:"The Cuban Missile Crisis (Oct 1962) came closest to nuclear war; it ended with the USSR removing missiles from Cuba and the US quietly removing missiles from Turkey.",
 m:["Thinking no fighting happened — proxy wars killed millions.","Assuming the Berlin Wall and the USSR ended at the same moment; the Wall fell in 1989, the USSR dissolved in December 1991.","Treating containment and rollback as the same policy."]},

{t:"The Industrial Revolution",s:"history",k:["industrial revolution","factory","urbanization","steam engine","child labor"],
 d:"Beginning in Britain around 1760, production shifted from hand tools and home workshops to machines and factories. Steam power, coal, iron, and the textile industry drove it. It produced enormous wealth alongside brutal working conditions, child labor, crowded cities, and pollution — and eventually labor unions and reform laws.",
 f:"Started in Britain c.1760–1840, spread to Europe and the US. Key drivers: steam engine, coal, iron/steel, textile machinery, railroads.",
 e:"Britain had coal, iron ore, colonies for raw materials and markets, a stable government, and available capital — which is why it went first.",
 m:["Thinking it happened everywhere at once; it spread unevenly over a century.","Only presenting the benefits or only the harms — exams want both.","Forgetting that the agricultural revolution came first and freed up the labor force."]},

/* ================= ENGLISH ================= */
{t:"Writing a thesis statement",s:"english",k:["thesis","thesis statement","argument","essay introduction","claim"],
 d:"A thesis is one arguable sentence stating your specific claim and, ideally, why it holds. It must be something a reasonable person could disagree with. A fact is not a thesis; a topic is not a thesis.",
 f:"Formula: [Specific claim] because [reason], as shown by [evidence type]. Usually the last sentence of the introduction.",
 e:"Weak: 'This essay is about symbolism in The Great Gatsby.'\nStrong: 'Fitzgerald uses the green light to show that Gatsby's dream was already dead before the novel begins, because he pursues a version of Daisy that no longer exists.'",
 m:["Announcing instead of arguing ('I will discuss…').","Being so broad that nothing could disprove it.","Writing a thesis you never actually defend in the body paragraphs."]},

{t:"Ethos, pathos, logos",s:"english",k:["ethos","pathos","logos","rhetorical appeals","persuasion","rhetoric","aristotle"],
 d:"Aristotle's three persuasive appeals. Ethos builds trust in the speaker's credibility. Pathos moves the audience's emotions. Logos uses logic, facts, and reasoning. Strong arguments usually blend all three.",
 f:"Ethos = character/credibility. Pathos = emotion. Logos = logic. (Kairos = timing, sometimes taught as a fourth.)",
 e:"'As a doctor of 20 years' = ethos. 'Imagine your own child in that hospital bed' = pathos. 'Studies show a 40% reduction' = logos.",
 m:["Naming the appeal without explaining its EFFECT on the audience — analysis questions want the effect.","Assuming pathos is manipulative and logos is honest; both can be either.","Missing that one sentence can carry more than one appeal."]},

{t:"Types of irony",s:"english",k:["irony","verbal irony","situational irony","dramatic irony","sarcasm"],
 d:"Irony is a gap between what's expected and what actually is. Verbal irony: someone says the opposite of what they mean. Situational irony: the outcome is the opposite of what was expected. Dramatic irony: the audience knows something a character doesn't.",
 f:"Verbal = says vs means. Situational = expected vs happens. Dramatic = audience knows vs character doesn't.",
 e:"Verbal: 'Lovely weather' in a downpour. Situational: a fire station burns down. Dramatic: the audience knows Juliet is only asleep while Romeo believes she's dead.",
 m:["Calling any coincidence or unfortunate event 'ironic'.","Confusing sarcasm with verbal irony — sarcasm is a mocking subtype of it.","Mixing up dramatic and situational irony; dramatic irony is defined by the AUDIENCE's knowledge."]},

{t:"Theme vs main idea vs plot",s:"english",k:["theme","main idea","plot","message","central idea","moral"],
 d:"Plot is what happens. Main idea is what the text is about. Theme is the universal message about life the work conveys — it should be stated as a full sentence, not one word, and it shouldn't name the characters.",
 f:"Plot = events. Main idea = topic + what's said about it. Theme = a complete statement about human life, applicable beyond the story.",
 e:"Romeo and Juliet — Plot: two teens from feuding families fall in love and die. Topic: love and conflict. Theme: 'Hatred inherited from previous generations destroys the innocent.'",
 m:["Giving one word ('love') as a theme — that's a topic, not a theme.","Writing a theme that names characters, which makes it plot summary.","Confusing theme with the author's purpose."]},

{t:"Common literary devices",s:"english",k:["literary device","metaphor","simile","personification","symbolism","imagery","alliteration","foreshadowing","hyperbole"],
 d:"Devices are the tools authors use to create meaning. On tests, naming the device earns almost no credit — explaining what EFFECT it creates does.",
 f:"Simile: comparison using like/as. Metaphor: direct comparison without like/as. Personification: human traits for non-human things. Imagery: sensory description. Symbolism: an object standing for an idea. Alliteration: repeated initial consonant sounds. Hyperbole: deliberate exaggeration. Foreshadowing: hints at what's coming.",
 e:"'The wind screamed through the trees' — personification; it makes the storm feel deliberately hostile, raising tension before the disaster.",
 m:["Identifying the device and stopping there.","Calling every comparison a metaphor when 'like' or 'as' makes it a simile.","Claiming symbolism without textual evidence that the author built the pattern."]},

/* ================= COMPUTER SCIENCE ================= */
{t:"Variables, loops, and conditionals",s:"cs",k:["variable","loop","for loop","while loop","conditional","if statement","boolean"],
 d:"Variables store values under a name. Conditionals (if/else) let a program choose a path based on a true/false test. Loops repeat code — a for loop when you know how many times, a while loop when you repeat until a condition changes.",
 f:"if (condition) { … } else { … }  •  for (i = 0; i < n; i++)  •  while (condition) { … }",
 e:"for (let i = 1; i <= 5; i++) { console.log(i); }  → prints 1 2 3 4 5",
 m:["Off-by-one errors: using <= when you meant <, which runs one extra time.","Infinite loops from forgetting to update the loop variable.","Using = (assignment) where you meant == or === (comparison)."]},

{t:"Big O notation",s:"cs",k:["big o","time complexity","efficiency","algorithm analysis"],
 d:"Big O describes how an algorithm's work grows as the input grows. It ignores constants and small terms because it's about the trend at large sizes, not exact timing.",
 f:"O(1) constant • O(log n) logarithmic • O(n) linear • O(n log n) • O(n²) quadratic • O(2ⁿ) exponential — listed fastest to slowest growth.",
 e:"Looking up an array index is O(1). Scanning a list once is O(n). A nested loop over the same list is O(n²). Binary search is O(log n).",
 m:["Thinking Big O gives runtime in seconds — it describes growth, not speed.","Keeping constants: O(2n) is just O(n).","Assuming lower Big O always wins; for small inputs a 'worse' algorithm can be faster."]},

/* ================= ECONOMICS ================= */
{t:"Supply and demand",s:"economics",k:["supply","demand","equilibrium","price","market","shortage","surplus"],
 d:"Demand slopes down: as price rises, buyers want less. Supply slopes up: as price rises, sellers offer more. Where the curves cross is equilibrium — the price where quantity supplied equals quantity demanded. Above it you get a surplus, below it a shortage.",
 f:"Price above equilibrium → surplus → price falls. Price below equilibrium → shortage → price rises. A price CHANGE moves along the curve; anything else SHIFTS the whole curve.",
 e:"A frost destroys the orange crop → supply shifts left → equilibrium price rises and quantity falls.",
 m:["Confusing a movement along the curve with a shift of the curve — only price causes movement along it.","Forgetting that income, tastes, substitutes, and expectations shift demand.","Mixing up which direction a curve shifts: more supply shifts RIGHT."]},

{t:"Opportunity cost and scarcity",s:"economics",k:["opportunity cost","scarcity","trade-off","choice"],
 d:"Resources are limited but wants are unlimited — that's scarcity, and it forces choices. The opportunity cost of a choice is the value of the NEXT BEST alternative you gave up, not the total of everything you gave up.",
 f:"Opportunity cost = value of the single best forgone alternative.",
 e:"You have one free evening. Options: study (grade boost), work a shift ($60), or see friends. If you study, your opportunity cost is whichever one of the other two you valued most — not both combined.",
 m:["Adding up every option you didn't choose.","Ignoring non-money costs like time.","Confusing opportunity cost with sunk cost — sunk costs are already spent and should not affect the decision."]},

/* ================= GEOGRAPHY / EARTH ================= */
{t:"Plate tectonics",s:"geography",k:["plate tectonics","tectonic plate","earthquake","volcano","subduction","continental drift","fault"],
 d:"Earth's rigid outer shell is broken into plates that slowly move on the hotter, flowing mantle beneath. Nearly all earthquakes, volcanoes, and mountain ranges occur at plate boundaries.",
 f:"Convergent: plates collide → subduction, volcanoes, mountains. Divergent: plates separate → new crust, mid-ocean ridges. Transform: plates slide past → earthquakes (e.g. San Andreas Fault).",
 e:"The Himalayas are still rising because the Indian plate is colliding with the Eurasian plate.",
 m:["Saying continents 'float on liquid magma' — the mantle is solid rock that flows very slowly.","Thinking all volcanoes sit on convergent boundaries; hotspots like Hawaii form mid-plate.","Confusing the crust with the lithosphere (crust + rigid upper mantle)."]},

{t:"The water cycle",s:"geography",k:["water cycle","evaporation","condensation","precipitation","transpiration","runoff"],
 d:"Water continuously cycles between the surface and the atmosphere, driven by solar energy and gravity. The total amount of water on Earth stays essentially constant — it just changes state and location.",
 f:"Evaporation → Transpiration (from plants) → Condensation (clouds) → Precipitation → Collection/Runoff → Infiltration into groundwater → repeat.",
 e:"Ocean water evaporates, forms clouds, falls as rain over land, flows through rivers back to the ocean.",
 m:["Forgetting transpiration from plants, which is a large share of atmospheric moisture.","Thinking clouds are water vapor — they're condensed liquid droplets or ice crystals.","Leaving out groundwater and infiltration."]}

];
