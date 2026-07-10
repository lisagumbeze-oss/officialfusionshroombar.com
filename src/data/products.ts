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
        "image": "/images/products/laughing-gas-x-fusion.png",
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
        "image": "/images/products/fusion-bars-key-lime-pie.png",
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
        "image": "/images/products/a-box-of-fusion-gummies.png",
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
        "image": "/images/products/neau-tropics-magic-mushroom-chocolate-bars.png",
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
        "image": "/images/products/fusion-x-whole-melt-extract-box-of-10.png",
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
        "image": "/images/products/fusion-x-whole-melt-50-stacks-box.webp",
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
        "description": "Get the Fusion X Whole Melt Wholesale 2000 MG Vaporizer at wholesale price — powerful, portable, and infused with premium whole melt extracts. Fusion Shroom Bars approved.",
        "image": "/images/products/fusion-x-whole-melt-wholesale-2000-mg-vaporizer.webp",
        "attributes": {
            "weight": "2g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    },
    {
        "id": "almond-crush-fusion-magic-mushroom-bar",
        "name": "Almond Crush Fusion Magic Mushroom Bar",
        "price": 29.99,
        "regularPrice": 34.99,
        "category": "Chocolate Bars",
        "description": "Fusion Bars Almond Crush is a masterpiece of Belgian confectionery and psilocybin extraction. Pure and potent.",
        "image": "/images/products/almond-crush-fusion-magic-mushroom-bar.png",
        "attributes": {
            "weight": "6g",
            "effects": ["Euphoria", "Focus"]
        }
    },
    {
        "id": "birthday-cake-fusion-magic-mushroom-bar",
        "name": "Birthday Cake Fusion Magic Mushroom Bar",
        "price": 29.99,
        "regularPrice": null,
        "category": "Chocolate Bars",
        "description": "Sweet and celebratory. Fusion Birthday Cake bars are the perfect way to elevate any occasion.",
        "image": "/images/products/birthday-cake-fusion-magic-mushroom-bar.webp",
        "attributes": {
            "weight": "6g",
            "effects": ["Happiness", "Social"]
        }
    },
    {
        "id": "mimosa-haze-fusion-x-whole-melt",
        "name": "Mimosa Haze Fusion X Whole Melt - Fusion Mushroom Bars",
        "price": 25,
        "regularPrice": null,
        "category": "Wholesale",
        "description": "Mimosa Haze Fusion X Whole Melt, fusion mimosa haze, mimosa haze whole melt",
        "image": "/images/products/mimosa-haze-fusion-x-whole-melt.webp",
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
        "image": "/images/products/super-limon-haze-fusion-x-wholemelt.webp",
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
        "image": "/images/products/gummies.png",
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
        "image": "/images/products/fusion-x-whole-melt-wholesale.webp",
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
        "image": "/images/products/fusion-cactus-cooler-gummies.png",
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
        "image": "/images/products/cherry-lime-gummies.webp",
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
        "image": "/images/products/fusion-gummies-berry-citrus.webp",
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
        "image": "/images/products/fusion-gummies-grape-slushe.png",
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
        "image": "/images/products/fusion-gummies-hawaiian-punch.webp",
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
        "image": "/images/products/fusion-gummies-lavender-lemonade.webp",
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
        "image": "/images/products/fusion-gummies-raspberry-goji.webp",
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
        "image": "/images/products/fusion-gummies-sour-apple.webp",
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
        "image": "/images/products/fusion-gummies-watermelon.webp",
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
        "image": "/images/products/fusion-passion-fruit-gummies.webp",
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
        "image": "/images/products/fusion-bar-cinnamon-toast.png",
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
        "image": "/images/products/fusion-bar-kit-cats.png",
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
        "image": "/images/products/fusion-bar-pretzel-sea-salt.png",
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
        "image": "/images/products/fusion-bar-twixy.png",
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
        "image": "/images/products/fusion-bar-thin-mint.png",
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
        "image": "/images/products/fusion-bar-rocky-rodeo.png",
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
        "image": "/images/products/strawberries-and-cream.png",
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
        "image": "/images/products/fusion-bar-nurdz.png",
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
        "image": "/images/products/fusion-bar-milk-chocolate.png",
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
        "image": "/images/products/fusion-bar-matcha.webp",
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
        "image": "/images/products/fusion-bar-em-and-ems.png",
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
        "image": "/images/products/fusion-bar-fruit-loops.png",
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
        "image": "/images/products/fusion-bar-ferrari-rocher.png",
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
        "image": "/images/products/fusion-crunch.jpeg",
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
        "image": "/images/products/fusion-bar-cookie-dough.png",
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
        "image": "/images/products/fusion-bar-kapn-krunch.png",
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
        "image": "/images/products/fusion-bar-birthday-cake.webp",
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
        "image": "/images/products/fusion-bars-banana-chocolate.png",
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
        "image": "/images/products/fusion-bars-almond-crush.png",
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
        "image": "/images/products/nerds-fusion-bars.png",
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
        "image": "/images/products/fusion-100-bars-boutique-box.png",
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
        "image": "/images/products/fusion-bar-horchata.png",
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
        "image": "/images/products/fusion-bar-cotton-candy.png",
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
        "image": "/images/products/fusion-bar-heath.png",
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
        "image": "/images/products/fusion-bar-lemon-blueberry.png",
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
        "image": "/images/products/fusion-bar-peanut-butter.png",
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
        "image": "/images/products/fusion-bars-peanut-butter.png",
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
        "image": "/images/products/fusion-bars-mocha.png",
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
        "image": "/images/products/fusion-mushroom-bars-wholesale.png",
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
        "image": "/images/products/fusion-mushroom-chocolate-bar.png",
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
        "image": "/images/products/magic-mushroom-chocolates.png",
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
        "image": "/images/products/neau-tropics-gummies.png",
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
        "image": "/images/products/raspberry-dark-chocolate.png",
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
        "image": "/images/products/fusion-mushroom-gummies.webp",
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
        "image": "/images/products/fusion-bar-red-velvet.png",
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
        "image": "/images/products/wholesale-deals-on-fusion-100-bars-box-of-10-flavors.png",
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
        "image": "/images/products/fusion-cookies-and-cream.png",
        "attributes": {
            "weight": "6g",
            "effects": [
                "Euphoria",
                "Relaxation"
            ]
        }
    }
];
