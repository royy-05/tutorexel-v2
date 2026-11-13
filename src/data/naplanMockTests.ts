export interface QuestionItem {
  n: number;
  a: boolean;
  s: string;
  o: string[];
  k: number;
  e: string;
  t?: string | null;
}

export interface WritingTask {
  g: string;
  t: string;
  b: string[];
  th: string[];
  r: string[];
  i: string | null;
}

export const QC: Record<string, QuestionItem[]> = {
  "3": [
    {
      "n": 1,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "strech",
        "streatch",
        "stretch",
        "sttretch"
      ],
      "k": 2,
      "e": "'Stretch' starts with the three-letter blend 'str' and ends with 'tch', which comes after a short vowel (like 'fetch' and 'match')."
    },
    {
      "n": 7,
      "a": false,
      "s": "Which word in this sentence is spelt incorrectly? “The children were excited because thier teacher brought a puppy to class.”",
      "o": [
        "thier",
        "children",
        "excited",
        "brought"
      ],
      "k": 0,
      "e": "The correct spelling is 'their' (e before i). It is the word that shows something belongs to them."
    },
    {
      "n": 27,
      "a": false,
      "s": "Which word correctly completes the sentence? “The girls in my class ________ netball every Friday.”",
      "o": [
        "plays",
        "playing",
        "play",
        "is play"
      ],
      "k": 2,
      "e": "The subject is 'the girls' (plural), not 'my class', so the verb must also be plural: 'The girls play'."
    },
    {
      "n": 2,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "bridge",
        "brige",
        "bridje",
        "brigde"
      ],
      "k": 0,
      "e": "After a short vowel, the /j/ sound at the end of a word is usually spelt 'dge', as in 'badge', 'edge' and 'fridge'."
    },
    {
      "n": 3,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "mashine",
        "machine",
        "macheen",
        "machene"
      ],
      "k": 1,
      "e": "In 'machine', the letters 'ch' make a /sh/ sound, and the long /ee/ sound at the end is spelt 'ine'."
    },
    {
      "n": 8,
      "a": false,
      "s": "One word in this sentence is spelt incorrectly. Which is the correct spelling of that word? “Mum put the hot plates on the tabel.”",
      "o": [
        "tabul",
        "taible",
        "table",
        "tabble"
      ],
      "k": 2,
      "e": "The incorrect word is 'tabel'. The /ul/ sound at the end of 'table' is spelt 'le', as in 'apple' and 'little'."
    },
    {
      "n": 28,
      "a": false,
      "s": "Which word correctly completes the sentence? “Yesterday, Tom ________ the ball with one hand.”",
      "o": [
        "catched",
        "catch",
        "catching",
        "caught"
      ],
      "k": 3,
      "e": "'Yesterday' tells us it happened in the past. 'Catch' is an irregular verb, so its past tense changes the word to 'caught'."
    },
    {
      "n": 29,
      "a": false,
      "s": "Which sentence is written correctly?",
      "o": [
        "Last week we went to the zoo and saw a lion.",
        "Last week we go to the zoo and see a lion.",
        "Last week we went to the zoo and see a lion.",
        "Last week we goes to the zoo and saw a lion."
      ],
      "k": 0,
      "e": "'Last week' is in the past, so both verbs must be in the past tense: 'went' and 'saw'."
    }
  ],
  "5": [
    {
      "n": 1,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "neccessary",
        "necesary",
        "necessary",
        "nessecary"
      ],
      "k": 2,
      "e": "'Necessary' has one c and a double s. A handy memory trick: one Collar and two Sleeves."
    },
    {
      "n": 7,
      "a": false,
      "s": "Which word correctly completes the sentence? “The baker took six golden ________ out of the oven.”",
      "o": [
        "loafs",
        "loafes",
        "loaves",
        "loavs"
      ],
      "k": 2,
      "e": "Many nouns ending in f or fe change to 'ves' in the plural: loaf → loaves, like leaf → leaves and knife → knives."
    },
    {
      "n": 27,
      "a": false,
      "s": "Which word correctly completes the sentence? “The box of chocolates ________ on the kitchen bench.”",
      "o": [
        "were",
        "are",
        "have been",
        "was"
      ],
      "k": 3,
      "e": "The subject is 'the box' (singular), not 'chocolates'. 'Of chocolates' only describes the box, so the verb is singular: 'was'."
    },
    {
      "n": 2,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "seperate",
        "separate",
        "separite",
        "seperete"
      ],
      "k": 1,
      "e": "There is 'a rat' in sep-a-rat-e. The second vowel is an a, not an e, even though it is hard to hear."
    },
    {
      "n": 3,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "rythm",
        "rhythem",
        "rhythm",
        "rhytham"
      ],
      "k": 2,
      "e": "'Rhythm' comes from Greek. It has a silent h after the r, uses y as a vowel, and has no vowel letter between 'th' and 'm'."
    },
    {
      "n": 8,
      "a": false,
      "s": "Which word correctly completes the sentence? “Dad peeled a bag of ________ for the roast.”",
      "o": [
        "potatoes",
        "potatos",
        "potatoe's",
        "potatoess"
      ],
      "k": 0,
      "e": "Some nouns ending in a consonant + o add 'es': potato → potatoes, tomato → tomatoes. Apostrophes are never used to make plurals."
    },
    {
      "n": 28,
      "a": false,
      "s": "Which word correctly completes the sentence? “Mia and her brother ________ both on the swimming team.”",
      "o": [
        "are",
        "is",
        "was",
        "has"
      ],
      "k": 0,
      "e": "A compound subject joined by 'and' (Mia and her brother) is plural, so it needs a plural verb: 'are'."
    },
    {
      "n": 29,
      "a": false,
      "s": "Which words correctly complete the sentence? “By the time we arrived at the cinema, the movie ________.”",
      "o": [
        "has already started",
        "already starts",
        "had already started",
        "was already start"
      ],
      "k": 2,
      "e": "The past perfect ('had started') shows that one past action happened before another past action (arriving)."
    }
  ],
  "7": [
    {
      "n": 1,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "accomodation",
        "acommodation",
        "accommadation",
        "accommodation"
      ],
      "k": 3,
      "e": "'Accommodation' has a double c AND a double m. Remember: it is big enough to accommodate two c's and two m's."
    },
    {
      "n": 7,
      "a": false,
      "s": "Which word correctly completes the sentence? “The final costs are expected to ________ the original budget.”",
      "o": [
        "exceed",
        "excede",
        "exseed",
        "exceede"
      ],
      "k": 0,
      "e": "Only three common English words end in '-ceed': exceed, proceed and succeed. Most others use '-cede' (precede) and one uses '-sede' (supersede)."
    },
    {
      "n": 27,
      "a": false,
      "s": "Which word correctly completes the sentence? “Neither the coach nor the players ________ aware of the rule change.”",
      "o": [
        "was",
        "were",
        "is",
        "has been"
      ],
      "k": 1,
      "e": "With 'neither … nor', the verb agrees with the subject closest to it. 'The players' is plural, so the verb is 'were'."
    },
    {
      "n": 2,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "embarassment",
        "embarrasment",
        "embarrassmant",
        "embarrassment"
      ],
      "k": 3,
      "e": "'Embarrass' has a double r and a double s, and the suffix '-ment' is added without change."
    },
    {
      "n": 3,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "priviledge",
        "privilege",
        "privelege",
        "privilage"
      ],
      "k": 1,
      "e": "There is no d in 'privilege'. The vowels are i-i-e-e: priv-i-leg-e."
    },
    {
      "n": 8,
      "a": false,
      "s": "Which word correctly completes the sentence? “The smell of freshly baked bread was ________.”",
      "o": [
        "irresistable",
        "irresistible",
        "irrisistible",
        "iresistible"
      ],
      "k": 1,
      "e": "ir + resist + ible. The prefix 'ir-' doubles the r, and 'resist' takes '-ible' (resistible, irresistible)."
    },
    {
      "n": 28,
      "a": false,
      "s": "Which word correctly completes the sentence? “Each of the students ________ responsible for their own equipment.”",
      "o": [
        "are",
        "were",
        "is",
        "have been"
      ],
      "k": 2,
      "e": "The subject is 'each' (singular), not 'students'. 'Of the students' is a phrase describing it, so the verb is singular."
    },
    {
      "n": 29,
      "a": false,
      "s": "Which word correctly completes the sentence? “After a long meeting, the committee ________ finally reached its decision.”",
      "o": [
        "have",
        "are",
        "has",
        "were"
      ],
      "k": 2,
      "e": "'The committee' is acting as a single unit (shown by 'its decision'), so it takes a singular verb: 'has'."
    }
  ],
  "9": [
    {
      "n": 1,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "consciencious",
        "conscientous",
        "consientious",
        "conscientious"
      ],
      "k": 3,
      "e": "'Conscientious' is built from 'conscience' + '-tious'. Note the 'sc' and the 'ti' that makes a /sh/ sound."
    },
    {
      "n": 7,
      "a": false,
      "s": "Which word correctly completes the sentence? “The new edition will ________ all earlier versions of the dictionary.”",
      "o": [
        "supersede",
        "supercede",
        "superseed",
        "superceed"
      ],
      "k": 0,
      "e": "'Supersede' is the only common English word ending in '-sede'. It comes from Latin 'supersedere' (to sit above)."
    },
    {
      "n": 27,
      "a": false,
      "s": "Which part of this sentence is an APPOSITIVE? “Ms Arora, the school's new principal, addressed the assembly on Monday.”",
      "o": [
        "Ms Arora",
        "addressed the assembly",
        "on Monday",
        "the school's new principal"
      ],
      "k": 3,
      "e": "An appositive is a noun phrase that renames the noun beside it. 'The school's new principal' renames 'Ms Arora' and is set off by commas."
    },
    {
      "n": 2,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "liason",
        "liasion",
        "liaison",
        "liaisen"
      ],
      "k": 2,
      "e": "'Liaison' (from French) has an i on both sides of the a: l-i-a-i-s-o-n."
    },
    {
      "n": 3,
      "a": true,
      "s": "Which is the correct spelling of the word you heard?",
      "o": [
        "beaurocracy",
        "bureaucracy",
        "bureacracy",
        "burocracy"
      ],
      "k": 1,
      "e": "'Bureaucracy' combines French 'bureau' (office) and Greek '-cracy' (rule). Keep 'bureau' intact: bureau + cracy."
    },
    {
      "n": 8,
      "a": false,
      "s": "Which word correctly completes the sentence? “The museum hopes to ________ the painting at auction.”",
      "o": [
        "aquire",
        "acquier",
        "acquire",
        "acqire"
      ],
      "k": 2,
      "e": "'Acquire' has a silent c before the q (ac + quire), as in 'acquaint' and 'acquit'."
    },
    {
      "n": 28,
      "a": false,
      "s": "What type of sentence is this? “Although the forecast predicted rain, the festival went ahead and the crowds were enormous.”",
      "o": [
        "compound-complex",
        "simple",
        "compound",
        "complex"
      ],
      "k": 0,
      "e": "It has two independent clauses joined by 'and' (the festival went ahead / the crowds were enormous) plus a dependent clause (Although the forecast predicted rain)."
    },
    {
      "n": 29,
      "a": false,
      "s": "Which option correctly combines these sentences using a relative clause? “The scientist won the award. Her research changed vaccine design.”",
      "o": [
        "The scientist whose research changed vaccine design won the award.",
        "The scientist, who research changed vaccine design, won the award.",
        "The scientist which research changed vaccine design won the award.",
        "The scientist won the award, her research changed vaccine design."
      ],
      "k": 0,
      "e": "'Whose' is the relative pronoun showing possession and it refers to a person. The last option creates a comma splice."
    }
  ]
};

