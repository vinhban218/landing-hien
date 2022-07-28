<template>
  <div class="email-section w-[100vw] h-[100vh] flex flex-col items-center">
    <div class="h-4/5 pb-[140px] hd:pb-[200px] flex flex-col justify-center items-center">
      <p
        class="uppercase text-white text-center tracking-[3px] text-[32px] leading-[46px] laptop:text-[50px] hd:leading-[54px] font-bold"
      >
        let's seize this <br />
        opportunity together
      </p>
      <a
        href="Mailto:contact@kyros.ventures"
        target="_blank"
        class="flex justify-center items-center mt-3 laptop:mt-5"
      >
        <p class="uppercase font-thin text-gray3 mr-4 text-base hd:text-lg laptop:text-xl">email us</p>
        <div>
          <img
            src="../../static/img/circle-arrow-right.png"
            class="w-6 hd:w-7 latop:w-8"
            alt="next"
          />
        </div>
      </a>

      <div class="text-2xl font-bold mt-14">
        <p
          class="hd:mb-2 text-[32px] laptop:text-[50px] leading-[46px] hd:leading-[54px] uppercase tracking-[2px]"
        >
          subscribe to our newsletter
        </p>
        <div class="flex mt-4">
          <input
            type="email"
            v-model="email"
            :placeholder="placeHolder"
            autocomplete="off"
            @inupt="isInvalid = false"
            @focusin="focusIn"
            @keyup.enter="validateEmail"
            class="w-full mr-5 pl-4 py-2 text-xl rounded font-thin bg-transparent border-gray3 border text-gray3 placeholder:text-center placeholder:text-base focus:outline-none"
            :class="{invalid: isInvalid}"
          />
          <button
            class="text-white bg-[red] rounded uppercase tracking-[2px] p-[6px] px-3 text-xl font-bold shrink-0"
            :class="{ '!bg-green-500': isSubmit }"
            @click="validateEmail"
          >
            {{ isSubmit ? "THANK YOU" : "subscribe" }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex w-full items-center justify-between shrink-0 px-12">
      <div class="uppercase text-white text-sm laptop:text-base">
        © 2022 kyros ventures. all rights reseversed
      </div>
      <div class="footer flex items-center">
        <a href="https://www.facebook.com/kyrosventures" target="_blank" class="mr-4 bg-gray3">
          <img
            class="social-logo"
            src="../../static/img/facebook-logo.png"
            alt="facebook"
          />
        </a>
        <a href="https://twitter.com/KyrosVentures" target="_blank" class="mr-4">
          <img
            class="social-logo"
            src="../../static/img/twitter.png"
            alt="tw"
          />
        </a>
        <a href="https://t.me/KyrosInsights" target="_blank" class="mr-4 bg-gray3">
          <img
            class="social-logo"
            src="../../static/img/paper-plane.png"
            alt="tele"
          />
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
      email: null,
      isSubmit: false,
      isInvalid: false,
    };
  },
  computed: {
    placeHolder() {
      return this.isSubmit
        ? "YOU HAS SUCCESFULLY SUBCRIBED"
        : "YOUR EMAIL HERE";
    },
  },
  methods: {
    submit() {
      this.isSubmit = true;
      this.email = "";
    },
    focusIn() {
      if (!this.email) this.isSubmit = false;
      this.isValid = false;
    },
    validateEmail() {
      const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (this.email.match(reg)) {
        this.submit();
      } else {
        this.isInvalid = true;
      }
    },
  },
};
</script>

<style lang="scss">
.email-section {
  .invalid {
    box-shadow: 0 0 1px 2px red;
    border-color: red;
    color:red;
  }

  .footer {
    a {
      border-radius: 100%;
      width: 32px;
      height: 32px;
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

.social-logo {
  filter: brightness(0) invert(1);
}

@media screen and (max-width:1600px) {
  .email-section {
    .footer {
      a {
        width: 28px;
        height: 28px;
      }
    }
  }
  
}
</style>
