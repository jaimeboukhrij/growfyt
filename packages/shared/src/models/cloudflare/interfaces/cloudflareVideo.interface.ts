export interface CloudflareVideoAPIResponse {
  uid: string
  creator: null
  thumbnail: string
  thumbnailTimestampPct: number
  readyToStream: boolean
  readyToStreamAt: Date
  status: Status
  meta: Meta
  created: Date
  modified: Date
  scheduledDeletion: null
  size: number
  preview: string
  allowedOrigins: unknown[]
  requireSignedURLs: boolean
  uploaded: Date
  uploadExpiry: Date
  maxSizeBytes: null
  maxDurationSeconds: null
  duration: number
  input: Input
  playback: Playback
  watermark: null
  clippedFrom: null
  publicDetails: PublicDetails
}

export interface Input {
  width: number
  height: number
}

export interface Meta {
  filename: string
  filetype: string
  name: string
  relativePath: string
  type: string
}

export interface Playback {
  hls: string
  dash: string
}

export interface PublicDetails {
  title: string
  share_link: string
  channel_link: string
  logo: string
}

export interface Status {
  state: string
  pctComplete: string
  errorReasonCode: string
  errorReasonText: string
}
