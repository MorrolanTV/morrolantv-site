<template>
  <div class="content">
    <div>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-8"
                  src="~/assets/img/mobileLogo.png"
                  alt="Workflow logo"
                />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline">
                  <a
                    href="#"
                    class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Home</a
                  >
                  <a
                    href="#"
                    class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Tools</a
                  >
                  <a
                    href="#"
                    class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Twitch</a
                  >
                  <a
                    href="#"
                    class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >About</a
                  >
                </div>
              </div>
            </div>
            <!-- WIP login area
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <div class="ml-3 relative">
                  <div>
                    <button
                      id="user-menu"
                      class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                      aria-label="User menu"
                      aria-haspopup="true"
                      @click="toggle"
                    >
                      <fa :icon="fas.faAddressBook" />
                    </button>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-show="isOpen"
                      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                    >
                      <div
                        class="py-1 rounded-md bg-white shadow-xs"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          >Your Profile</a
                        >
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          >Settings</a
                        >
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          >Sign out</a
                        >
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div> -->

            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                @click="toggle"
              >
                <svg
                  :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <svg
                  :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
          <div class="px-2 pt-2 pb-3 sm:px-3">
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >Home</a
            >
            <a
              href="#"
              class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >Tools</a
            >
            <a
              href="#"
              class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >Twitch</a
            >
            <a
              href="#"
              class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >About</a
            >
          </div>
          <!-- WIP Login area mobile 
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <fa :icon="fas.faAddressBook" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  Tom Cook
                </div>
                <div
                  class="mt-1 text-sm font-medium leading-none text-gray-400"
                >
                  tom@example.com
                </div>
              </div>
            </div>
            <div class="mt-3 px-2">
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Your Profile</a
              >
              <a
                href="#"
                class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Settings</a
              >
              <a
                href="#"
                class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Sign out</a
              >
            </div>
          </div>-->
        </div>
      </nav>
      <div id="content">
        <div class="half">
          <div id="stream" class="live">
            <iframe
              src="https://player.twitch.tv/?channel=morrolantv&parent=morrolantv-dev.herokuapp.com"
              frameborder="0"
              allowfullscreen="false"
              scrolling="no"
              height="100%"
              width="100%"
            ></iframe>
          </div>
        </div>
        <div class="half">
          <div id="recommended">
            <h2>Morrolan Recommends</h2>
            <a
              href="https://www.youtube.com/watch?v=OKZHY8MiEVk"
              target="_blank"
              class="video"
            >
              <div class="thumbnail">
                <img
                  src="https://img.youtube.com/vi/OKZHY8MiEVk/maxresdefault.jpg"
                  alt=""
                />
              </div>
              <div class="meta">
                <div class="author">MorrolanTV</div>
                <div class="title">Thoughts on Shadow Arena</div>
                <div class="description">
                  MorrolanTV explores Pearl Abyss' new game, Shadow Arena.
                </div>
              </div>
            </a>
            <a
              href="https://www.youtube.com/watch?v=uURGDpY1Y-Q"
              target="_blank"
              class="video"
            >
              <div class="thumbnail">
                <img
                  src="https://img.youtube.com/vi/uURGDpY1Y-Q/maxresdefault.jpg"
                  alt=""
                />
              </div>
              <div class="meta">
                <div class="author">MorrolanTV</div>
                <div class="title">Legends of Aria Lost Its Vision</div>
                <div class="description">
                  Legends of Aria has announced a ruleset change which ruins...
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div id="clips">
        <h2>Recent Stream Clips</h2>
        <div id="clipContainer">
          <a href="" class="clip">
            <img src="~/assets/img/1.png" />
          </a>
          <a href="" class="clip">
            <img src="~/assets/img/2.png" />
          </a>
          <a href="" class="clip">
            <img src="~/assets/img/3.png" />
          </a>
          <a href="" class="clip">
            <img src="~/assets/img/4.png" />
          </a>
        </div>
      </div>
    </div>
    <h1 class="padded">Tools</h1>
    <div class="section nhpad">
      <div class="browser">
        <a href="tools/node" class="external">
          <div class="name">Node Calculator</div>
          <div class="game">Black Desert Online</div>
          <img src="~/assets/img/worker.png" alt="" class="preview" />
        </a>
        <a href="" class="external">
          <div class="name">Trading Calculator</div>
          <div class="game">Black Desert Online</div>
          <img src="~/assets/img/trading.png" alt="" class="preview" />
        </a>
        <a href="tools/cooking" class="external">
          <div class="name">Cooking Calculator</div>
          <div class="game">Black Desert Online</div>
          <img src="~/assets/img/cooking.png" alt="" class="preview" />
        </a>
        <a href="" class="external">
          <div class="name">Processing Calculator</div>
          <div class="game">Black Desert Online</div>
          <img src="~/assets/img/processing.png" alt="" class="preview" />
        </a>
        <a href="" class="external">
          <div class="name">Scroll Calculator</div>
          <div class="game">Black Desert Online</div>
          <img src="~/assets/img/scroll.png" alt="" class="preview" />
        </a>
      </div>
    </div>
    <h1 class="padded">Recommended Content</h1>
    <div class="section nhpad bpad right">
      <div class="browser right">
        <a
          href="https://www.youtube.com/watch?v=GhhC_zs-rOc"
          target="_blank"
          class="external"
        >
          <img
            src="https://img.youtube.com/vi/GhhC_zs-rOc/maxresdefault.jpg"
            alt=""
            class="thumb"
          />
        </a>
        <a
          href="https://www.youtube.com/watch?v=OKZHY8MiEVk"
          target="_blank"
          class="external"
        >
          <img
            src="https://img.youtube.com/vi/OKZHY8MiEVk/maxresdefault.jpg"
            alt=""
            class="thumb"
          />
        </a>
        <a
          href="https://www.youtube.com/watch?v=uZLjvwKRnnQ"
          target="_blank"
          class="external"
        >
          <img
            src="https://img.youtube.com/vi/uZLjvwKRnnQ/maxresdefault.jpg"
            alt=""
            class="thumb"
          />
        </a>
        <a
          href="https://www.youtube.com/watch?v=FcFlkddE9i0"
          target="_blank"
          class="external"
        >
          <img
            src="https://img.youtube.com/vi/FcFlkddE9i0/maxresdefault.jpg"
            alt=""
            class="thumb"
          />
        </a>
        <a
          href="https://www.youtube.com/watch?v=epCeAUgPG4g"
          target="_blank"
          class="external"
        >
          <img
            src="https://img.youtube.com/vi/epCeAUgPG4g/maxresdefault.jpg"
            alt=""
            class="thumb"
          />
        </a>
        <a
          href="https://www.youtube.com/watch?v=6xQXbpWgiXc"
          target="_blank"
          class="external"
        >
          <img
            src="https://img.youtube.com/vi/6xQXbpWgiXc/maxresdefault.jpg"
            alt=""
            class="thumb"
          />
        </a>
      </div>
    </div>
    <footer class="bg-gray-800 py-8">
      <div class="container mx-auto">
        <table>
          <tr>
            <th><img src="~/assets/img/mobileLogo.png" /></th>
            <th>Contact</th>
            <th>Legal</th>
            <th>Information</th>
          </tr>
          <tr>
            <td>Twitch</td>
            <td>contact@morrolan.tv</td>
            <td>Terms of Use</td>
            <td>Copyright @ 2020 MorrolanTV</td>
          </tr>
          <tr>
            <td>Discord</td>
            <td>MorrolanTV#7828</td>
            <td>Cookies</td>
            <td>All Rights Reserved.</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>Privacy</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </footer>
  </div>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons'
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    fas() {
      return fas
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style></style>
