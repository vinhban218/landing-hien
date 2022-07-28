<template>
  <div class="mt-10 mx-auto w-[1040px] laptop:w-[1200px]">
    <div class="publication-title flex items-center">
      <img
        src="../../static/img/arrow-left.png"
        alt="arrow-left"
        class="w-[50px]"
      />
      <h3 class="text-[72px] laptop:text-[80px] ml-4 font-[900]">RESEARCH</h3>
    </div>

    <div class="my-10 text-[#858585]">
      <p>
        We pride ourselves on our institutional grade research publications that
        <br />
        capture all emerging trends within crypto.
      </p>
    </div>

    <!-- market report -->
    <div>
      <div class="flex items-center mb-8">
        <img
          src="../../static/img/arrow-left.png"
          alt="arrow-left"
          class="w-[18px]"
        />
        <h5 class="font-bold text-[#ff0000] ml-[6px] text-2xl">
          MARKET REPORT
        </h5>
      </div>

      <div class="flex gap-8 mt-10">
        <div
          v-for="item in 3"
          :key="item"
          class="w-[calc(33.3333%-26.66666px)]"
        >
          <img
            src="../../static/img/main-paper.png"
            alt="1"
            class="rounded-[10px] cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
          />
          <p class="font-bold mt-3 mb-5 text-white text-2xl tracking-[3px]">
            VIETNAM MARKET REPORT
          </p>
        </div>
      </div>
    </div>

    <!-- ket thuc market report -->
    <div class="flex items-center mb-8 mt-5">
      <img
        src="../../static/img/arrow-left.png"
        alt="arrow-left"
        class="w-[18px]"
      />
      <h5 class="font-bold text-[#ff0000] ml-[6px] text-2xl">
        IN DEPTH RESEARCH
      </h5>
    </div>
    <!-- bai bao nooi bat -->
    <div class="flex">
      <img
        src="../../static/img/main-paper.png"
        alt="main-paper"
        class="rounded-[10px] w-1/2 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
      />
      <div class="ml-8 w-2/5 flex flex-col justify-center">
        <h5
          class="main-paper-title font-bold text-white text-2xl tracking-[3px]"
        >
          TITLE
        </h5>
        <p class="mt-10 text-gray3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries.
        </p>
      </div>
    </div>
    <!-- list bai bao -->
    <div class="flex gap-8 mt-10">
      <div v-for="item in 3" :key="item" class="w-[calc(33.3333%-26.6666px)]">
        <img
          src="../../static/img/main-paper.png"
          alt="1"
          class="rounded-[10px] cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
        />
        <p class="font-bold mt-3 mb-5 text-white text-lg tracking-[3px]">
          TITLE
        </p>
        <p class="text-gray3 line-clamp-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </p>
      </div>
    </div>
    <!-- podcast -->
    <div class="mt-10">
      <div class="flex items-center mb-10">
        <img
          src="../../static/img/arrow-left.png"
          alt="arrow-left"
          class="w-[18px]"
        />
        <h5 class="font-bold text-[#ff0000] ml-[6px] text-2xl">PODCAST</h5>
      </div>

      <div class="flex gap-16">
        <div v-for="item in 4" :key="item">
          <img
            src="../../static/img/podcast-item.jpg"
            alt="podcast-item"
            class="rounded-[10px] cursor-pointer grayscale transition-[filter] duration-500 hover:grayscale-0"
          />
          <p class="text-gray3 mt-4">Seeking alpha with Alpha Finance Labs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publication",
};
</script>

<style lang="scss">
.publication-title {
  -webkit-text-stroke: 2.5px red;
  color: transparent;
  letter-spacing: 6px;
  h3 {
    font-family: Arial, Helvetica, sans-serif;
  }

  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 280px;
    height: 2px;
    border-radius: 2px;

    left: -60px;
    bottom: -18px;

    background: white;
  }
}

.main-paper-title {
  position: relative;
  &::after {
    content: "";
    background: red;

    width: 30px;
    height: 2px;

    position: absolute;
    left: 0;
    bottom: -20px;
  }
}
</style>
