import { Injectable } from '@nestjs/common'
import FormData from 'form-data'
import { CloudflareVideoAPIResponse } from 'growfit-shared'
import { request } from 'undici'

interface CloudflareResponse {
  success: boolean
  result?: {
    url?: string
    variants?: string[]
  }
  errors?: Array<{ message: string }>
}

@Injectable()
export class CloudFlareService {
  async uploadImage (file: Express.Multer.File, id: string) {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!
    const token = process.env.CLOUDFLARE_TOKEN!

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml'
    ]

    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error(
        'Uploaded image must have image/jpeg, image/png, image/webp, image/gif or image/svg+xml content-type'
      )
    }

    // Comprobación por ID existente (opcional)
    const checkRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const checkJson = await checkRes.json()

    if (checkRes.ok && checkJson.success) {
      return {
        urlImage: checkJson.result.variants?.[0] ?? checkJson.result?.url
      }
    }

    const formData = new FormData()
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    })
    formData.append('id', id)

    const headers = {
      ...formData.getHeaders(),
      Authorization: `Bearer ${token}`
    }

    const { body, statusCode } = await request(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
      {
        method: 'POST',
        headers,
        body: formData
      }
    )

    const json = (await body.json()) as CloudflareResponse

    if (statusCode >= 400 || !json.success) {
      console.error('Cloudflare error', json.errors)
      throw new Error(json.errors?.[0]?.message ?? 'Error al subir imagen')
    }

    return {
      urlImage: json.result?.variants?.[0] ?? json.result?.url ?? null
    }
  }

  async getVideoInfo (videoId: string): Promise<CloudflareVideoAPIResponse | undefined> {
    try {
      const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!
      const token = process.env.CLOUDFLARE_TOKEN!
      const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.errors?.[0]?.message)
      }
      return json.result
    } catch (error) {
      return undefined
    }
  }
}
