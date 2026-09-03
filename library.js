/* Study Catalog — course library.
   Scoped to the five real classes on the schedule. Every entry carries cls,
   the class ids it belongs to; the catalog shows nothing without one. */

const CLASSES = [
 {
  "id": "calc",
  "name": "AP Calculus AB",
  "meta": "Mr. Haruthunian",
  "unit": "Unit 1 · Limits and Continuity",
  "glyph": "∫"
 },
 {
  "id": "psych",
  "name": "AP Psychology",
  "meta": "Period 6",
  "unit": "Unit 0 · Research Methods and Statistics",
  "glyph": "ψ"
 },
 {
  "id": "lit",
  "name": "AP English Literature",
  "meta": "Mr. Elias · Period 3",
  "unit": "Critical strategies and the year’s reading",
  "glyph": "¶"
 },
 {
  "id": "micro",
  "name": "AP Microeconomics",
  "meta": "Period 1",
  "unit": "Markets, prices and the firm",
  "glyph": "△"
 },
 {
  "id": "macro",
  "name": "AP Macroeconomics",
  "meta": "Period 2",
  "unit": "Output, inflation and employment",
  "glyph": "▲"
 }
];

const SUBJECTS = {
 "math": "Math",
 "psychology": "Psychology",
 "english": "English",
 "economics": "Economics",
 "general": "Unsorted"
};

const SUBJECT_HINTS = {
 "math": [
  "math",
  "algebra",
  "geometry",
  "calculus",
  "equation",
  "solve",
  "simplify",
  "factor",
  "fraction",
  "polynomial",
  "quadratic",
  "slope",
  "graph",
  "derivative",
  "integral",
  "trig",
  "sine",
  "cosine",
  "tangent",
  "logarithm",
  "exponent",
  "probability",
  "statistics",
  "mean",
  "median",
  "angle",
  "triangle",
  "theorem",
  "inequality",
  "matrix",
  "vector",
  "sequence",
  "function",
  "domain",
  "range",
  "radical",
  "square root",
  "numerator",
  "denominator",
  "x^",
  "y=",
  "limit",
  "lim(",
  "approaches",
  "discontinuity",
  "discontinuities",
  "continuity",
  "continuous",
  "piecewise",
  "asymptote",
  "removable",
  "rationalize",
  "conjugate",
  "cos(",
  "sin(",
  "tan(",
  "one sided",
  "left hand",
  "right hand",
  "indeterminate",
  "factor completely",
  "evaluate the limit"
 ],
 "psychology": [
  "psychology",
  "psych",
  "independent variable",
  "dependent variable",
  "confounding",
  "operational definition",
  "random assignment",
  "random sample",
  "control group",
  "placebo",
  "double blind",
  "correlation",
  "hypothesis",
  "experiment",
  "naturalistic observation",
  "case study",
  "informed consent",
  "debriefing",
  "irb",
  "standard deviation",
  "statistical significance",
  "behavior",
  "cognition",
  "stimulus",
  "researcher",
  "participants",
  "survey method",
  "sampling bias",
  "experimenter bias",
  "central tendency",
  "variability",
  "cognitive bias",
  "confirmation bias",
  "hindsight",
  "overconfidence",
  "normal curve",
  "normal distribution",
  "positive skew",
  "negative skew",
  "skew",
  "percentile",
  "frequency distribution",
  "frequency distributions",
  "effect size",
  "statistical significance",
  "replication",
  "regression toward the mean",
  "regression to the mean",
  "gamblers fallacy",
  "meta analysis",
  "meta-analysis",
  "longitudinal",
  "cross sectional",
  "cross-sectional",
  "falsifiability",
  "falsifiable",
  "convenience sampling",
  "representative sample",
  "sampling",
  "population",
  "qualitative",
  "quantitative",
  "framing effect",
  "self report",
  "psychological research"
 ],
 "english": [
  "english",
  "essay",
  "thesis",
  "paragraph",
  "author",
  "novel",
  "poem",
  "poetry",
  "character",
  "plot",
  "theme",
  "metaphor",
  "simile",
  "symbolism",
  "irony",
  "tone",
  "mood",
  "narrator",
  "imagery",
  "rhetorical",
  "ethos",
  "pathos",
  "logos",
  "citation",
  "grammar",
  "comma",
  "clause",
  "literary",
  "protagonist",
  "foreshadow",
  "alliteration",
  "allusion",
  "critical lens",
  "critical lenses",
  "critical strategies",
  "formalist",
  "feminist",
  "marxist",
  "reader response",
  "deconstruction",
  "close reading",
  "story of an hour",
  "chopin",
  "kate chopin",
  "yeats",
  "second coming",
  "things fall apart",
  "achebe",
  "mrs mallard",
  "short story",
  "prose",
  "stanza",
  "verse",
  "diction",
  "syntax",
  "motif",
  "speaker",
  "persona",
  "body paragraph",
  "commentary"
 ],
 "economics": [
  "economics",
  "economy",
  "supply",
  "demand",
  "inflation",
  "gdp",
  "market",
  "tariff",
  "tax",
  "scarcity",
  "opportunity cost",
  "monopoly",
  "interest rate",
  "recession",
  "fiscal",
  "monetary"
 ]
};

