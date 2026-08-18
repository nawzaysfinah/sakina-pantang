export const babyDevPhases = [
  {
    id: 'newborn',
    label: 'Newborn',
    sublabel: 'Weeks 1–4',
    weeks: [
      {
        id: 'w1',
        label: 'Week 1',
        theme: 'Skin to skin — the first medicine',
        motor: [
          { id: 'w1-m1', text: 'Skin-to-skin contact for at least 1 hour after birth and daily — regulates temperature, heart rate, and stress hormones (oxytocin surge benefits both of you)' },
          { id: 'w1-m2', text: 'Tummy time on your chest for 2–3 min per session — the safest first introduction to the position that builds all upper body strength' },
        ],
        social: [
          { id: 'w1-s1', text: 'Talk softly during every nappy change, feed, and bath — your voice is the most powerful sensory input in week one' },
          { id: 'w1-s2', text: 'Let baby hear different family members\' voices — newborns recognise voices they heard in the womb' },
        ],
        cognitive: [
          { id: 'w1-c1', text: 'Hold your face 20–30 cm away during feeds — this is the exact distance newborn eyes can focus' },
        ],
        watch: [
          'Rooting reflex — turns head toward cheek touch (confirms feeding instinct)',
          'Moro (startle) reflex — sudden flinch at loud sounds confirms hearing',
          'Baby can track a slow-moving face briefly with their eyes',
        ],
      },
      {
        id: 'w2-3',
        label: 'Weeks 2–3',
        theme: 'High contrast & facial mimicry',
        motor: [
          { id: 'w23-m1', text: 'Tummy time on a firm surface, 2–3 min, 3× per day — builds the neck extensors needed for all future head control' },
          { id: 'w23-m2', text: 'Gentle bicycle legs during nappy change — introduces body awareness and helps with gas' },
        ],
        social: [
          { id: 'w23-s1', text: 'Make slow, exaggerated facial expressions — stick out tongue, open mouth wide. Babies imitate facial movements from as early as 42 hours old (Meltzoff & Moore)' },
        ],
        cognitive: [
          { id: 'w23-c1', text: 'Show black-and-white high-contrast cards 20–30 cm from face — newborn vision resolves only strong contrast; this directly strengthens eye muscles and visual cortex' },
          { id: 'w23-c2', text: 'Introduce a simple mobile above the changing mat — tracks moving objects and begins to practise visual focus' },
        ],
        watch: [
          'First reflexive smiles — not yet social, often during sleep or after feeding',
          'Starts to quieten to your voice — active listening is beginning',
        ],
      },
      {
        id: 'w4',
        label: 'Week 4',
        theme: 'Emerging awareness & first responses',
        motor: [
          { id: 'w4-m1', text: 'Increase tummy time to 5 min sessions, 3–4× per day — consistency matters more than duration' },
        ],
        social: [
          { id: 'w4-s1', text: 'Sing the same 2–3 songs consistently every day — repetition builds auditory pattern recognition and emotional security (doesn\'t matter if you\'re off-key)' },
          { id: 'w4-s2', text: 'Respond to every coo and cry — this "serve and return" interaction builds neural connections faster than any toy (Harvard Center on the Developing Child)' },
        ],
        cognitive: [
          { id: 'w4-c1', text: 'Mirror play — hold baby up to a mirror; newborns are fascinated by faces, even reflections' },
          { id: 'w4-c2', text: 'Read aloud anything — a novel, a recipe — your voice rhythm and cadence is what matters, not the content' },
        ],
        watch: [
          'First social smile — baby smiles specifically in response to your face or voice (usually Week 5–6). One of the most important milestones in the first 3 months',
          'Increased alertness — longer wake windows, eyes tracking movement more steadily',
        ],
      },
    ],
  },
  {
    id: 'alerting',
    label: 'Alerting',
    sublabel: 'Weeks 5–8',
    weeks: [
      {
        id: 'w5-6',
        label: 'Weeks 5–6',
        theme: 'Social smile & cooing begins',
        motor: [
          { id: 'w56-m1', text: 'Tummy time 15–20 min cumulative daily — baby should start lifting head briefly to look around' },
          { id: 'w56-m2', text: 'Hold baby upright on your shoulder — practises head control against gravity' },
        ],
        social: [
          { id: 'w56-s1', text: 'Respond to the first social smiles immediately with a smile back — this is the birth of back-and-forth social communication' },
          { id: 'w56-s2', text: 'Exaggerate your facial expressions during conversation — baby is learning to read faces as emotional signals' },
        ],
        cognitive: [
          { id: 'w56-c1', text: 'Vary the tone of your voice when talking — high-pitched, slow speech ("motherese") is scientifically proven to hold infant attention and accelerate language acquisition' },
          { id: 'w56-c2', text: 'Dangle a colourful toy 30 cm away and move it slowly — baby will begin tracking it across midline (a key visual milestone)' },
        ],
        watch: [
          'Cooing — first vowel sounds ("ooh", "aah") — the foundation of all future language',
          'Holds head up briefly during tummy time',
          'Tracks a moving object across midline (left to right) with eyes',
        ],
      },
      {
        id: 'w7-8',
        label: 'Weeks 7–8',
        theme: 'Batting, grasping & growing strength',
        motor: [
          { id: 'w78-m1', text: 'Hang a simple toy within arm reach during wake time — baby will begin swiping at it (batting), which develops hand-eye coordination' },
          { id: 'w78-m2', text: 'Let baby grip your finger and gently pull to slight sitting — builds arm and core strength' },
        ],
        social: [
          { id: 'w78-s1', text: 'Play "conversation turns" — say something, pause and wait, let baby respond with a coo or expression, then respond back' },
          { id: 'w78-s2', text: 'Introduce gentle peekaboo — disappear behind your hands and reappear with a smile' },
        ],
        cognitive: [
          { id: 'w78-c1', text: 'Name objects during daily routines — "This is a nappy. This is a wipe." Vocabulary starts forming now even though speaking is months away' },
          { id: 'w78-c2', text: 'Mirror time — hold baby facing mirror and label the face ("That\'s your nose! That\'s your eye!")' },
        ],
        watch: [
          'Recognises your face and shows excitement — kicks legs, waves arms',
          'Beginning to swipe intentionally at objects within reach',
          'Grasping reflex becoming more voluntary (less automatic)',
        ],
      },
    ],
  },
  {
    id: 'emerging',
    label: 'Emerging',
    sublabel: 'Weeks 9–12',
    weeks: [
      {
        id: 'w9-10',
        label: 'Weeks 9–10',
        theme: 'Laughter, reaching & object focus',
        motor: [
          { id: 'w910-m1', text: 'Tummy time 20+ min cumulative daily — baby should lift head 45° and look around' },
          { id: 'w910-m2', text: 'Supported sitting propped on pillows — builds core awareness; don\'t force upright, just introduce the sensation' },
        ],
        social: [
          { id: 'w910-s1', text: 'Play with facial expressions of surprise, joy, and mock sadness — baby is learning to mirror emotional states' },
          { id: 'w910-s2', text: 'Blow raspberries — baby will watch intently and often attempt to imitate' },
        ],
        cognitive: [
          { id: 'w910-c1', text: 'Introduce simple board books with single bold images — point to each and name it slowly' },
          { id: 'w910-c2', text: 'Crinkle paper, jingle a bell behind baby\'s back — they will turn toward sound, confirming auditory localisation is developing' },
        ],
        watch: [
          'First laughs — not just smiles, actual chuckling',
          'Reaches intentionally for a dangling toy',
          'Shows clear preference for familiar faces — may look uncertain with strangers',
        ],
      },
      {
        id: 'w11-12',
        label: 'Weeks 11–12',
        theme: '3-month mark — head control & hands to mouth',
        motor: [
          { id: 'w1112-m1', text: 'Tummy time with a rolled towel under chest for support — baby should hold head up 45–90° and start pushing up on forearms' },
          { id: 'w1112-m2', text: 'Let baby stand with full weight support on your lap — feels the sensation of legs bearing weight; builds proprioception' },
        ],
        social: [
          { id: 'w1112-s1', text: 'Sing action songs (pat-a-cake, itsy-bitsy spider) with hand movements — baby watches hands intently at this stage' },
        ],
        cognitive: [
          { id: 'w1112-c1', text: 'Hold two different objects and offer one at a time — baby will look between them; introduces choice and object comparison' },
          { id: 'w1112-c2', text: 'Describe what you\'re doing during every routine — "I\'m putting on your left sock. Now the right sock." Narration is the #1 language-building activity' },
        ],
        watch: [
          'Brings hands to mouth voluntarily — oral exploration begins',
          'Head lag mostly gone when pulled to sit — major motor milestone',
          'Babbling becoming more varied — consonant-vowel combinations starting',
        ],
      },
    ],
  },
  {
    id: 'discovering',
    label: 'Discovering',
    sublabel: 'Months 4–6',
    weeks: [
      {
        id: 'm4',
        label: 'Month 4',
        theme: 'Rolling prep & object fascination',
        motor: [
          { id: 'm4-m1', text: 'Help baby practice rolling — from back, bend one knee and gently guide hip over to encourage side-lying and eventual roll' },
          { id: 'm4-m2', text: 'Place toys just out of reach during tummy time — motivates baby to push up and shift weight, the first steps toward crawling' },
        ],
        social: [
          { id: 'm4-s1', text: 'Hold baby in front of you and have a "conversation" — pause after each of your sentences and wait for their response (coo, expression, kick)' },
          { id: 'm4-s2', text: 'Introduce other babies or young children — baby will stare fascinated; social learning from peers starts now' },
        ],
        cognitive: [
          { id: 'm4-c1', text: 'Give baby a soft toy to grasp and mouth — mouthing is cognitive exploration, not just teething. Let it happen safely' },
          { id: 'm4-c2', text: 'Hide a toy under a cloth in front of baby — they won\'t look for it yet (object permanence is still developing) but this plants the concept' },
        ],
        watch: [
          'Rolling back to side — the first step toward full roll (back to tummy usually follows by Month 5)',
          'Laughing, squealing, and vocalising to get your attention — intentional communication',
          'Reaches for and grasps objects with both hands',
          'Recognises name — turns head when you say it',
        ],
      },
      {
        id: 'm5-6',
        label: 'Months 5–6',
        theme: 'Rolling, sitting & solid food prep',
        motor: [
          { id: 'm56-m1', text: 'Practice supported sitting daily — 5–10 min. Baby should be able to sit with support by Month 6' },
          { id: 'm56-m2', text: 'Encourage both directions of rolling — babies often prefer one direction. Use a toy or your voice to motivate the non-preferred side' },
          { id: 'm56-m3', text: 'Let baby spend time on a play mat on the floor — builds core and prepares for crawling' },
        ],
        social: [
          { id: 'm56-s1', text: 'Responsive feeding preparation — offer first foods (purée or baby-led) at the table with the family; make mealtimes social' },
          { id: 'm56-s2', text: 'Read the same 2–3 books repeatedly — familiar books elicit excitement and teach that stories have structure' },
        ],
        cognitive: [
          { id: 'm56-c1', text: 'Offer different textures to touch — soft fabric, bumpy silicone, smooth wood. Sensory exploration builds neural pathways' },
          { id: 'm56-c2', text: 'Play peekaboo consistently — baby is starting to understand you exist even when out of sight (object permanence emerging)' },
        ],
        watch: [
          'Full roll back to tummy and tummy to back — CDC milestone by 6 months',
          'Sits briefly without support — by end of Month 6',
          'Babbles chains of sounds: "ba-ba", "da-da", "ma-ma" — these are not yet meaningful, just practising sounds',
          'Transfers objects hand to hand',
          'Ready signs for solids: sits with minimal support, shows interest in food, no longer has tongue-thrust reflex',
        ],
      },
    ],
  },
  {
    id: 'exploring',
    label: 'Exploring',
    sublabel: 'Months 7–9',
    weeks: [
      {
        id: 'm7-8',
        label: 'Months 7–8',
        theme: 'Crawling, object permanence & stranger awareness',
        motor: [
          { id: 'm78-m1', text: 'Place baby on tummy and hold a toy just out of reach — army crawl (belly on floor) usually precedes hands-and-knees crawling' },
          { id: 'm78-m2', text: 'Create a safe obstacle course with cushions — crawling over soft obstacles builds strength and body confidence' },
          { id: 'm78-m3', text: 'Encourage pulling to stand at the sofa edge — hold steady and let baby bear weight on their own terms' },
        ],
        social: [
          { id: 'm78-s1', text: 'Don\'t rush stranger anxiety away — validate it. Say "I know, you don\'t know this person yet." It shows healthy attachment, not a problem to fix' },
          { id: 'm78-s2', text: 'Wave hello and goodbye consistently — baby will begin to imitate by Month 9' },
        ],
        cognitive: [
          { id: 'm78-c1', text: 'Play hide-and-seek with a toy under a cloth in full view — baby should now lift the cloth to find it (object permanence established)' },
          { id: 'm78-c2', text: 'Stack two blocks and knock them over together — cause and effect play accelerates cognitive development' },
          { id: 'm78-c3', text: 'Introduce simple sound-making toys — pressing a button to make a sound teaches contingency (my action causes an effect)' },
        ],
        watch: [
          'Crawling — hands and knees, army crawl, or bum-shuffling are all valid. Some babies skip crawling entirely',
          'Pulls to stand holding furniture',
          'Stranger anxiety peaks — healthy sign of secure attachment',
          '"Dada" and "Mama" used but not yet meaningfully targeted at parents',
        ],
      },
      {
        id: 'm9',
        label: 'Month 9',
        theme: 'Pincer grasp & intentional communication',
        motor: [
          { id: 'm9-m1', text: 'Offer small soft finger foods (pea-sized pieces) — encourages pincer grasp (thumb + index finger) which is the hand skill needed for writing years later' },
          { id: 'm9-m2', text: 'Cruise along furniture — hold baby\'s hands lightly and let them walk sideways along the sofa' },
        ],
        social: [
          { id: 'm9-s1', text: 'Follow baby\'s gaze and comment on what they\'re looking at — "You\'re looking at the fan! The fan goes round and round." This builds joint attention, a critical pre-language skill' },
          { id: 'm9-s2', text: 'Introduce simple requests — "Give me the ball" — with an open hand. Don\'t force. The comprehension precedes the action by weeks' },
        ],
        cognitive: [
          { id: 'm9-c1', text: 'Shape sorters and stacking cups — problem-solving through play; these toys build spatial reasoning' },
          { id: 'm9-c2', text: 'Point to and name body parts during bath time — "Where\'s your nose? There it is!" Understanding body parts precedes saying the words' },
        ],
        watch: [
          'Pincer grasp — picking up small objects with thumb and index finger',
          'Points at things of interest — a major communication milestone',
          'Responds to "no" — understands the concept even if not yet compliant',
          'Plays simple back-and-forth games (rolling a ball, handing objects)',
        ],
      },
    ],
  },
  {
    id: 'onthemove',
    label: 'On the move',
    sublabel: 'Months 10–12',
    weeks: [
      {
        id: 'm10-11',
        label: 'Months 10–11',
        theme: 'First steps, waving & first real words',
        motor: [
          { id: 'm1011-m1', text: 'Walking with push toy or holding both your hands — builds the balance and strength for independent walking' },
          { id: 'm1011-m2', text: 'Squat and stand — place a toy on the floor and encourage baby to squat to pick it up and stand back up; core and leg strength builder' },
          { id: 'm1011-m3', text: 'Climbing — supervised low climbing on cushions builds gross motor confidence and spatial awareness' },
        ],
        social: [
          { id: 'm1011-s1', text: 'Wave bye-bye consistently at every departure — baby will reliably wave back by Month 10–11' },
          { id: 'm1011-s2', text: 'Clap hands together and encourage baby to copy — clapping is a social and motor milestone' },
          { id: 'm1011-s3', text: 'Simple pretend play — "feeding" a stuffed toy, pretending to drink from an empty cup. Lays the groundwork for imaginative play' },
        ],
        cognitive: [
          { id: 'm1011-c1', text: 'Respond to pointing enthusiastically — "Yes! A dog! The dog is walking." This validates their communication and builds vocabulary' },
          { id: 'm1011-c2', text: 'Simple two-step commands — "Get the ball and bring it here." Comprehension is racing ahead of speaking' },
          { id: 'm1011-c3', text: 'Board books with flaps and textures — interactive books sustain attention far longer at this age than flat picture books' },
        ],
        watch: [
          'Cruises confidently along furniture — may take first independent steps any time from Month 9 to 15 (CDC updated milestone)',
          'Claps, waves, and shakes head for "no" — gestural communication is exploding',
          'First meaningful word — often "Mama", "Dada", "ball", "more". CDC milestone: 1 word by 12 months',
          'Imitates actions: bangs spoon, "talks" into toy phone',
        ],
      },
      {
        id: 'm12',
        label: 'Month 12',
        theme: 'One year — celebrate and keep going',
        motor: [
          { id: 'm12-m1', text: 'Encourage walking by moving slightly further away each time — hold out your arms and let them take 2–3 steps to reach you' },
          { id: 'm12-m2', text: 'Self-feeding with a spoon — introduce a soft spoon; messy is fine and expected. Fine motor skill in action' },
        ],
        social: [
          { id: 'm12-s1', text: 'Interactive play with other children — parallel play is normal at this age; forced sharing is not developmentally appropriate yet' },
          { id: 'm12-s2', text: 'Name emotions during play — "The bear is happy! Look, the bear is sad." Emotional vocabulary starts building now' },
        ],
        cognitive: [
          { id: 'm12-c1', text: 'Simple puzzles with 2–3 chunky pieces — problem-solving and fine motor in one' },
          { id: 'm12-c2', text: 'Expand beyond one-word back-and-forth — ask open questions: "What does the dog say?" Pause and wait even if the answer is just a sound' },
        ],
        watch: [
          '1–3 meaningful words used consistently (name + 1 other at minimum)',
          'Walking independently — median age 12 months, normal range 9–15 months',
          'Points to show you something interesting — joint attention is fully established',
          'Follows simple instructions without gesture — "Give me your cup"',
          'If no babbling, no gestures, and no words by 12 months — discuss with your paediatrician',
        ],
      },
    ],
  },
];
