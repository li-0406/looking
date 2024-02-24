import React from "react";

const Skeleton = () => {
  return (
    <div class="animate-pulse">
      <div class=" bg-slate-700 rounded-xl h-[150px] w-full"></div>
      <div class=" space-y-6 py-5">
        <div class="h-2 bg-slate-700 rounded"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-700 rounded col-span-2"></div>
            <div class="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div class="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
