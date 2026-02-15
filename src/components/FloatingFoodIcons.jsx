import {
  GiCarrot,
  GiCheeseWedge,
  GiChickenLeg,
  GiCoffeeBeans,
  GiCorn,
  GiCroissant,
  GiCupcake,
  GiDonerKebab,
  GiFruitBowl,
  GiGrapes,
  GiHotMeal,
  GiMeat,
  GiOlive,
  GiPotato,
  GiSushis,
} from "react-icons/gi";

const foodIcons = [
  <GiChickenLeg className="text-amber-500" />,
  <GiFruitBowl className="text-red-400" />,
  <GiHotMeal className="text-orange-500" />,
  <GiSushis className="text-rose-500" />,
  <GiCupcake className="text-pink-400" />,
  <GiCheeseWedge className="text-yellow-400" />,
  <GiDonerKebab className="text-amber-600" />,
  <GiMeat className="text-red-500" />,
  <GiCorn className="text-yellow-500" />,
  <GiPotato className="text-amber-700" />,
  <GiCarrot className="text-orange-600" />,
  <GiOlive className="text-emerald-500" />,
  <GiCoffeeBeans className="text-brown-500" />,
  <GiCroissant className="text-amber-400" />,
  <GiGrapes className="text-purple-400" />,
];

export const FloatingIcons =
  Array.from({ length: 40 }, (_, i) => {
    const icon = foodIcons[Math.floor(Math.random() * foodIcons.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;
    const size = Math.random() * 22 + 14;
    const opacity = Math.random() * 0.6 + 0.3;
    return (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${left}%`,
          top: "100vh",
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          fontSize: `${size}px`,
          opacity,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}
      >
        {icon}
      </div>
    );
  }) || [];
