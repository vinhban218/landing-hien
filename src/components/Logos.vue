<template>
  <div
    id="last-section"
    class="z-[101] fixed w-full h-full flex flex-col top-0 left-0"
  >
    <div id="portfolio" class="text-center mt-8 mx-auto">
      <div class="flex items-center justify-center">
        <img
          src="../../static/img/arrow-left.png"
          alt="arrow-left"
          class="w-[50px]"
        />
        <div class="team-title ml-4 text-[60px] laptop:text-[72px] font-[900]">
          <span class="text-white none-stroke">PORTFOLIO</span> & PARTNER
        </div>
      </div>
    </div>
    <div class="relative h-[calc(100%-2*141px)] mx-32 flex flex-col items-center overflow-hidden">
      <div class="logos-container h-full absolute top-0 translate-x-0">
        <div
          v-for="(row, index) in rows"
          :key="index"
          class="transition-[height] duration-300 flex items-center min-w-full"
          :class="{
            'h-0 logo-detail': row.isDetail,
            '!h-1/2 w-full cursor-pointer': currentLogo.id && row.isDetail,
            'row-logos h-1/4': !row.isDetail,
            '!h-0 overflow-hidden':
              (index === 0 || index === 4) && currentLogo.id,
          }"
        >
          <!-- element detail coong ty - tron'g, day la lop gia -->
          <div v-if="row.isDetail"></div>

          <!-- array list logo -->
          <div v-else class="flex gap-5 items-center min-w-full">
            <div
              v-for="(logo, i) in row"
              :key="i"
              class="w-[calc(12.5%-17.5px)] p-5 gap-4 shrink-0"
            >
              <img
                :src="logo.imgLink"
                :alt="logo.name"
                class="logo-item w-full"
                :class="{
                  'pointer-events-none': !isPortSection,
                  active: logo.id === currentLogo.id,
                }"
                @click="showLogoDetail(logo)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- rowdetail -->
    <div
      class="bg-black bg-opacity-60 h-0 fixed transtion-all border-transparent overflow-hidden -translate-y-1/2 duration-300 w-full cursor-pointer"
      ref="logoDetail"
      :class="{ 'border-t border-b !border-gray3': currentLogo.id }"
      :style="`height: ${h}px; top: ${top}px`"
      @click="closeDetail"
    >
      <div class="flex items-center justify-center relative h-full">
        <img
          v-show="currentLogo.imgLink"
          :src="currentLogo.imgLink"
          class="w-52 absolute top-1/2 left-[10%] -translate-y-1/2"
          alt="current logo"
        />

        <p class="text-[#f9f9f9] w-1/2 text-center text-lg">
          {{ currentLogo?.text }}
        </p>
        <a
          class="absolute h-full top-1/2 -translate-y-1/2 right-20 flex items-center"
          :href="currentLogo?.websiteLink"
          target="_blank"
        >
          <img
            src="../../static/img/circle-arrow-right.png"
            alt="arrow-right"
            class="w-8"
          />
          <p class="ml-4 font-semibold text-white">HEAD TO SITE</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: "Logos",
  data() {
    return {
      listData: [
        {
          name: "A8",
          imgLink: "./img/logos/A8.png",
          text: "Ancient8 develops the infrastructure for GameFi, with a focus on software and community. They help players and communities worldwide connect with the most innovative games, and enable everyone to build and play in the Metaverse.",
          websiteLink: "https://ancient8.gg/",
          id: null,
        },
        {
          name: "Alice",
          imgLink: "./img/logos/Alice.png",
          text: "My Neighbor Alice is a multiplayer builder game, where anyone can buy and own virtual islands, collect and build exciting items and meet new friends.",
          websiteLink: "https://www.myneighboralice.com/",
          id: null,
        },
         {
          name: "Cyball",
          imgLink: "./img/logos/Cyball.png",
          text: "CyBall is a cyberpunk football-themed, NFT-based web3 game with innovative blockchain technology and competitive gameplay where players can earn rewards.",
          websiteLink: "https://cyball.com/",
          id: null,
        },
         {
          name: "Chromia",
          imgLink: "./img/logos/Chromia.png",
          text: "Chromia is a public relational blockchain platform that allows people building decentralized apps easier in the real world, for a better world. The technology behind the Chromia blockchain is adapted from Postchain, a solution provided by Chromaway AB for enterprise clients.",
          websiteLink: "https://chromia.com/",
          id: null,
        },
         {
          name: "C98",
          imgLink: "./img/logos/C98.png",
          text: "Coin98 is all in one DeFi platform focusing on creating & developing ecosystem of DeFi protocols, applications on multiple blockchain.",
          websiteLink: "http://coin98.net/en",
          id: null,
        },
         {
          name: "GuildFi",
          imgLink: "./img/logos/GuildFi.png",
          text: "The interconnected ecosystem of games, communities, and NFT assets. Maximizing yields and enabling interoperability across the Metaverse.",
          websiteLink: "https://guildfi.com/",
          id: null,
        },
        {
          name: "Biconomy",
          imgLink: "./img/logos/Biconomy.png",
          text: "Biconomy makes blockchain transactions simple, enables gasless meta-transactions, instant cross-chain tranfers, easy layer 2 onboarding & zero failed transactions.",
          websiteLink: "https://www.biconomy.io/",
          id: null,
        },
         {
          name: "Serum",
          imgLink: "./img/logos/Serum.png",
          text: "Serum is a protocol for decentralized exchanges that brings unprecedented speed and low transaction costs to decentralized finance.",
          websiteLink: "https://www.projectserum.com/",
          id: null,
        },
        {
          name: "Dalarnia",
          imgLink: "./img/logos/Dalarnia.png",
          text: "Blending combat and dungeon crawling, Mines of Dalarnia delivers a fresh new entry to Web3 gaming genre, utilizing the power of blockchain technologies.",
          websiteLink: "https://www.minesofdalarnia.com/",
          id: null,
        },
         {
          name: "DeRace",
          imgLink: "./img/logos/DeRace.png",
          text: "DeRace is a play-to-earn NFT horse racing metaverse where you can participate in horse races, breed NFT horses with unique characteristics, build your own NFT hippodrome and make profit while doing it.",
          websiteLink: "https://derace.com/",
          id: null,
        },
         {
          name: "CLV",
          imgLink: "./img/logos/CLV.png",
          text: "CLV Chain is a Substrate-based specialized Layer 1 chain that is EVM compatible and cross-chain interoperable. Infrastructure made ready for scaling dApps in the multi-chain universe.",
          websiteLink: "https://clv.org/",
          id: null,
        },
        {
          name: "Polkastarter",
          imgLink: "./img/logos/Polkastarter.png",
          text: "Polkastarter is capital raising platform with highly-vetted ideas and teams you can trust. Supported by industry-leading creators and funds.",
          websiteLink: "https://polkastarter.com/",
          id: null,
        },
        {
          name: "BlockWallet",
          imgLink: "./img/logos/BlockWallet.png",
          text: "BlockWallet is the most private, non-custodial cryptocurrency wallet, using privacy-enhancing smart contracts to make your crypto transfers as private and secure as bank transfers.",
          websiteLink: "https://blockwallet.io/",
          id: null,
        },
        {
          name: "BreederDAO",
          imgLink: "./img/logos/BreederDAO.png",
          text: "BreederDAO is the go-to asset production factory for quality gaming assets of the Metaverse.",
          websiteLink: "https://www.breederdao.io/",
          id: null,
        },
        {
          name: "ChainofAlliance",
          imgLink: "./img/logos/ChainofAlliance.png",
          text: "Chain of Alliance is an RPG Gaming Multiverse where you can battle against other players, customize and level up characters, earn and collect NFTs.",
          websiteLink: "https://chainofalliance.com/",
          id: null,
        },
        // {
        //   name: "Chiliz",
        //   imgLink: "./img/logos/Chiliz.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "Corite",
          imgLink: "./img/logos/Corite.png",
          text: "Corite empowers independent artists to release their fan power to the fullest, while getting their music on all major streaming services, such as Spotify, Apple Music, TikTok and YouTube.",
          websiteLink: "https://corite.com/",
          id: null,
        },
        {
          name: "DefiLand",
          imgLink: "./img/logos/DefiLand.png",
          text: "DeFiLand is a multi-chain agriculture-simulation game created to gamify Decentralized Finance.",
          websiteLink: "https://defiland.app/",
          id: null,
        },
        // {
        //   name: "Dfyn",
        //   imgLink: "./img/logos/Dfyn.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "Divergence",
          imgLink: "./img/logos/Divergence.png",
          text: "Divergence is seamless, capital efficient, on-chain protocol for composable crypto options.",
          websiteLink: "https://www.divergence-protocol.com/",
          id: null,
        },
        {
          name: "Euler",
          imgLink: "./img/logos/Euler.png",
          text: "The main mission of Euler is democratizing the assets people can lend and borrow.",
          websiteLink: "https://www.euler.finance/",
          id: null,
        },
        {
          name: "Finblox",
          imgLink: "./img/logos/Finblox.png",
          text: "Finblox is a platform that helps crypto investors buy and earn high yield on their crypto assets.",
          websiteLink: "https://finblox.com/",
          id: null,
        },
        // {
        //   name: "FTX",
        //   imgLink: "./img/logos/FTX.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "GameFi",
          imgLink: "./img/logos/GameFi.png",
          text: "GameFi is an all-in-one discovery hub for games and metaverses. They also serve as one of the top gaming IDO platforms.",
          websiteLink: "https://gamefi.org/",
          id: null,
        },
        {
          name: "Gamestarter",
          imgLink: "./img/logos/Gamestarter.png",
          text: "Gamestarter is a blockchain-based crowdfunding platform that serves one of the largest industries in the world.",
          websiteLink: "https://igo.gamestarter.com/",
          id: null,
        },
        {
          name: "HeroesChained",
          imgLink: "./img/logos/HeroesChained.png",
          text: "Heroes Chained is a real time fantasy action RPG game, where the player becomes a Guild Master and gathers heroes.",
          websiteLink: "https://heroeschained.com/",
          id: null,
        },
        {
          name: "Lithium",
          imgLink: "./img/logos/Lithium.png",
          text: "Lithium Finance is a blockchain protocol building a collective intelligence algorithm to price the unpriced.",
          websiteLink: "https://testnet.lith.finance/",
          id: null,
        },
        {
          name: "manifold",
          imgLink: "./img/logos/manifold.png",
          text: "Manifold is making the connections to capital, propocols and people for DeFi They enable and provide access to high-value transaction pools on EVM compatible chains, through their SecureRPC infrastructure.",
          websiteLink: "https://www.manifoldfinance.com/",
          id: null,
        },
        // {
        //   name: "Mapsme",
        //   imgLink: "./img/logos/Mapsme.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "Mercurial",
          imgLink: "./img/logos/Mercurial.png",
          text: "Mercurial is building the infrastructure for stable and pegged assets for Solana",
          websiteLink: "https://www.mercurial.finance/",
          id: null,
        },
        // {
        //   name: "Mina",
        //   imgLink: "./img/logos/Mina.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "Only1",
          imgLink: "./img/logos/Only1.png",
          text: "Only1 is the first web 3.0 social platform built on Solana. The platform offers an on-chain creator economy via the NFT marketplace and creator staking pools so that creators and viewers are rewarded fairly.",
          websiteLink: "https://only1.app/",
          id: null,
        },
        // {
        //   name: "Opium",
        //   imgLink: "./img/logos/Opium.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "Pegaxy",
          imgLink: "./img/logos/Pegaxy.png",
          text: "Pegaxy is a racing game with futuristic mythological styling, built on Polygon. They pioneer in implementing the first in-game scholarship management feature.",
          websiteLink: "https://pegaxy.io/",
          id: null,
        },
        {
          name: "Portal",
          imgLink: "./img/logos/Portal.png",
          text: "Portal Defi is a decentralized financial platform that blends the best of Bitcoin and Layer 2.",
          websiteLink: "https://portaldefi.com/",
          id: null,
        },
        {
          name: "SkyArk",
          imgLink: "./img/logos/SkyArk.png",
          text: "SkyArk Chronicles is a Japanese fantasy role-playing game with Interoperable NFTs, developed by Binance-backed SkyArk Studio.",
          websiteLink: "https://www.skyarkchronicles.com/",
          id: null,
        },
        // {
        //   name: "splyt",
        //   imgLink: "./img/logos/splyt.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "SummonersArena",
          imgLink: "./img/logos/SummonersArena.png",
          text: "Summoners Arena is set out to be a multi-genre game universe made into a franchise, based on the antique lore of Summonia.",
          websiteLink: "https://summonersarena.io/",
          id: null,
        },
        // {
        //   name: "Swing",
        //   imgLink: "./img/logos/Swing.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "Thetan",
          imgLink: "./img/logos/Thetan.png",
          text: "Thetan Arena is a MOBA eSports game based on blockchain technology. You can gather your friends, form a team, battle with others and earn money with just your skills.",
          websiteLink: "https://thetanarena.com/",
          id: null,
        },
        // {
        //   name: "TrustSwap",
        //   imgLink: "./img/logos/TrustSwap.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
        {
          name: "Web3auth",
          imgLink: "./img/logos/Web3auth.png",
          text: "Web3Auth, previously Torus, is a simple self-custodial auth infrastructure that supports the next 10 million users on Web3 wallet and dApps.",
          websiteLink: "https://web3auth.io/",
          id: null,
        },
        // {
        //   name: "WeStarter",
        //   imgLink: "./img/logos/WeStarter.png",
        //   text: "",
        //   websiteLink: "",
        //   id: null,
        // },
      ],
      currentLogo: {},
      isOpenLogoDetail: false,
      rows1: null,
      rows2: null,
      rows: null,
      isPortSection: false,
      h: 0,
      top: 0,
      rowDetailHeight: 0,
      logoTl: null,
    };
  },
  created() {
    this.listData = this.listData.map((item, index) => {
      item.id = `logo-${index + 1}`;
      return item;
    });
    const length = this.listData.length;
    const numOfRow = Math.ceil(length / 4);
    const listDataMod = [];

    const listDataClone = JSON.parse(JSON.stringify(this.listData));

    for (let i = 0; i < 4; i++) {
      const data = listDataClone.splice(0, numOfRow);
      listDataMod.push(data);
    }

    listDataMod.splice(2, 0, {
      isDetail: true,
    });

    this.rows = listDataMod;

    const listDataClone2 = JSON.parse(JSON.stringify(this.listData));
    this.rows1 = listDataClone2.splice(0, Math.ceil(this.listData.length / 2));
    this.rows2 = listDataClone2;
  },
  mounted() {
    const body = document.querySelector("body");
    const bodyHeight = body.offsetHeight;
    window.addEventListener("scroll", () => {
      if (
        this.getScrollPercent(window.scrollY, bodyHeight) <= 0.69 &&
        this.getScrollPercent(window.scrollY, bodyHeight) >= 0.63
      ) {
        this.isPortSection = true;
      } else {
        this.isPortSection = false;
      }
    });
    setTimeout(() => {
      const portText = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene",
          start: "63%",
          end: "64%",
          scrub: 1,
        },
      });

      portText.to("#last-section", { opacity: 1, filter: "blur(0px)" });

      const nextScene6 = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene",
          start: "69%",
          end: "70%",
          scrub: 1,
        },
      });

      nextScene6.to("#last-section", { opacity: 0, display: "none" });

      const logoContainer = document.querySelector(".logos-container");
      const rowsLogo = document.querySelectorAll(".row-logos");
      const react = rowsLogo[1].getBoundingClientRect();
      this.rowDetailHeight = logoContainer.clientHeight / 2;
      this.top = react.y + this.rowDetailHeight / 2;

      gsap.registerPlugin(ScrollTrigger);
      this.set();
    }, 3000);
  },
  watch: {
    isOpenLogoDetail() {
      this.set();
    },
  },
  methods: {
    finImage(url) {
      return url;
    },
    showLogoDetail(logo) {
      if (!this.currentLogo.id) {
        let temp;
        temp = this.clone(this.rows[1]);
        this.rows[1] = this.clone(this.rows1);
        this.rows1 = temp;

        temp = this.clone(this.rows[3]);
        this.rows[3] = this.clone(this.rows2);
        this.rows2 = temp;
        this.isOpenLogoDetail = true;
        this.h = this.rowDetailHeight;
      }

      //close box neu click vao logo hien tai
      if (this.currentLogo.id == logo.id) {
        this.closeDetail();
        return;
      }

      this.currentLogo = logo;
      setTimeout(() => {
        const activeLogo = document.querySelector(".logo-item.active");
        activeLogo.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "center",
        });
      }, 200);
    },
    closeDetail(e) {
      if (e && e.target.closest("a")) return;
      let temp;
      temp = this.clone(this.rows[1]);
      this.rows[1] = this.clone(this.rows1);
      this.rows1 = temp;

      temp = this.clone(this.rows[3]);
      this.rows[3] = this.clone(this.rows2);

      this.rows2 = temp;
      this.currentLogo = {};
      this.isOpenLogoDetail = false;
      this.h = 0;
    },
    set() {
      if (this.logoTl) this.logoTl.scrollTrigger.kill();

      const logoSlide = document.querySelector(".logos-container");
      const itemWidth = logoSlide.clientWidth / 8 - 16;
      const logo = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene",
          start: "64%",
          end: "69%",
          scrub: 1,
        },
      });
      const dX = (itemWidth + 26) * (this.rows[1].length - 8);
      logo.to(".logos-container", { translateX: -dX });
      this.logoTl = logo;

      //get position cua row detail
    },
    getScrollPercent(x, y) {
      return (x / y).toFixed(3);
    },
    clone(value) {
      return JSON.parse(JSON.stringify(value));
    },
  },
};
</script>

<style lang="scss">
#last-section {
  filter: blur(40px);
  opacity: 0;
}

.logo-item {
  width: 100%;
  filter: grayscale(1) blur(0.5px);
  transform: scale(1);
  transition: all 0.3s linear;
  opacity: 0.8;
}

.logo-item:hover,
.logo-item.active {
  filter: grayscale(0) blur(0px);
  transform: scale(1.2);
  opacity: 1;
  cursor: pointer;
}
</style>
