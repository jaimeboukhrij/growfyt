import * as path from 'path'
import { Readable } from 'stream'

import { Injectable } from '@nestjs/common'
import { Muscle } from '@prisma/client'

import { CloudFlareService } from '../../cloudflare/cloudflare.service'

@Injectable()
export class ExerciseMuscleImage {
  private readonly allowedMuscles = new Set([
    'abductors',
    'abs',
    'adductors',
    'all_lower',
    'all_upper',
    'all',
    'back_lower',
    'back_upper',
    'back',
    'biceps',
    'calfs',
    'chest',
    'core_lower',
    'core_upper',
    'core',
    'forearms',
    'gluteus',
    'hamstring',
    'hands',
    'latissimus',
    'legs',
    'neck',
    'quadriceps',
    'shoulders_back',
    'shoulders_front',
    'shoulders',
    'triceps'
  ])

  private readonly muscleEnumToApiMuscle: Partial<Record<Muscle, string>> = {
    UPPER_BACK: 'back_upper',
    LATS: 'latissimus',
    TRAPS: 'traps',
    SPINE: 'spine',
    REAR_DELTS: 'shoulders_back',
    BICEPS: 'biceps',
    FOREARMS: 'forearms',
    SHOULDERS: 'shoulders',
    GLUTES: 'gluteus',
    HAMSTRINGS: 'hamstring',
    CHEST: 'chest',
    TRICEPS: 'triceps'
    // Los siguientes no están en allowedMuscles y no deben mapearse:
    // RHOMBOIDS, WAIST
  }

  private readonly publicDir = path.join(process.cwd(), 'public', 'muscles')

  constructor (private readonly cloudFlareService: CloudFlareService) {}

  async getColoredMuscleImage (
    target: Muscle,
    secondaryMuscles: Muscle[],
    slug: string,
    transparent = true
  ): Promise<string> {
    const musclesRaw = [target, ...secondaryMuscles]
    const muscles = musclesRaw
      .map((m) => this.normalizeMuscle(m))
      .filter((m): m is string => !!m)
    if (!muscles.length) {
      throw new Error('No hay músculos válidos para generar imagen')
    }
    const mainColor = 'ef4444'
    const secondaryColor = 'fbbf24'
    const finalColors = [
      mainColor,
      ...Array(Math.max(muscles.length - 1, 0)).fill(secondaryColor)
    ]
    const key = `training/exercise/muscle-image/${slug}`
    const fileName = `${key}.png`
    const id = key // Usar el key como id único
    const query = new URLSearchParams({
      muscleGroups: muscles.join(','),
      colors: finalColors.join(','),
      transparentBackground: transparent ? '1' : '0'
    })
    const url = `https://muscle-group-image-generator.p.rapidapi.com/getIndividualColorImage?${query.toString()}`
    console.log({ url })
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
        'x-rapidapi-host': 'muscle-group-image-generator.p.rapidapi.com'
      }
    }
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        console.error('[Error] API Response not ok:', response.status, response.statusText)
        throw new Error(`Error de respuesta: ${response.statusText}`)
      }
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      if (buffer.length === 0) {
        throw new Error('La respuesta de la API está vacía')
      }
      // Crear objeto tipo Express.Multer.File
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: fileName,
        encoding: '7bit',
        mimetype: 'image/png',
        size: buffer.length,
        buffer,
        destination: '',
        filename: fileName,
        path: '',
        stream: Readable.from(buffer)
      }
      // Subir usando tu servicio
      const result = await this.cloudFlareService.uploadImage(file, id)
      return result.urlImage
    } catch (error) {
      console.error('[Error] Error al obtener imagen muscular:', error)
      throw new Error(`No se pudo obtener la imagen muscular: ${error.message}`)
    }
  }

  private normalizeMuscle (muscle: Muscle | string): string | null {
    const mapped = this.muscleEnumToApiMuscle[muscle]
    return mapped && this.allowedMuscles.has(mapped) ? mapped : null
  }
}
