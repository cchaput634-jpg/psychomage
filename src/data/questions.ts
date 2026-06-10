export type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
export type Branch = 'verte' | 'jaune' | 'rouge'

export interface Option {
  letter: Letter
  text: string
}

export interface Question {
  id: string
  text: string
  options: Option[]
}

export const TRONC_COMMUN: Question[] = [
  {
    id: 'tc1',
    text: 'Pensez-vous qu\'une loi injuste reste une loi à respecter ?',
    options: [
      { letter: 'A', text: 'Oui, car l\'ordre doit toujours être préservé.' },
      { letter: 'B', text: 'Oui, mais son application doit rester mesurée.' },
      { letter: 'C', text: 'Cela dépend de son degré d\'injustice.' },
      { letter: 'D', text: 'Non, mais je la respecterais par prudence.' },
      { letter: 'E', text: 'Non, une loi injuste mérite d\'être transgressée.' },
    ],
  },
  {
    id: 'tc2',
    text: 'Selon vous, Rivengard est avant tout…',
    options: [
      { letter: 'A', text: 'Une autorité nécessaire et supérieure aux individus.' },
      { letter: 'B', text: 'Un foyer imparfait, mais protecteur.' },
      { letter: 'C', text: 'Un système qui doit être observé et questionné.' },
      { letter: 'D', text: 'Un cadre auquel il faut se soumettre pour éviter des problèmes.' },
      { letter: 'E', text: 'Un régime oppressif.' },
    ],
  },
  {
    id: 'tc3',
    text: 'Avez-vous déjà remis en question une décision d\'autorité ?',
    options: [
      { letter: 'A', text: 'Non, car l\'autorité voit plus loin que l\'individu.' },
      { letter: 'B', text: 'Oui, mais j\'ai gardé ma place et mon devoir.' },
      { letter: 'C', text: 'Oui, et j\'ai cherché à comprendre ou à débattre.' },
      { letter: 'D', text: 'Oui, mais je n\'ai rien dit par peur.' },
      { letter: 'E', text: 'Oui, et cela a renforcé mon opposition.' },
    ],
  },
  {
    id: 'tc4',
    text: 'La stabilité collective justifie-t-elle le sacrifice du confort personnel ?',
    options: [
      { letter: 'A', text: 'Oui, toujours.' },
      { letter: 'B', text: 'Oui, si cela reste nécessaire et encadré.' },
      { letter: 'C', text: 'Parfois, mais cela doit être discuté.' },
      { letter: 'D', text: 'Je l\'accepte si je n\'ai pas le choix.' },
      { letter: 'E', text: 'Non, aucun régime ne devrait exiger cela.' },
    ],
  },
  {
    id: 'tc5',
    text: 'Selon vous, la désobéissance peut-elle être morale ?',
    options: [
      { letter: 'A', text: 'Non, la désobéissance menace l\'ordre.' },
      { letter: 'B', text: 'Rarement, seulement dans des cas extrêmes.' },
      { letter: 'C', text: 'Oui, si l\'autorité devient injuste.' },
      { letter: 'D', text: 'Oui, mais je n\'oserais probablement pas désobéir.' },
      { letter: 'E', text: 'Oui, et elle devient nécessaire face à l\'oppression.' },
    ],
  },
  {
    id: 'tc6',
    text: 'Vous découvrez qu\'un proche agit contre les intérêts de Rivengard. Que faites-vous ?',
    options: [
      { letter: 'A', text: 'Je le signale immédiatement.' },
      { letter: 'B', text: 'Je tente de lui parler, puis je fais mon devoir.' },
      { letter: 'C', text: 'Je cherche d\'abord à comprendre ses raisons.' },
      { letter: 'D', text: 'Je garde le secret par peur de le perdre ou d\'être impliqué.' },
      { letter: 'E', text: 'Je le protège.' },
    ],
  },
  {
    id: 'tc7',
    text: 'Votre réponse changerait-elle s\'il s\'agissait d\'un ami très proche ?',
    options: [
      { letter: 'A', text: 'Non, Rivengard passe avant tout.' },
      { letter: 'B', text: 'Peut-être, mais je finirais par agir selon la loi.' },
      { letter: 'C', text: 'Oui, je chercherais une solution plus humaine.' },
      { letter: 'D', text: 'Oui, cela me mettrait dans une détresse profonde.' },
      { letter: 'E', text: 'Oui, je ne le dénoncerais jamais.' },
    ],
  },
  {
    id: 'tc8',
    text: 'À partir de quel moment le silence devient-il une forme de complicité ?',
    options: [
      { letter: 'A', text: 'Dès qu\'on connaît une faute.' },
      { letter: 'B', text: 'Quand ce silence menace Rivengard.' },
      { letter: 'C', text: 'Quand il empêche de protéger quelqu\'un.' },
      { letter: 'D', text: 'Quand il nous met nous-mêmes en danger.' },
      { letter: 'E', text: 'Le silence peut être juste s\'il protège une cause légitime.' },
    ],
  },
  {
    id: 'tc9',
    text: 'Quelle valeur placeriez-vous au-dessus des autres ?',
    options: [
      { letter: 'A', text: 'L\'ordre.' },
      { letter: 'B', text: 'La loyauté.' },
      { letter: 'C', text: 'La justice.' },
      { letter: 'D', text: 'La survie.' },
      { letter: 'E', text: 'La liberté.' },
    ],
  },
  {
    id: 'tc10',
    text: 'Quelle émotion cherchez-vous le plus à cacher ?',
    options: [
      { letter: 'A', text: 'Le doute.' },
      { letter: 'B', text: 'La culpabilité.' },
      { letter: 'C', text: 'La colère.' },
      { letter: 'D', text: 'La peur.' },
      { letter: 'E', text: 'La haine.' },
    ],
  },
  {
    id: 'tc11',
    text: 'Quelle phrase vous ressemble le plus ?',
    options: [
      { letter: 'A', text: '"Un peuple fort obéit avant de discuter."' },
      { letter: 'B', text: '"On peut servir un régime sans aimer toutes ses décisions."' },
      { letter: 'C', text: '"Obéir n\'empêche pas de penser."' },
      { letter: 'D', text: '"Je fais ce qu\'il faut pour ne pas être puni."' },
      { letter: 'E', text: '"Aucun pouvoir ne mérite une obéissance aveugle."' },
    ],
  },
  {
    id: 'tc12',
    text: 'Si Rivengard vous demandait de prouver publiquement votre loyauté, que feriez-vous ?',
    options: [
      { letter: 'A', text: 'Je le ferais avec fierté.' },
      { letter: 'B', text: 'Je le ferais, même si cela me met mal à l\'aise.' },
      { letter: 'C', text: 'Je demanderais pourquoi cette preuve est nécessaire.' },
      { letter: 'D', text: 'Je le ferais par peur des conséquences.' },
      { letter: 'E', text: 'Je refuserais ou je chercherais à détourner la demande.' },
    ],
  },
]

