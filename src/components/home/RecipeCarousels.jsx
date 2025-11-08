import { memo, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaBolt, FaFire, FaGem, FaUser } from "react-icons/fa";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  getFreshAndNew,
  getPremium,
  getQuickAndEasy,
  getRecommended,
  getTrending,
} from "../../redux/slices/homeSlice";
import RecipeCarousel from "../recipe/RecipeCarousel";

const Title = ({ Icon, gradient, children, pad = "px-1 sm:px-2" }) => (
  <h2
    className={`flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-gray-800 ${pad}`}
  >
    <Icon className="text-orange-500 drop-shadow-sm" />
    <span className={`${gradient} bg-clip-text text-transparent`}>
      {children}
    </span>
  </h2>
);

function RecipeCarousels() {
  const dispatch = useDispatch();
  const {
    trendingNow,
    freshAndNew,
    recommendedForYou,
    quickAndEasy,
    premiumPicks,
    isLoggedIn,
  } = useSelector(
    (state) => ({
      trendingNow: state.home.trendingNow,
      freshAndNew: state.home.freshAndNew,
      recommendedForYou: state.home.recommendedForYou,
      quickAndEasy: state.home.quickAndEasy,
      premiumPicks: state.home.premiumPicks,
      isLoggedIn: state.auth.isLoggedIn,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (trendingNow.length === 0) dispatch(getTrending());
    if (freshAndNew.length === 0) dispatch(getFreshAndNew());
    if (quickAndEasy.length === 0) dispatch(getQuickAndEasy());
    if (premiumPicks.length === 0) dispatch(getPremium());
    if (isLoggedIn && recommendedForYou.length === 0)
      dispatch(getRecommended());
  }, [isLoggedIn]);

  const sections = [
    {
      id: "for-you",
      title: (
        <Title
          Icon={FaUser}
          gradient="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400"
        >
          Recommended
        </Title>
      ),
      recipes: recommendedForYou,
      pad: "px-1 sm:px-2",
    },
    {
      id: "trending",
      title: (
        <Title
          Icon={FaFire}
          gradient="bg-gradient-to-r from-orange-500 to-red-500"
          pad="px-2 sm:px-2"
        >
          Trending Now
        </Title>
      ),
      recipes: trendingNow,
      pad: "sm:px-2",
    },
    {
      id: "fresh",
      title: (
        <Title
          Icon={AiFillStar}
          gradient="bg-gradient-to-r from-yellow-500 to-amber-500"
        >
          Fresh &amp; New
        </Title>
      ),
      recipes: freshAndNew,
      pad: "px-1 sm:px-2",
    },
    {
      id: "quick",
      title: (
        <Title
          Icon={FaBolt}
          gradient="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400"
        >
          Quick &amp; Easy
        </Title>
      ),
      recipes: quickAndEasy,
      pad: "px-1 sm:px-2",
    },
    {
      id: "premium",
      title: (
        <Title
          Icon={FaGem}
          gradient="bg-gradient-to-r from-yellow-400 to-orange-400"
        >
          Premium Picks
        </Title>
      ),
      recipes: premiumPicks,
    },
  ];

  return (
    <div className="mx-auto sm:px-6 lg:px-8 space-y-10 bg-gradient-to-b from-white via-orange-50/40 to-amber-50/50">
      {sections.map(({ id, title, recipes }) => (
        <section key={id} className="space-y-6" id={id}>
          <div className="px-1 sm:px-2">
            <RecipeCarousel title={title} recipes={recipes} />
          </div>
        </section>
      ))}
    </div>
  );
}

export default memo(RecipeCarousels);
