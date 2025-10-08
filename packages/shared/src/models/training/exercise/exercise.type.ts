import type { z } from 'zod'

import { type ExercisesQueryParamsSchema } from '../../../schemas/training/exercise'

export type ExercisesQueryParams = z.infer<typeof ExercisesQueryParamsSchema>
