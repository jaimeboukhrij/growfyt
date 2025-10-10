import { BodyPart as PrismaBodyPart, Equipment as PrismaEquipment, Muscle as PrismaMuscle, Difficulty as PrismaDifficulty, Category as PrismaCategory } from '@prisma/client'
import { BodyPart, Equipment, Muscle, Difficulty, Category } from 'growfit-shared'

export function mapBodyPart (bodyPart: PrismaBodyPart): BodyPart {
  const mapping = {
    [PrismaBodyPart.BACK]: BodyPart.BACK,
    [PrismaBodyPart.CHEST]: BodyPart.CHEST,
    [PrismaBodyPart.LEGS]: BodyPart.LEGS,
    [PrismaBodyPart.ARMS]: BodyPart.ARMS,
    [PrismaBodyPart.SHOULDERS]: BodyPart.SHOULDERS,
    [PrismaBodyPart.CORE]: BodyPart.CORE,
    [PrismaBodyPart.GLUTES]: BodyPart.GLUTES
  }
  return mapping[bodyPart]
}

export function mapEquipment (equipment: PrismaEquipment): Equipment {
  const mapping = {
    [PrismaEquipment.BARBELL]: Equipment.BARBELL,
    [PrismaEquipment.DUMBBELL]: Equipment.DUMBBELL,
    [PrismaEquipment.CABLE]: Equipment.CABLE,
    [PrismaEquipment.BODYWEIGHT]: Equipment.BODYWEIGHT,
    [PrismaEquipment.LEVER_MACHINE]: Equipment.LEVER_MACHINE,
    [PrismaEquipment.KETTLEBELL]: Equipment.KETTLEBELL,
    [PrismaEquipment.RESISTANCE_BAND]: Equipment.RESISTANCE_BAND,
    [PrismaEquipment.NO_EQUIPMENT]: Equipment.NO_EQUIPMENT
  }
  return mapping[equipment]
}

export function mapTargetMuscle (target: PrismaMuscle): Muscle {
  const mapping = {
    [PrismaMuscle.UPPER_BACK]: Muscle.UPPER_BACK,
    [PrismaMuscle.LATS]: Muscle.LATS,
    [PrismaMuscle.TRAPS]: Muscle.TRAPS,
    [PrismaMuscle.SPINE]: Muscle.SPINE,
    [PrismaMuscle.RHOMBOIDS]: Muscle.RHOMBOIDS,
    [PrismaMuscle.REAR_DELTS]: Muscle.REAR_DELTS,
    [PrismaMuscle.BICEPS]: Muscle.BICEPS,
    [PrismaMuscle.FOREARMS]: Muscle.FOREARMS,
    [PrismaMuscle.SHOULDERS]: Muscle.SHOULDERS,
    [PrismaMuscle.GLUTES]: Muscle.GLUTES,
    [PrismaMuscle.HAMSTRINGS]: Muscle.HAMSTRINGS,
    [PrismaMuscle.CHEST]: Muscle.CHEST,
    [PrismaMuscle.TRICEPS]: Muscle.TRICEPS,
    [PrismaMuscle.WAIST]: Muscle.WAIST
  }
  return mapping[target]
}

export function mapDifficulty (difficulty: PrismaDifficulty): Difficulty {
  const mapping = {
    [PrismaDifficulty.BEGINNER]: Difficulty.BEGINNER,
    [PrismaDifficulty.INTERMEDIATE]: Difficulty.INTERMEDIATE,
    [PrismaDifficulty.ADVANCED]: Difficulty.ADVANCED
  }
  return mapping[difficulty]
}

export function mapCategory (category: PrismaCategory): Category {
  const mapping = {
    [PrismaCategory.STRENGTH]: Category.STRENGTH,
    [PrismaCategory.CARDIO]: Category.CARDIO,
    [PrismaCategory.FLEXIBILITY]: Category.FLEXIBILITY,
    [PrismaCategory.STRETCHING]: Category.STRETCHING
  }
  return mapping[category]
}
