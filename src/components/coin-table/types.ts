export const coinQualities = [
  'Proof',
  'BU',
  'UNC',
  'AU',
  'XF',
  'VF',
  'F',
  'VG',
  'G',
  'P',
] as const

export const coinMintmarks = ['A', 'D', 'G', 'J', 'F', 'S'] as const

export type Coin = {
  image: `https://en.numista.com/catalogue/photos/${string}`
  countryCode: EurozoneCountryCodes
  year: number
  mintmark?: CoinMintmarks
  denomination: number
  currency: 'EUR' | 'GBP' | 'NLG'
  mintage?: number
  cc?: boolean
  description?: string
  quality: CoinQualities
  nifc?: boolean
  swap?: boolean
}

type EurozoneCountryCodes =
  | 'AD'
  | 'AT'
  | 'BE'
  | 'HR'
  | 'CY'
  | 'EE'
  | 'FI'
  | 'FR'
  | 'DE'
  | 'GR'
  | 'IE'
  | 'IT'
  | 'LV'
  | 'LT'
  | 'LU'
  | 'MT'
  | 'MC'
  | 'NL'
  | 'PT'
  | 'SM'
  | 'SK'
  | 'SI'
  | 'ES'
  | 'VA'

type CoinQualities = (typeof coinQualities)[number]

type CoinMintmarks = (typeof coinMintmarks)[number]