export const MODULE_CREATURE: Question[] = [
  {
    id: 'cm1',
    text: 'Estimez-vous que Rivengard vous offre une place légitime ?',
    options: [
      { letter: 'A', text: 'Oui, et je lui en suis reconnaissant.' },
      { letter: 'B', text: 'Oui, même si cette place est limitée.' },
      { letter: 'C', text: 'Partiellement, mais elle devrait évoluer.' },
      { letter: 'D', text: 'Non, mais je l\'accepte pour survivre.' },
      { letter: 'E', text: 'Non, cette place est une illusion de tolérance.' },
    ],
  },
  {
    id: 'cm2',
    text: 'Les restrictions imposées aux Créatures Magiques sont-elles une protection ou un contrôle ?',
    options: [
      { letter: 'A', text: 'Une protection nécessaire.' },
      { letter: 'B', text: 'Une protection parfois excessive.' },
      { letter: 'C', text: 'Un mélange des deux.' },
      { letter: 'D', text: 'Un contrôle subi.' },
      { letter: 'E', text: 'Une oppression déguisée.' },
    ],
  },
  {
    id: 'cm3',
    text: 'Si Rivengard vous demandait de surveiller d\'autres Créatures Magiques, accepteriez-vous ?',
    options: [
      { letter: 'A', text: 'Oui, sans hésiter.' },
      { letter: 'B', text: 'Oui, si cela protège la stabilité.' },
      { letter: 'C', text: 'Seulement en cas de danger réel.' },
      { letter: 'D', text: 'Je le ferais par peur.' },
      { letter: 'E', text: 'Non, je ne trahirais pas les miens.' },
    ],
  },
  {
    id: 'cm4',
    text: 'Si atteindre une haute place impliquait de vous retourner contre les vôtres, le feriez-vous ?',
    options: [
      { letter: 'A', text: 'Oui, si Rivengard l\'exige.' },
      { letter: 'B', text: 'Oui, si cela sert un but supérieur.' },
      { letter: 'C', text: 'Je serais profondément partagé.' },
      { letter: 'D', text: 'Peut-être, si ma survie en dépend.' },
      { letter: 'E', text: 'Jamais.' },
    ],
  },
  {
    id: 'cm5',
    text: 'Pensez-vous qu\'une Créature Magique peut être pleinement loyale envers Rivengard tout en restant attachée à sa communauté ?',
    options: [
      { letter: 'A', text: 'Oui, si elle place Rivengard en premier.' },
      { letter: 'B', text: 'Oui, avec de la discipline.' },
      { letter: 'C', text: 'Oui, mais cela crée forcément des tensions.' },
      { letter: 'D', text: 'Difficilement, car il faudra toujours choisir.' },
      { letter: 'E', text: 'Non, car Rivengard finira toujours par exiger une trahison.' },
    ],
  },
]

