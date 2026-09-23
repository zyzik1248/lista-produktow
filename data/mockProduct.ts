import { OptionType, ProductType } from "@/types/product";

export const mockcategory: OptionType[] = [
    {
        id: 1,
        name: "Komputery"
    },
    {
        id: 2,
        name: "Telefony"
    },
    {
        id: 3,
        name: "RTV"
    },
    {
        id: 4,
        name: "AGD"
    },
    {
        id: 5,
        name: "Akcesoria"
    }
]

export const mockproducers: OptionType[] = [
    {
        id: 1,
        name: "Samsung",
    },
    {
        id: 2,
        name: "Apple",
    },
    {
        id: 3,
        name: "Sony",
    },
    {
        id: 4,
        name: "Lenovo",
    },
    {
        id: 5,
        name: "Xiaomi",
    },
]

export const mockfeatures: OptionType[] = [
    {
        id: 1,
        name: "Bluetooth",
    },
    {
        id: 2,
        name: "WiFI",
    },
    {
        id: 3,
        name: "USB-C",
    },
    {
        id: 4,
        name: "Wodoodporny",
    },
    {
        id: 5,
        name: "Bezprzewodowy",
    },
    {
        id: 6,
        name: "Ekologiczny",
    },
    {
        id: 7,
        name: "Premium",
    },
]

export const currencies: OptionType[] = [
    {
        id: 1,
        name: "PLN",
    },
    {
        id: 2,
        name: "EUR",
    },
    {
        id: 3,
        name: "USD",
    },
    {
        id: 4,
        name: "GBP",
    },
    {
        id: 5,
        name: "CHF",
    },
]

export const mockProducts: ProductType[] = [
    {
        id: 1,
        name: 'MacBook Pro 14"',
        category: mockcategory[0],
        sku: "MBP14M3PRO",
        producer: mockproducers[0],
        features: mockfeatures.slice(3),
        price: {
            priceNet: 8129.27,
            priceGross: 9999,
            vat: 23,
            currency: {
                id: 1,
                name: "PLN",
            },
        },
        availability: {
            isAvailable: true,
            isLimited: false,
            maxCartQuantity: 100,
            minCartQuantity: 1
        }
    },
    {
        id: 2,
        name: 'Galaxy S24 Ultra',
        category: mockcategory[1],
        sku: "SGS24U256",
        producer: mockproducers[1],
        features: mockfeatures.slice(3),
        price: {
            priceNet: 5121.95,
            priceGross: 6299,
            vat: 23,
            currency: {
                id: 1,
                name: "PLN",
            },
        },
        availability: {
            isAvailable: true,
            isLimited: true,
            maxCartQuantity: 100,
            minCartQuantity: 1,
            stock: 45
        }
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5',
        category: mockcategory[2],
        sku: "SNWH1000XM5",
        producer: mockproducers[2],
        features: mockfeatures.slice(3),
        price: {
            priceNet: 1299.19,
            priceGross: 1599,
            vat: 23,
            currency: {
                id: 1,
                name: "PLN",
            },
        },
        availability: {
            isAvailable: true,
            isLimited: false,
            maxCartQuantity: 100,
            minCartQuantity: 1,
        }
    },
    {
        id: 4,
        name: 'Bosch Serie 6 WAU28P40',
        category: mockcategory[3],
        sku: "BSWAU28P40",
        producer: mockproducers[3],
        features: mockfeatures.slice(3),
        price: {
            priceNet: 2682.11,
            priceGross: 3299,
            vat: 23,
            currency: {
                id: 1,
                name: "PLN",
            },
        },
        availability: {
            isAvailable: false,
            isLimited: true,
            maxCartQuantity: 100,
            minCartQuantity: 1,
            stock: 0
        }
    },
    {
        id: 5,
        name: 'Xiaomi Smart Band 8',
        category: mockcategory[4],
        sku: "XMSB8BLK",
        producer: mockproducers[4],
        features: mockfeatures.slice(3),
        price: {
            priceNet: 145.53,
            priceGross: 179,
            vat: 23,
            currency: {
                id: 1,
                name: "PLN",
            },
        },
        availability: {
            isAvailable: true,
            isLimited: false,
            maxCartQuantity: 100,
            minCartQuantity: 1,
        }
    }
]