export const QN: Record<string, QuestionItem[]> = {
  "3": [
    {
      "n": 1,
      "a": false,
      "s": "Which number is 100 less than ten thousand and nine?",
      "o": [
        "9909",
        "9009",
        "9999",
        "10 109"
      ],
      "k": 0,
      "e": "Ten thousand and nine is 10 009. Taking away 1 hundred gives 9909. 9009 takes away 1000, 9999 takes away only 10 and 10 109 adds 100."
    },
    {
      "n": 3,
      "a": false,
      "s": "Leo works out 58 + 37 by first finding 60 + 37 = 97. What must Leo do next to get the correct answer?",
      "o": [
        "add 2 to 97",
        "subtract 2 from 97",
        "subtract 3 from 97",
        "add 3 to 97"
      ],
      "k": 1,
      "e": "Leo added 2 too many when he changed 58 into 60, so he must take 2 away: 97 − 2 = 95, and 58 + 37 = 95."
    },
    {
      "n": 5,
      "a": false,
      "s": "Tom thinks of a number. He adds 286 to it and then subtracts 149. His answer is 500. What number did Tom think of?",
      "o": [
        "637",
        "935",
        "363",
        "65"
      ],
      "k": 2,
      "e": "Work backwards using the opposite operations: 500 + 149 = 649, then 649 − 286 = 363. Check: 363 + 286 = 649 and 649 − 149 = 500."
    },
    {
      "n": 7,
      "a": false,
      "s": "Juice boxes are sold in packs of 4. Each pack costs $3. How much will 28 juice boxes cost?",
      "o": [
        "$24",
        "$21",
        "$84",
        "$12"
      ],
      "k": 1,
      "e": "28 juice boxes is 28 ÷ 4 = 7 packs. 7 packs × $3 = $21."
    },
    {
      "n": 9,
      "a": false,
      "s": "Four ribbons have these lengths. Red: 1 m 5 cm. Blue: 98 cm. Green: 1 m 50 cm. Yellow: 115 cm. Which ribbon is the second longest?",
      "o": [
        "the red ribbon",
        "the yellow ribbon",
        "the blue ribbon",
        "the green ribbon"
      ],
      "k": 1,
      "e": "Change each length to centimetres: red 105 cm, blue 98 cm, green 150 cm and yellow 115 cm. From longest: green, yellow, red, blue. Yellow is second longest."
    },
    {
      "n": 11,
      "a": false,
      "s": "53 students are going on an excursion. 6 of the students travel in the school minibus. The rest travel in cars that can each carry 4 students. What is the smallest number of cars needed?",
      "o": [
        "11",
        "13",
        "14",
        "12"
      ],
      "k": 3,
      "e": "53 − 6 = 47 students go in cars. 47 ÷ 4 = 11 cars with 3 students left over. Those 3 students still need a car, so 12 cars are needed."
    },
    {
      "n": 13,
      "a": false,
      "s": "Which of these is the longest amount of time?",
      "o": [
        "2 hours",
        "7500 seconds",
        "130 minutes",
        "1 hour and 55 minutes"
      ],
      "k": 2,
      "e": "Change each to minutes: 2 hours = 120 minutes, 7500 seconds = 125 minutes, 1 hour and 55 minutes = 115 minutes. 130 minutes is the longest."
    },
    {
      "n": 15,
      "a": false,
      "s": "What number makes this number sentence true? 63 − ☐ = 28 + 17",
      "o": [
        "45",
        "108",
        "22",
        "18"
      ],
      "k": 3,
      "e": "28 + 17 = 45, so 63 − ☐ must also equal 45. 63 − 18 = 45, so the missing number is 18."
    }
  ],
  "5": [
    {
      "n": 1,
      "a": false,
      "s": "Which list shows these numbers in order from smallest to largest? 0.45, 0.054, 0.5, 0.405",
      "o": [
        "0.5, 0.45, 0.405, 0.054",
        "0.054, 0.45, 0.405, 0.5",
        "0.405, 0.45, 0.054, 0.5",
        "0.054, 0.405, 0.45, 0.5"
      ],
      "k": 3,
      "e": "Compare tenths first: 0.054 has 0 tenths, so it is smallest. 0.405, 0.45 and 0.5 have 4, 4 and 5 tenths. 0.405 has 0 hundredths and 0.45 has 5 hundredths, so 0.405 < 0.45 < 0.5."
    },
    {
      "n": 3,
      "a": false,
      "s": "Which number is divisible by both 3 and 4, but NOT divisible by 8?",
      "o": [
        "36",
        "48",
        "72",
        "30"
      ],
      "k": 0,
      "e": "36 ÷ 3 = 12 and 36 ÷ 4 = 9, but 36 ÷ 8 leaves a remainder. 48 and 72 are both divisible by 8, and 30 is not divisible by 4."
    },
    {
      "n": 5,
      "a": false,
      "s": "Which number has exactly three factors?",
      "o": [
        "15",
        "49",
        "21",
        "27"
      ],
      "k": 1,
      "e": "49 has the factors 1, 7 and 49, which is exactly three. 15 (1, 3, 5, 15) and 21 (1, 3, 7, 21) have four factors, and 27 (1, 3, 9, 27) also has four."
    },
    {
      "n": 7,
      "a": false,
      "s": "A pizza is cut into 8 equal slices. Tom eats 25% of the pizza and Ana eats 3/8 of the pizza. How many slices are left?",
      "o": [
        "4",
        "5",
        "2",
        "3"
      ],
      "k": 3,
      "e": "25% is one quarter, and one quarter of 8 slices is 2 slices. 3/8 of 8 slices is 3 slices. 8 − 2 − 3 = 3 slices are left."
    },
    {
      "n": 9,
      "a": false,
      "s": "Which of these is the largest?",
      "o": [
        "0.3",
        "28%",
        "1/4",
        "0.205"
      ],
      "k": 0,
      "e": "Change each to hundredths: 0.3 = 30 hundredths, 28% = 28 hundredths, 1/4 = 25 hundredths and 0.205 is about 20 hundredths. 0.3 is the largest."
    },
    {
      "n": 11,
      "a": false,
      "s": "A water tank is 7/10 full. Some water is used, which is 1/5 of the tank's full amount. Then rain adds 3/10 of the tank's full amount. How full is the tank now?",
      "o": [
        "8/10 full",
        "9/10 full",
        "6/10 full",
        "1/2 full"
      ],
      "k": 0,
      "e": "1/5 is the same as 2/10. 7/10 − 2/10 = 5/10. Then 5/10 + 3/10 = 8/10, so the tank is 8/10 full."
    },
    {
      "n": 13,
      "a": false,
      "s": "A school buys 38 boxes of pencils. Each box holds 24 pencils. How many pencils does the school buy?",
      "o": [
        "912",
        "852",
        "902",
        "812"
      ],
      "k": 0,
      "e": "38 × 24 = 38 × 20 + 38 × 4 = 760 + 152 = 912."
    },
    {
      "n": 15,
      "a": false,
      "s": "Four friends share $75 equally. How much money does each friend get?",
      "o": [
        "$18.30",
        "$18.75",
        "$18.25",
        "$19.00"
      ],
      "k": 1,
      "e": "75 ÷ 4 = 18 remainder 3. The $3 left over is shared too: $3 ÷ 4 = 75 cents. Each friend gets $18.75."
    }
  ],
  "7": [
    {
      "n": 1,
      "a": false,
      "s": "A square has an area of 169 cm². What is the perimeter of the square?",
      "o": [
        "52 cm",
        "13 cm",
        "26 cm",
        "84.5 cm"
      ],
      "k": 0,
      "e": "The side length is √169 = 13 cm, because 13 × 13 = 169. The perimeter is 4 × 13 = 52 cm."
    },
    {
      "n": 2,
      "a": false,
      "s": "Which number is equal to 4 × 10³ + 6 × 10¹ + 2 × 10⁰?",
      "o": [
        "4602",
        "4062",
        "462",
        "40 062"
      ],
      "k": 1,
      "e": "4 × 10³ = 4000, 6 × 10¹ = 60 and 2 × 10⁰ = 2 × 1 = 2. 4000 + 60 + 2 = 4062. There are no hundreds."
    },
    {
      "n": 4,
      "a": false,
      "s": "What is the value of −8 − (−3) + 5 − 11 ?",
      "o": [
        "−3",
        "−27",
        "−11",
        "1"
      ],
      "k": 2,
      "e": "Subtracting −3 is the same as adding 3: −8 + 3 = −5. Then −5 + 5 = 0, and 0 − 11 = −11."
    },
    {
      "n": 5,
      "a": false,
      "s": "What is 2 2/3 ÷ 4/9 ?",
      "o": [
        "1 5/27",
        "6",
        "1 1/6",
        "3/2"
      ],
      "k": 1,
      "e": "2 2/3 = 8/3. Dividing by 4/9 is the same as multiplying by 9/4: 8/3 × 9/4 = 72/12 = 6."
    },
    {
      "n": 7,
      "a": false,
      "s": "Solve for x: 5x − 7 = 3x + 15",
      "o": [
        "x = 4",
        "x = 22",
        "x = 2",
        "x = 11"
      ],
      "k": 3,
      "e": "Take 3x from both sides: 2x − 7 = 15. Add 7 to both sides: 2x = 22. So x = 11. Check: 5 × 11 − 7 = 48 and 3 × 11 + 15 = 48."
    },
    {
      "n": 8,
      "a": false,
      "s": "What is 35% of 260?",
      "o": [
        "90",
        "91",
        "81",
        "96"
      ],
      "k": 1,
      "e": "10% of 260 is 26, so 30% is 78. 5% is half of 10%, which is 13. 35% = 78 + 13 = 91."
    },
    {
      "n": 10,
      "a": false,
      "s": "Round 3.4972 to two decimal places.",
      "o": [
        "3.49",
        "3.40",
        "3.50",
        "3.497"
      ],
      "k": 2,
      "e": "Look at the third decimal place, which is 7. That is 5 or more, so round 3.49 up to 3.50. Both decimal places must be shown."
    },
    {
      "n": 12,
      "a": false,
      "s": "A number is written as 2³ × 3² × 5. Which of these is NOT a factor of this number?",
      "o": [
        "40",
        "50",
        "45",
        "72"
      ],
      "k": 1,
      "e": "2³ × 3² × 5 = 360. 40 = 2³ × 5, 45 = 3² × 5 and 72 = 2³ × 3² are all factors. 50 = 2 × 5² needs two 5s, but there is only one, so 50 is not a factor."
    }
  ],
  "9": [
    {
      "n": 1,
      "a": false,
      "s": "Simplify (2x³y²)³ ÷ (4x⁵y)",
      "o": [
        "1.5x⁴y⁵",
        "2xy⁵",
        "2x⁴y⁶",
        "2x⁴y⁵"
      ],
      "k": 3,
      "e": "(2x³y²)³ = 2³ × x⁹ × y⁶ = 8x⁹y⁶. Dividing by 4x⁵y: 8 ÷ 4 = 2, x⁹ ÷ x⁵ = x⁴ and y⁶ ÷ y = y⁵. The answer is 2x⁴y⁵."
    },
    {
      "n": 2,
      "a": false,
      "s": "What is the value of 3⁻² × 9² ÷ 27 ?",
      "o": [
        "3",
        "1/27",
        "9",
        "1/3"
      ],
      "k": 3,
      "e": "Write everything as a power of 3: 3⁻² × (3²)² ÷ 3³ = 3⁻² × 3⁴ ÷ 3³ = 3⁻²⁺⁴⁻³ = 3⁻¹ = 1/3."
    },
    {
      "n": 3,
      "a": false,
      "s": "Expand and simplify (x − 5)(x + 3) − (x − 2)²",
      "o": [
        "−2x − 11",
        "2x − 19",
        "2x − 11",
        "−6x − 19"
      ],
      "k": 1,
      "e": "(x − 5)(x + 3) = x² − 2x − 15. (x − 2)² = x² − 4x + 4. Subtracting: x² − 2x − 15 − x² + 4x − 4 = 2x − 19."
    },
    {
      "n": 4,
      "a": false,
      "s": "Which shows x² − 3x − 40 fully factorised?",
      "o": [
        "(x − 8)(x + 5)",
        "(x + 8)(x − 5)",
        "(x − 10)(x + 4)",
        "(x − 4)(x + 10)"
      ],
      "k": 0,
      "e": "Find two numbers that multiply to −40 and add to −3. These are −8 and +5, so x² − 3x − 40 = (x − 8)(x + 5)."
    },
    {
      "n": 6,
      "a": false,
      "s": "What are the solutions of x² + 2x − 35 = 0 ?",
      "o": [
        "x = −5 or x = 7",
        "x = 5 or x = −7",
        "x = 5 or x = 7",
        "x = 35 or x = −1"
      ],
      "k": 1,
      "e": "Factorise: x² + 2x − 35 = (x + 7)(x − 5) = 0. So x + 7 = 0 or x − 5 = 0, which gives x = −7 or x = 5."
    },
    {
      "n": 7,
      "a": false,
      "s": "Which of these numbers is irrational?",
      "o": [
        "√1.44",
        "0.333… (recurring)",
        "√48",
        "22/7"
      ],
      "k": 2,
      "e": "√1.44 = 1.2, 0.333… = 1/3 and 22/7 are all rational because they can be written as fractions. 48 is not a perfect square, so √48 = 4√3 is irrational."
    },
    {
      "n": 8,
      "a": false,
      "s": "What is the gradient of the line segment joining the points (−2, 5) and (4, −4)?",
      "o": [
        "−3/2",
        "−2/3",
        "3/2",
        "−1/6"
      ],
      "k": 0,
      "e": "Gradient = rise ÷ run = (−4 − 5) ÷ (4 − (−2)) = −9 ÷ 6 = −3/2."
    },
    {
      "n": 10,
      "a": false,
      "s": "Plan A costs $20 a month plus 50 cents per minute of calls. Plan B costs $5 a month plus $1.25 per minute. Jo makes about 44 minutes of calls each month. How much will she save in a year by choosing the cheaper plan?",
      "o": [
        "$18",
        "$180",
        "$216",
        "$252"
      ],
      "k": 2,
      "e": "Plan A: 20 + 0.5 × 44 = $42 a month. Plan B: 5 + 1.25 × 44 = $60 a month. Plan A saves $18 a month, which is 12 × $18 = $216 a year."
    }
  ]
};

