<template>
    <div class="team w-full h-[100vh] flex justify-center items-center">
        <div class="w-[40%] pr-[144px]">
            <div class="flex items-center justify-end">
                <img src="../../static/img/arrow-left.png" alt="arrow-left" class="w-[50px]" />
                <div class="team-title ml-4 text-[60px] laptop:text-[72px] font-[900]">
                    TEAM
                </div>
            </div>
        </div>

        <div class="relative w-[60%]">
            <div ref="slideContainer"
                class="flex w-full gap-14 hd:gap-20 items-center h-[530px] transition-all duration-500">
                <div v-for="(item, index) in listMembers" :key="index">
                    <div class="relative shrink-0 w-60 hd:w-72 laptop:w-80 opacity-10 blur-[1px] grayscale transition-all duration-500"
                        :class="{ 'active-img': index === currentIndex }">
                        <img :src="item.imgLink" alt="member" class="rounded-3xl border border-[#5e5e5e] z-[10]" />

                        <!-- description -->
                        <div v-if="index === currentIndex"
                            class="absolute fade-in-ani top-0 left-[calc(100%+64px)] h-full w-[500px] flex flex-col justify-center uppercase text-[#dddddd] z-[100]">
                            <div class="text-[26px] tracking-[3px]">{{ item.position }}</div>
                            <div class="my-2 text-[40px] tracking-[5px] leading-[46px] font-[900]" v-html="item.name">
                            </div>
                            <div class="team-description relative text-gray3 normal-case">
                                <!-- link -->
                                <div class="flex mt-2">
                                    <a v-if="item.twLink" :href="item.twLink" target="_blank" class="social-link">
                                        <img src="../../static/img/twitter.png" alt="tw">
                                    </a>
                                    <a v-if="item.likedLink" :href="item.likedLink" target="_blank" class="social-link">
                                        <img src="../../static/img/linkedin.png" alt="linked" class="p-[2px]">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- btn -->
            <div
                class="absolute -bottom-[30px] hd:-bottom-[50px] laptop:-bottom-[70px] left-[138px] hd:left-[165.5px] laptop:left-[184px] -translate-x-1/2 flex items-center justify-center mt-5">
                <img src="../../static/img/circle-arrow-right.png" class="w-8 rotate-180 mr-7 cursor-pointer" :class="{
                    'pointer-events-none opacity-60 cursor-auto': currentIndex === 0,
                }" alt="left" @click="prevItem" />
                <img src="../../static/img/circle-arrow-right.png" class="w-8 cursor-pointer" alt="right" :class="{
                    'pointer-events-none opacity-60 cursor-auto': currentIndex > 2,
                }" @click="nextItem" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Team",
    data() {
        return {
            listMembers: [
                {
                    position: "CEO",
                    name: "zane nguyen",
                    // text: ["Serial entrepreneur", "Founder of Coin68 Media"],
                    imgLink: "./img/ZANE_Edit.jpg",
                    likedLink: 'https://www.linkedin.com/in/thuat-nguyen/',
                    twLink: 'https://twitter.com/Zane_Kyros',
                },
                {
                    position: "COO",
                    name: "Jenny nguyen",
                    // text: ["COO of Coin68 Media", "Partnership Manager of BlockAce"],
                    imgLink: "./img/JENNY_Edit.jpg",
                    likedLink: 'https://www.linkedin.com/in/jenny1397/',
                    twLink: 'https://twitter.com/jennycoin68'
                },
                {
                    position: "CMO",
                    name: "SAM HOANG",
                    // text: [
                    //   "Customer Relationships Manager at Coin68",
                    //   "Marketing Manager at Ancient8",
                    // ],
                    imgLink: "./img/SAM_edit.jpg",
                    likedLink: 'https://www.linkedin.com/in/sam-hoang-244545195/',
                    twLink: '',
                },
                {
                    position: "HEAD OF RESEARCH",
                    name: "ANDY VU",
                    // text: ["Former BDM at Metaverse DNA", "Vietnam Country Lead at BBOD"],
                    imgLink: "./img/Andy_edit.jpg",
                    likedLink: 'https://www.linkedin.com/in/andyvutsp/',
                    twLink: '',
                },
            ],
            currentIndex: 0,
            activeImgWidth: 0,
            gapWidth: 80,
        };
    },
    mounted() {
        const activeImg = document.querySelector(".active-img");
        this.activeImgWidth = activeImg.clientWidth;
        if (window.screen.width < 1441) this.gapWidth = 56;
    },
    methods: {
        nextItem() {
            this.currentIndex++;
        },
        prevItem() {
            this.currentIndex--;
        },
    },
    watch: {
        currentIndex(val) {
            this.$refs.slideContainer.style.transform = `translateX(-${val * (this.activeImgWidth / 1.15 + this.gapWidth)
                }px)`;
        },
    },
};
</script>

<style lang="scss">
.team-title {
    -webkit-text-stroke: 2.5px red;
    color: transparent;
    letter-spacing: 6px;
    font-family: Arial, Helvetica, sans-serif;

    position: relative;

    &::after {
        content: "";
        position: absolute;
        width: 180px;
        height: 2px;
        border-radius: 2px;

        right: -52px;
        bottom: 8px;

        background: white;
    }
}

.team {
    .active-img {
        filter: none;
        width: 368px;
        opacity: 1;
    }
}

@media screen and (max-width: 1600px) {
    .team {
        .active-img {
            width: 331px;
        }
    }
}

@media screen and (max-width: 1440px) {
    .team-title {
        &::after {
            width: 154px;
            bottom: 10px;
            right: -40px;
        }
    }

    .team {
        .active-img {
            width: 276px;
        }
    }
}
</style>