const LIB = [
 {
  "t": "Complex fractions",
  "s": "math",
  "k": [
   "complex fraction",
   "fraction inside fraction",
   "stacked fraction",
   "simplify fraction",
   "fully simplify",
   "compound fraction",
   "x^2/",
   "x²/",
   "divide by a fraction",
   "reciprocal"
  ],
  "d": "A complex fraction is a fraction that has fractions inside its numerator, denominator, or both. You never divide them as-is. You turn the top into one single fraction, turn the bottom into one single fraction, then divide — and dividing by a fraction means multiplying by its reciprocal (flip it).",
  "f": "(a/b) ÷ (c/d) = (a/b) × (d/c)",
  "steps": [
   "Combine the top into ONE fraction over a common denominator.",
   "Combine the bottom into ONE fraction over a common denominator.",
   "Rewrite the stack as top ÷ bottom.",
   "Flip the bottom fraction and multiply.",
   "Factor everything you can and cancel matching factors.",
   "State restrictions: any x that made an original denominator zero is excluded."
  ],
  "e": "Simplify (1 − x²/25) ÷ (x/5 + 1).\nTop: 1 − x²/25 = (25 − x²)/25 = (5−x)(5+x)/25\nBottom: x/5 + 1 = (x+5)/5\nDivide → (5−x)(5+x)/25 × 5/(x+5)\nCancel (5+x) and one 5 → (5 − x)/5, with x ≠ −5.",
  "m": [
   "Cancelling terms instead of factors — you can only cancel things multiplied, never things added.",
   "Forgetting to flip the bottom fraction before multiplying.",
   "Forgetting the restriction (the x-value that breaks the original denominator)."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Difference of squares",
  "s": "math",
  "k": [
   "difference of squares",
   "a2 - b2",
   "factor squares"
  ],
  "d": "Any expression shaped 'something squared minus something else squared' factors instantly into two matching binomials — one with a plus, one with a minus. It only works for SUBTRACTION. A sum of squares (a² + b²) does not factor over real numbers.",
  "f": "a² − b² = (a − b)(a + b)",
  "e": "25 − x² = (5 − x)(5 + x)\n9y² − 49 = (3y − 7)(3y + 7)\nx⁴ − 16 = (x² − 4)(x² + 4) = (x−2)(x+2)(x²+4)",
  "m": [
   "Trying to factor a² + b² — it doesn't factor with real numbers.",
   "Missing that a coefficient is a perfect square (49x² is (7x)²).",
   "Stopping after one round when the result can factor again."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Quadratic formula",
  "s": "math",
  "k": [
   "quadratic formula",
   "quadratic",
   "ax2+bx+c",
   "discriminant",
   "roots"
  ],
  "d": "Solves ANY equation shaped ax² + bx + c = 0, even when factoring fails. The part under the square root (the discriminant, b² − 4ac) tells you what kind of answers you'll get before you finish.",
  "f": "x = [ −b ± √(b² − 4ac) ] / (2a)",
  "steps": [
   "Get the equation into ax² + bx + c = 0 form — everything on one side, zero on the other.",
   "Write down a, b, c with their signs.",
   "Compute the discriminant b² − 4ac.",
   "Plug into the formula and simplify the radical.",
   "Split into the + answer and the − answer."
  ],
  "e": "2x² + 5x − 3 = 0 → a=2, b=5, c=−3\nDiscriminant: 25 − 4(2)(−3) = 25 + 24 = 49\nx = (−5 ± 7)/4 → x = 1/2 or x = −3",
  "m": [
   "Forgetting the equation must equal zero first.",
   "Losing the sign on a negative c — −4ac with c negative becomes ADDITION.",
   "Dividing only part of the numerator by 2a — the whole top gets divided.",
   "Discriminant > 0: two real roots. = 0: one repeated root. < 0: no real roots (two complex)."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Factoring trinomials",
  "s": "math",
  "k": [
   "factoring",
   "factor trinomial",
   "x2+bx+c",
   "foil backwards"
  ],
  "d": "Factoring is FOIL run backwards: you're looking for two binomials that multiply back to the trinomial. When the leading coefficient is 1, you just need two numbers that multiply to c and add to b.",
  "f": "x² + bx + c = (x + p)(x + q) where p·q = c and p + q = b",
  "steps": [
   "Always pull out a greatest common factor first.",
   "List factor pairs of c.",
   "Find the pair that adds to b.",
   "Write the two binomials.",
   "FOIL it back out to check."
  ],
  "e": "x² + 7x + 12 → pairs of 12: (1,12)(2,6)(3,4). 3+4 = 7 ✓ → (x+3)(x+4)\nx² − 5x − 24 → need product −24, sum −5 → (−8)(3) → (x−8)(x+3)",
  "m": [
   "Skipping the GCF step, which makes the numbers much uglier.",
   "Getting signs backwards: if c is negative, the two numbers have OPPOSITE signs.",
   "Forgetting that when a ≠ 1 you need grouping or the AC method."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Slope and linear equations",
  "s": "math",
  "k": [
   "slope",
   "y=mx+b",
   "linear equation",
   "rise over run",
   "point slope"
  ],
  "d": "Slope is how steep a line is: how much y changes for each step of x. Positive slope goes up left-to-right, negative goes down, zero is flat, and undefined is a vertical line.",
  "f": "m = (y₂ − y₁)/(x₂ − x₁)   •   Slope-intercept: y = mx + b   •   Point-slope: y − y₁ = m(x − x₁)",
  "e": "Through (2, 3) and (6, 11): m = (11−3)/(6−2) = 8/4 = 2.\nUse point-slope: y − 3 = 2(x − 2) → y = 2x − 1.",
  "m": [
   "Subtracting the coordinates in a different order on top and bottom — that flips the sign.",
   "Mixing up which number is the slope and which is the y-intercept in y = mx + b.",
   "Parallel lines share a slope; perpendicular slopes are negative reciprocals (2 and −1/2)."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Systems of equations",
  "s": "math",
  "k": [
   "system of equations",
   "substitution",
   "elimination",
   "two equations"
  ],
  "d": "Two equations, two unknowns. The solution is the point where the two lines cross. Substitution is best when one variable is already alone; elimination is best when coefficients line up.",
  "f": "Substitution: solve one equation for a variable, plug it into the other. Elimination: add or subtract the equations so one variable cancels.",
  "e": "2x + y = 7 and x − y = 2.\nAdd them: 3x = 9 → x = 3. Back-substitute: 3 − y = 2 → y = 1. Solution (3, 1).",
  "m": [
   "Only solving for one variable and stopping — you need both.",
   "Forgetting to distribute the negative when subtracting equations.",
   "No solution = parallel lines. Infinitely many = the same line twice."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Exponent rules",
  "s": "math",
  "k": [
   "exponent",
   "power rule",
   "negative exponent",
   "zero exponent"
  ],
  "d": "Exponents are repeated multiplication, and every rule comes from that. Multiplying like bases adds exponents because you're just counting factors.",
  "f": "xᵃ·xᵇ = xᵃ⁺ᵇ  •  xᵃ/xᵇ = xᵃ⁻ᵇ  •  (xᵃ)ᵇ = xᵃᵇ  •  x⁰ = 1  •  x⁻ᵃ = 1/xᵃ  •  x^(1/n) = ⁿ√x",
  "e": "(3x²)³ = 27x⁶   •   x⁵/x⁸ = x⁻³ = 1/x³   •   16^(3/4) = (⁴√16)³ = 2³ = 8",
  "m": [
   "Adding exponents when the bases are different — the rule needs the SAME base.",
   "Thinking a negative exponent makes the answer negative; it makes it a reciprocal.",
   "Forgetting the outside exponent hits the coefficient too: (3x)² = 9x², not 3x²."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Logarithms",
  "s": "math",
  "k": [
   "logarithm",
   "log",
   "ln",
   "natural log"
  ],
  "d": "A logarithm answers 'what exponent do I need?' log_b(x) = y means b^y = x. Logs and exponentials are inverse operations, which is why logs are the tool for pulling a variable out of an exponent.",
  "f": "log_b(xy)=log_b x + log_b y  •  log_b(x/y)=log_b x − log_b y  •  log_b(xⁿ)=n·log_b x  •  change of base: log_b x = ln x / ln b",
  "e": "Solve 2^x = 40 → x = log₂40 = ln40/ln2 ≈ 5.32",
  "m": [
   "Writing log(x+y) = log x + log y — false. The sum rule applies to a PRODUCT inside.",
   "Taking the log of a negative number or zero (undefined for real logs).",
   "Forgetting log without a base written means base 10, and ln means base e."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Pythagorean theorem",
  "s": "math",
  "k": [
   "pythagorean",
   "right triangle",
   "hypotenuse",
   "a2+b2=c2"
  ],
  "d": "In a RIGHT triangle only, the two short sides squared and added equal the longest side squared. c is always the hypotenuse — the side across from the 90° angle.",
  "f": "a² + b² = c²",
  "e": "Legs 6 and 8: 36 + 64 = 100 → c = 10.\nHypotenuse 13, one leg 5: 25 + b² = 169 → b = 12.",
  "m": [
   "Putting the hypotenuse in the a or b slot.",
   "Using it on a triangle that isn't right-angled.",
   "Forgetting the final square root."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Trig ratios (SOHCAHTOA)",
  "s": "math",
  "k": [
   "sohcahtoa",
   "sine",
   "cosine",
   "tangent",
   "trig ratio",
   "trigonometry"
  ],
  "d": "In a right triangle, each trig function is a ratio of two sides relative to the angle you picked. Opposite and adjacent change depending on which angle you're standing at; the hypotenuse never changes.",
  "f": "sin θ = Opposite/Hypotenuse • cos θ = Adjacent/Hypotenuse • tan θ = Opposite/Adjacent",
  "e": "Angle 30°, hypotenuse 10, find the opposite side: sin30 = x/10 → x = 10(0.5) = 5.",
  "m": [
   "Labelling opposite/adjacent from the wrong angle.",
   "Calculator in radians when the problem is in degrees (or vice versa).",
   "Using sin⁻¹ when you want sin — the inverse gives you the ANGLE back."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Derivatives",
  "s": "math",
  "k": [
   "derivative",
   "differentiate",
   "calculus",
   "rate of change",
   "dy/dx"
  ],
  "d": "A derivative measures instantaneous rate of change — the slope of the curve at one exact point. Physically: position differentiates to velocity, velocity to acceleration.",
  "f": "Power rule: d/dx[xⁿ] = n·xⁿ⁻¹  •  Product: (fg)' = f'g + fg'  •  Quotient: (f/g)' = (f'g − fg')/g²  •  Chain: d/dx f(g(x)) = f'(g(x))·g'(x)",
  "e": "d/dx[x²] = 2x   •   d/dx[5x³ − 4x + 7] = 15x² − 4   •   d/dx[(3x+1)⁴] = 4(3x+1)³·3 = 12(3x+1)³",
  "m": [
   "Forgetting the chain rule's inner derivative.",
   "Thinking the derivative of a constant is the constant — it's 0.",
   "Using the power rule on an exponential: d/dx[2^x] is not x·2^(x−1)."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Mean, median, mode, range",
  "s": "math",
  "k": [
   "mean",
   "median",
   "mode",
   "range",
   "average",
   "central tendency"
  ],
  "d": "Four ways to describe a data set. Mean is the balance point but gets dragged by outliers; median is the middle value and ignores outliers, which is why house prices and incomes are reported as medians.",
  "f": "Mean = sum ÷ count • Median = middle value of the SORTED list • Mode = most frequent • Range = max − min",
  "e": "Data: 3, 7, 7, 2, 11 → sorted 2,3,7,7,11. Mean = 30/5 = 6. Median = 7. Mode = 7. Range = 9.",
  "m": [
   "Finding the median without sorting first.",
   "With an even count, the median is the average of the two middle numbers.",
   "A set can have no mode, or more than one."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Probability basics",
  "s": "math",
  "k": [
   "probability",
   "chance",
   "odds",
   "independent events"
  ],
  "d": "Probability is favorable outcomes over total outcomes, always between 0 and 1. 'And' usually means multiply, 'or' usually means add — then subtract the overlap so you don't count it twice.",
  "f": "P(A) = favorable/total • P(A and B) = P(A)·P(B) if independent • P(A or B) = P(A) + P(B) − P(A and B) • P(not A) = 1 − P(A)",
  "e": "Two fair coins both heads: (1/2)(1/2) = 1/4.\nRolling a 2 OR an even number on a die: 1/6 + 3/6 − 1/6 = 3/6 = 1/2.",
  "m": [
   "Adding when events happen together instead of multiplying.",
   "Treating dependent events as independent — drawing cards WITHOUT replacement changes the second denominator.",
   "The gambler's fallacy: past coin flips don't change the next one."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Rationalizing the denominator",
  "s": "math",
  "k": [
   "rationalize",
   "rational denominator",
   "radical in denominator",
   "simplest radical form",
   "conjugate"
  ],
  "d": "Standard form doesn't allow a square root sitting in the denominator. To clear it you multiply the top and bottom by the same thing — which is really multiplying by 1, so the value never changes, only how it looks. For a single-term (monomial) denominator, multiply by that radical. For a two-term denominator, multiply by its conjugate.",
  "f": "Monomial: a/√b = a√b/b, then reduce.  •  Binomial: a/(b + √c) × (b − √c)/(b − √c), because (b+√c)(b−√c) = b² − c.",
  "steps": [
   "Look at the denominator: one term or two?",
   "One term → multiply top and bottom by that square root.",
   "Two terms → multiply top and bottom by the conjugate (same terms, flipped sign).",
   "Multiply out. In the denominator √b × √b = b, so the radical disappears.",
   "Reduce the fraction by any common factor.",
   "Simplify the radical itself if it hides a perfect square."
  ],
  "e": "3/√3 → multiply by √3/√3 → 3√3/3 → √3\n5/√2 → 5√2/2 (already reduced)\n6/√3 → 6√3/3 → 2√3\n4/(1+√2) → ×(1−√2)/(1−√2) → 4(1−√2)/(1−2) = −4(1−√2) = 4√2 − 4",
  "m": [
   "Multiplying only the denominator by the radical — that changes the value. Top and bottom, always.",
   "Forgetting to reduce afterwards: 3√3/3 is not simplest, √3 is.",
   "Using the same sign instead of the conjugate on a two-term denominator — the radical won't cancel.",
   "Not simplifying the radical first: √12 = 2√3."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Simplifying radicals",
  "s": "math",
  "k": [
   "simplify radical",
   "square root",
   "surd",
   "perfect square",
   "radical form"
  ],
  "d": "To simplify a square root, pull out the largest perfect-square factor. √(a·b) = √a · √b, so any perfect square inside can walk out as a whole number.",
  "f": "√(a·b) = √a·√b  •  √(a/b) = √a/√b  •  √(x²) = |x|",
  "e": "√72 = √(36·2) = 6√2\n√50 = √(25·2) = 5√2\n√(48x³) = √(16x² · 3x) = 4x√(3x)",
  "m": [
   "Pulling out a factor that isn't a perfect square.",
   "Using a small perfect square and stopping early: √72 = 2√18 is not finished.",
   "Writing √(a+b) = √a + √b — completely false. The rule works for multiplication only."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "The four techniques for evaluating limits",
  "s": "math",
  "k": [
   "evaluating limits",
   "direct substitution",
   "dividing out",
   "dividing out technique",
   "rationalizing technique",
   "plan b",
   "indeterminate form",
   "how to evaluate a limit"
  ],
  "d": "Class organizes limit problems around one decision and four tools. ALWAYS try direct substitution first — the limit properties guarantee it works for any function continuous at that point. Only when substitution gives the indeterminate form 0/0 do you need a plan B, and which plan you reach for is decided by what the expression looks like.",
  "f": "STEP 1 — DIRECT SUBSTITUTION. Valid whenever the function is continuous there.\n  • a real number → that is the answer, done\n  • (nonzero)/0 → vertical asymptote, the limit does not exist\n  • 0/0 → INDETERMINATE. It means nothing yet. Go to plan B.\n\nSTEP 2 — PICK THE PLAN B THAT MATCHES THE SHAPE:\n  • DIVIDING OUT TECHNIQUE — polynomials. Factor top and bottom, cancel, substitute again.\n  • COMPLEX FRACTION — fractions stacked inside fractions. Combine each level into one fraction, flip and multiply, cancel.\n  • RATIONALIZING TECHNIQUE — a square root on top or bottom. Multiply top and bottom by the conjugate.\n  • SPECIAL TRIG LIMITS — sine or tangent over its own argument.\n\nKeep the lim notation on every line until the moment you actually substitute.",
  "steps": [
   "Substitute the value.",
   "A real number? Done.",
   "(nonzero)/0? Vertical asymptote, DNE.",
   "0/0? Look at the shape and pick the matching technique.",
   "Apply it, then substitute again into what is left.",
   "Re-check the denominator — if it is still zero it was an asymptote after all."
  ],
  "e": "DIVIDING OUT: lim(x→3) (x²−x−6)/(x−3) = (x−3)(x+2)/(x−3) → x+2 → 5\nRATIONALIZING: lim(x→0) (√(x+1)−1)/x — multiply top and bottom by (√(x+1)+1) → x/[x(√(x+1)+1)] → 1/(√(x+1)+1) → 1/2\nSPECIAL TRIG: lim(x→0) sin(4x)/(4x) = 1, so lim sin(4x)/x = 4\nA cancelled factor leaves a HOLE in the graph, which is why the limit exists even though the function is undefined there.",
  "m": [
   "Skipping straight to a technique without trying substitution first.",
   "Writing DNE the moment 0/0 appears — 0/0 is a signal to keep working, not an answer.",
   "Dropping the lim notation partway through. It is required until you substitute.",
   "Using the conjugate on a polynomial or factoring on a radical — match the tool to the shape.",
   "Forgetting to substitute AGAIN after cancelling."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Limits — the idea",
  "s": "math",
  "k": [
   "limit",
   "limits",
   "approaches",
   "lim",
   "calculus limit"
  ],
  "d": "A limit asks: as x gets arbitrarily close to some value c, what does f(x) get close to? It does NOT ask what f(c) equals. The function can have a hole, a jump, or be undefined at c and the limit can still exist — the limit only cares about the neighborhood around c, never the point itself.",
  "f": "lim(x→c) f(x) = L exists only if the left-hand limit and the right-hand limit both exist AND are equal.\nlim(x→c⁻) f(x) = lim(x→c⁺) f(x) = L",
  "steps": [
   "Try direct substitution first — plug in c.",
   "If you get a real number, that's the limit. Done.",
   "If you get 0/0, it's indeterminate: factor and cancel, rationalize, or use a known trig limit.",
   "If you get (nonzero)/0, the limit is infinite — a vertical asymptote; check each side's sign.",
   "Always confirm the left and right sides agree, or the limit does not exist."
  ],
  "e": "lim(x→3) (x²−9)/(x−3): substitution gives 0/0. Factor → (x−3)(x+3)/(x−3) → cancel → x+3 → 6.\nNote f(3) is undefined, but the limit is still 6.",
  "m": [
   "Thinking the limit equals f(c). It usually does for continuous functions, but that's a consequence, not the definition.",
   "Stopping at 0/0 and writing 'does not exist' — 0/0 means do more work.",
   "Forgetting to check both sides at a piecewise boundary or an asymptote."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Trig limits",
  "s": "math",
  "k": [
   "trig limit",
   "sin x over x",
   "limit sin",
   "trigonometric limit",
   "special limit",
   "cos(x)",
   "tan(x)",
   "sin(x)",
   "cosx",
   "tanx",
   "sinx",
   "sin(",
   "cos(",
   "tan("
  ],
  "d": "Direct substitution on most trig limits at 0 gives 0/0. Two special limits rescue you, and everything else is algebra to force the expression into one of those shapes. The key move is rewriting tan as sin/cos and matching the argument inside the trig function to the denominator.",
  "f": "lim(x→0) sin(x)/x = 1   •   lim(x→0) (1 − cos x)/x = 0   •   lim(x→0) tan(x)/x = 1\nGeneral: lim(x→0) sin(ax)/(bx) = a/b",
  "steps": [
   "Substitute 0. If you get 0/0, continue.",
   "Rewrite tan(x) as sin(x)/cos(x) and cancel anything you can.",
   "Make the inside of the sine match the denominator — multiply top and bottom by whatever it takes.",
   "Replace the matched piece with 1 and simplify the leftover constants."
  ],
  "e": "lim(x→0) [5cos(x)tan(x)]/(7x)\n= lim 5cos(x)·[sin(x)/cos(x)]/(7x)   ← the cos(x) cancels\n= lim 5sin(x)/(7x) = (5/7)·lim sin(x)/x = (5/7)(1) = 5/7\n\nlim(x→0) sin(4x)/(9x) = 4/9\nlim(x→0) (1−cos x)/(3x) = 0",
  "m": [
   "Using sin(x)/x = 1 when the arguments don't match — sin(3x)/x is 3, not 1.",
   "Forgetting (1−cos x)/x goes to 0, not 1.",
   "Trying L'Hôpital before checking it's actually 0/0 or ∞/∞.",
   "Cancelling cos(x) when it isn't a common factor."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Limits of piecewise functions",
  "s": "math",
  "k": [
   "piecewise",
   "piecewise limit",
   "one sided limit",
   "left hand limit",
   "right hand limit"
  ],
  "d": "At a boundary between pieces, you must evaluate each side with its OWN rule. Approach from the left using the piece defined for x < c; approach from the right using the piece for x > c. The two-sided limit exists only if those two answers match — and the value the function is actually assigned at c is irrelevant to the limit.",
  "f": "lim(x→c⁻) uses the rule for x < c.  lim(x→c⁺) uses the rule for x > c.\nIf they are equal → limit exists and equals that value. If not → limit DNE (jump).",
  "steps": [
   "Identify the boundary value c the problem asks about.",
   "Find the piece that applies just BELOW c; plug c into it → left-hand limit.",
   "Find the piece that applies just ABOVE c; plug c into it → right-hand limit.",
   "Compare. Equal = the limit. Different = does not exist.",
   "Separately, f(c) is whichever piece explicitly includes the equals sign — needed for continuity, not for the limit."
  ],
  "e": "f(x) = { x + 3 for x < 2 ;  x² for x ≥ 2 }\nLeft: 2 + 3 = 5.  Right: 2² = 4.  5 ≠ 4, so lim(x→2) f(x) does not exist — a jump.",
  "m": [
   "Plugging c into only one piece.",
   "Using the piece that contains the ≥ sign for BOTH sides.",
   "Saying the limit exists because f(c) is defined — unrelated.",
   "Away from a boundary, just use whichever single piece applies; no one-sided work needed."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Types of discontinuities",
  "s": "math",
  "k": [
   "discontinuity",
   "removable",
   "jump discontinuity",
   "infinite discontinuity",
   "hole",
   "continuous",
   "continuity"
  ],
  "d": "A function is continuous at c when three things all hold: f(c) is defined, the limit exists, and they're equal. Each way that can fail names a different discontinuity.",
  "f": "Continuity test at c: (1) f(c) exists, (2) lim(x→c) f(x) exists, (3) lim(x→c) f(x) = f(c).\n• REMOVABLE (hole): the limit exists but f(c) is missing or set to the wrong value.\n• JUMP: left and right limits both exist but are different.\n• INFINITE: one or both sides run to ±∞ (vertical asymptote).\n• OSCILLATING: the values never settle, e.g. sin(1/x) at 0.",
  "e": "(x²−4)/(x−2) at x=2 → removable hole at (2,4).\nA step function jumping from 1 to 3 → jump.\n1/(x−5)² at x=5 → infinite.",
  "m": [
   "Calling a hole a jump — a hole has a limit, a jump doesn't.",
   "Thinking a vertical asymptote is removable; you can't patch it with one point.",
   "Forgetting the third condition: the limit can exist and f(c) can exist but still differ, which is still removable."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Reading discontinuities off a graph",
  "s": "math",
  "k": [
   "graphically",
   "graph discontinuity",
   "open circle",
   "closed dot",
   "filled dot",
   "jump from graph",
   "hole on graph",
   "read the graph"
  ],
  "d": "Graph questions give you the answer visually if you know what the dots mean. A CLOSED (filled) dot means that point is included — it is f(c). An OPEN circle means the curve approaches that height but the point is excluded. At every break, ignore the dots for a second and ask only: what height does the curve come up to from the left, and what height does it leave from on the right? Those two numbers decide the type.",
  "f": "At x = c, read the LEFT branch's ending height and the RIGHT branch's starting height.\n• Both finite and EQUAL, but a dot is missing or misplaced → REMOVABLE (hole).\n• Both finite and DIFFERENT → JUMP.\n• Either one runs off to ±∞ → INFINITE (vertical asymptote).\nA closed dot = f(c). An open circle = a height approached but not attained.",
  "steps": [
   "Find every x where the curve breaks, has a circle, or has an asymptote.",
   "At each one, trace the curve in from the LEFT and note the height it ends at.",
   "Trace the curve out to the RIGHT and note the height it starts at.",
   "Equal heights → removable. Different finite heights → jump. Infinite → infinite.",
   "Only now look at the filled dot — it tells you f(c), which affects continuity but never the limit."
  ],
  "e": "A curve rises to a closed dot at (−6, 5), and the next branch begins at an open circle at (−6, 0).\nLeft height 5, right height 0 — both finite, not equal → JUMP at x = −6.\n\nA curve runs smoothly through an open circle at (2, 3) with a closed dot floating at (2, 5).\nLeft height 3, right height 3 — equal → REMOVABLE at x = 2, even though f(2) = 5.",
  "m": [
   "The classic trap: an open circle and a closed dot stacked at the same x. That is only removable if the curve reaches the SAME height from both sides — otherwise it is a jump.",
   "Deciding the type from the dots instead of from the two one-sided heights.",
   "Including endpoints of the whole graph. If the interval is open, like −9 < x < 9, the ends are not in it.",
   "Forgetting that a removable discontinuity still counts as discontinuous — 'removable' means patchable, not continuous."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Limits of rational functions",
  "s": "math",
  "k": [
   "rational function limit",
   "limit of rational",
   "hole or asymptote",
   "0/0",
   "indeterminate",
   "vertical asymptote limit",
   "cancel and substitute"
  ],
  "d": "A rational function is one polynomial over another. Substituting first tells you which job you have. If you get an ordinary number, that is the limit. If you get a nonzero number over zero, it is a vertical asymptote and the limit does not exist. If you get 0/0, that is indeterminate — it means nothing yet, so factor, cancel, and substitute again. The whole question is decided by ONE check after cancelling: is the denominator still zero?",
  "f": "After factoring and cancelling, substitute again:\n• Denominator ≠ 0  →  it was a HOLE. That value is the limit.\n• Denominator = 0 still  →  VERTICAL ASYMPTOTE. The limit DOES NOT EXIST.\nAnd before any of that: (nonzero)/0 straight away → DNE, no factoring needed.",
  "steps": [
   "Substitute the value. Stop here if you get a real number — that is the answer.",
   "Got (nonzero)/0? Vertical asymptote, answer DNE. Done.",
   "Got 0/0? Factor the top and the bottom completely.",
   "Cancel every common factor.",
   "Substitute AGAIN into what is left.",
   "Denominator alive → that number is the limit (there was a hole). Denominator still zero → DNE."
  ],
  "e": "HOLE — lim(x→1) (5x−5)/(x²−5x+4)\n= 5(x−1) / [(x−1)(x−4)] = 5/(x−4)\nSubstitute: 5/(1−4) = −5/3.  The denominator survived, so the answer is −5/3.\n\nASYMPTOTE — lim(x→−3) (x²+4x)/(x²+3x)\n= x(x+4) / [x(x+3)] = (x+4)/(x+3)\nSubstitute: 1/0.  The denominator died, so the answer is DNE.\n\nSTILL ZERO AFTER CANCELLING — lim(x→2) (x²−4)/(x²−4x+4)\n= (x−2)(x+2) / (x−2)² = (x+2)/(x−2)\nSubstitute: 4/0.  DNE. Cancelling once does not make you safe.",
  "m": [
   "Writing DNE the moment you see 0/0. That is indeterminate, not an answer — it means do more work.",
   "Cancelling once and assuming you are finished. Substitute again and re-check the denominator.",
   "Forgetting that the factor you cancelled created a HOLE, not a fixed point — the function is still undefined there, but the limit exists.",
   "Treating a hole and an asymptote as the same thing. A hole has a limit; an asymptote does not."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Continuity",
  "s": "math",
  "k": [
   "continuity",
   "continuous",
   "discontinuous",
   "three part test",
   "continuous at",
   "removable point"
  ],
  "d": "A function is continuous at a point if you can draw through it without lifting your pencil. Formally that is three separate conditions, and a function fails to be continuous the moment ANY one of them breaks. Test them in order — if condition 1 or 2 fails you are already done.",
  "f": "f is continuous at x = c when ALL THREE hold:\n  1. f(c) is defined  (the point exists)\n  2. lim(x→c) f(x) exists  (left limit = right limit)\n  3. lim(x→c) f(x) = f(c)  (they agree)\nPolynomials are continuous everywhere. Rational functions are continuous everywhere except where the denominator is zero.",
  "steps": [
   "Check f(c): plug c into whichever piece actually includes c. Undefined → not continuous, stop.",
   "Check the limit: left-hand and right-hand must both exist and be equal. Unequal → not continuous, stop.",
   "Compare: does the limit equal f(c)? If not, it is a removable discontinuity.",
   "All three pass → continuous at c."
  ],
  "e": "f(x) = { x + 1 for x < 2 ; 5 for x = 2 ; 3x − 3 for x > 2 }  at x = 2\n1. f(2) = 5 — defined ✓\n2. Left: 2 + 1 = 3. Right: 3(2) − 3 = 3. Limit = 3 ✓\n3. Limit 3 ≠ f(2) = 5 ✗\nCondition 3 fails — removable discontinuity. Redefining f(2) = 3 would fix it.",
  "m": [
   "Checking only that f(c) exists. That is one condition out of three.",
   "Assuming a limit existing means continuity — condition 3 can still fail.",
   "At a piecewise boundary, using the wrong piece for f(c). Use the one whose inequality actually contains c (the one with ≤ or ≥ or =).",
   "Forgetting that a removable discontinuity is still a discontinuity."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Making a piecewise function continuous (solve for k)",
  "s": "math",
  "k": [
   "find k",
   "solve for k",
   "make continuous",
   "value of k",
   "continuous everywhere",
   "constant that makes"
  ],
  "d": "These ask you to choose a constant so the two pieces meet at the boundary. There is nothing new here — continuity requires the left-hand limit and the right-hand limit to be equal, so you set the two pieces equal at the boundary point and solve for the unknown.",
  "f": "Set  (left piece at c)  =  (right piece at c)  and solve for the constant.\nIf both pieces already equal f(c) there, the function is continuous.",
  "steps": [
   "Find the boundary value c where the definition switches.",
   "Substitute c into the piece used for x < c.",
   "Substitute c into the piece used for x > c.",
   "Set the two expressions equal.",
   "Solve for the unknown constant.",
   "Sanity check: plug your value back in and confirm both sides give the same number."
  ],
  "e": "f(x) = { x² − 1 for x < 3 ; kx for x ≥ 3 }, find k so f is continuous.\nLeft at 3: 3² − 1 = 8\nRight at 3: k(3) = 3k\nSet equal: 3k = 8  →  k = 8/3",
  "m": [
   "Solving with the wrong piece on a side — read the inequalities carefully.",
   "Forgetting to actually solve for the constant after setting the pieces equal.",
   "With a squared or absolute-value term there can be TWO values of k; the question may want both.",
   "Setting the DERIVATIVES equal instead of the function values — that is differentiability, a stronger condition."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Limits at infinity (horizontal asymptotes)",
  "s": "math",
  "k": [
   "limit at infinity",
   "horizontal asymptote",
   "end behavior",
   "x approaches infinity",
   "degree of numerator",
   "as x goes to infinity"
  ],
  "d": "This asks what a function settles down to as x runs off forever. For a rational function you only need to compare the DEGREE of the top with the degree of the bottom — the highest-power terms dominate and everything else becomes negligible. The answer is the function's horizontal asymptote.",
  "f": "For a rational function as x → ±∞, compare degrees:\n• Degree of top < degree of bottom  →  limit is 0  (asymptote y = 0)\n• Degrees EQUAL  →  limit is the ratio of the LEADING COEFFICIENTS\n• Degree of top > degree of bottom  →  limit is ±∞ (no horizontal asymptote)\nAlso: lim(x→±∞) (constant / xⁿ) = 0, and sin x / cos x have NO limit at infinity (they oscillate forever).",
  "steps": [
   "Identify the highest power in the numerator and in the denominator.",
   "Compare the two degrees.",
   "Bottom-heavy → 0.  Equal → leading coefficient ratio.  Top-heavy → ±∞.",
   "If you must show work, divide every term by the highest power of x in the DENOMINATOR and let the 1/x terms go to 0."
  ],
  "e": "lim(x→∞) (3x² + 5x)/(7x² − 1) — degrees equal (2 and 2) → 3/7\nlim(x→∞) (4x + 1)/(x² − 9) — bottom is bigger → 0\nlim(x→∞) (x³)/(2x + 1) — top is bigger → ∞",
  "m": [
   "Comparing leading coefficients when the degrees are NOT equal — that rule only applies when degrees match.",
   "Forgetting that a top-heavy rational function has no horizontal asymptote.",
   "With a square root, remember √(x²) = |x|, so the sign flips as x → −∞.",
   "Saying lim sin x = 0 as x → ∞. It never settles — the limit does not exist."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Infinite limits (vertical asymptotes)",
  "s": "math",
  "k": [
   "infinite limit",
   "vertical asymptote",
   "approaches infinity",
   "goes to infinity",
   "unbounded",
   "one sided infinite"
  ],
  "d": "An INFINITE limit is different from a limit AT infinity. Here x approaches a finite number and the function blows up. Saying the limit is +∞ or −∞ is a description of HOW it fails to exist — the limit still does not exist as a number. Which sign you get depends on which side you come from and on the power in the denominator.",
  "f": "If substitution gives (nonzero)/0, there is a vertical asymptote at that x.\nDecide the sign by testing a value just to that side:\n• EVEN power in the denominator, e.g. 1/(x−c)² → same sign from both sides, so the two-sided limit is +∞ or −∞.\n• ODD power, e.g. 1/(x−c) → opposite signs, so the two-sided limit DOES NOT EXIST.",
  "steps": [
   "Substitute. If you get (nonzero)/0 you have a vertical asymptote.",
   "Pick a test number a hair to the RIGHT of c and check the sign of the whole expression.",
   "Pick a test number a hair to the LEFT of c and check that sign.",
   "Same sign both ways → the two-sided limit is that infinity. Opposite signs → DNE.",
   "Note the sign of the numerator too — a negative numerator flips everything."
  ],
  "e": "lim(x→3⁺) 1/(x−3): just right of 3, (x−3) is a tiny POSITIVE → +∞\nlim(x→3⁻) 1/(x−3): just left of 3, (x−3) is a tiny NEGATIVE → −∞\nSo lim(x→3) 1/(x−3) does not exist.\nBut lim(x→3) 1/(x−3)² = +∞, because squaring makes both sides positive.",
  "m": [
   "Mixing up a limit AT infinity (horizontal asymptote) with an INFINITE limit (vertical asymptote).",
   "Writing +∞ for a two-sided limit across an odd power — the sides disagree, so it is DNE.",
   "Forgetting to check the numerator's sign.",
   "Treating ∞ as a number you can do arithmetic with."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Limit properties",
  "s": "math",
  "k": [
   "limit properties",
   "limit laws",
   "sum of limits",
   "limit rules",
   "graphically"
  ],
  "d": "Limits distribute over the ordinary operations, as long as each individual limit exists. That's what lets you break a messy expression into pieces, read each piece off a graph or table, and recombine.",
  "f": "lim(f + g) = lim f + lim g   •   lim(f − g) = lim f − lim g\nlim(k·f) = k·lim f   •   lim(f·g) = (lim f)(lim g)\nlim(f/g) = (lim f)/(lim g), provided lim g ≠ 0\nlim[f(x)]ⁿ = (lim f)ⁿ",
  "e": "Given lim f = 3 and lim g = −2:\nlim(2f + g) = 2(3) + (−2) = 4\nlim(f·g) = (3)(−2) = −6\nlim(f/g) = 3/(−2) = −3/2",
  "m": [
   "Applying the quotient rule when the bottom limit is 0 — that's indeterminate or infinite, so the rule doesn't apply.",
   "Using a two-sided limit off a graph where the left and right values differ; that limit DNE, so no property applies.",
   "Combining limits when one of them does not exist — the laws require every piece to exist first."
  ],
  "cls": [
   "calc"
  ]
 },
 {
  "t": "Experimental design: IV, DV, control, confounds",
  "s": "psychology",
  "k": [
   "independent variable",
   "dependent variable",
   "control group",
   "confounding variable",
   "experimental group",
   "operational definition",
   "iv",
   "dv"
  ],
  "d": "An experiment is the ONLY research method that can show cause and effect, because the researcher actively manipulates something instead of just observing. The independent variable is what the researcher changes. The dependent variable is what gets measured — it DEPENDS on the IV. The control group gets no treatment and exists to give you something to compare against. A confounding variable is any third factor that differs between groups and could explain the results instead of your IV.",
  "f": "IV = what the researcher MANIPULATES (the cause being tested). On a graph it is the X-AXIS.\nDV = what the researcher MEASURES (the effect, the data collected). On a graph it is the Y-AXIS.\nExperimental group = gets the treatment.  Control group = does not.\nConfound = an uncontrolled difference that offers a rival explanation.\nOperational definition = the exact, measurable way a variable is defined for this study.",
  "steps": [
   "Ask: what did the researcher deliberately change or assign? That is the IV.",
   "Ask: what number or outcome did they record at the end? That is the DV.",
   "Ask: was there a group that got nothing / the usual treatment? That is the control group. Many studies have none.",
   "Ask: what ELSE differed between conditions that could explain the result? That is a confound.",
   "Check the operational definition — how exactly was the DV measured?"
  ],
  "e": "Waiters draw a smiley face on checks for one month; tips are compared to the previous month.\nIV = whether a smiley face was drawn.  DV = tip amount.\nControl group = none (the same waiters serve as their own baseline).\nConfound = time of year — the two months differ in more than the smiley face.\n\nFour lost wallets with different photos inside; return rates recorded.\nIV = type of photo.  DV = return rate.  Control = none.  Confound = where each wallet was dropped.",
  "m": [
   "Swapping IV and DV. The DV is the DATA — the thing with numbers at the end.",
   "Calling the experimental group the control group. The control is the one WITHOUT the treatment.",
   "Naming a confound that was actually controlled for, or naming the DV as a confound.",
   "Assuming every study has a control group. Before/after and correlational designs often do not.",
   "Forgetting that without random assignment you cannot claim cause and effect."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Random sampling vs random assignment",
  "s": "psychology",
  "k": [
   "random sampling",
   "random assignment",
   "representative sample",
   "generalize",
   "population",
   "sample"
  ],
  "d": "These sound alike and are tested constantly because students mix them up. Random SAMPLING is how you choose who is in the study at all — it controls whether your results generalize to the wider population. Random ASSIGNMENT is how you sort those people into groups once you have them — it controls whether you can claim cause and effect.",
  "f": "Random SAMPLING → who gets in the study → gives you GENERALIZABILITY.\nRandom ASSIGNMENT → which group they land in → gives you CAUSATION.\nYou can have one without the other.",
  "e": "Surveying 1,000 randomly chosen citizens = random sampling, no assignment (it is not an experiment).\nTaking 60 volunteers from one psych class and flipping a coin to sort them into two groups = random assignment, no random sampling (results may not generalize beyond that class).",
  "m": [
   "Using the terms interchangeably — they solve two different problems.",
   "Thinking random assignment fixes a biased sample. It does not; it only balances the groups you already have.",
   "Thinking a large sample alone makes results generalizable. A big biased sample is still biased."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Research methods in psychology",
  "s": "psychology",
  "k": [
   "research method",
   "naturalistic observation",
   "case study",
   "survey",
   "correlational study",
   "experiment method",
   "longitudinal",
   "cross sectional"
  ],
  "d": "Each method trades away something to gain something else. Experiments buy causation at the cost of artificiality. Naturalistic observation buys realism at the cost of control. Case studies buy depth at the cost of generalizability. Surveys buy breadth at the cost of honesty and depth.",
  "f": "EXPERIMENT — manipulates an IV. Only method that shows CAUSE AND EFFECT.\nCORRELATIONAL — measures the relationship between two variables. Shows association, never causation.\nNATURALISTIC OBSERVATION — watching behavior in its real setting without interfering. High realism, no control.\nCASE STUDY — one person or group in depth. Rich detail, cannot generalize.\nSURVEY — self-report from many people. Broad and cheap, but vulnerable to dishonesty and wording effects.\nLONGITUDINAL — same people over time.  CROSS-SECTIONAL — different ages at one time.",
  "e": "Want to know if caffeine improves memory? Only an experiment can answer that. A survey asking 'does coffee help your memory?' measures beliefs, not memory.",
  "m": [
   "Claiming causation from a correlational study — the single most common error on the exam.",
   "Confusing naturalistic observation with a case study.",
   "Forgetting that surveys suffer from social desirability bias: people report what makes them look good."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Correlation does not equal causation",
  "s": "psychology",
  "k": [
   "correlation",
   "causation",
   "correlation coefficient",
   "positive correlation",
   "negative correlation",
   "third variable",
   "scatterplot"
  ],
  "d": "A correlation tells you two things move together, and nothing more. There are always three possible explanations: A caused B, B caused A, or some third variable caused both. The correlation coefficient r runs from −1 to +1. The SIGN tells you direction; the ABSOLUTE VALUE tells you strength. So −0.8 is a stronger relationship than +0.3.",
  "f": "r ranges −1.00 to +1.00.\nSign = direction (positive: both rise together. negative: one rises as the other falls).\nAbsolute value = strength. 0 means no linear relationship.\nThird-variable problem: an unmeasured factor may cause both.\nDirectionality problem: even if A and B are causally linked, the correlation cannot tell you which one came first.\nZero correlation (r near 0) means no linear relationship at all.",
  "e": "Ice cream sales correlate with drowning deaths. Ice cream does not cause drowning — hot weather (the third variable) drives both.\nr = −0.85 is STRONGER than r = +0.40, even though it is negative.",
  "m": [
   "Reading a negative correlation as 'weak' or as 'no relationship'.",
   "Concluding causation from any correlation, however strong.",
   "Confusing a scatterplot's slope with r — tight clustering, not steepness, means a strong correlation.",
   "Forgetting r only measures LINEAR relationships."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Bias and control in experiments",
  "s": "psychology",
  "k": [
   "placebo",
   "double blind",
   "single blind",
   "experimenter bias",
   "demand characteristics",
   "hawthorne",
   "social desirability",
   "sampling bias",
   "confirmation bias"
  ],
  "d": "People behave differently when they know they are being studied, and researchers unconsciously nudge results toward what they expect. Blinding procedures exist to neutralize both.",
  "f": "PLACEBO EFFECT — improvement from expectation alone.\nSINGLE-BLIND — participants do not know their condition.\nDOUBLE-BLIND — neither participants NOR the researchers interacting with them know. The gold standard.\nEXPERIMENTER BIAS — the researcher's expectations leak into the results.\nDEMAND CHARACTERISTICS — participants guess the hypothesis and play along.\nSOCIAL DESIRABILITY BIAS — self-reports skewed toward looking good.\nSAMPLING BIAS — the sample does not represent the population.",
  "e": "In a drug trial, the control group gets a sugar pill and neither the patients nor the nurses know who got which. That is double-blind, and it blocks both the placebo effect and experimenter bias at once.",
  "m": [
   "Saying double-blind means the participants are blind twice. It means BOTH sides are blind.",
   "Thinking a placebo is the same as a control group — a placebo is a specific KIND of control.",
   "Confusing demand characteristics (participants adjusting) with experimenter bias (researcher adjusting)."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Ethics in psychological research",
  "s": "psychology",
  "k": [
   "ethics",
   "informed consent",
   "debriefing",
   "irb",
   "confidentiality",
   "deception",
   "protection from harm"
  ],
  "d": "Every study involving people must be approved beforehand by an ethics board and must protect participants. Deception is permitted only when the study is impossible without it, and only if participants are fully told afterward.",
  "f": "Required: INFORMED CONSENT before, PROTECTION FROM HARM throughout, CONFIDENTIALITY of data, the RIGHT TO WITHDRAW at any time without penalty, and DEBRIEFING afterward (mandatory whenever deception was used).\nAn IRB (Institutional Review Board) reviews and approves the study in advance.",
  "e": "Milgram's obedience studies caused serious distress and are the standard example of why modern ethics boards exist.",
  "m": [
   "Thinking deception is always banned — it is restricted and requires debriefing, not forbidden.",
   "Forgetting the right to withdraw partway through.",
   "Confusing confidentiality (data kept private) with anonymity (identity never collected at all)."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Hypothesis and falsifiability",
  "s": "psychology",
  "k": [
   "hypothesis",
   "falsifiable",
   "falsifiability",
   "theory",
   "prediction",
   "testable",
   "operational"
  ],
  "d": "A hypothesis is a testable prediction, and 'testable' is the load-bearing word. A claim only counts as scientific if there is some possible result that would prove it WRONG. A claim that no evidence could ever contradict is not a strong claim — it is an empty one.",
  "f": "THEORY — a broad explanation that organizes observations and generates predictions.\nHYPOTHESIS — one specific testable prediction drawn from a theory.\nFALSIFIABILITY — there must be a possible observation that would disprove it.\nOPERATIONAL DEFINITION — the exact measurable procedure used, so anyone can replicate it.",
  "e": "Falsifiable: 'Students who sleep under 6 hours score lower on a recall test.' You can run it and find out.\nNot falsifiable: 'Everyone has an unconscious drive that sometimes shows and sometimes hides.' No result could contradict it.\nA theory is not 'just a guess' — in science it is the well-supported framework, and the hypothesis is the guess.",
  "m": [
   "Using 'theory' the everyday way (a hunch). In science a theory is the well-supported explanation.",
   "Writing a hypothesis with no measurable outcome.",
   "Thinking a disproven hypothesis means the study failed — disconfirming results are still results."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Sampling: population, sample, and bias",
  "s": "psychology",
  "k": [
   "population",
   "sample",
   "representative sample",
   "convenience sampling",
   "sampling bias",
   "generalizability",
   "random sampling",
   "stratified"
  ],
  "d": "You almost never study everyone, so you study a sample and hope it stands in for the population. Whether that hope is justified is entirely a question of HOW the sample was chosen. Convenience sampling — grabbing whoever is nearby — is the most common and most biased approach.",
  "f": "POPULATION — the whole group you want conclusions about.\nSAMPLE — the subset you actually study.\nREPRESENTATIVE SAMPLE — mirrors the population's relevant characteristics.\nRANDOM SAMPLING — every member has an equal chance of selection. Best defense against bias.\nCONVENIENCE SAMPLING — whoever is easiest to reach. Fast, cheap, and biased.\nSAMPLING BIAS — the sample systematically differs from the population.\nGENERALIZABILITY — whether findings extend beyond the sample.",
  "e": "Surveying students in your own psych class about study habits is convenience sampling. The results describe that class, not all teenagers.\nA large biased sample is still biased — size does not fix selection.",
  "m": [
   "Assuming a big sample is automatically representative.",
   "Confusing random sampling (who is studied) with random assignment (which group they land in).",
   "Claiming broad generalizability from one narrow population — a common criticism of research on WEIRD samples (Western, Educated, Industrialized, Rich, Democratic)."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Survey methodology and self-report bias",
  "s": "psychology",
  "k": [
   "survey",
   "self report",
   "social desirability",
   "framing effect",
   "wording effect",
   "questionnaire",
   "response bias"
  ],
  "d": "Surveys reach a lot of people cheaply, but every answer is filtered through the person's willingness to be honest and through how the question was worded. Both are systematic, not random, so they bend results in a predictable direction.",
  "f": "SOCIAL DESIRABILITY BIAS — answering in the way that makes you look good.\nSELF-REPORT BIAS — people misremember, misjudge, or misdescribe their own behavior even when trying to be honest.\nFRAMING EFFECT (wording effect) — the same question worded differently produces different answers.\nRESPONSE / NONRESPONSE BIAS — the people who bother to reply differ from those who do not.",
  "e": "'Should the government ban dangerous chemicals?' gets far more support than 'Should the government restrict chemicals used in manufacturing?' — same policy, different frame.\nAsked how often they exercise, most people overestimate. That is self-report bias, not lying.",
  "m": [
   "Treating survey results as behavior. They are reports of behavior.",
   "Forgetting that anonymity reduces social desirability bias but does not eliminate self-report error.",
   "Ignoring who did NOT respond."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Other research designs: meta-analysis, longitudinal, cross-sectional",
  "s": "psychology",
  "k": [
   "meta analysis",
   "longitudinal",
   "cross sectional",
   "cohort effect",
   "research design"
  ],
  "d": "Beyond the single experiment, these designs answer questions one study cannot. A meta-analysis pools many studies statistically to see what the whole literature says. Longitudinal and cross-sectional are two different ways to study change over age.",
  "f": "META-ANALYSIS — statistically combines results across many studies. Strong evidence, since it averages out one study's quirks.\nLONGITUDINAL — follows the SAME people over years. Shows real development, but slow and loses participants (attrition).\nCROSS-SECTIONAL — compares DIFFERENT age groups at one moment. Fast, but differences may be cohort effects rather than age effects.",
  "e": "Comparing 20-year-olds and 70-year-olds on vocabulary today is cross-sectional — but the groups grew up with different schooling, so a gap may reflect their era (a cohort effect), not aging.",
  "m": [
   "Treating a cross-sectional age difference as proof that a trait changes with age.",
   "Forgetting attrition weakens longitudinal studies over time.",
   "Thinking a meta-analysis is just a literature review — it is a statistical combination."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Cognitive biases: confirmation, hindsight, overconfidence",
  "s": "psychology",
  "k": [
   "confirmation bias",
   "hindsight bias",
   "overconfidence",
   "cognitive bias",
   "i knew it all along",
   "belief perseverance"
  ],
  "d": "Three predictable thinking errors that are exactly why psychology needs formal methods instead of intuition. Each one makes a person feel more certain than the evidence warrants.",
  "f": "CONFIRMATION BIAS — seeking and noticing evidence that supports what you already believe, and skipping the rest.\nHINDSIGHT BIAS — the 'I knew it all along' effect: once you know the outcome, it feels like it was obvious.\nOVERCONFIDENCE — being more certain of your judgments than accuracy justifies.",
  "e": "After an upset in a game, fans explain exactly why it was inevitable — hindsight bias. Before the game almost nobody predicted it.\nHindsight bias is why psychology findings can feel like 'common sense' after you hear them, even when the opposite finding would have felt just as obvious.",
  "m": [
   "Treating these as rare mistakes made by other people. They are the normal default.",
   "Confusing hindsight bias (after the fact) with overconfidence (before the fact).",
   "Forgetting that confirmation bias affects researchers too — which is what blinding procedures exist to block."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Central tendency and variability",
  "s": "psychology",
  "k": [
   "mean",
   "median",
   "mode",
   "range",
   "standard deviation",
   "measures of central tendency",
   "variability",
   "spread",
   "outlier"
  ],
  "d": "Central tendency tells you where a distribution sits; variability tells you how spread out it is. Two data sets can have identical means and look nothing alike, which is why you always need both numbers.",
  "f": "MEAN — the arithmetic average. Sensitive to outliers.\nMEDIAN — the middle value of the sorted data. Resistant to outliers.\nMODE — the most frequent score. The only one usable for categories.\nRANGE — highest minus lowest. Crude, driven entirely by extremes.\nSTANDARD DEVIATION — the typical distance of a score from the mean. Small SD = tightly clustered; large SD = spread out.",
  "e": "Incomes 20k, 25k, 30k, 35k, 2,000k: the mean is about 422k and describes nobody. The median, 30k, describes the group. That is why income is reported as a median.",
  "m": [
   "Reporting a mean for badly skewed data.",
   "Thinking a big range means a big standard deviation — one extreme outlier can inflate the range while most scores stay clustered.",
   "Forgetting the mode is the only measure that works for non-numeric categories."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Frequency distributions, the normal curve, and skew",
  "s": "psychology",
  "k": [
   "normal curve",
   "normal distribution",
   "bell curve",
   "positive skew",
   "negative skew",
   "percentile",
   "frequency distribution",
   "standard deviation rule"
  ],
  "d": "A frequency distribution shows how often each score occurs. Many natural measures form a symmetric bell shape, the normal curve, where mean, median and mode all land in the same place. When the distribution is lopsided it is skewed, and the direction is named for the TAIL, not the bump.",
  "f": "NORMAL CURVE — symmetric and bell-shaped; mean = median = mode.\nEmpirical rule: about 68% of scores fall within 1 SD of the mean, about 95% within 2 SD, about 99.7% within 3 SD.\nPOSITIVE (right) SKEW — tail stretches toward the HIGH end; mean is pulled ABOVE the median.\nNEGATIVE (left) SKEW — tail stretches toward the LOW end; mean is pulled BELOW the median.\nPERCENTILE — the percent of scores at or below yours.",
  "e": "Income is positively skewed — a few enormous earners stretch the right tail, so the mean exceeds the median.\nAn easy test where nearly everyone scores high is negatively skewed — the few low scores stretch the left tail.\nScoring in the 80th percentile means you did as well as or better than 80% of test takers, NOT that you got 80% correct.",
  "m": [
   "Naming the skew after where most scores pile up. It is named for the direction of the TAIL.",
   "Reading a percentile as a percent correct.",
   "Assuming every distribution is normal — many real ones are not."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Statistical significance, effect size, and replication",
  "s": "psychology",
  "k": [
   "statistical significance",
   "p value",
   "effect size",
   "replication",
   "replication crisis",
   "significant"
  ],
  "d": "A statistically significant result means the difference is unlikely to be due to chance alone. It does NOT mean the difference is large or that it matters in real life. Effect size answers that separate question, and replication answers whether the finding is real at all.",
  "f": "STATISTICAL SIGNIFICANCE — the result is unlikely by chance; conventionally p < .05.\nEFFECT SIZE — how BIG the difference is, independent of sample size.\nREPLICATION — repeating a study to see whether the finding holds. Central to science, and many famous psychology findings have failed it.\nA very large sample can make a trivially small difference statistically significant.",
  "e": "A study of 100,000 people finds a supplement raises test scores by 0.2 points, p < .001. Statistically significant, and practically meaningless — the effect size is tiny.",
  "m": [
   "Reading 'significant' as 'important' or 'large'. It means 'probably not chance'.",
   "Thinking p < .05 proves the hypothesis. It quantifies unlikeliness under chance, nothing more.",
   "Trusting a single unreplicated study."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Regression to the mean and the gambler's fallacy",
  "s": "psychology",
  "k": [
   "regression toward the mean",
   "regression to the mean",
   "gamblers fallacy",
   "probability",
   "chance",
   "random"
  ],
  "d": "Two errors that come from misreading randomness. Extreme results tend to be followed by more ordinary ones simply because the extreme was partly luck — that is regression to the mean. And independent chance events have no memory, so a run of one outcome does not make the other 'due' — that is the gambler's fallacy.",
  "f": "REGRESSION TO THE MEAN — unusually high or low scores tend to drift back toward average on retesting.\nGAMBLER'S FALLACY — believing past independent outcomes change the next one's probability. A fair coin after five heads is still 50/50.",
  "e": "An athlete has a spectacular season, then a merely good one. Commentators blame pressure or complacency; regression to the mean explains it without any story.\nThis is also why punishment can look more effective than praise: you punish after the worst performances, which were going to improve anyway.",
  "m": [
   "Inventing a causal story for what is just regression to the mean.",
   "Thinking a result is 'due' after a streak of independent events.",
   "Confusing independent events (coin flips) with dependent ones (drawing cards without replacement), where the odds really do change."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Quantitative vs qualitative measures",
  "s": "psychology",
  "k": [
   "quantitative",
   "qualitative",
   "measurement",
   "likert",
   "structured interview"
  ],
  "d": "Quantitative data is numeric and lends itself to statistics. Qualitative data is descriptive and captures meaning, context and reasons. Neither is superior — they answer different questions, and strong research often uses both.",
  "f": "QUANTITATIVE — numbers: reaction times, test scores, ratings, counts. Easy to analyze statistically and compare.\nQUALITATIVE — words and observations: interviews, open responses, field notes. Rich in meaning, harder to summarize.\nA Likert rating scale converts a qualitative judgment into a quantitative score.",
  "e": "'On a scale of 1–10, how anxious do you feel?' is quantitative. 'Describe what the anxiety feels like' is qualitative. The first can be averaged; the second explains the first.",
  "m": [
   "Treating qualitative research as unscientific. It follows systematic procedures too.",
   "Assuming numbers are automatically more objective — a badly designed scale produces precise nonsense.",
   "Forgetting that converting to numbers always loses some information."
  ],
  "cls": [
   "psych"
  ]
 },
 {
  "t": "Writing a thesis statement",
  "s": "english",
  "k": [
   "thesis",
   "thesis statement",
   "argument",
   "essay introduction",
   "claim"
  ],
  "d": "A thesis is one arguable sentence stating your specific claim and, ideally, why it holds. It must be something a reasonable person could disagree with. A fact is not a thesis; a topic is not a thesis.",
  "f": "Formula: [Specific claim] because [reason], as shown by [evidence type]. Usually the last sentence of the introduction.",
  "e": "Weak: 'This essay is about symbolism in The Great Gatsby.'\nStrong: 'Fitzgerald uses the green light to show that Gatsby's dream was already dead before the novel begins, because he pursues a version of Daisy that no longer exists.'",
  "m": [
   "Announcing instead of arguing ('I will discuss…').",
   "Being so broad that nothing could disprove it.",
   "Writing a thesis you never actually defend in the body paragraphs."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "Ethos, pathos, logos",
  "s": "english",
  "k": [
   "ethos",
   "pathos",
   "logos",
   "rhetorical appeals",
   "persuasion",
   "rhetoric",
   "aristotle"
  ],
  "d": "Aristotle's three persuasive appeals. Ethos builds trust in the speaker's credibility. Pathos moves the audience's emotions. Logos uses logic, facts, and reasoning. Strong arguments usually blend all three.",
  "f": "Ethos = character/credibility. Pathos = emotion. Logos = logic. (Kairos = timing, sometimes taught as a fourth.)",
  "e": "'As a doctor of 20 years' = ethos. 'Imagine your own child in that hospital bed' = pathos. 'Studies show a 40% reduction' = logos.",
  "m": [
   "Naming the appeal without explaining its EFFECT on the audience — analysis questions want the effect.",
   "Assuming pathos is manipulative and logos is honest; both can be either.",
   "Missing that one sentence can carry more than one appeal."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "Types of irony",
  "s": "english",
  "k": [
   "irony",
   "verbal irony",
   "situational irony",
   "dramatic irony",
   "sarcasm"
  ],
  "d": "Irony is a gap between what's expected and what actually is. Verbal irony: someone says the opposite of what they mean. Situational irony: the outcome is the opposite of what was expected. Dramatic irony: the audience knows something a character doesn't.",
  "f": "Verbal = says vs means. Situational = expected vs happens. Dramatic = audience knows vs character doesn't.",
  "e": "Verbal: 'Lovely weather' in a downpour. Situational: a fire station burns down. Dramatic: the audience knows Juliet is only asleep while Romeo believes she's dead.",
  "m": [
   "Calling any coincidence or unfortunate event 'ironic'.",
   "Confusing sarcasm with verbal irony — sarcasm is a mocking subtype of it.",
   "Mixing up dramatic and situational irony; dramatic irony is defined by the AUDIENCE's knowledge."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "Theme vs main idea vs plot",
  "s": "english",
  "k": [
   "theme",
   "main idea",
   "plot",
   "message",
   "central idea",
   "moral"
  ],
  "d": "Plot is what happens. Main idea is what the text is about. Theme is the universal message about life the work conveys — it should be stated as a full sentence, not one word, and it shouldn't name the characters.",
  "f": "Plot = events. Main idea = topic + what's said about it. Theme = a complete statement about human life, applicable beyond the story.",
  "e": "Romeo and Juliet — Plot: two teens from feuding families fall in love and die. Topic: love and conflict. Theme: 'Hatred inherited from previous generations destroys the innocent.'",
  "m": [
   "Giving one word ('love') as a theme — that's a topic, not a theme.",
   "Writing a theme that names characters, which makes it plot summary.",
   "Confusing theme with the author's purpose."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "Common literary devices",
  "s": "english",
  "k": [
   "literary device",
   "metaphor",
   "simile",
   "personification",
   "symbolism",
   "imagery",
   "alliteration",
   "foreshadowing",
   "hyperbole"
  ],
  "d": "Devices are the tools authors use to create meaning. On tests, naming the device earns almost no credit — explaining what EFFECT it creates does.",
  "f": "Simile: comparison using like/as. Metaphor: direct comparison without like/as. Personification: human traits for non-human things. Imagery: sensory description. Symbolism: an object standing for an idea. Alliteration: repeated initial consonant sounds. Hyperbole: deliberate exaggeration. Foreshadowing: hints at what's coming.",
  "e": "'The wind screamed through the trees' — personification; it makes the storm feel deliberately hostile, raising tension before the disaster.",
  "m": [
   "Identifying the device and stopping there.",
   "Calling every comparison a metaphor when 'like' or 'as' makes it a simile.",
   "Claiming symbolism without textual evidence that the author built the pattern."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "AP English Lit — course reference (Mr. Elias)",
  "s": "english",
  "k": [
   "ap lit",
   "syllabus",
   "grading",
   "course",
   "elias",
   "reading list",
   "booklist",
   "rewrite policy",
   "extra credit"
  ],
  "d": "Reference card for the year: what you are reading, how the grade is actually weighted, and the two policies that matter most for protecting your average. The course centers on writing as a PROCESS — prewriting, first draft, peer editing, final draft — and writing is the single biggest slice of your grade.",
  "f": "GRADE WEIGHTS\n  Writing — 40%\n  Reading (quizzes 25 pts, unit tests 100 pts) — 30%\n  Projects — 20%\n  Homework / Classwork — 10%\n\nTWO POLICIES WORTH KNOWING\n  • Essays may be REWRITTEN for up to 10 extra credit points added straight onto the essay grade. Writing is 40% of the average, so this is the highest-leverage thing on the list.\n  • HW/CW starts at 100% and loses about 4 points per missed assignment. Participation can pull it back up.\n\nMAKE-UPS: after an absence it is on you to get the work. Tests are made up the day you return; assignments are due the day you return.",
  "e": "YEAR READING LIST\n  Things Fall Apart — Chinua Achebe\n  The Kite Runner — Khaled Hosseini\n  Siddhartha — Hermann Hesse\n  Hamlet — William Shakespeare\n  Jane Eyre — Charlotte Brontë\n  Brave New World — Aldous Huxley\n  The Stranger — Albert Camus\n  The Bluest Eye — Toni Morrison\n  Wide Sargasso Sea — Jean Rhys\n  Rosencrantz and Guildenstern Are Dead — Tom Stoppard\n  plus supplementary poetry and short stories\n\nFirst-quarter project: read a bestseller and complete a creative alternative assignment.",
  "m": [
   "Skipping the rewrite. It is free points on the heaviest-weighted category.",
   "Letting HW/CW slide because it is 'only 10%' — it starts at 100 and only goes down.",
   "Waiting to be handed missed work after an absence; the syllabus puts that on you.",
   "Reading the novels without annotating — unit tests can be essay or short answer, and you cannot reconstruct evidence from memory."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "Critical lenses for reading literature",
  "s": "english",
  "k": [
   "critical lens",
   "critical strategies",
   "literary criticism",
   "formalist",
   "feminist criticism",
   "marxist criticism",
   "reader response",
   "psychological criticism",
   "historical criticism",
   "new criticism",
   "deconstruction"
  ],
  "d": "A critical lens is a set of questions you bring to a text. The same story yields different readings depending on which lens you use, and AP Lit rewards you for applying one consistently rather than drifting between them. None is the 'correct' one — the point is that your reading stays anchored to evidence in the text.",
  "f": "FORMALIST / NEW CRITICISM — the text alone: structure, imagery, irony, diction. Ignores author and context.\nBIOGRAPHICAL — reads the work through the author's life.\nHISTORICAL — places the work in its period and social conditions.\nPSYCHOLOGICAL — motives, the unconscious, repression, desire.\nFEMINIST / GENDER — how the text constructs and polices gender and power.\nMARXIST — class, money, labor, who holds power and who is exploited.\nREADER-RESPONSE — meaning is created in the encounter between reader and text.\nDECONSTRUCTIONIST — finds where the text contradicts or undermines itself.",
  "e": "Reading The Story of an Hour through a FEMINIST lens: Mrs. Mallard's joy is not cruelty but a response to how marriage erased her autonomy — the 'blind persistence' with which people impose their will on one another.\nThrough a FORMALIST lens: the same story is built on situational irony and the open window as a symbol of possibility.",
  "m": [
   "Naming the lens and then not using it — the lens has to shape which evidence you pick.",
   "Switching lenses mid-essay without acknowledging it.",
   "Treating a lens as a verdict about the author's intentions rather than a way of reading.",
   "Forgetting that every lens still requires textual evidence."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "The Story of an Hour (Kate Chopin)",
  "s": "english",
  "k": [
   "story of an hour",
   "kate chopin",
   "mrs mallard",
   "louise mallard",
   "brently",
   "josephine",
   "richards"
  ],
  "d": "Mrs. Louise Mallard, who has a heart condition, is gently told her husband Brently died in a railroad disaster. She weeps, goes to her room alone, and — facing an open window — gradually recognizes a feeling she resists at first and then welcomes: freedom. She descends the stairs. Brently walks in alive. She dies. The doctors say it was 'the joy that kills.' Published in 1894, the story runs barely a thousand words and turns entirely on that last line.",
  "f": "Central irony: the doctors are right about the cause and completely wrong about the meaning — she dies not from joy at his survival but from the loss of the freedom she had just discovered.\nKey symbols: the OPEN WINDOW (possibility, the life outside), SPRING imagery (rebirth), the ARMCHAIR and her exhaustion (the weight of her old life), the CLOSED DOOR (privacy and self-possession), HEART TROUBLE (both literal and the condition of her marriage).\nStructure: the whole story occupies about one hour, which makes the title a measure of how brief her freedom was.",
  "e": "QUOTES WORTH KNOWING COLD\n• 'She did not hear the story as many women have heard the same, with a paralyzed inability to accept its significance.' — the opening signal that Louise is not the standard grieving widow.\n• 'There stood, facing the open window, a comfortable, roomy armchair.' — the window arrives before the revelation; her exhaustion is the old life.\n• 'There was something coming to her and she was waiting for it, fearfully.' — she resists the feeling before she accepts it.\n• 'Free, free, free!' and later 'Free! Body and soul free!' — the repetition is the argument.\n• 'She was drinking in a very elixir of life through that open window.' — freedom as something the body consumes.\n• 'There would be no powerful will bending hers in that blind persistence with which men and women believe they have a right to impose a private will upon a fellow-creature.' — Chopin indicts the institution, and note 'men AND women'. This is not a complaint about Brently, who was kind.\n• 'And yet she had loved him — sometimes. Often she had not.' — the line that stops any reading of her as simply cruel.\n• 'When the doctors came they said she had died of heart disease — of the joy that kills.' — the final irony.\n\nSTRONG THESIS: 'Chopin uses the open window and the compressed single-hour structure to argue that even a loving marriage could erase a nineteenth-century woman's selfhood — Louise's freedom is real, and it lasts an hour.'",
  "m": [
   "Reading Louise as simply cruel or as hating her husband. The text says she had 'loved him — sometimes' and that his hands were 'kind, tender'.",
   "Missing that the final line is ironic and taking the doctors at their word.",
   "Calling it dramatic irony throughout — the dominant mode is SITUATIONAL irony (the outcome inverts expectation).",
   "Summarizing the plot instead of analyzing how the window, the season, and the hour-long structure build the argument."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "Writing a literary analysis paragraph",
  "s": "english",
  "k": [
   "literary analysis",
   "body paragraph",
   "evidence",
   "commentary",
   "topic sentence",
   "close reading",
   "quote integration",
   "teal",
   "cite evidence"
  ],
  "d": "Most lost points come from stopping after the quote. A quote is not an argument — it is raw material. The analysis is the sentences AFTER the quote that explain how the language creates the effect you claimed. Aim for roughly twice as much commentary as evidence.",
  "f": "Structure: CLAIM (topic sentence tied to your thesis) → CONTEXT (one clause of setup) → EVIDENCE (a short embedded quote) → ANALYSIS (2–3 sentences on HOW the language works) → LINK (back to the thesis).\nEmbed quotes inside your own sentence rather than dropping them in alone.",
  "e": "Weak: 'Chopin writes, “she was drinking in a very elixir of life through that open window.” This shows she is happy.'\n\nStrong: 'Chopin casts Louise's new freedom as physical sustenance — she is “drinking in a very elixir of life through that open window.” The verb “drinking” makes autonomy something the body consumes, as though she had been starved of it, and “elixir” carries a promise of cure that quietly reframes her marriage as the illness.'",
  "m": [
   "Dropping a quote in as its own sentence with no lead-in.",
   "Restating the quote in different words and calling that analysis.",
   "Quoting long passages — short embedded phrases are stronger and easier to analyze.",
   "Writing plot summary. If a sentence only says what happened, it earns nothing."
  ],
  "cls": [
   "lit"
  ]
 },
 {
  "t": "Supply and demand",
  "s": "economics",
  "k": [
   "supply",
   "demand",
   "equilibrium",
   "price",
   "market",
   "shortage",
   "surplus"
  ],
  "d": "Demand slopes down: as price rises, buyers want less. Supply slopes up: as price rises, sellers offer more. Where the curves cross is equilibrium — the price where quantity supplied equals quantity demanded. Above it you get a surplus, below it a shortage.",
  "f": "Price above equilibrium → surplus → price falls. Price below equilibrium → shortage → price rises. A price CHANGE moves along the curve; anything else SHIFTS the whole curve.",
  "e": "A frost destroys the orange crop → supply shifts left → equilibrium price rises and quantity falls.",
  "m": [
   "Confusing a movement along the curve with a shift of the curve — only price causes movement along it.",
   "Forgetting that income, tastes, substitutes, and expectations shift demand.",
   "Mixing up which direction a curve shifts: more supply shifts RIGHT."
  ],
  "cls": [
   "micro"
  ]
 },
 {
  "t": "Opportunity cost and scarcity",
  "s": "economics",
  "k": [
   "opportunity cost",
   "scarcity",
   "trade-off",
   "choice"
  ],
  "d": "Resources are limited but wants are unlimited — that's scarcity, and it forces choices. The opportunity cost of a choice is the value of the NEXT BEST alternative you gave up, not the total of everything you gave up.",
  "f": "Opportunity cost = value of the single best forgone alternative.",
  "e": "You have one free evening. Options: study (grade boost), work a shift ($60), or see friends. If you study, your opportunity cost is whichever one of the other two you valued most — not both combined.",
  "m": [
   "Adding up every option you didn't choose.",
   "Ignoring non-money costs like time.",
   "Confusing opportunity cost with sunk cost — sunk costs are already spent and should not affect the decision."
  ],
  "cls": [
   "micro"
  ]
 },
 {
  "t": "Microeconomics vs macroeconomics",
  "s": "economics",
  "k": [
   "microeconomics",
   "macroeconomics",
   "micro",
   "macro",
   "difference between micro and macro"
  ],
  "d": "Same discipline, different altitude. Microeconomics studies individual decision-makers — one household, one firm, one market — and asks how prices and quantities get set there. Macroeconomics studies the whole economy at once and asks about aggregates: total output, the overall price level, and total employment.",
  "f": "MICRO — supply and demand in one market, consumer choice, firm costs, elasticity, market structures, externalities.\nMACRO — GDP, inflation, unemployment, fiscal policy (government spending and taxes), monetary policy (the central bank), business cycles, trade balances.",
  "e": "Why did coffee prices rise this year? Micro.  Why did prices rise across the whole economy this year? Macro.",
  "m": [
   "Assuming what is true for one household is true for the whole economy — that is the fallacy of composition (e.g. one person saving more helps them; everyone saving at once can shrink total demand).",
   "Filing unemployment under micro. The unemployment RATE is a macro aggregate.",
   "Thinking the two are unrelated — macro is built on micro foundations."
  ],
  "cls": [
   "micro",
   "macro"
  ]
 },
 {
  "t": "Elasticity of demand",
  "s": "economics",
  "k": [
   "elasticity",
   "elastic",
   "inelastic",
   "price elasticity",
   "responsive to price",
   "total revenue"
  ],
  "d": "Elasticity measures how much quantity responds to a price change. Demand is elastic when buyers are sensitive — there are substitutes, or the item is a luxury you can skip. It is inelastic when they are not — necessities, addictive goods, things with no alternative.",
  "f": "Price elasticity of demand = (% change in quantity demanded) ÷ (% change in price), read as an absolute value.\n> 1 ELASTIC (quantity responds a lot)  •  < 1 INELASTIC  •  = 1 unit elastic.\nRevenue test: if demand is ELASTIC, raising price LOWERS total revenue. If INELASTIC, raising price RAISES total revenue.",
  "e": "Insulin is highly inelastic — raise the price and people still buy it. One particular brand of soda is elastic — raise its price and buyers switch brands.",
  "m": [
   "Confusing a steep-looking curve with inelasticity without checking the actual percentages.",
   "Forgetting that more substitutes and more time both make demand MORE elastic.",
   "Getting the revenue test backwards — elastic means a price increase costs you revenue."
  ],
  "cls": [
   "micro"
  ]
 },
 {
  "t": "GDP, inflation, and unemployment",
  "s": "economics",
  "k": [
   "gdp",
   "gross domestic product",
   "inflation",
   "unemployment",
   "cpi",
   "real gdp",
   "nominal gdp",
   "recession"
  ],
  "d": "The three headline macro numbers. GDP measures total output. Inflation measures how fast the general price level is rising. The unemployment rate measures the share of people who want work and cannot find it. Every macro policy debate is about trading these against each other.",
  "f": "GDP = C + I + G + (X − M)  — consumption, investment, government spending, net exports.\nNOMINAL GDP uses current prices; REAL GDP adjusts for inflation. Compare years using REAL.\nInflation is usually tracked with the CPI (Consumer Price Index).\nUnemployment rate = unemployed ÷ LABOR FORCE (not ÷ total population) × 100.\nRecession: commonly two consecutive quarters of falling real GDP.",
  "e": "If nominal GDP rises 5% while prices rise 5%, real GDP did not grow at all — the economy produced the same amount, everything just cost more.",
  "m": [
   "Comparing nominal GDP across years and calling it growth.",
   "Putting people who stopped looking for work in the unemployment rate — they leave the labor force entirely, which can make the rate look better.",
   "Treating GDP as a measure of wellbeing. It excludes unpaid work and ignores distribution.",
   "Confusing inflation (prices rising) with deflation (prices falling) and disinflation (prices still rising, just slower)."
  ],
  "cls": [
   "macro"
  ]
 }
];