export const QR: Record<string, QuestionItem[]> = {
  "3": [
    {
      "n": 1,
      "a": false,
      "t": "The Kite That Would Not Fly",
      "s": "Why did Pop place the scissors on the rock instead of telling Mia what was wrong with her kite?",
      "o": [
        "He wanted Mia to work out the problem on her own.",
        "He was too tired to help Mia fix the kite.",
        "He wanted Mia to cut the string and go home.",
        "He did not know how to fix the kite himself."
      ],
      "k": 0,
      "e": "Pop's last words, “some things you have to find out for yourself”, show he left the scissors as a quiet hint so Mia could solve the problem herself. He also 'grinned as if he had known all along', so he did know the answer."
    },
    {
      "n": 2,
      "a": false,
      "t": "The Kite That Would Not Fly",
      "s": "The writer says the kite “slumped to the ground like a tired dog”. What does this comparison tell the reader?",
      "o": [
        "The kite was chased around the hill by a dog.",
        "The kite flopped down heavily, with no energy.",
        "The kite floated down slowly and softly.",
        "The kite made a loud barking sound as it fell."
      ],
      "k": 1,
      "e": "This is a simile. A tired dog flops down heavily and without energy, so the writer is showing the kite dropped limply instead of flying."
    },
    {
      "n": 3,
      "a": false,
      "t": "The Kite That Would Not Fly",
      "s": "“Mia's cheeks burned.” How was Mia most likely feeling at this moment?",
      "o": [
        "embarrassed",
        "excited",
        "confused",
        "sunburnt"
      ],
      "k": 0,
      "e": "Her cheeks burned straight after the boys stopped to watch and one laughed. Red, hot cheeks show embarrassment, not a real burn from the sun."
    },
    {
      "n": 4,
      "a": false,
      "t": "The Kite That Would Not Fly",
      "s": "Which word best describes Pop in this story?",
      "o": [
        "impatient",
        "forgetful",
        "wise",
        "strict"
      ],
      "k": 2,
      "e": "Pop knew what was wrong but let Mia discover it, and he explains that some things you must find out for yourself. This shows he is wise. He is calm, not impatient or strict."
    },
    {
      "n": 5,
      "a": false,
      "t": null,
      "s": "The writer wants to add this sentence to the text: “Echidnas can even swim across rivers to escape a bushfire.” Under which heading does it belong?",
      "o": [
        "Where do echidnas live?",
        "How do echidnas stay safe?",
        "What do echidnas eat?",
        "Baby echidnas"
      ],
      "k": 1,
      "e": "Swimming away from a bushfire is a way of escaping danger, so it fits with the other facts about keeping safe (digging down and curling into a ball)."
    },
    {
      "n": 6,
      "a": false,
      "t": null,
      "s": "Why does the writer call the echidna a monotreme?",
      "o": [
        "because it is covered in sharp spines",
        "because it lives all over Australia",
        "because it has no teeth in its mouth",
        "because it is a mammal that lays eggs"
      ],
      "k": 3,
      "e": "The first section explains that mammals that lay eggs are called monotremes. Spines, having no teeth and living all over Australia are true facts, but they are not why it is a monotreme."
    },
    {
      "n": 7,
      "a": false,
      "t": null,
      "s": "“The echidna then grinds the insects between hard pads in its mouth.” Which word could replace grinds without changing the meaning?",
      "o": [
        "swallows",
        "crushes",
        "catches",
        "licks"
      ],
      "k": 1,
      "e": "To grind something is to crush it into small pieces. The tongue catches and licks the insects first, and the pads then crush them."
    },
    {
      "n": 8,
      "a": false,
      "t": null,
      "s": "An echidna is frightened while walking across soft, sandy soil. What does the text suggest it will do?",
      "o": [
        "curl into a tight, prickly ball",
        "run quickly to a hollow log",
        "flick its tongue to scare the predator",
        "dig straight down until only its spines show"
      ],
      "k": 3,
      "e": "The text says echidnas dig straight down when the soil is soft. They curl into a ball only when the ground is too hard to dig, and they do not run away."
    }
  ],
  "5": [
    {
      "n": 1,
      "a": false,
      "t": "The Solo",
      "s": "Why does Ana say her violin bow “felt like a slippery fish”?",
      "o": [
        "The bow had been polished just before the concert.",
        "Her hands were so sweaty with nerves that the bow was hard to grip.",
        "She was holding the bow the wrong way around.",
        "The bow kept moving because the hall was so warm."
      ],
      "k": 1,
      "e": "The story begins by saying her hands had been sweating since lunchtime. The simile shows how nervous she was: the bow felt as hard to hold as a wet, wriggling fish."
    },
    {
      "n": 2,
      "a": false,
      "t": "The Solo",
      "s": "“The hall lights were so bright that the audience was just a dark sea.” What does this metaphor suggest?",
      "o": [
        "The audience was moving around restlessly.",
        "Ana could not see individual faces in the audience.",
        "The hall was beside the ocean.",
        "The audience was wearing dark-coloured clothes."
      ],
      "k": 1,
      "e": "Bright stage lights make it hard to see beyond the stage, so the audience blurred into one dark shape, like the surface of the sea."
    },
    {
      "n": 3,
      "a": false,
      "t": "The Solo",
      "s": "What caused Ana to forget the music?",
      "o": [
        "Mr Delaney called out the wrong name.",
        "Baba arrived late and distracted her.",
        "The stage lights suddenly went out.",
        "Her first note squeaked and someone laughed."
      ],
      "k": 3,
      "e": "Cause and effect: the squeaky first note made someone giggle, her face went hot, and then her mind 'became a blank whiteboard'."
    },
    {
      "n": 4,
      "a": false,
      "t": "The Solo",
      "s": "Which statement best describes the theme of this story?",
      "o": [
        "The quiet support of someone who loves us can help us overcome fear.",
        "Winning a prize is the only way to prove you are talented.",
        "Practising music in the kitchen annoys other people.",
        "It is best not to perform in front of a large crowd."
      ],
      "k": 0,
      "e": "Baba's humming, which came from weeks of listening to Ana practise, helped Ana recover. The story celebrates this support, not winning (Ana did not win a prize)."
    },
    {
      "n": 5,
      "a": false,
      "t": "The Solo",
      "s": "Baba says, “I'm not crying. This hall is just very dusty.” What does this suggest about Baba?",
      "o": [
        "She is upset that Ana did not win a prize.",
        "She thinks the school should clean the hall.",
        "She is moved by Ana's performance but does not want to admit it.",
        "She has an allergy that makes her eyes water."
      ],
      "k": 2,
      "e": "Baba is clearly crying (she takes the handkerchief back and dabs her eyes). Blaming the dust is a playful excuse that hides how proud and emotional she feels."
    },
    {
      "n": 6,
      "a": false,
      "t": null,
      "s": "Which PROBLEM do pneumatophores help mangroves solve?",
      "o": [
        "The mud around their roots has very little oxygen.",
        "Their roots are covered in salty water.",
        "Storm waves wash the shoreline away.",
        "Young fish need somewhere safe to grow."
      ],
      "k": 0,
      "e": "The section 'Breathing underwater' states the problem (mud has very little oxygen) and the solution (pneumatophores poke up to take in air like a snorkel)."
    },
    {
      "n": 7,
      "a": false,
      "t": null,
      "s": "In the section 'Protecting the coast', which words signal that the writer is explaining an EFFECT?",
      "o": [
        "When storms strike",
        "Their tangle of roots",
        "than those without them",
        "As a result"
      ],
      "k": 3,
      "e": "'As a result' is a text connective that introduces a consequence: because roots slow waves and trap mud, communities suffer less damage."
    },
    {
      "n": 8,
      "a": false,
      "t": null,
      "s": "Why does the writer mention that people once saw mangroves as “smelly, mosquito-filled wastelands”?",
      "o": [
        "to warn readers not to visit mangrove swamps",
        "to show that mangroves are found only in hot places",
        "to contrast an old, mistaken view with what scientists now know",
        "to explain why mangroves are being cleared today"
      ],
      "k": 2,
      "e": "The next sentence begins 'Today, scientists know…'. The writer sets up the old view so the reader can see how wrong it was, which makes the rest of the text more convincing."
    }
  ],
  "7": [
    {
      "n": 1,
      "a": false,
      "t": "The Stonecutter",
      "s": "What causes Hashiru to become dissatisfied after EACH transformation?",
      "o": [
        "He misses the money he earned as a stonecutter.",
        "The mountain spirit punishes him for being greedy.",
        "He discovers something that seems more powerful than what he has become.",
        "Other people complain about the harm he is causing."
      ],
      "k": 2,
      "e": "The tale follows a repeated pattern: the sun overpowers the merchant, the cloud blocks the sun, the mountain resists the cloud. Each time Hashiru meets something stronger, he wishes to become it."
    },
    {
      "n": 2,
      "a": false,
      "t": "The Stonecutter",
      "s": "How is this story structured?",
      "o": [
        "It is circular: it ends where it began, but the main character has changed.",
        "It begins at the end and then flashes back to explain events.",
        "It is told by several narrators who each describe one event.",
        "It moves from the most powerful character to the least powerful."
      ],
      "k": 0,
      "e": "Hashiru starts and finishes as a stonecutter climbing to the cliff face, but at the end he is truly content. The circular structure highlights how his attitude, not his situation, has changed."
    },
    {
      "n": 3,
      "a": false,
      "t": "The Stonecutter",
      "s": "“Hashiru looked down at his cracked hands.” Why does the author include this detail straight after describing the merchant?",
      "o": [
        "to show that Hashiru has injured himself while working",
        "to suggest that Hashiru is too shy to look at the merchant",
        "to explain why Hashiru cannot hold his chisel properly",
        "to show Hashiru comparing his hard life with the merchant's comfort"
      ],
      "k": 3,
      "e": "The merchant is fanned and carried; Hashiru's hands are cracked from labour. The contrast shows the moment envy begins, without the author needing to state it."
    },
    {
      "n": 4,
      "a": false,
      "t": "The Stonecutter",
      "s": "What is ironic about the ending of the story?",
      "o": [
        "The 'most powerful thing in the world' is worn away by the humble job Hashiru first rejected.",
        "The mountain spirit becomes a stonecutter at the end of the story.",
        "Hashiru becomes richer than the merchant he once envied.",
        "The sun turns out to be stronger than the mountain after all."
      ],
      "k": 0,
      "e": "Irony occurs when the outcome is the opposite of what is expected. Hashiru thought the mountain was supreme, yet a lowly stonecutter (what he once was) can defeat it."
    },
    {
      "n": 5,
      "a": false,
      "t": "The Stonecutter",
      "s": "Which statement best expresses the theme of this tale?",
      "o": [
        "Hard work always leads to wealth and fame.",
        "True contentment comes from valuing what you already have.",
        "Nature is more powerful than human beings.",
        "It is dangerous to ask spirits for help."
      ],
      "k": 1,
      "e": "Hashiru's chase for power brings no lasting happiness. He finds peace only when he returns to his own life and sees its worth."
    },
    {
      "n": 6,
      "a": false,
      "t": null,
      "s": "What is the main purpose of the review's first paragraph?",
      "o": [
        "to summarise the events of the novel from start to finish",
        "to describe the author's life and earlier novels",
        "to list the weaknesses the reviewer found in the novel",
        "to compare the novel with others of its type and hint at the reviewer's view"
      ],
      "k": 3,
      "e": "The opening places the book among 'dystopian thrillers' and says its quietness is a strength, which sets up the reviewer's overall positive judgement."
    },
    {
      "n": 7,
      "a": false,
      "t": null,
      "s": "Which option best describes how the review is organised?",
      "o": [
        "plot summary → weaknesses → context → strengths → final judgement",
        "context → plot summary → strengths → weaknesses → final judgement",
        "strengths → weaknesses → plot summary → context → final judgement",
        "final judgement → strengths → plot summary → weaknesses → context"
      ],
      "k": 1,
      "e": "Reviews typically move from context, to a summary, to evaluation (praise, then criticism), and finish with a recommendation. This review follows that pattern paragraph by paragraph."
    },
    {
      "n": 8,
      "a": false,
      "t": null,
      "s": "The reviewer says the sibling relationship “rings truer” than others in the genre. This means it",
      "o": [
        "contains more dialogue and noise.",
        "is described in more detail.",
        "ends more happily than other stories.",
        "seems more realistic and believable."
      ],
      "k": 3,
      "e": "To 'ring true' is an idiom meaning to seem genuine. The reviewer praises the realistic mix of bickering and tenderness."
    }
  ],
  "9": [
    {
      "n": 1,
      "a": false,
      "t": "Last Haul",
      "s": "“Saturday. One word, and thirty years folded up like a chart.” What does the simile suggest?",
      "o": [
        "The family is planning a sea voyage for Saturday.",
        "A long chapter of the family's life is being closed and put away.",
        "Nell's father has kept detailed records for thirty years.",
        "The boat will be repaired and repainted by Saturday."
      ],
      "k": 1,
      "e": "A chart folded up is no longer in use. The simile, drawn from the world of sailing, shows that three decades of fishing life are ending with a single word."
    },
    {
      "n": 2,
      "a": false,
      "t": "Last Haul",
      "s": "Why does the author present “Saturday.” as a sentence fragment that stands alone?",
      "o": [
        "to give the word weight and finality, echoing the father's silence",
        "to show that Nell has misheard her father",
        "to correct a grammatical error in the dialogue",
        "to suggest that the sale might still be cancelled"
      ],
      "k": 0,
      "e": "Isolating the word slows the reader down and mirrors the father's brief, emotionless announcement. The deliberate fragment carries the shock that neither character says aloud."
    },
    {
      "n": 3,
      "a": false,
      "t": "Last Haul",
      "s": "What does the detail about the co-op sign, with the S crossed out, reveal?",
      "o": [
        "The co-op has recently increased its opening hours.",
        "Someone vandalised the sign as a joke.",
        "The co-op is now run by tourists from the city.",
        "The local fishing industry has declined even further."
      ],
      "k": 3,
      "e": "'OPEN THURSDAYS' becoming 'OPEN THURSDAY' suggests even fewer opening days. Together with '40 people' two years ago and gulls fighting over scraps 'that no longer came', it signals a dying industry."
    },
    {
      "n": 4,
      "a": false,
      "t": "Last Haul",
      "s": "“Instead she felt something heavier and quieter, like water filling a hold.” What does this suggest about Nell's feelings?",
      "o": [
        "She is frightened that the boat is about to sink.",
        "She feels calm and relieved that the sale is over.",
        "Her sadness is deep and slowly growing rather than sudden and angry.",
        "She is planning to stop the sale by damaging the boat."
      ],
      "k": 2,
      "e": "Water filling a hold rises gradually and weighs a boat down. The image, again from the fishing world, contrasts slow, heavy grief with the quick heat of anger."
    },
    {
      "n": 5,
      "a": false,
      "t": "Last Haul",
      "s": "What does the hand-spliced rope most likely symbolise?",
      "o": [
        "the money the family will receive from the sale",
        "the danger of working on fishing boats",
        "the bond and knowledge passed from father to daughter",
        "the father's wish to keep the boat forever"
      ],
      "k": 2,
      "e": "The father 'tried to teach her that splice'. When they finally complete it together, the rope becomes a symbol of what can still be handed on even though the boat cannot."
    },
    {
      "n": 6,
      "a": false,
      "t": "Last Haul",
      "s": "The story ends: “The splice was a little uneven in places. It would hold.” What is the most likely double meaning?",
      "o": [
        "The rope will need to be replaced before the sale.",
        "Though imperfect, the rope and their relationship will survive the loss.",
        "Nell will become a better fisher than her father.",
        "The new owner will keep the boat exactly as it is."
      ],
      "k": 1,
      "e": "On the surface, the rope is strong enough. Symbolically, father and daughter, and their connection, are 'a little uneven' but will endure despite losing the Marguerite."
    },
    {
      "n": 7,
      "a": false,
      "t": null,
      "s": "A 'score' is twenty, so “four score and seven years” means 87 years. Why does Lincoln use this phrase instead of simply saying “87 years ago”?",
      "o": [
        "Its old-fashioned, Biblical sound gives the opening a solemn, almost sacred tone.",
        "It was the only way to express numbers in the 1800s.",
        "It makes the date easier for the audience to calculate.",
        "It hides the exact age of the nation from his enemies."
      ],
      "k": 0,
      "e": "The phrase alludes to the language of the King James Bible (e.g. 'threescore years and ten'). This elevated style suits a ceremony honouring the dead and frames the nation's founding as something sacred."
    },
    {
      "n": 8,
      "a": false,
      "t": null,
      "s": "“we can not dedicate - we can not consecrate - we can not hallow - this ground.” What is the main effect of this sentence?",
      "o": [
        "It shows that Lincoln has run out of ideas for his speech.",
        "It explains three different legal meanings of the word 'ground'.",
        "It suggests that the cemetery should not have been built.",
        "The repeated structure builds intensity, stressing that words cannot match the soldiers' sacrifice."
      ],
      "k": 3,
      "e": "Three parallel phrases (a tricolon with repetition of 'we can not') rise in intensity from 'dedicate' to the more sacred 'hallow'. The point: the soldiers, not the speakers, have made the ground holy."
    }
  ]
};

