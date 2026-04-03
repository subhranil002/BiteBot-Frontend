// Finalized

import HomeLayout from "../layouts/HomeLayout";

export default function Loading() {
  return (
    <HomeLayout>
      <div className="h-full w-full flex justify-center items-center">
        <span className="loading loading-xl loading-spinner text-warning"></span>
      </div>
    </HomeLayout>
  );
}
