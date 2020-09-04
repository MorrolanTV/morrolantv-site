<template>
  <div class="content">
    <div class="section background limited">
      <div id="header">
        <div id="logo">
          <img id="desktopLogo" src="~/assets/img/desktopLogo.png" />
          <img id="mobileLogo" src="~/assets/img/mobileLogo.png" />
        </div>
        <ul id="nav">
          <li><a>Home</a></li>
          <li><a>About</a></li>
          <li><a>Tools</a></li>
          <li><a>Twitch</a></li>
        </ul>
      </div>
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
    <div id="footer" class="padded limited">
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
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