export const PAS: Record<string, Record<string, string>> = {
  "3": {
    "The Kite That Would Not Fly": "The Kite That Would Not Fly\n\nEvery Saturday, Mia's grandfather, Pop, walked with her to the windy hill behind the dairy. This Saturday, Mia carried something special: a kite she had built herself from newspaper, two thin sticks and a long tail of knotted rags.\n\n“It's a bit heavy,” Pop said gently, testing it in his hands.\n\nMia frowned. “It's perfect,” she said.\n\nShe ran down the slope with the string trailing behind her. The kite lifted, wobbled, then nosedived into the grass. She tried again. And again. Each time, the kite slumped to the ground like a tired dog.\n\nMia's cheeks burned. Two older boys on bikes had stopped to watch. One of them laughed.\n\nPop sat on a rock and said nothing. He simply took a pair of scissors from his pocket and placed them on the rock beside him.\n\nMia stared at the scissors for a long moment. Then she stared at her kite's long, heavy tail. Slowly, she picked up the scissors and snipped off three of the rag knots.\n\nThis time, when she ran, the kite climbed. It rose above the gum trees, above the dairy roof, until it was just a speck of newsprint against the clouds.\n\nThe boys on the bikes clapped. Mia didn't notice. She was looking at Pop, who was grinning as if he had known all along.\n\n“Did you know what was wrong?” she asked.\n\n“Maybe,” said Pop. “But some things you have to find out for yourself.”"
  },
  "5": {
    "The Solo": "The Solo\n\nMy hands had been sweating since lunchtime. By the time Mr Delaney called my name, my violin bow felt like a slippery fish.\n\n“Ana Petrović,” he announced, peering at his clipboard. “Year 5. ‘Autumn Song’.”\n\nI walked to the centre of the stage. The hall lights were so bright that the audience was just a dark sea, but I knew Baba was somewhere in the third row. She had caught two buses to get here, and she had brought the embroidered handkerchief she always carried to important occasions.\n\nI tucked the violin under my chin and played the first note. It squeaked - a thin, mouse-like squeal that made someone in the front row giggle.\n\nMy face went hot. My mind, which had known every note of ‘Autumn Song’ only an hour ago, became a blank whiteboard. I stood frozen, the bow hovering above the strings.\n\nThen, from somewhere in the darkness, I heard humming. It was low and a little out of tune, but it was unmistakably the opening of ‘Autumn Song’. Baba had hummed along every evening for six weeks while I practised in the kitchen. She had heard it so often that she probably knew it better than I did.\n\nI closed my eyes, followed the humming, and began again.\n\nThis time the notes came out round and warm. I played the slow middle section, then the quick, skipping ending, and when I finally lowered the bow, the hall erupted.\n\nI didn't win first prize. I didn't even win second. But when I found Baba afterwards, she pressed the handkerchief into my hand - and then, realising she needed it more than I did, took it straight back.\n\n“Why are you crying, Baba?” I asked.\n\n“I'm not crying,” she said, dabbing her eyes. “This hall is just very dusty.”"
  },
  "7": {
    "The Stonecutter": "The Stonecutter\n\nA retelling of a traditional Japanese tale\n\nAt the foot of a great mountain lived a stonecutter named Hashiru. Every morning he climbed to the cliff face with his chisel and hammer, and every evening he walked home with aching arms and a pocket of copper coins. For many years, he was content.\n\nOne sweltering afternoon, a grand procession wound past his worksite. At its centre, carried on a gilded chair beneath a silk umbrella, sat a wealthy merchant. Servants fanned him; musicians played as he passed. Hashiru looked down at his cracked hands.\n\n“If only I were that merchant,” he sighed, “I would never have to work again.”\n\nThe mountain spirit, who had listened to Hashiru's work songs for years, heard him. In a blink, Hashiru found himself on the gilded chair.\n\nFor a while, he was delighted. But as the procession crawled along the dusty road, the sun beat down until sweat soaked his fine robes. Not even the silk umbrella could keep the heat away.\n\n“The sun is mightier than any merchant,” he thought. “I wish I were the sun.”\n\nAnd so he was. He blazed over rice fields until they cracked and over rivers until they shrank. People cursed him, and he laughed - until a heavy cloud drifted beneath him and blocked his light completely.\n\n“A cloud can defeat the sun!” he cried. “Let me be a cloud.”\n\nAs a cloud, Hashiru poured rain on the land for days. Villages flooded; bridges were swept away. Yet one thing did not move: the mountain. The rain simply ran off its sides.\n\n“Nothing is stronger than the mountain,” Hashiru declared. “I wish to be the mountain.”\n\nAt once he stood tall and immovable, his head above the clouds and his feet deep in the earth. Neither sun nor storm could trouble him. At last, he thought, I am the most powerful thing in the world.\n\nThen he felt it: a small, sharp tap at his feet. Then another. And another. Far below, a tiny figure was cutting into his side, piece by patient piece.\n\nIt was a stonecutter.\n\nHashiru understood. “Then let me be a stonecutter again,” he whispered.\n\nThe next morning, a man climbed to the cliff face with his chisel and hammer. His arms still ached at the end of the day, and his pockets still held only copper coins. But when he looked up at the mountain, he smiled, and he never wished to be anything else."
  },
  "9": {
    "Last Haul": "Last Haul\n\nThe Marguerite had been for sale for eleven weeks before anyone wanted her.\n\nNell found out at breakfast, the way she found out most things in that house: through what wasn't said. Her father ate standing up, staring out at the harbour, and when her mother asked whether he'd heard from the broker, he only nodded. Then he rinsed his cup, set it upside down on the rack, and said, ‘Saturday.’\n\nSaturday. One word, and thirty years folded up like a chart.\n\nOn Friday afternoon Nell walked down to the marina alone. The Marguerite sat low at her mooring, paint peeling from her hull in long pale curls, her name half-scoured away by salt. To anyone else she was a tired old trawler. To Nell she was the smell of diesel and bait on her father's jacket; the sound of the engine coughing to life at four in the morning; the wooden step he'd built so a seven-year-old could see over the wheel.\n\nShe climbed aboard. The deck creaked its familiar complaint. In the wheelhouse, everything was where it had always been: the cracked radio, the faded tide chart, the coil of rope her father had spliced by hand, each knot tight and even as a row of teeth. Nell ran her thumb along it. He had tried to teach her that splice a dozen times. She had never quite got it.\n\nThrough the salt-smeared glass she watched the gulls. They wheeled above the fish co-op, shrieking, fighting over scraps that no longer came. Two years ago the co-op had employed forty people. Now the sign out the front said OPEN THURSDAYS, and someone had crossed out the S.\n\nNell thought about the buyer - a man from the city, her mother said, who planned to strip out the fish hold and turn the Marguerite into a pleasure boat for tourists. Sunset cruises. Champagne. She imagined strangers in white shoes leaning on the rail where her father had hauled nets until his palms split.\n\nShe should have been angry. Instead she felt something heavier and quieter, like water filling a hold.\n\nFootsteps on the jetty. She knew them before she turned around.\n\nHer father stood on the dock, hands in his pockets. For a long moment he didn't speak. Then he stepped aboard, ducked into the wheelhouse and stood beside her, close enough that she could smell the diesel that would never quite wash out of his jacket.\n\n‘Your grandfather bought her the year I was born,’ he said. ‘Paid for her with a loan the bank didn't want to give him.’\n\n‘I know.’\n\n‘Thought I'd be the one to hand her on to you.’ He gave a short laugh that wasn't really a laugh. ‘Turns out the sea had other plans.’\n\nNell didn't answer. Instead she lifted the coil of rope from its hook and held it out to him.\n\nHe looked at it, then at her. Without a word, he unpicked the last few strands and began again, slowly this time, his scarred fingers guiding hers. Over, under, tuck. Over, under, tuck.\n\nThe light outside turned the colour of rust. Below them, the tide was going out.\n\nWhen they finally walked back up the jetty, Nell carried the rope over her shoulder. The splice was a little uneven in places. It would hold."
  }
};