export const BRANCHE_VERTE: Question[] = [
  {
    id: 'bv1',
    text: 'Si Rivengard ordonnait une mesure dure mais présentée comme nécessaire, quelle serait votre réaction ?',
    options: [
      { letter: 'A', text: 'Je l\'appliquerais sans réserve.' },
      { letter: 'B', text: 'Je l\'appliquerais, mais j\'espérerais qu\'elle reste temporaire.' },
      { letter: 'C', text: 'Je demanderais des explications avant de l\'accepter.' },
      { letter: 'D', text: 'Je serais mal à l\'aise, mais silencieux.' },
      { letter: 'E', text: 'Je refuserais intérieurement cette mesure.' },
    ],
  },
  {
    id: 'bv2',
    text: 'Pour vous, l\'autorité doit-elle être comprise ou simplement respectée ?',
    options: [
      { letter: 'A', text: 'Respectée avant tout.' },
      { letter: 'B', text: 'Respectée, même si la compréhension aide.' },
      { letter: 'C', text: 'Les deux sont nécessaires.' },
      { letter: 'D', text: 'Respectée par prudence.' },
      { letter: 'E', text: 'Contestée si elle devient injuste.' },
    ],
  },
  {
    id: 'bv3',
    text: 'Si un proche souffrait à cause d\'une décision du régime, que feriez-vous ?',
    options: [
      { letter: 'A', text: 'Je lui rappellerais que le devoir passe avant la douleur.' },
      { letter: 'B', text: 'Je le soutiendrais, sans remettre Rivengard en cause.' },
      { letter: 'C', text: 'Je chercherais à comprendre si cette souffrance est justifiée.' },
      { letter: 'D', text: 'Je serais déchiré, mais je ne m\'opposerais pas.' },
      { letter: 'E', text: 'Je commencerais à douter profondément.' },
    ],
  },
  {
    id: 'bv4',
    text: 'Votre loyauté envers Rivengard est-elle absolue ?',
    options: [
      { letter: 'A', text: 'Oui.' },
      { letter: 'B', text: 'Elle est très forte, mais je reste sensible aux injustices.' },
      { letter: 'C', text: 'Elle dépend de la direction que prend le régime.' },
      { letter: 'D', text: 'Elle tient surtout parce que je crains pour ma vie.' },
      { letter: 'E', text: 'Non.' },
    ],
  },
]

