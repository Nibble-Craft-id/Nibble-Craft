const SHOP_DATA = {
    storeName: "Nibble_Craft.id",
    tagline: "Awesome treats just one click away!",
    about: {
        description: "Nibble_Craft.id menyajikan pilihan dessert premium dan makanan bercita rasa tinggi yang dibuat secara higienis menggunakan bahan-bahan berkualitas terbaik. Setiap gigitan dirancang untuk menghadirkan kebahagiaan sejati.",
        address: "Jl. Segar Hijau No. 45, Kota Kreatif, Indonesia",
        instagram: "@nibble_craft.id",
        whatsapp: "+628883923632",
        logo: "assets/logo.png" // Path storage lokal
    },
    categories: ["All", "Dessert Box", "Mango Sticky Rice", "Karitto", "Bubur"],
    products: [
        // Category: Dessert Box
        {
            id: "db-tiramisu",
            name: "Dessert Box Tiramisu",
            category: "Dessert Box",
            price: 7000,
            image: "assets/tiramisu.webp", // Path storage lokal
            description: "Lapisan krim keju lembut berpadu sempurna dengan biskuit yang direndam espresso premium dan taburan cokelat murni.",
            rating: 4.9,
            time: "10 Mins"
        },
        {
            id: "db-matcha",
            name: "Dessert Box Matcha",
            category: "Dessert Box",
            price: 7000,
            image: "assets/matcha.webp",
            description: "Sensasi otentik matcha Jepang berkualitas tinggi berpadu dengan krim manis lembut yang lumer di lidah.",
            rating: 4.8,
            time: "10 Mins"
        },
        {
            id: "db-chococheese",
            name: "Dessert Box Chococheese",
            category: "Dessert Box",
            price: 7000,
            image: "assets/chococheese.webp",
            description: "Kombinasi kaya rasa dari cokelat Belgia pekat dan keju gurih krimi yang melimpah.",
            rating: 5.0,
            time: "10 Mins"
        },
        // Category: Mango Sticky Rice
        {
            id: "msr-mango",
            name: "Mango Sticky Rice Premium",
            category: "Mango Sticky Rice",
            price: 10000,
            image: "assets/mango.webp",
            description: "Mangga harum manis segar pilihan disajikan bersama ketan tanak gurih dan siraman fla santan kental.",
            rating: 4.9,
            time: "10 Mins"
        },
        {
            id: "msr-basic",
            name: "Ketan Fla Basic",
            category: "Mango Sticky Rice",
            price: 7000,
            image: "assets/ketan.webp",
            description: "Ketan pulen tradisional dengan siraman fla santan manis original gurih tanpa buah.",
            rating: 4.6,
            time: "10 Mins"
        },
        {
            id: "msr-fla2",
            name: "Ketan Fla 2.0 (Double Extra)",
            category: "Mango Sticky Rice",
            price: 10000,
            image: "assets/ketan_fla2.png",
            description: "Upgrade ketan fla legendaris dengan ekstra fla susu karamel gurih di atasnya.",
            rating: 4.7,
            time: "10 Mins"
        },
        // Category: Karitto
        {
            id: "kr-basic",
            name: "Karitto Basic Twist",
            category: "Karitto",
            price: 13000,
            image: "assets/karitto.webp",
            description: "Nasi daun jeruk dipadukan dengan ayam krispi gurih .",
            rating: 4.8,
            time: "20 Mins"
        },
        {
            id: "kr-nasi",
            name: "Karitto Extra Nasi",
            category: "Karitto",
            price: 15000,
            image: "assets/karitto_nasi.png",
            description: "Nasi daun jeruk dipadukan dengan ayam krispi gurih.",
            rating: 4.9,
            time: "20 Mins"
        },
        {
            id: "kr-tanpa",
            name: "Karitto Vegetarian (Tanpa Ayam)",
            category: "Karitto",
            price: 10000,
            image: "assets/karitto_veg.png",
            description: "Nasi daun jeruk.",
            rating: 4.5,
            time: "10 Mins"
        },
        // Category: Bubur
        {
            id: "bb-sumsum",
            name: "Bubur Sumsum",
            category: "Bubur",
            price: 7000,
            image: "assets/sumsum.webp",
            description: "bubur sumsum lembut & manis .",
            rating: 4.8,
            time: "20 Mins"
        }


    ],
    testimonials: [
        { id: 1, name: "Clarissa Utama", review: "Dessert Box Tiramisu-nya beneran nagih! Ga terlalu manis enek, pas banget teksturnya lembut luar biasa.", rating: 5, avatar: "https://i.pravatar.cc/100?img=32" },
        { id: 2, name: "Dimas Anggara", review: "Mango Sticky Rice paling juara sesosmed. Mangga tebal manis, ketannya super pulen legit.", rating: 5, avatar: "https://i.pravatar.cc/100?img=11" },
        { id: 3, name: "Siti Rahma", review: "Karitto Extra Nasi beneran penyelamat pas laper siang hari. Unik, kari jepangnya berasa premium.", rating: 4, avatar: "https://i.pravatar.cc/100?img=45" }
    ]
};