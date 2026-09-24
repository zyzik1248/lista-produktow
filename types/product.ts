export type ProductType = {
    id: string | number
    name: string
    sku: string
    description?: string,
    producer: OptionType,
    category: OptionType
    features: OptionType[]
    price: PriceType,
    availability: AvailabilityType
}

export type OptionType = {
  id: string | number
  name?: string
}

export type PriceType = {
    priceNet: number
    priceGross: number
    vat: number
    currency: OptionType
}

export type AvailabilityType = {
    isAvailable: boolean
    isLimited: boolean
    stack?: number | null
    minCartQuantity: number
    maxCartQuantity: number
}