export const BRANCHE_JAUNE: Question[] = [
  {
    id: 'bj1',
    text: 'Quand vous doutez d\'une décision officielle, que faites-vous le plus souvent ?',
    options: [
      { letter: 'A', text: 'Je fais taire ce doute.' },
      { letter: 'B', text: 'Je le garde pour moi.' },
      { letter: 'C', text: 'J\'essaie d\'en discuter avec prudence.' },
      { letter: 'D', text: 'Je le cache par peur.' },
      { letter: 'E', text: 'Je cherche des personnes qui pensent comme moi.' },
    ],
  },
  {
    id: 'bj2',
    text: 'Qu\'est-ce qui vous empêche le plus de désobéir ?',
    options: [
      { letter: 'A', text: 'Ma fidélité à Rivengard.' },
      { letter: 'B', text: 'Le respect de mes engagements.' },
      { letter: 'C', text: 'Le besoin de comprendre avant d\'agir.' },
      { letter: 'D', text: 'La peur de la punition.' },
      { letter: 'E', text: 'Rien, si la cause est juste.' },
    ],
  },
  {
    id: 'bj3',
    text: 'Si vous entendiez quelqu\'un critiquer Rivengard en privé, que feriez-vous ?',
    options: [
      { letter: 'A', text: 'Je le signalerais.' },
      { letter: 'B', text: 'Je l\'écouterais, mais je resterais prudent.' },
      { letter: 'C', text: 'Je lui poserais des questions.' },
      { letter: 'D', text: 'Je partirais pour ne pas être impliqué.' },
      { letter: 'E', text: 'Je chercherais à savoir s\'il existe une opposition organisée.' },
    ],
  },
  {
    id: 'bj4',
    text: 'Selon vous, une personne peut-elle aimer Rivengard et le critiquer ?',
    options: [
      { letter: 'A', text: 'Non, la critique affaiblit la loyauté.' },
      { letter: 'B', text: 'Oui, mais elle doit rester discrète.' },
      { letter: 'C', text: 'Oui, critiquer peut être une preuve d\'attachement.' },
      { letter: 'D', text: 'Oui, mais c\'est dangereux.' },
      { letter: 'E', text: 'Non, car Rivengard ne mérite plus cet amour.' },
    ],
  },
  {
    id: 'bj5',
    text: 'Quelle phrase décrit le mieux votre état intérieur ?',
    options: [
      { letter: 'A', text: '"Je ne dois pas douter."' },
      { letter: 'B', text: '"Je veux rester fidèle malgré mes malaises."' },
      { letter: 'C', text: '"Je veux comprendre avant d\'obéir."' },
      { letter: 'D', text: '"Je veux survivre sans attirer l\'attention."' },
    ],
  },
]

export const BRANCHE_ROUGE: Question[] = [
  {
    id: 'br1',
    text: 'Si vous aviez la certitude qu\'une loi de Rivengard détruit des innocents, que feriez-vous ?',
    options: [
      { letter: 'A', text: 'Je chercherais encore à comprendre la raison officielle.' },
      { letter: 'B', text: 'Je tenterais d\'aider discrètement sans m\'exposer.' },
      { letter: 'C', text: 'Je refuserais d\'y participer.' },
      { letter: 'D', text: 'Je protégerais les victimes si possible.' },
      { letter: 'E', text: 'Je chercherais à combattre cette loi activement.' },
    ],
  },
  {
    id: 'br2',
    text: 'Jusqu\'où iriez-vous pour protéger quelqu\'un poursuivi injustement ?',
    options: [
      { letter: 'A', text: 'Je ne mettrais pas Rivengard en danger.' },
      { letter: 'B', text: 'Je l\'aiderais seulement si les risques sont limités.' },
      { letter: 'C', text: 'Je cacherais des informations.' },
      { letter: 'D', text: 'Je l\'aiderais à fuir.' },
      { letter: 'E', text: 'Je rejoindrais son combat.' },
    ],
  },
  {
    id: 'br3',
    text: 'Que représente la rébellion pour vous ?',
    options: [
      { letter: 'A', text: 'Une menace dangereuse.' },
      { letter: 'B', text: 'Une erreur parfois compréhensible.' },
      { letter: 'C', text: 'Un dernier recours.' },
      { letter: 'D', text: 'Une réponse possible à l\'injustice.' },
      { letter: 'E', text: 'Une nécessité.' },
    ],
  },
  {
    id: 'br4',
    text: 'Si vous deviez choisir entre votre sécurité et vos convictions, que choisiriez-vous ?',
    options: [
      { letter: 'A', text: 'Ma sécurité.' },
      { letter: 'B', text: 'Ma sécurité, sauf cas extrême.' },
      { letter: 'C', text: 'Cela dépendrait de la personne à protéger.' },
      { letter: 'D', text: 'Mes convictions, même avec peur.' },
      { letter: 'E', text: 'Mes convictions, sans hésiter.' },
    ],
  },
  {
    id: 'br5',
    text: 'Votre opposition à Rivengard est-elle personnelle ou idéologique ?',
    options: [
      { letter: 'A', text: 'Je ne suis pas vraiment opposé.' },
      { letter: 'B', text: 'Elle vient surtout de blessures personnelles.' },
      { letter: 'C', text: 'Elle vient de mes valeurs morales.' },
      { letter: 'D', text: 'Elle vient de ce que j\'ai vu subir à d\'autres.' },
      { letter: 'E', text: 'Elle est totale : personnelle, morale et politique.' },
    ],
  },
]

