import { normalizeExerciseData } from '../utils/normalize-data'

const rawBackExerciseData = [
  {
    bodyPart: 'espalda',
    equipment: 'barra',
    playbackId: '6a0298b42f325f52ded080c3c5c112ab',
    name: 'remo con barra inclinado',
    slug: 'barbell-bent-over-row',
    primarymuscle: 'parte superior de la espalda',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'intermedio',
    category: 'fuerza',
    description:
      'El remo con barra inclinado es un ejercicio compuesto que se enfoca en los músculos de la parte superior de la espalda, incluyendo los dorsales, romboides y trapecios. Consiste en inclinarse desde las caderas y tirar de una barra hacia el pecho mientras se mantiene la espalda recta.',
    instructions: [
      'Párate con los pies separados al ancho de los hombros y las rodillas ligeramente dobladas.',
      'Inclínate hacia adelante desde las caderas, manteniendo la espalda recta y el pecho erguido.',
      'Agarra la barra con un agarre por encima de la mano, con las manos un poco más separadas que el ancho de los hombros.',
      'Jala la barra hacia la parte baja de tu pecho retrayendo los omóplatos y contrayendo los músculos de la espalda.',
      'Haz una pausa por un momento en la parte superior, luego baja lentamente la barra de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'mancuerna',
    playbackId: '457d83ec74da8e05da16f98ed11e82bc',
    name: 'remo inclinado con mancuerna a un brazo',
    slug: 'dumbbell-one-arm-bent-over-row',
    primarymuscle: 'parte superior de la espalda',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'intermedio',
    category: 'fuerza',
    description:
      'El remo inclinado con mancuerna a un brazo es un ejercicio unilateral que se enfoca en la parte superior de la espalda y los dorsales. Ayuda a mejorar la fuerza de la espalda, la postura y la estabilidad del core al trabajar cada lado del cuerpo de forma independiente.',
    instructions: [
      'Párate con los pies separados al ancho de los hombros, sosteniendo una mancuerna en una mano con la palma mirando hacia tu cuerpo.',
      'Dobla ligeramente las rodillas e inclínate hacia adelante desde las caderas, manteniendo la espalda recta y el core activado.',
      'Deja que la mancuerna cuelgue directamente hacia el suelo, con el brazo completamente extendido.',
      'Jala la mancuerna hacia tu pecho, manteniendo el codo cerca de tu cuerpo y juntando los omóplatos.',
      'Haz una pausa por un momento en la parte superior, luego baja lentamente la mancuerna de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones y luego cambia de lado.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'cable',
    playbackId: 'cae6999b11fad3fedf4329c989041fbc',
    name: 'remo sentado en polea',
    slug: 'cable-seated-row',
    primarymuscle: 'parte superior de la espalda',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'principiante',
    category: 'fuerza',
    description:
      'El remo sentado en polea es un ejercicio popular para la espalda que se enfoca en la parte superior de la espalda, incluyendo los romboides y los dorsales. Se realiza en una máquina de remo sentado con cable y consiste en jalar un asa hacia el torso mientras se mantiene la espalda recta.',
    instructions: [
      'Siéntate en la máquina de remo con cable con los pies planos en los reposapiés y las rodillas ligeramente dobladas.',
      'Agarra las asas con un agarre por encima de la mano, manteniendo la espalda recta y los hombros relajados.',
      'Jala las asas hacia tu cuerpo, juntando los omóplatos.',
      'Haz una pausa por un momento en el punto máximo del movimiento, luego suelta lentamente las asas de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'cable',
    playbackId: 'c06c47029f96de0156157690b4b3e014',
    name: 'jalón en polea alta',
    slug: 'cable-pulldown',
    primarymuscle: 'dorsales',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'principiante',
    category: 'fuerza',
    description:
      'El jalón en polea alta es un excelente ejercicio para trabajar los músculos dorsal ancho (lats). Se realiza en una máquina de cable con una barra de jalón y es efectivo para desarrollar el ancho y la fuerza de la espalda.',
    instructions: [
      'Ajusta la máquina de jalón con cable para que el asiento esté a una altura cómoda y el cojín para las rodillas esté asegurado.',
      'Siéntate en el asiento con la espalda recta y los pies planos en el suelo.',
      'Agarra la barra de cable con un agarre por encima de la mano, un poco más ancho que el ancho de los hombros.',
      'Inclínate ligeramente hacia atrás y activa tu core.',
      'Jala la barra de cable hacia tu pecho, juntando los omóplatos.',
      'Haz una pausa por un momento en la parte inferior del movimiento, luego suelta lentamente la barra de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'peso corporal',
    playbackId: '43ed02374aaf349f7ba78e7be93d9bc4',
    name: 'dominada',
    slug: 'pull-up',
    primarymuscle: 'dorsales',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'avanzado',
    category: 'fuerza',
    description:
      'La dominada es un ejercicio desafiante con el peso corporal que es excelente para desarrollar la fuerza de la parte superior del cuerpo, especialmente en la espalda y los brazos. Requiere jalar el cuerpo hacia arriba desde una posición colgante hasta que la barbilla supere la barra.',
    instructions: [
      'Cuélgate de una barra de dominadas con las palmas mirando hacia afuera y los brazos completamente extendidos.',
      'Activa tu core y junta los omóplatos.',
      'Jala tu cuerpo hacia la barra doblando los codos y llevando el pecho hacia la barra.',
      'Haz una pausa en la parte superior del movimiento, luego baja lentamente tu cuerpo de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'peso corporal',
    playbackId: 'bf4686e1cc128f222aa5fc8d70b93256',
    name: 'dominada con agarre supino',
    slug: 'chin-up',
    primarymuscle: 'dorsales',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'intermedio',
    category: 'fuerza',
    description:
      'La dominada con agarre supino es una variación de la dominada que utiliza un agarre supino (palmas mirando hacia ti). Este agarre pone más énfasis en los bíceps, mientras que sigue trabajando eficazmente los dorsales y otros músculos de la espalda.',
    instructions: [
      'Cuélgate de una barra de dominadas con las palmas mirando hacia ti y las manos separadas al ancho de los hombros.',
      'Activa tu core y jala tu cuerpo hacia la barra, liderando con el pecho.',
      'Continúa jalando hasta que tu barbilla esté por encima de la barra.',
      'Haz una pausa por un momento en la parte superior, luego baja lentamente tu cuerpo de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'máquina de palanca',
    playbackId: '01c206184d86b2639bd635e2ae55e6d9',
    name: 'remo unilateral en máquina',
    slug: 'lever-unilateral-row',
    primarymuscle: 'parte superior de la espalda',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'intermedio',
    category: 'fuerza',
    description:
      'El remo unilateral en máquina es un ejercicio con máquina que permite trabajar de forma aislada cada lado de la espalda. Es ideal para corregir desequilibrios musculares y desarrollar fuerza en la parte superior de la espalda y los dorsales.',
    instructions: [
      'Ajusta la altura del asiento y colócate frente a la máquina.',
      'Agarra las asas con un agarre por encima de la mano y mantén la espalda recta.',
      'Jala las asas hacia tu cuerpo, juntando los omóplatos.',
      'Haz una pausa por un momento en el punto máximo del movimiento, luego suelta lentamente y extiende tus brazos de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'máquina de palanca',
    playbackId: '2a9ff2650d86aacd0851bc8bc8dd7a2e',
    name: 'jalón frontal en máquina de palanca',
    slug: 'lever-front-pulldown',
    primarymuscle: 'dorsales',
    secondaryMuscles: ['bíceps', 'romboides', 'deltoides traseros'],
    difficulty: 'intermedio',
    category: 'fuerza',
    description:
      'El jalón frontal en máquina de palanca es un ejercicio con máquina que se enfoca en los dorsales y otros músculos de la espalda. Es una excelente alternativa al jalón tradicional, ya que proporciona un camino de movimiento fijo para una activación muscular controlada y efectiva.',
    instructions: [
      'Ajusta la altura del asiento y colócate en la máquina con las rodillas debajo de los cojines y los pies planos en el suelo.',
      'Agarra las asas con un agarre por encima de la mano, un poco más ancho que el ancho de los hombros.',
      'Siéntate erguido con el pecho levantado y los hombros hacia atrás, manteniendo un ligero arco en la parte baja de la espalda.',
      'Activa los dorsales y jala las asas hacia tu pecho, juntando los omóplatos.',
      'Haz una pausa por un momento en la parte inferior del movimiento, luego suelta lentamente las asas de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'máquina de palanca',
    playbackId: 'd4b9e8e4243db7ba865ef185fac7c893',
    name: 'remo sentado en máquina de palanca',
    slug: 'lever-seated-row',
    primarymuscle: 'parte superior de la espalda',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'intermedio',
    category: 'fuerza',
    description:
      'El remo sentado en máquina de palanca es un ejercicio de espalda con máquina que se enfoca en la parte superior de la espalda, los dorsales y los romboides. Proporciona un entorno estable y controlado para desarrollar la fuerza de la espalda y mejorar la postura.',
    instructions: [
      'Ajusta la altura del asiento y los reposapiés a una posición cómoda.',
      'Siéntate en la máquina con el pecho contra el cojín y los pies en los reposapiés.',
      'Agarra las asas con un agarre por encima de la mano, separados al ancho de los hombros.',
      'Mantén la espalda recta y el core activado.',
      'Jala las asas hacia tu cuerpo, juntando los omóplatos.',
      'Haz una pausa por un momento en el punto máximo del movimiento.',
      'Suelta lentamente las asas y regresa a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'mancuerna',
    playbackId: '805388f163540bf55ed606a3124d1201',
    name: 'encogimiento de hombros con mancuernas',
    slug: 'dumbbell-shrug',
    primarymuscle: 'trapecios',
    secondaryMuscles: ['hombros'],
    difficulty: 'principiante',
    category: 'fuerza',
    description:
      'El encogimiento de hombros con mancuernas es un ejercicio de aislamiento que se enfoca en los músculos trapecios. Consiste en levantar los hombros hacia las orejas mientras se sostienen mancuernas, lo que es efectivo para desarrollar el tamaño y la fuerza de los trapecios.',
    instructions: [
      'Párate con los pies separados al ancho de los hombros y sostén una mancuerna en cada mano con las palmas mirando hacia tu cuerpo.',
      'Mantén los brazos rectos y deja que las mancuernas cuelguen a tus lados.',
      'Levanta los hombros lo más alto posible, como si intentaras tocar tus orejas con ellos.',
      'Mantén la contracción por un segundo, luego baja lentamente los hombros de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'barra',
    playbackId: '4f57de2d3bf9934511022ba9de320b57',
    name: 'encogimiento de hombros con barra',
    slug: 'barbell-shrug',
    primarymuscle: 'trapecios',
    secondaryMuscles: ['hombros'],
    difficulty: 'principiante',
    category: 'fuerza',
    description:
      'El encogimiento de hombros con barra es un ejercicio de fuerza clásico para trabajar los músculos trapecios. Consiste en levantar los hombros hacia las orejas mientras se sostiene una barra, lo que es efectivo para desarrollar masa y fuerza en los trapecios.',
    instructions: [
      'Párate con los pies separados al ancho de los hombros y sostén una barra frente a ti con un agarre por encima de la mano.',
      'Mantén los brazos y la espalda rectos durante todo el ejercicio.',
      'Levanta los hombros hacia las orejas lo más alto posible, contrayendo los trapecios en la parte superior.',
      'Mantén por un momento, luego baja lentamente los hombros de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'mancuerna',
    playbackId: 'c9dbd9b9402a6eb9e3a3c74cf774cf7c',
    name: 'remo con mancuernas para deltoides traseros acostado',
    slug: 'dumbbell-lying-rear-delt-row',
    primarymuscle: 'parte superior de la espalda',
    secondaryMuscles: ['hombros', 'bíceps'],
    difficulty: 'intermedio',
    category: 'fuerza',
    description:
      'El remo con mancuernas para deltoides traseros acostado es un ejercicio efectivo para aislar los deltoides traseros y los músculos de la parte superior de la espalda. Al estar acostado boca abajo, minimiza la participación de otros músculos y permite una contracción concentrada.',
    instructions: [
      'Acuéstate boca abajo en un banco plano con una mancuerna en cada mano, con las palmas mirando hacia adentro.',
      'Extiende los brazos rectos hacia el suelo, manteniendo una ligera flexión en los codos.',
      'Activando los músculos de la espalda, levanta las mancuernas hacia tu pecho, juntando los omóplatos.',
      'Haz una pausa por un momento en la parte superior, luego baja lentamente las mancuernas de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'peso corporal',
    playbackId: '4e090804bd61f64ea651956a58b73e3f',
    name: 'remo invertido',
    slug: 'inverted-row',
    primarymuscle: 'parte superior de la espalda',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    difficulty: 'principiante',
    category: 'fuerza',
    description:
      'El remo invertido es un ejercicio con el peso corporal que se enfoca en la parte superior de la espalda y los bíceps. Es una excelente alternativa para aquellos que no pueden hacer dominadas y es altamente escalable ajustando el ángulo de tu cuerpo.',
    instructions: [
      'Prepara una barra a la altura de la cintura o usa un entrenador de suspensión.',
      'Párate mirando hacia la barra o el entrenador de suspensión, con los pies separados al ancho de los hombros.',
      'Agarra la barra o las asas con un agarre por encima de la mano, un poco más ancho que el ancho de los hombros.',
      'Inclínate hacia atrás, manteniendo el cuerpo recto y los talones en el suelo.',
      'Jala el pecho hacia la barra o las asas, juntando los omóplatos.',
      'Haz una pausa por un momento en la parte superior, luego baja lentamente de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'peso corporal',
    playbackId: '125ef87a31f0a8e942cc6f2a87fade33',
    name: 'hiperextensión',
    slug: 'hyperextension',
    primarymuscle: 'columna vertebral',
    secondaryMuscles: ['glúteos', 'isquiotibiales'],
    difficulty: 'principiante',
    category: 'fuerza',
    description:
      'La hiperextensión, también conocida como extensión de espalda, es un ejercicio con el peso corporal que fortalece la parte baja de la espalda, los glúteos y los isquiotibiales. Se realiza típicamente en un banco de hiperextensión y ayuda a mejorar la postura y la estabilidad del core.',
    instructions: [
      'Ajusta el banco de hiperextensión para que tus muslos superiores descansen sobre el cojín y tus pies estén asegurados.',
      'Cruza los brazos sobre tu pecho o coloca las manos detrás de tu cabeza.',
      'Baja la parte superior de tu cuerpo hacia el suelo mientras mantienes la espalda recta.',
      'Haz una pausa por un momento en la parte inferior, luego levanta la parte superior de tu cuerpo hasta que esté en línea con tus piernas.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'peso corporal',
    playbackId: '552cfb3dc6e16694748e0e74461336f3',
    name: 'esfinge',
    slug: 'sphinx',
    primarymuscle: 'columna vertebral',
    secondaryMuscles: ['glúteos', 'isquiotibiales'],
    difficulty: 'principiante',
    category: 'estiramiento',
    description:
      'La esfinge es un ejercicio de estiramiento y fortalecimiento suave para la espalda y el core. Es una modificación de la postura de la cobra y es ideal para mejorar la movilidad y la flexibilidad de la columna vertebral.',
    instructions: [
      'Acuéstate boca abajo en el suelo con los antebrazos planos en el suelo, los codos directamente debajo de los hombros.',
      'Activa tu core y levanta el pecho del suelo, manteniendo los antebrazos y los dedos de los pies en el suelo.',
      'Mantén esta posición durante unos segundos, asegurándote de mantener el cuello en una posición neutral.',
      'Baja lentamente el pecho de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'barra',
    playbackId: '303c8080957fb806837fdc86886b41ef',
    name: 'pull-over con barra',
    slug: 'barbell-pullover',
    primarymuscle: 'dorsales',
    secondaryMuscles: ['pecho', 'tríceps'],
    difficulty: 'intermedio',
    category: 'fuerza',
    description:
      'El pull-over con barra es un ejercicio clásico que se enfoca en los músculos dorsales y del pecho. Se realiza acostado en un banco y moviendo una barra desde una posición sobre el pecho hasta detrás de la cabeza, lo que estira y fortalece la espalda.',
    instructions: [
      'Acuéstate en un banco plano con la cabeza en un extremo y los pies en el suelo.',
      'Sostén una barra con un agarre al ancho de los hombros y extiende los brazos rectos sobre tu pecho.',
      'Manteniendo los brazos rectos, baja la barra detrás de tu cabeza de manera controlada hasta que sientas un estiramiento en los dorsales.',
      'Haz una pausa por un momento, luego levanta la barra de vuelta a la posición inicial.',
      'Repite para el número deseado de repeticiones.'
    ]
  },
  {
    bodyPart: 'espalda',
    equipment: 'kettlebell',
    playbackId: '56470bdf702578e8fb0b3b04500b44e2',
    name: 'remo renegado alterno con kettlebell',
    slug: 'kettlebell-alternating-renegade-row',
    primarymuscle: 'parte superior de la espalda',
    secondaryMuscles: ['cintura', 'hombros'],
    difficulty: 'avanzado',
    category: 'fuerza',
    description:
      'El remo renegado alterno con kettlebell es un ejercicio dinámico de cuerpo completo que combina una plancha con un movimiento de remo. Es altamente efectivo para desarrollar la estabilidad del core, la fuerza de la espalda y la estabilidad de los hombros.',
    instructions: [
      'Comienza en una posición de plancha alta con las manos agarrando las kettlebells y los pies separados al ancho de las caderas.',
      'Activa tu core y mantén tu cuerpo en una línea recta desde la cabeza hasta los talones.',
      'Jala una kettlebell hacia tu pecho, manteniendo el codo cerca de tu cuerpo.',
      'Baja la kettlebell de vuelta a la posición inicial y repite con el otro brazo.',
      'Continúa alternando los brazos para el número deseado de repeticiones.'
    ]
  }
]

export const backExerciseData = normalizeExerciseData(rawBackExerciseData)
