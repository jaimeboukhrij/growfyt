import { PrismaClient, BodyPart as PrismaBodyPart, Equipment as PrismaEquipment, Muscle as PrismaMuscle, Difficulty as PrismaDifficulty, Category as PrismaCategory } from '@prisma/client'
import { Difficulty, Muscle, Equipment, Category, BodyPart } from 'growfit-shared'

import { backExerciseData } from '../src/training/data/backExercise.data'

const prisma = new PrismaClient()

// Mapeo de enums del shared package a enums de Prisma
function getEquipmentEnum (value: string): PrismaEquipment {
  const mapping: Record<string, PrismaEquipment> = {
    [Equipment.BARBELL]: PrismaEquipment.BARBELL,
    [Equipment.DUMBBELL]: PrismaEquipment.DUMBBELL,
    [Equipment.CABLE]: PrismaEquipment.CABLE,
    [Equipment.BODYWEIGHT]: PrismaEquipment.BODYWEIGHT,
    [Equipment.LEVER_MACHINE]: PrismaEquipment.LEVER_MACHINE,
    [Equipment.KETTLEBELL]: PrismaEquipment.KETTLEBELL,
    [Equipment.RESISTANCE_BAND]: PrismaEquipment.RESISTANCE_BAND,
    [Equipment.NO_EQUIPMENT]: PrismaEquipment.NO_EQUIPMENT
  }
  return mapping[value] || PrismaEquipment.NO_EQUIPMENT
}

function getMuscleEnum (value: string): PrismaMuscle {
  const mapping: Record<string, PrismaMuscle> = {
    [Muscle.UPPER_BACK]: PrismaMuscle.UPPER_BACK,
    [Muscle.LATS]: PrismaMuscle.LATS,
    [Muscle.TRAPS]: PrismaMuscle.TRAPS,
    [Muscle.SPINE]: PrismaMuscle.SPINE,
    [Muscle.RHOMBOIDS]: PrismaMuscle.RHOMBOIDS,
    [Muscle.REAR_DELTS]: PrismaMuscle.REAR_DELTS,
    [Muscle.BICEPS]: PrismaMuscle.BICEPS,
    [Muscle.FOREARMS]: PrismaMuscle.FOREARMS,
    [Muscle.SHOULDERS]: PrismaMuscle.SHOULDERS,
    [Muscle.GLUTES]: PrismaMuscle.GLUTES,
    [Muscle.HAMSTRINGS]: PrismaMuscle.HAMSTRINGS,
    [Muscle.CHEST]: PrismaMuscle.CHEST,
    [Muscle.TRICEPS]: PrismaMuscle.TRICEPS,
    [Muscle.WAIST]: PrismaMuscle.WAIST
  }
  return mapping[value] || PrismaMuscle.UPPER_BACK
}

function getDifficultyEnum (value: string): PrismaDifficulty {
  const mapping: Record<string, PrismaDifficulty> = {
    [Difficulty.BEGINNER]: PrismaDifficulty.BEGINNER,
    [Difficulty.INTERMEDIATE]: PrismaDifficulty.INTERMEDIATE,
    [Difficulty.ADVANCED]: PrismaDifficulty.ADVANCED
  }
  return mapping[value] || PrismaDifficulty.BEGINNER
}

function getCategoryEnum (value: string): PrismaCategory {
  const mapping: Record<string, PrismaCategory> = {
    [Category.STRENGTH]: PrismaCategory.STRENGTH,
    [Category.CARDIO]: PrismaCategory.CARDIO,
    [Category.FLEXIBILITY]: PrismaCategory.FLEXIBILITY,
    [Category.STRETCHING]: PrismaCategory.STRETCHING
  }
  return mapping[value] || PrismaCategory.STRENGTH
}

function getBodyPartEnum (value: string): PrismaBodyPart {
  const mapping: Record<string, PrismaBodyPart> = {
    [BodyPart.BACK]: PrismaBodyPart.BACK,
    [BodyPart.CHEST]: PrismaBodyPart.CHEST,
    [BodyPart.LEGS]: PrismaBodyPart.LEGS,
    [BodyPart.ARMS]: PrismaBodyPart.ARMS,
    [BodyPart.SHOULDERS]: PrismaBodyPart.SHOULDERS,
    [BodyPart.CORE]: PrismaBodyPart.CORE,
    [BodyPart.GLUTES]: PrismaBodyPart.GLUTES
  }
  return mapping[value] || PrismaBodyPart.BACK
}

function getSecondaryMusclesEnum (muscles: string[]): PrismaMuscle[] {
  return muscles.map(muscle => getMuscleEnum(muscle))
}

