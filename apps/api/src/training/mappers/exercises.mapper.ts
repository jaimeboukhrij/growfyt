import { BodyPart, Equipment as PrismaEquipment, TargetMuscle, Difficulty, Category } from '@prisma/client'
import { BodyParts, Equipment, TargetMuscles, ExerciseDifficultyValues, CategoryValues } from 'growfit-shared'

export function mapBodyPart (bodyPart: BodyPart): string {
  const mapping = {
    [BodyPart.BACK]: BodyParts.BACK,
    [BodyPart.CHEST]: BodyParts.CHEST,
    [BodyPart.LEGS]: BodyParts.LEGS,
    [BodyPart.ARMS]: BodyParts.ARMS,
    [BodyPart.SHOULDERS]: BodyParts.SHOULDERS,
    [BodyPart.CORE]: BodyParts.CORE,
    [BodyPart.GLUTES]: BodyParts.GLUTES
  }
  return mapping[bodyPart]
}

export function mapEquipment (equipment: PrismaEquipment): string {
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

export function mapTargetMuscle (target: TargetMuscle): string {
  const mapping = {
    [TargetMuscle.UPPER_BACK]: TargetMuscles.UPPER_BACK,
    [TargetMuscle.LATS]: TargetMuscles.LATS,
    [TargetMuscle.TRAPS]: TargetMuscles.TRAPS,
    [TargetMuscle.SPINE]: TargetMuscles.SPINE,
    [TargetMuscle.RHOMBOIDS]: TargetMuscles.RHOMBOIDS,
    [TargetMuscle.REAR_DELTS]: TargetMuscles.REAR_DELTS
  }
  return mapping[target]
}

export function mapDifficulty (difficulty: Difficulty): string {
  const mapping = {
    [Difficulty.BEGINNER]: ExerciseDifficultyValues.BEGINNER,
    [Difficulty.INTERMEDIATE]: ExerciseDifficultyValues.INTERMEDIATE,
    [Difficulty.ADVANCED]: ExerciseDifficultyValues.ADVANCED
  }
  return mapping[difficulty]
}

export function mapCategory (category: Category): string {
  const mapping = {
    [Category.STRENGTH]: CategoryValues.STRENGTH,
    [Category.CARDIO]: CategoryValues.CARDIO,
    [Category.FLEXIBILITY]: CategoryValues.FLEXIBILITY,
    [Category.STRETCHING]: CategoryValues.STRETCHING
  }
  return mapping[category]
}
