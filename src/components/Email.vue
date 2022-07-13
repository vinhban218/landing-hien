<template>
  <div
    class="email-section w-[100vw] h-[100vh] flex flex-col justify-center items-center"
  >
    <div
      v-if="!isSubmit"
      class="h-full flex flex-col justify-center items-center"
    >
      <p class="uppercase text-white text-[22px] laptop:text-[24px]">
        let's seize this opportunitity together
      </p>
      <div class="relative w-full">
        <p
          class="text-gray3 text-[90px] laptop:text-[110px] font-bold opacity-0"
        >
          you@email.com
        </p>
        <input
          v-model="email"
          @focusin="focusIn"
          @focusout="focusOut"
          @input="resizeInput"
          type="text"
          class="absolute top-0 left-1/2 -translate-x-1/2 bg-transparent text-[90px] laptop:text-[110px] font-bold w-full h-full text-gray3 outline-none"
        />
      </div>
      <div
        class="flex items-center justify-center cursor-pointer"
        @click="submit"
      >
        <p
          class="uppercase tracking-[4px] font-bold mr-3 text-[22px] laptop:text-[24px]"
        >
          subscribe
        </p>
        <img
          src="../../static/img/circle-arrow-right.png"
          class="w-6"
          alt="next"
        />
      </div>
    </div>

    <div v-else class="h-full flex flex-col justify-center items-center">
      <p class="text-white text-2xl">THANK YOU!</p>
      <p class="uppercase mt-3 text-gray3 text-lg">
        you have successfully joined our subscriber list
      </p>
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
  data() {
    return {
      email: "you@gmail.com",
      isSubmit: false,
    };
  },
  methods: {
    resizeInput(e) {
      e.target.style.width = `calc(${e.target.value.length + "ch"})`;
    },
    submit() {
      console.log(this.email);
      this.isSubmit = true;
    },
    focusIn() {
      if (this.email === "you@gmail.com") {
        this.email = "";
      }
    },
    focusOut(e) {
      console.log(this.email);
      if (!this.email) {
        this.email = "you@gmail.com";
        this.resizeInput(e);
      }
    },
  },
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
        background: #a21717;
      }
    }
  }
}
</style>
