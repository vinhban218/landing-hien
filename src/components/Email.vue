<template>
  <div
    class="email-section w-[100vw] h-[100vh] flex flex-col justify-center items-center"
  >
    <div class="h-full flex flex-col justify-center items-center">
      <p class="uppercase text-white text-[24px]">
        let's seize this opportunitity together
      </p>
      <p class="text-gray3 text-[110px] font-bold">you@email.com</p>
      <div class="flex items-center justify-center">
        <p class="uppercase tracking-[4px] font-bold mr-3 text-[24px]">
          subcrise
        </p>
        <img
          src="../../static/img/circle-arrow-right.png"
          class="w-6 cursor-pointer"
          alt="next"
        />
      </div>
    </div>

    <div class="flex w-full items-center justify-between shrink-0 px-12">
      <div class="uppercase text-white">
        2021 kyros ventures. all rights reseversed
      </div>
      <div class="footer flex items-center">
        <a href="" target="_blank" class="mr-4 bg-gray3">
          <img src="../../static/img/twitter.png" alt="twitter" />
        </a>
        <a href="" target="_blank">
          <img src="../../static/img/paper-plane.png" alt="telegram" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Email",
};
</script>

<style lang="scss">
.email-section {
  .footer {
    a {
      border-radius: 100%;
      width: 32px;
      height: 30px;
      background: rgb(133, 133, 133);
      transition: all 0.3s linear;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60%;
        filter: brightness(0) invert(1);
      }

      &:hover {
        background: #1da1f2;
      }
    }
  }
}
</style>
