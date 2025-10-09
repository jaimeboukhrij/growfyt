import { PrismaClient, BodyPart, Equipment, Difficulty, Category, TargetMuscle } from '@prisma/client'
import { BodyParts, Equipment as SharedEquipment, ExerciseDifficultyValues, CategoryValues, TargetMuscles } from 'growfit-shared'

import { backExerciseData } from '../src/training/data/backExercise.data'

const prisma = new PrismaClient()

// Mapeo de enums del shared package a enums de Prisma
function getEquipmentEnum (value: string): Equipment {
  const mapping: Record<string, Equipment> = {
    [SharedEquipment.BARBELL]: Equipment.BARBELL,
    [SharedEquipment.DUMBBELL]: Equipment.DUMBBELL,
    [SharedEquipment.CABLE]: Equipment.CABLE,
    [SharedEquipment.BODYWEIGHT]: Equipment.BODYWEIGHT,
    [SharedEquipment.LEVER_MACHINE]: Equipment.LEVER_MACHINE,
    [SharedEquipment.KETTLEBELL]: Equipment.KETTLEBELL,
    [SharedEquipment.RESISTANCE_BAND]: Equipment.RESISTANCE_BAND,
    [SharedEquipment.NO_EQUIPMENT]: Equipment.NO_EQUIPMENT
  }
  return mapping[value] || Equipment.NO_EQUIPMENT
}

function getTargetEnum (value: string): TargetMuscle {
  const mapping: Record<string, TargetMuscle> = {
    [TargetMuscles.UPPER_BACK]: TargetMuscle.UPPER_BACK,
    [TargetMuscles.LATS]: TargetMuscle.LATS,
    [TargetMuscles.TRAPS]: TargetMuscle.TRAPS,
    [TargetMuscles.SPINE]: TargetMuscle.SPINE,
    [TargetMuscles.RHOMBOIDS]: TargetMuscle.RHOMBOIDS,
    [TargetMuscles.REAR_DELTS]: TargetMuscle.REAR_DELTS
  }
  return mapping[value] || TargetMuscle.UPPER_BACK
}

function getDifficultyEnum (value: string): Difficulty {
  const mapping: Record<string, Difficulty> = {
    [ExerciseDifficultyValues.BEGINNER]: Difficulty.BEGINNER,
    [ExerciseDifficultyValues.INTERMEDIATE]: Difficulty.INTERMEDIATE,
    [ExerciseDifficultyValues.ADVANCED]: Difficulty.ADVANCED
  }
  return mapping[value] || Difficulty.BEGINNER
}

function getCategoryEnum (value: string): Category {
  const mapping: Record<string, Category> = {
    [CategoryValues.STRENGTH]: Category.STRENGTH,
    [CategoryValues.CARDIO]: Category.CARDIO,
    [CategoryValues.FLEXIBILITY]: Category.FLEXIBILITY,
    [CategoryValues.STRETCHING]: Category.STRETCHING
  }
  return mapping[value] || Category.STRENGTH
}

function getBodyPartEnum (value: string): BodyPart {
  const mapping: Record<string, BodyPart> = {
    [BodyParts.BACK]: BodyPart.BACK,
    [BodyParts.CHEST]: BodyPart.CHEST,
    [BodyParts.LEGS]: BodyPart.LEGS,
    [BodyParts.ARMS]: BodyPart.ARMS,
    [BodyParts.SHOULDERS]: BodyPart.SHOULDERS,
    [BodyParts.CORE]: BodyPart.CORE,
    [BodyParts.GLUTES]: BodyPart.GLUTES
  }
  return mapping[value] || BodyPart.BACK
}

async function seedBackExercises () {
  try {
    console.log('🌱 Iniciando proceso de seed de ejercicios de espalda...')

    // Borrar ejercicios de espalda existentes
    console.log('🗑️  Eliminando ejercicios de espalda existentes...')
    const deleteResult = await prisma.exercise.deleteMany({
      where: {
        bodyPart: BodyPart.BACK
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
          target: getTargetEnum(exerciseData.target),
          secondaryMuscles: exerciseData.secondaryMuscles,
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
        bodyPart: BodyPart.BACK
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
        bodyPart: BodyPart.BACK
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
