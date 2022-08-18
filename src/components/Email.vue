<template>
    <div class="email-section w-[100vw] h-[100vh] flex flex-col items-center">
        <div class="email-content h-4/5 min-w-[70%] pb-[140px] hd:pb-[200px] flex flex-col justify-center items-center  zoom ">
            <p
                v-html="emailTitle"
                class="uppercase text-white text-center tracking-[3px] text-[74px] leading-[76px] laptop:text-[80px] hd:leading-[84px] font-bold">
            </p>
            <div class="flex justify-between mt-20 w-full">
                <div>
                    <p class="title">{{isVi ? 'Liên hệ' :'contact us'}}</p>
                    <a href="Mailto:contact@kyros.ventures" target="_blank" class="link-btn">
                        EMAIL
                    </a>
                </div>

                <div>
                    <p
                        class="title">
                        {{isVi ? 'Theo dõi bản tin của chúng tôi' : 'subscribe to our newsletter'}}
                    </p>
                    <div class="flex mt-1">
                        <input type="email" v-model="email" :placeholder="placeHolder" autocomplete="off"
                            @input="isInvalid = false" @focusin="focusIn" @keyup.enter="validateEmail"
                            class="w-full px-2 py-1 min-w-[340px]  rounded-l font-thin bg-transparent border-gray3 border border-r-0 text-gray3 placeholder:text-center placeholder:text-base focus:outline-none"
                            :class="{ invalid: isInvalid }" />
                        <button
                            class="text-white min-w-[160px] px-3 bg-[red] rounded-r uppercase tracking-[2px] h-[42px] text-xl font-bold shrink-0"
                            :class="{ '!bg-green-500': isSubmit }" @click="validateEmail">
                            {{ buttonTitle }}
                        </button>
                    </div>
                </div>

                <div>
                    <p class="title">{{isVi ? 'Tham gia Kyros' : 'JOIN OUR TEAM'}}</p>
                    <a href="https://careers.kyros.ventures/" target="_blank" class="link-btn">
                        {{isVi ? 'TUYỂN DỤNG' : 'CAREERS'}}
                    </a>
                </div>
            </div>
        </div>

        <div class="flex w-full items-center justify-between shrink-0 px-12">
            <div class="uppercase text-white text-sm laptop:text-base">
                © 2022 kyros ventures. all rights RESERVED.
            </div>
            <div class="footer flex items-center">
                <a href="https://www.facebook.com/kyrosventures" target="_blank" class="social-link">
                    <img src="../../static/img/facebook-logo.png" alt="facebook" />
                </a>
                <a href="https://twitter.com/KyrosVentures" target="_blank" class="social-link">
                    <img src="../../static/img/twitter.png" alt="tw" />
                </a>
                <a href="https://t.me/KyrosInsights" target="_blank" class="social-link">
                    <img class="mr-[2px]" src="../../static/img/paper-plane.png" alt="tele" />
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
                ? this.isVi ? 'Bạn đã đăng ký thành công' : "YOU HAS SUCCESSFULLY SUBSCRIBED"
                : this.isVi ? 'Nhập email ở đây' : 'YOUR EMAIL HERE';
        },
        emailTitle() {
            return this.isVi ? this.viContent.emailTitle : this.enContent.emailTitle
        },
        buttonTitle() {
            return this.isSubmit
                ? this.isVi ?  "Cảm ơn" : 'THANK YOU'
                : this.isVi ? 'Đăng ký' : 'subscribe';
        }
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
        border-color: red;
        color: red;
    }

    .title {
        position: relative;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 24px;
        letter-spacing: 2px;
        margin-bottom: 8px;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: -2px;

            width: 20px;
            height: 2px;
            background: red;
        }
    }

    .link-btn {
        background: red;
        border-radius: 4px;
        color: white;
        text-align: center;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 20px;

        width: auto;
        display: inline-block;
        height: 42px;
        padding: 0 20px;
        line-height: 42px;
    }
}

@media screen and (max-width:1600px) {
    .email-section {
        .footer {f
            a {
                width: 28px;
                height: 28px;
            }
        }
    }

}

@media screen and (max-width: 1440px) {
    .email-section {
        .email-content {
            zoom: 0.85;
        }
    }
}
</style>
