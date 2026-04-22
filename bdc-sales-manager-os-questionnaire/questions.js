// BDC + Sales Manager OS — Questionnaire bank
// Each prompt pushes for specifics: real stories, exact words, real numbers.
window.MODULES = [
  {
    id: "bdc_operations",
    title: "BDC Operations",
    blurb: "Staffing model · shift structure · cadence · appointment KPIs · show-rate · escalation",
    questions: [
      {
        id: "bdc_lead_touch",
        prompt: "Walk me through the exact moment a lead hits your CRM — who touches it first, in what order, using what template? Talk me through a real lead from this week.",
        hint: "Names, timestamps, screen clicks. Not theory — the actual path it traveled."
      },
      {
        id: "bdc_shifts",
        prompt: "Describe your shift structure. Who works when, why, and what happens at the seams — shift changes, lunch, close? Where did that structure come from — what broke that made you build it this way?",
        hint: "The scar tissue matters more than the org chart."
      },
      {
        id: "bdc_cadence",
        prompt: "Walk through your call/text/email cadence in detail. Day 1 → Day 2 → Day 3 → Day 7 → Day 30. What do the templates actually say? What changes if the lead is cold vs. hot?",
        hint: "Dictate the template language if you can remember it."
      },
      {
        id: "bdc_appt_kpi",
        prompt: "What's your appointment-set KPI, and what do you do when a rep misses it three days in a row? Walk me through a real conversation you had with an underperformer.",
        hint: "Words you actually said. Tone. What they said back."
      },
      {
        id: "bdc_show_rate",
        prompt: "Show rate is 50–60% in most stores. What's yours, and what specifically did you do to move it? Tell me about the last confirmation call you personally made.",
        hint: "The levers — who calls, when, what they say, what the reminder text looks like."
      },
      {
        id: "bdc_escalation",
        prompt: "Draw me the escalation path — lead goes cold, appointment no-shows, customer complains, rep gets blown up by a bad call. Who handles what, and when do you personally get pulled in?",
        hint: "Include the cases where the process breaks."
      },
      {
        id: "bdc_saturday",
        prompt: "It's 7pm Saturday, the floor is slammed, BDC is fielding 40 inbounds an hour. What are you personally doing, and what are you watching? Picture yourself there right now.",
        hint: "Senses — what you're hearing across the room, what screens you're glancing at."
      }
    ]
  },

  {
    id: "lead_management",
    title: "Lead Management",
    blurb: "Source mix · routing · speed-to-lead · dead-lead revival · internet vs phone vs walk-in",
    questions: [
      {
        id: "lm_source_mix",
        prompt: "Break down your lead source mix by percentage — Autotrader, Cars.com, OEM, website, phone ups, walk-ins, referrals. Which source converts best for you and why?",
        hint: "Real numbers. If you have to guess, guess — we'll verify later."
      },
      {
        id: "lm_routing",
        prompt: "How does a lead get routed? By skill, by round robin, by source, by time of day? What's the actual logic, and what edge cases have you coded around?",
        hint: "Where does the 'if/then' live — CRM, your head, a manager's discretion?"
      },
      {
        id: "lm_speed",
        prompt: "What's your speed-to-lead SLA in minutes, and how do you enforce it? Tell me about the last time a rep violated it — what happened?",
        hint: "The enforcement story is the whole point."
      },
      {
        id: "lm_dead_lead",
        prompt: "Dead leads: how do you define dead, when do you revive them, what's the pitch? What's the best revival you ever pulled off?",
        hint: "Story mode — set the scene, give me the opener line."
      },
      {
        id: "lm_three_channels",
        prompt: "Internet vs phone vs walk-in — three different animals. What do the first 90 seconds look like for each? What's the closing ratio on each, and why is there a gap?",
        hint: "The opening word matters. Dictate it."
      },
      {
        id: "lm_vehicle_swap",
        prompt: "Lead comes in on a vehicle you don't have. What's the play? Walk me through a swap that actually closed.",
        hint: "Deal structure, what you offered, who objected, what broke."
      },
      {
        id: "lm_sources_killed",
        prompt: "What lead sources have you killed, and why? What would you buy more of tomorrow if budget opened up?",
        hint: "The kill decision — what was the threshold?"
      },
      {
        id: "lm_worst_failure",
        prompt: "Describe the worst lead-handling failure you've personally witnessed. What was the root cause — process, person, or tool?",
        hint: "The forensic walk-through. Don't name names, but give specifics."
      }
    ]
  },

  {
    id: "sales_floor",
    title: "Sales Floor Management",
    blurb: "Desk process · T.O. sequence · closing frameworks · objection playbook · F&I handoff",
    questions: [
      {
        id: "sf_desk_process",
        prompt: "Walk me through your desk process — from meet-and-greet to signed deal. Where are the decision points where you, as the desk, intervene?",
        hint: "Step-by-step. Every place you touch the deal."
      },
      {
        id: "sf_to_sequence",
        prompt: "T.O. sequence: salesperson → closer → desk → GM? What triggers each step? What are the exact words you say when you walk up to a T.O.?",
        hint: "The handshake, the posture, the opening line. Dictate it as you'd say it."
      },
      {
        id: "sf_closing_frameworks",
        prompt: "Name the three closing frameworks you actually use — not what you read in a book. When do you pick which one?",
        hint: "Name them. Then: the kind of buyer each fits."
      },
      {
        id: "sf_just_looking",
        prompt: "The last time you turned a 'just looking' into a signed deal — what were the exact words? Set the scene: day, weather, what they drove up in, what they said first.",
        hint: "This is THE question. Slow down here."
      },
      {
        id: "sf_objections_weekly",
        prompt: "Top 5 objections you hear weekly, and your rebuttal to each. Word-for-word script — what they say, what you say back.",
        hint: "One objection per paragraph. Don't sanitize — how you actually say it."
      },
      {
        id: "sf_price_three_buyers",
        prompt: "Price objection — payment-focused buyer vs total-price buyer vs trade-value buyer. Three different moves. Describe each.",
        hint: "The tell that sorts them into buckets. What they do before they say a number."
      },
      {
        id: "sf_fi_handoff",
        prompt: "F&I handoff: what does a good one look like, what does a bad one look like, and how do you fix a sales rep who poisons the handoff?",
        hint: "The specific language that poisons it. The correction."
      },
      {
        id: "sf_lost_deal",
        prompt: "Describe a deal you lost last month that you shouldn't have. Where exactly did it break?",
        hint: "The moment of death. Who said what."
      },
      {
        id: "sf_hour_by_hour",
        prompt: "What do you personally do on the sales floor between 10am and 6pm? Hour by hour on a normal Thursday.",
        hint: "The mundane is the operating system."
      }
    ]
  },

  {
    id: "people",
    title: "People",
    blurb: "Hiring filters · interview red flags · pay plans · coaching · firing · bench",
    questions: [
      {
        id: "p_hiring_filters",
        prompt: "Your hiring filters — what's on your resume screen, what's in the first phone call, what makes it to a face-to-face?",
        hint: "The disqualifiers in each gate."
      },
      {
        id: "p_red_flags",
        prompt: "Name three red flags in an interview you'd never hire around. Why those three?",
        hint: "The ones most managers miss or rationalize away."
      },
      {
        id: "p_pay_plan",
        prompt: "Walk me through your pay plan philosophy — flat, tiered, volume-based, bonus structure. What behavior does it incentivize, and what does it accidentally punish?",
        hint: "Every pay plan has a ghost behavior. What's yours?"
      },
      {
        id: "p_coaching_cadence",
        prompt: "Coaching cadence: 1:1s, floor coaching, group meetings. What's the rhythm, and what actually gets said in each?",
        hint: "A recent 1:1 — opening line, their pushback, how it ended."
      },
      {
        id: "p_time_to_fire",
        prompt: "How do you know it's time to fire someone? Describe the last fire you made — when did you first know, and how long between knowing and acting?",
        hint: "The gap between knowing and acting is where the lesson lives."
      },
      {
        id: "p_hidden_gem",
        prompt: "Tell me about the last hire who exceeded expectations. What did you see in them that others missed?",
        hint: "The signal — was it in the resume, the interview, or somewhere else?"
      },
      {
        id: "p_bench",
        prompt: "Bench-building: how are you recruiting even when you're fully staffed? Where do you find people?",
        hint: "Specific channels — restaurants, gyms, other dealerships, LinkedIn."
      },
      {
        id: "p_thank_you",
        prompt: "Describe someone you fired who came back and thanked you. What happened?",
        hint: "If you have one, tell it. If not, tell me why you don't."
      },
      {
        id: "p_top_pay",
        prompt: "What do you pay your top BDC rep, and what do you pay your top closer? How do you keep them from getting poached?",
        hint: "Numbers + the non-cash retention levers."
      }
    ]
  },

  {
    id: "training",
    title: "Training",
    blurb: "New-hire ramp · role-play · measurement vs coaching",
    questions: [
      {
        id: "t_week_1",
        prompt: "Week 1 for a new hire: hour-by-hour, what are they doing Monday through Friday?",
        hint: "The shadow schedule. Who they sit with. What they must NOT do yet."
      },
      {
        id: "t_day_30",
        prompt: "Day 30 checkpoint — what do they have to demonstrate to stay? What do you measure?",
        hint: "The cut line. The conversation if they're below it."
      },
      {
        id: "t_day_60",
        prompt: "Day 60 — what changes? What are you coaching vs. correcting?",
        hint: "The shift from teaching to tuning."
      },
      {
        id: "t_day_90",
        prompt: "Day 90 — are they a keeper or a cut? How do you know?",
        hint: "The tells. The gut check. The numbers you won't compromise on."
      },
      {
        id: "t_roleplay",
        prompt: "Role-play structure — how often, how long, who runs it, what scenarios? Give me a real role-play you ran recently.",
        hint: "The scenario, the curveball, what they got wrong, how you corrected."
      },
      {
        id: "t_measure_vs_coach",
        prompt: "What do you measure vs. what do you coach? The delta matters — explain it.",
        hint: "You don't coach everything you measure. Which do you leave alone?"
      },
      {
        id: "t_best_moment",
        prompt: "The best training moment you ever had as a coach — what happened, and why did it land?",
        hint: "The unlock. What you said, what they realized."
      },
      {
        id: "t_missing",
        prompt: "What training most programs miss that you swear by?",
        hint: "The unfashionable thing. The thing nobody pays for but you make them do."
      }
    ]
  },

  {
    id: "technology",
    title: "Technology Stack",
    blurb: "CRM · phones · lead providers · reporting · integrations · what you'd rip out",
    questions: [
      {
        id: "tech_full_stack",
        prompt: "Name every tool in your stack — CRM, phone, dialer, lead aggregator, reporting, texting, email, video. Who's the vendor, roughly what's the monthly cost, and what's the pain point with each?",
        hint: "One per line if you can. Don't sweat exact dollars."
      },
      {
        id: "tech_crm_day",
        prompt: "CRM: walk me through a day in yours. What screens are you in, what reports are you running, what clicks are wasted?",
        hint: "Muscle memory. The tab you always have open."
      },
      {
        id: "tech_phone",
        prompt: "Phone system: how are inbounds routed, how are outbound dials logged, what's your call-review process?",
        hint: "The 'I listened to this call this morning' story."
      },
      {
        id: "tech_providers",
        prompt: "Lead providers: which ones carry weight, which ones are dead weight, and how do you know?",
        hint: "The cost-per-sold math, even if back-of-envelope."
      },
      {
        id: "tech_reporting",
        prompt: "Reporting tools: what do you actually look at daily vs. what's theater?",
        hint: "Theater = reports your boss wants but don't change your behavior."
      },
      {
        id: "tech_integrations",
        prompt: "Integrations that work. Integrations that don't. Name names.",
        hint: "The duct-tape spots. The places data dies in transit."
      },
      {
        id: "tech_rip_out",
        prompt: "If you could rip one tool out tomorrow, what would it be, and what would you replace it with?",
        hint: "Why the replacement isn't already there."
      },
      {
        id: "tech_envy",
        prompt: "What tool have you seen at another store that you wanted, and why couldn't you get it at yours?",
        hint: "The political/budget reason, not just the product reason."
      }
    ]
  },

  {
    id: "metrics",
    title: "Metrics",
    blurb: "Daily board · weekly review · monthly dashboard · leading indicators · gut vs. data",
    questions: [
      {
        id: "m_daily_board",
        prompt: "Daily board — what numbers are on it, why those, and who sees them?",
        hint: "Dry-erase or digital? Posted where? Updated by whom?"
      },
      {
        id: "m_weekly_review",
        prompt: "Weekly review — who's in the room, what's the agenda, what decisions get made?",
        hint: "The standing agenda. The thing that always comes up last."
      },
      {
        id: "m_monthly_dashboard",
        prompt: "Monthly dashboard — what rolls up to the GM? What do you include vs. strip out?",
        hint: "The politics of what makes the deck."
      },
      {
        id: "m_leading_indicators",
        prompt: "Which number predicts appointment shows? Which predicts closing ratio? Which predicts gross per unit? Make the causal chain explicit.",
        hint: "The 3-step chain from activity → outcome."
      },
      {
        id: "m_numbers_first",
        prompt: "Describe a moment when the numbers told you something before the people did. What happened?",
        hint: "The week the report screamed and nobody was talking about it yet."
      },
      {
        id: "m_vanity",
        prompt: "A vanity metric you used to track that you stopped caring about — and why?",
        hint: "The number that looked good and meant nothing."
      },
      {
        id: "m_wish",
        prompt: "What KPI do you wish you could measure but can't?",
        hint: "Why can't you — data access, definitional, political?"
      },
      {
        id: "m_gut_vs_dash",
        prompt: "Numbers are good but something feels off. Give me an example. What did your gut catch that the dashboard missed?",
        hint: "The tell. The little thing. The side comment."
      }
    ]
  },

  {
    id: "relationships",
    title: "Relationships",
    blurb: "GM · GSM · F&I · service · OEM rep · lenders · vendors",
    questions: [
      {
        id: "r_gm",
        prompt: "GM: how do you manage up? What's the cadence of communication, and what do you bring vs. what do you hide until you've fixed it?",
        hint: "The 'never surprise the GM' rule — and its exceptions."
      },
      {
        id: "r_gsm",
        prompt: "GSM: peer or boss? What's the split of responsibility, and where does friction usually happen?",
        hint: "The recurring argument. How you resolve it."
      },
      {
        id: "r_fi",
        prompt: "F&I director: how do you align incentives when your pay plans can collide?",
        hint: "The deals where you pull in opposite directions."
      },
      {
        id: "r_service",
        prompt: "Service department: how do you get service traffic converted to sales? Who owns that handoff?",
        hint: "The walk-around, the trade appraisal on the drive, the service advisor's cut."
      },
      {
        id: "r_oem",
        prompt: "OEM rep (Toyota in this case): what do you want from them, what do they want from you, and how do you trade?",
        hint: "Allocation, co-op, programs — the trading floor."
      },
      {
        id: "r_lenders",
        prompt: "Lender reps: who do you call first on a tough deal, and what's the relationship built on?",
        hint: "The one person who bends the rules for you. Why they do."
      },
      {
        id: "r_vendors",
        prompt: "Vendors (CRM, lead, training): how do you keep them honest? Any you've fired?",
        hint: "The quarterly review. The moment you pulled the plug."
      },
      {
        id: "r_rebuild",
        prompt: "Describe a relationship that was broken when you arrived at a store and how you rebuilt it.",
        hint: "The first conversation. The proof move."
      },
      {
        id: "r_mentor",
        prompt: "Who in your career taught you the most, and what's the one thing they said you still hear in your head?",
        hint: "The line. The context. Why it stuck."
      }
    ]
  },

  {
    id: "intangibles",
    title: "The Intangibles",
    blurb: "Culture moves · morale · reading a floor · the first 30 days",
    questions: [
      {
        id: "i_first_30",
        prompt: "First 30 days at a new store — what do you do? Day by day if you can. What are you specifically NOT doing that other managers do?",
        hint: "The listening tour. The first symbolic move. The first firing (or decision not to)."
      },
      {
        id: "i_morale_tanking",
        prompt: "Morale is tanking — last Tuesday everyone was dragging. What do you do?",
        hint: "Not a pizza party. The actual move."
      },
      {
        id: "i_reading_floor",
        prompt: "Reading a floor — you walk in and you know something's off. What tells you?",
        hint: "Posture. Volume. Who's at their desk. Who's in the bathroom."
      },
      {
        id: "i_hot_floor",
        prompt: "The store is cooking — everyone's selling, phones ringing, energy high. What's your job in that moment? (Hint: it's not sales.)",
        hint: "What you clear out of the way. Who you protect."
      },
      {
        id: "i_cold_streak",
        prompt: "A sales rep is on a cold streak — 2 weeks no sales, previously a top performer. What's your move?",
        hint: "The conversation opener. The reassignment or the intervention."
      },
      {
        id: "i_failed_move",
        prompt: "A culture move that failed — a contest, a speech, a ritual — that didn't land. Why not?",
        hint: "Retrospective honesty. What you'd do differently."
      },
      {
        id: "i_gm_wrong",
        prompt: "The GM is wrong and you know it. How do you handle it?",
        hint: "The private conversation. The public posture. When you've eaten it and when you haven't."
      },
      {
        id: "i_senses",
        prompt: "Monday morning in a store you run vs. a store you've never touched — describe the difference in senses. Sights, sounds, smells, energy.",
        hint: "This is the course trailer. Go poetic."
      },
      {
        id: "i_why_this_work",
        prompt: "Why do you still do this work? Underneath the money — what keeps you in a dealership after 15 years?",
        hint: "The answer you don't give at parties."
      }
    ]
  }
];