export const SCENARIOS: Question[] = [
  {
    id: 'sc1',
    text: 'Vous trouvez une lettre cachée dans une salle vide. Elle critique ouvertement Rivengard, mais ne contient aucun appel à la violence. Que faites-vous ?',
    options: [
      { letter: 'A', text: 'Je la remets immédiatement aux autorités.' },
      { letter: 'B', text: 'Je la remets, mais sans chercher à savoir qui l\'a écrite.' },
      { letter: 'C', text: 'Je la lis entièrement pour comprendre avant d\'agir.' },
      { letter: 'D', text: 'Je la cache, effrayé par ce qu\'elle implique.' },
      { letter: 'E', text: 'Je la conserve ou cherche à contacter son auteur.' },
    ],
  },
  {
    id: 'sc2',
    text: 'Une personne que vous respectez vous confie qu\'elle ne croit plus en Rivengard. Elle vous demande simplement de garder le secret. Que faites-vous ?',
    options: [
      { letter: 'A', text: 'Je refuse de porter ce secret et je signale.' },
      { letter: 'B', text: 'Je lui conseille de revenir dans le droit chemin.' },
      { letter: 'C', text: 'Je l\'écoute, mais je reste prudent.' },
      { letter: 'D', text: 'Je garde le secret, mais cela me ronge.' },
      { letter: 'E', text: 'Je lui demande comment l\'aider.' },
    ],
  },
  {
    id: 'sc3',
    text: 'Une décision officielle améliore la sécurité générale, mais condamne une minorité à perdre certains droits. Que pensez-vous ?',
    options: [
      { letter: 'A', text: 'C\'est regrettable, mais nécessaire.' },
      { letter: 'B', text: 'Cela peut se justifier si c\'est temporaire.' },
      { letter: 'C', text: 'Cela doit être débattu et surveillé.' },
      { letter: 'D', text: 'Cela me révolte, mais je ne dirai rien.' },
      { letter: 'E', text: 'C\'est une ligne rouge.' },
    ],
  },
]

export const BRANCHES: Record<Branch, Question[]> = {
  verte: BRANCHE_VERTE,
  jaune: BRANCHE_JAUNE,
  rouge: BRANCHE_ROUGE,
}

export function determineBranch(answers: Record<string, Letter>, tronc: Question[] = TRONC_COMMUN): Branch {
  const counts: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 }
  tronc.forEach(q => {
    const a = answers[q.id]
    if (a) counts[a]++
  })

  const abCount = counts.A + counts.B
  const cdCount = counts.C + counts.D
  const eCount = counts.E

  if (eCount > abCount && eCount > cdCount) return 'rouge'
  if (cdCount >= abCount) return 'jaune'
  return 'verte'
}

export function computeStats(answers: Record<string, Letter>) {
  const counts: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 }
  const total = Object.values(answers).length
  Object.values(answers).forEach(l => { counts[l]++ })
  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0
  return {
    counts,
    total,
    percentages: {
      A: pct(counts.A),
      B: pct(counts.B),
      C: pct(counts.C),
      D: pct(counts.D),
      E: pct(counts.E),
    },
  }
}

export const BRANCH_LABELS: Record<Branch, { label: string; color: string; bg: string; description: string }> = {
  verte: {
    label: 'Branche Verte',
    color: '#16a34a',
    bg: '#dcfce7',
    description: 'Profil Loyaliste',
  },
  jaune: {
    label: 'Branche Jaune',
    color: '#ca8a04',
    bg: '#fef9c3',
    description: 'Profil Ambivalent',
  },
  rouge: {
    label: 'Branche Rouge',
    color: '#dc2626',
    bg: '#fee2e2',
    description: 'Profil de Rupture',
  },
}

export const LETTER_LABELS: Record<Letter, string> = {
  A: 'Dévoué',
  B: 'Attaché',
  C: 'Questionneur',
  D: 'Tiraillé',
  E: 'Insurgé',
}
