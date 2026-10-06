import React from "react";
import { Hero1 } from "./heroes/Hero1";
import { Hero2 } from "./heroes/Hero2";
import { Hero3 } from "./heroes/Hero3";
import { Hero4 } from "./heroes/Hero4";

interface StoreHeroBannerProps {
    store: {
        name: string;
        logo_url?: string;
        banner_url?: string;
        description?: string;
        free_shipping_threshold?: number | string;
        hero_style?: string;
    };
}

export const StoreHeroBanner: React.FC<StoreHeroBannerProps> = ({ store }) => {
    const scrollToCatalog = () => {
        const el = document.getElementById("catalog-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const style = store.hero_style || "hero1";

    switch (style) {
        case "hero2":
            return <Hero2 store={store} onShopClick={scrollToCatalog} />;
        case "hero3":
            return <Hero3 store={store} onShopClick={scrollToCatalog} />;
        case "hero4":
            return <Hero4 store={store} onShopClick={scrollToCatalog} />;
        case "hero1":
        default:
            return <Hero1 store={store} onShopClick={scrollToCatalog} />;
    }
};