export const QW: Record<string, WritingTask> = {
  "3": {
    "g": "Narrative",
    "t": "40 minutes (handwritten)",
    "b": [
      "Today you are going to write a narrative or story.",
      "The idea for your story is:",
      "The Door in the Tree",
      "One morning, you notice a small red door at the bottom of a tree you have walked past many times before. The door is open just a crack, and a warm, golden light is glowing inside.",
      "Who or what is behind the door? What happens when it opens?"
    ],
    "th": [
      "the characters and where they are",
      "the complication or problem to be solved",
      "how the story will end"
    ],
    "r": [
      "plan your story before you start",
      "write in sentences",
      "use paragraphs to organise your ideas",
      "choose your words carefully to describe the characters and the setting",
      "pay attention to your spelling and punctuation",
      "check and edit your writing when you have finished"
    ],
    "i": "/images/mock-tests/year-3-writing.webp"
  },
  "5": {
    "g": "Persuasive",
    "t": "42 minutes: 5 minutes planning, 30 minutes writing, 7 minutes editing",
    "b": [
      "Today you are going to write a persuasive text, also called an exposition.",
      "The purpose of a persuasive text is to convince a reader to agree with your opinion.",
      "The topic is:",
      "Every classroom should have a class pet.",
      "Some people believe that looking after a class pet teaches responsibility, helps students feel calm and makes school a happier place. Others think a classroom is noisy and busy, and not the right home for an animal - especially on weekends and during the holidays.",
      "What do you think? Do you agree or disagree? Perhaps you can think of ideas for both sides of this topic.",
      "Write to convince a reader of your opinion."
    ],
    "th": [
      "start with an introduction that makes your position clear to the reader",
      "write your reasons for your opinion in the body, and explain each reason with examples",
      "finish with a conclusion that sums up your argument and leaves the reader convinced"
    ],
    "r": [
      "plan your writing before you start",
      "write in sentences and use paragraphs to organise your ideas",
      "choose your words carefully to convince the reader",
      "pay attention to your spelling and punctuation",
      "check and edit your writing so it is clear for the reader"
    ],
    "i": null
  },
  "7": {
    "g": "Narrative",
    "t": "42 minutes: 5 minutes planning, 30 minutes writing, 7 minutes editing",
    "b": [
      "Today you are going to write a narrative or story.",
      "The idea for your story is:",
      "The Message",
      "A message can arrive in many ways: washed up on a beach, appearing on a screen in the middle of the night, or sealed in an envelope for years. Some messages are warnings. Some are secrets. Some change everything.",
      "Your story might be about one of the messages in the pictures, or you may use an idea of your own."
    ],
    "th": [
      "the characters and where they are",
      "the complication or problem to be solved and the events that follow",
      "how the story will be resolved"
    ],
    "r": [
      "plan your story before you start",
      "write for a reader and keep them interested",
      "use paragraphs to organise your story",
      "vary your sentences and choose your words carefully to create mood and atmosphere",
      "pay attention to your spelling and punctuation",
      "check and edit your writing so it is clear for the reader"
    ],
    "i": "/images/mock-tests/year-7-writing.webp"
  },
  "9": {
    "g": "Persuasive",
    "t": "42 minutes: 5 minutes planning, 30 minutes writing, 7 minutes editing",
    "b": [
      "Today you are going to write a persuasive text, also called an exposition.",
      "The purpose of a persuasive text is to convince a reader to agree with your opinion.",
      "The topic is:",
      "Every young person should complete one year of community service after finishing school.",
      "Some people argue that a year spent volunteering - in hospitals, environmental projects, emergency services or aged care - would build practical skills, strengthen character and create more connected communities.",
      "Others believe that young people should be free to choose their own path, whether that is work, further study or travel, and that a compulsory year of service would be unfair or impractical.",
      "What is your opinion? You may agree, disagree, or argue a position that weighs up more than one side.",
      "Write to convince a reader of your opinion."
    ],
    "th": [
      "an introduction that establishes your position and engages the reader",
      "well-developed arguments supported by reasons, evidence and examples",
      "addressing and rebutting opposing views",
      "a conclusion that reinforces your position and leaves a lasting impression"
    ],
    "r": [
      "plan your writing before you start",
      "write for a reader and consider who you are trying to convince",
      "use paragraphs to organise and develop your arguments",
      "vary your sentences and choose precise, persuasive language",
      "pay attention to your spelling and punctuation",
      "check and edit your writing so it is clear and convincing"
    ],
    "i": null
  }
};

export const TOT: Record<string, Record<string, number>> = {
  "Reading": {
    "3": 39,
    "5": 39,
    "7": 48,
    "9": 48
  },
  "Conventions": {
    "3": 52,
    "5": 52,
    "7": 52,
    "9": 52
  },
  "Numeracy": {
    "3": 36,
    "5": 42,
    "7": 48,
    "9": 48
  }
};

export const SUB: Record<string, string> = {
  "Reading": "stories, poems and information texts",
  "Conventions": "Spelling, Grammar and Punctuation",
  "Numeracy": "number, algebra, measurement, geometry and data"
};

export const QD: Record<string, Record<string, QuestionItem[]>> = {
  Conventions: QC,
  Numeracy: QN,
  Reading: QR,
};
