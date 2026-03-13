export interface Product {
    id: string;
    name: string;
    price: number;
    regularPrice?: number | null;
    category: string;
    description: string;
    image: string;
    attributes: {
        weight?: string;
        effects?: string[];
        ingredients?: string[];
        dosage?: string;
    };
}

export const products: Product[] = [
    {
        "id": "laughing-gas-x-fusion",
        "name": "LAUGHING GAS X FUSION - Fusion Mushroom Bars",
        "price": 29.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "LAUGHING GAS X FUSION, LAUGHING GAS X FUSION,Tremendous Fusion Bars,Fusion bar,fusion mushroom bars,fusion shroom bars,Rainbow Runtz Fusion Bar,White Truffle Fusion Bar,Coco Fusion Bar,fusion x laughing gas,Rainbow Runtz,White Truffle,Tremendous",
        "image": "/images/products/chocolate-bar.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bars-key-lime-pie",
        "name": "Fusion Bars key Lime Pie - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bars key Lime Pie",
        "image": "/images/products/chocolate-bar.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "a-box-of-fusion-gummies",
        "name": "A Box of Fusion Gummies - Fusion Mushroom Bars",
        "price": 30,
        "regularPrice": null,
        "category": "Gummies",
        "description": "A Box of Fusion Gummies,fusion mushroom bars,fusion shroom bars,mushroom gummy,polkadot gummies,fusion bars,fusion chocolate bar,mushroom bites gummies,mushroom.gummies",
        "image": "/images/products/gummies.png",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "neau-tropics-magic-mushroom-chocolate-bars",
        "name": "Neau Tropics Magic Mushroom Chocolate Bars",
        "price": 34.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Neau Tropics Magic Mushroom Chocolate Bars,neau tropics chocolate bar,neau tropics,Neau Tropics Chocolate,Neau Tropics gummies,Fusion bar,fusion mushroom bars,fusion shroom bars",
        "image": "/images/products/chocolate-bar.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-x-whole-melt-extract-box-of-10",
        "name": "Fusion X Whole Melt Extract Box of 10 - Fusion Mushroom Bars",
        "price": 200,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "Fusion X Whole Melt Extract Box of 10",
        "image": "/images/products/syrup.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-x-whole-melt-50-stacks-box",
        "name": "Fusion X Whole Melt 50 stacks box - Fusion Mushroom Bars",
        "price": 900,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "Fusion X Whole Melt 50 stacks box",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-x-whole-melt-50-stacks-box-2000mg-per-disposable-2.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-x-whole-melt-wholesale-2000-mg-vaporizer",
        "name": "Fusion X Whole Melt Wholesale 2000 MG Vaporizer | Bulk Extracts",
        "price": 3750,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "Get the Fusion X Whole Melt Wholesale 2000 MG Vaporizer at wholesale price — powerful, portable, and infused with premium whole melt extracts. Fusion Shroom Bars approved. Fusion X Whole Melt Wholesale 2000 MG Vaporizer,fusion x whole melt extracts,whole melt x fusion,whole melt fusion,whole melts fusion,fusion x whole melt,whole melts x fusion,Whole Melt Extracts,Fusion Mushroom Bars,Fusion Shroom Bars,whole melts,wholemelt,whole melt extracts live resin sugar,whole melt extracts live resin,whole melts gelato edition,fusion x whole melts,fusion bar,fusion bars,fusion magic gummies,fusion chocolates,fusion mushroom gummies,fusion mushroom chocolate,fusion chocolate bars,fusion gummies mushroom,fusion magic chocolate,verify fusion.com,fusion shroom gummies,verify fusion,fusion gummies,fusion bars mushroom,fusion shroom bar,fusion mushroom bar,fusion mushroom chocolate bar,fusion chocolate mushroom bar,fusion candy bar,fusion chocolate,Whole Melt Disposable,Whole Melts Carts,whole melt carts,whole melts disposables,whole melt v6",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-x-whole-melt-wholesale-price-2000-mg-vaporizer-2.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "mimosa-haze-fusion-x-whole-melt",
        "name": "Mimosa Haze Fusion X Whole Melt - Fusion Mushroom Bars",
        "price": 25,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "Mimosa Haze Fusion X Whole Melt, fusion mimosa haze, mimosa haze whole melt",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/mimosa-haze-fusion-x-whole-melt-2-grams-2.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "super-limon-haze-fusion-x-wholemelt",
        "name": "Super Limon Haze Fusion X Wholemelt | 2G Live Diamond Extracts",
        "price": 25,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "Feel the zesty rush of Super Limon Haze Fusion X Wholemelt — packed with 2 grams of Live Diamond for elevated potency and bold citrus flavor. This premium extract combines the energizing profile of Super Limon Haze with the power of Fusion X Whole Melt Extracts, delivering a smooth and flavorful ride. Whether you're chasing creativity or a clean cerebral lift, this is your go-to for premium quality and unforgettable experience. Proudly part of the Fusion Mushroom Bars collection. More from the Fusion X collection: 🔹 Fusion X Whole Melt Extract Box of 10 🔹 Fusion X Whole Melt 50 Stacks Box 🔹 Fusion X Whole Melt Wholesale 🔹 Mimosa Haze Fusion X Whole Melt 🔹 Fusion X Whole Melt Wholesale Price / 2000 MG Vaporizer 🔹 Visit the Fusion Mushroom Bars homepage for more Fusion Shroom Bars.",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/super-limon-haze-fusion-x-wholemelt-2-g-of-live-diamond.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "a-box-of-10-fusion-gummies",
        "name": "A Box of 10 Fusion Gummies - Fusion Mushroom Bars",
        "price": 200,
        "regularPrice": null,
        "category": "Gummies",
        "description": "A Box of 10 Fusion Gummies",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/a-box-of-10-fusion-gummies.png",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-x-whole-melt-wholesale",
        "name": "Fusion X Whole Melt Wholesale - Fusion Mushroom Bars",
        "price": 1500,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "Fusion X Whole Melt Wholesale",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/wholesale-on-fusion-x-whole-melt-2-grams-disposables-2.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-cactus-cooler-gummies",
        "name": "Fusion Cactus Cooler Gummies - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Cactus Cooler Gummies",
        "image": "/images/products/gummies.png",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-cherry-lime-gummies",
        "name": "Fusion Cherry Lime Gummies - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Cherry Lime Gummies",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-cherry-lime-gummies-6000-mg-mushroom.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-gummies-berry-citrus",
        "name": "Fusion Gummies Berry Citrus - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Gummies Berry Citrus",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-gummies-berry-citrus-6000mg.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-gummies-grape-slushe",
        "name": "Fusion Gummies Grape Slushe - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Gummies Grape Slushe",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-gummies-grape-slushe-6-grams.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-gummies-hawaiian-punch",
        "name": "Fusion Gummies Hawaiian Punch - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Gummies Hawaiian Punch",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-gummies-hawaiian-punch-6g-6000mg.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-gummies-lavender-lemonade",
        "name": "Fusion Gummies Lavender Lemonade - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Gummies Lavender Lemonade",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-gummies-lavender-lemonade-6-gram-6000mg.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-gummies-raspberry-goji",
        "name": "Fusion Gummies Raspberry Goji - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Gummies Raspberry Goji",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-gummies-raspberry-goji-6000mg.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-gummies-sour-apple",
        "name": "Fusion Gummies Sour Apple - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Gummies Sour Apple",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-gummies-sour-apple-6-gram.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-gummies-watermelon",
        "name": "Fusion Gummies Watermelon - Fusion Mushroom Bars",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Gummies Watermelon",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-gummies-watermelon-6000-mg.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-passion-fruit-gummies",
        "name": "Fusion Passion Fruit Gummies",
        "price": 35,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Passion Fruit Gummies,fusion mushroom bars,fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/09/fusion-passion-fruit-gummies.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-cinnamon-toast",
        "name": "Fusion Bar Cinnamon Toast - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Cinnamon Toast",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Cinnamon-Toast-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-kit-cats",
        "name": "Fusion Bar Kit Cats - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Kit Cats, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Kit-Cats-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-pretzel-sea-salt",
        "name": "Fusion Bar Pretzel Sea Salt - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Pretzel Sea Salt",
        "image": "/images/products/honey.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-twixy",
        "name": "Fusion Bar Twixy - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Twixy",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Twixy-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-thin-mint",
        "name": "Fusion Bar Thin Mint - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Thin Mint, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Thin-Mint-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-rocky-rodeo",
        "name": "Fusion Bar Rocky Rodeo - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Rocky Rodeo, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Rocky-Rodeo-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "strawberries-and-cream",
        "name": "Strawberries and Cream - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Strawberries and Cream, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Strawberries-Cream-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-nurdz",
        "name": "Fusion Bar Nurdz - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Nurdz, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Nurdz-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-milk-chocolate",
        "name": "Fusion Bar Milk Chocolate - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Milk Chocolate,mushroom chocolate bar,shroom bars,shroom chocolate bar,psilocybin chocolate,Fusion bar,fusion mushroom bars,fusion shroom bars Fusion Bar Milk Chocolate, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Milk-Chocolate-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-matcha",
        "name": "Fusion Bar Matcha - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Matcha,shroom choclate bar,1up mushroom chocolate,Fusion bar,fusion mushroom bars,fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Matcha-2.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-em-and-ems",
        "name": "Fusion Bar Em and Ems - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Em and Ems, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Em-Ems-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-fruit-loops",
        "name": "Fusion Bar Fruit Loops - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Fruit Loops, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Fruit-Loops.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-ferrari-rocher",
        "name": "Fusion Bar Ferrari Rocher - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Ferrari Rocher, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/ferrari-Rocher-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-crunch",
        "name": "Fusion Crunch - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Crunch, Fusion Crunch, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Krunch-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-cookie-dough",
        "name": "Fusion Bar Cookie Dough - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Cookie Dough, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Cookie-Dough-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-kapn-krunch",
        "name": "Fusion Bar KapN krunch - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar KapN krunch, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/KapN-krunch-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-birthday-cake",
        "name": "Fusion Bar Birthday Cake - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Birthday Cake",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/birthday-Cake-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bars-banana-chocolate",
        "name": "Fusion Bars Banana Chocolate - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bars Banana Chocolate, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/IMG_20230824_001922_631-e1693400560759.jpg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bars-almond-crush",
        "name": "Fusion Bars Almond Crush - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bars Almond Crush Fusion Bars Almond Crush,Almond Crush Fusion Bars,fusion bar,fusion mushroom bars,fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-04-28-at-2.50.13-AM-300x300-2.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "nerds-fusion-bars",
        "name": "Nerds Fusion Bars - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Nerds Fusion Bars Nerds Fusion Bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-06-21-at-5.58.38-AM-1-1-e1693402885937.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-100-bars-boutique-box",
        "name": "Fusion 100 Bars Boutique Box 10 Flavors-official fusion bar",
        "price": 1350,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion 100 Bars Boutique Box 10 Flavors are the ultimate indulgence for the adventurous chocolate lover! Fusion 100 Bars Boutique Box",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Screenshot-2023-08-10-082901-e1693692796775.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-horchata",
        "name": "Fusion Bar Horchata - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Horchata, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Horchata-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-cotton-candy",
        "name": "Fusion Bar Cotton Candy - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Cotton Candy, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Cotton-candy-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-heath",
        "name": "Fusion Bar Heath - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Heath, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Heeth-English-Bar-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-lemon-blueberry",
        "name": "Fusion Bar Lemon Blueberry - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Lemon Blueberry,",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Lemon-Blueberry-1-e1693363285419.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-peanut-butter",
        "name": "Fusion Bar Peanut butter - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Peanut butter, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Peanut-Butter-Cup-2.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bars-peanut-butter",
        "name": "Fusion Bars Peanut Butter - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bars Peanut Butter are the ultimate indulgence for the adventurous chocolate lover!",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-04-28-at-7.28.11-AM-e1693359693825.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bars-mocha",
        "name": "Fusion Bars Mocha - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion bar, fusion mushroom bars, fusion shroom bars, Fusion Bars Mocha",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Mocha-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-mushroom-bars-wholesale",
        "name": "Fusion Mushroom Bars Wholesale - Fusion Mushroom Bars",
        "price": 30,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "Fusion Mushroom Bars Wholesale",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Screen-Shot-2023-06-25-at-3.34.12-PM-600x641-1-e1693682267535.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-mushroom-chocolate-bar",
        "name": "Fusion Mushroom Chocolate Bar - Fusion Chocolate Bar Single Box",
        "price": 200.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "A box Contains 10 Bars fusion mushroom chocolate bar",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/bulk-order-e1693360375528.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "magic-mushroom-chocolates",
        "name": "Magic Mushroom Chocolates - Fusion Chocolate Bar",
        "price": 30,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "We have over 30 different fusion bars, A box Contains 10 Bars. There is definitely something for everyone. Our Bulk Fusion Bar Chocolate are quite unique from other mushroom chocolate bars due to their healing factor and intense trip. Fusion bars though we are still new in the market but are currently among the top 5 most sort after mushroom chocolate bars. This is speaks well of the quality of our Fusion bars. Magic Mushroom Chocolates",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/IMG_20230824_001855_758-e1693363358801.jpg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "neau-tropics-gummies",
        "name": "Neau Tropics Gummies - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion bar, fusion mushroom bars, fusion shroom bars, Neau Tropics Chocolate, Neau Tropics gummies, neau tropics, neau tropics chocolate bar",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/04/Mango-Tajin-Neau-Tropics.jpg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "raspberry-dark-chocolate",
        "name": "Raspberry Dark Chocolate - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Raspberry Dark Chocolate, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Raspberry-Dark-Chocolate-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-mushroom-gummies",
        "name": "Fusion Mushroom Gummies - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Gummies",
        "description": "Fusion Mushroom Gummies",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2024/04/photo1705972254-4.jpeg",
        "attributes": {
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-bar-red-velvet",
        "name": "Fusion Bar Red Velvet - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Red Velvet, Fusion bar, fusion mushroom bars, fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/Red-Velvet-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "wholesale-deals-on-fusion-100-bars-box-of-10-flavors",
        "name": "Wholesale Deals on Fusion 100 Bars Box of 10 Flavors - Fusion Mushroom Bars",
        "price": 1350,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "We have 3 design boutique boxes of 10 flavors each making a total of 30 flavors. Here we have the100 bars Boutique Box of 10 flavors. Wholesale Deals on Fusion 100 Bars Box of 10 Flavors,shroom chocolate packaging,psilocybin mushroom chocolate bar,Fusion bar,fusion mushroom bars,fusion shroom bars",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/IMG_20230824_001942_920.jpg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "fusion-cookies-and-cream",
        "name": "Fusion Cookies and Cream - Fusion Mushroom Bars",
        "price": 24.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Fusion Bar Cookies and Cream, Fusion bar, fusion mushroom bars, fusion shroom bars, Fusion Cookies and Cream",
        "image": "https://i0.wp.com/officialfusionshroombars.com/wp-content/uploads/2023/08/cookies-and-cream-1.jpeg",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    }
];