async function seedBackExercises () {
  try {
    console.log('🌱 Iniciando proceso de seed de ejercicios de espalda...')

    // Borrar ejercicios de espalda existentes
    console.log('🗑️  Eliminando ejercicios de espalda existentes...')
    const deleteResult = await prisma.exercise.deleteMany({
      where: {
        bodyPart: PrismaBodyPart.BACK
      }
    })
    console.log(`✅ Eliminados ${deleteResult.count} ejercicios de espalda`)

    // Insertar ejercicios uno por uno para manejar duplicados
    let insertedCount = 0
    let skippedCount = 0
    let errorCount = 0

    console.log('\n📝 Insertando nuevos ejercicios...')

    for (const exerciseData of backExerciseData) {
      try {
        const exerciseToInsert = {
          bodyPart: getBodyPartEnum(exerciseData.bodyPart),
          equipment: getEquipmentEnum(exerciseData.equipment),
          playbackId: exerciseData.playbackId,
          name: exerciseData.name,
          slug: exerciseData.slug,
          primaryMuscle: getMuscleEnum(exerciseData.primarymuscle),
          secondaryMuscles: getSecondaryMusclesEnum(exerciseData.secondaryMuscles),
          difficulty: getDifficultyEnum(exerciseData.difficulty),
          category: getCategoryEnum(exerciseData.category),
          description: exerciseData.description,
          instructions: exerciseData.instructions
        }

        await prisma.exercise.create({
          data: exerciseToInsert
        })

        insertedCount++
        console.log(`✅ Insertado: ${exerciseData.name}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.code === 'P2002') {
          // Violación de constraint único (slug ya existe)
          console.log(`⚠️  Ya existe: ${exerciseData.name} (slug: ${exerciseData.slug})`)
          skippedCount++
        } else {
          console.error(`❌ Error insertando ${exerciseData.name}:`, error.message)
          errorCount++
        }
      }
    }

    console.log('\n📊 Resumen de la inserción:')
    console.log(`   ✅ Insertados: ${insertedCount}`)
    console.log(`   ⚠️  Omitidos (duplicados): ${skippedCount}`)
    console.log(`   ❌ Errores: ${errorCount}`)
    console.log(`   📝 Total procesados: ${backExerciseData.length}`)

    // Verificar total de ejercicios después de la inserción
    const finalCount = await prisma.exercise.count({
      where: {
        bodyPart: PrismaBodyPart.BACK
      }
    })

    console.log(`\n🎯 Total de ejercicios de espalda en la BD: ${finalCount}`)
  } catch (error) {
    console.error('❌ Error durante la inserción:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Función para limpiar todos los ejercicios (opcional)
async function clearAllExercises () {
  try {
    console.log('🗑️  Limpiando todos los ejercicios...')
    const deleteResult = await prisma.exercise.deleteMany()
    console.log(`🗑️  Eliminados ${deleteResult.count} ejercicios`)
  } catch (error) {
    console.error('❌ Error limpiando ejercicios:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Función para limpiar solo ejercicios de espalda
async function clearBackExercises () {
  try {
    console.log('🗑️  Limpiando ejercicios de espalda...')
    const deleteResult = await prisma.exercise.deleteMany({
      where: {
        bodyPart: PrismaBodyPart.BACK
      }
    })
    console.log(`🗑️  Eliminados ${deleteResult.count} ejercicios de espalda`)
  } catch (error) {
    console.error('❌ Error limpiando ejercicios de espalda:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar función según argumentos de línea de comandos
async function main () {
  const args = process.argv.slice(2)

  if (args.includes('--clear-all')) {
    await clearAllExercises()
  } else if (args.includes('--clear-back')) {
    await clearBackExercises()
  } else if (args.includes('--seed')) {
    await seedBackExercises()
  } else if (args.includes('--reset')) {
    await clearBackExercises()
    await seedBackExercises()
  } else {
    console.log('🚀 Uso del script:')
    console.log('  npm run seed-exercises --seed         # Insertar ejercicios')
    console.log('  npm run seed-exercises --clear-back   # Limpiar ejercicios de espalda')
    console.log('  npm run seed-exercises --clear-all    # Limpiar todos los ejercicios')
    console.log('  npm run seed-exercises --reset        # Limpiar e insertar ejercicios de espalda')
    console.log('')
    console.log('🌱 Ejecutando inserción por defecto...')
    await seedBackExercises()
  }
}

// Ejecutar si el archivo se ejecuta directamente
if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Error fatal:', error)
    process.exit(1)
  })
}

export { seedBackExercises, clearAllExercises, clearBackExercises }
