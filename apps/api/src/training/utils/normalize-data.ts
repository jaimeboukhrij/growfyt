function normalizeText (text: string): string {
  return text
    .normalize('NFD') // Descompone caracteres con diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
}

function normalizeExerciseData<T extends { name: string, description: string, instructions: string[], secondaryMuscles: string[] }> (data: T[]): T[] {
  return data.map(exercise => ({
    ...exercise,
    name: normalizeText(exercise.name),
    description: normalizeText(exercise.description),
    instructions: exercise.instructions.map((instruction: string) => normalizeText(instruction)),
    secondaryMuscles: exercise.secondaryMuscles.map((muscle: string) => normalizeText(muscle))
  })) as T[]
}

export { normalizeText, normalizeExerciseData }
