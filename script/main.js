// === /script/main.js ===
import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      planning: [],
      newsList: []
    }
  },
  async mounted() {
    if (document.getElementById('planning')) {
      const response = await fetch('/data/planning.json');
      this.planning = await response.json();
    }
    if (document.getElementById('app')) {
      const newsResponse = await fetch('/data/news.json');
      this.newsList = await newsResponse.json();
    }
  }
});

app.component('planning-event', {
  props: ['event'],
  template: `
    <div class="event">
      <div class="time">{{ event.time }}</div>
      <div class="location" v-if="event.location">Lieu : {{ event.location }}</div>
      <ul v-if="Array.isArray(event.events)">
        <li v-for="activity in event.events" :key="activity.title || activity">
          <template v-if="typeof activity === 'string'">
            {{ activity }}
          </template>
          <template v-else>
            <strong>{{ activity.title }}</strong>
            <ul>
              <li v-for="poule in activity.poules" :key="poule.poule">
                <div>
                  Poule {{ poule.poule }} - {{ poule.problème }} :
                  Défend {{ poule.défend }}, Attaque {{ poule.attaque }}, Observe {{ poule.observe }}<br>
                  <em>Lieu : {{ poule.lieu }}</em>
                </div>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  `
});

app.component('news-item', {
  props: ['news'],
  template: `
    <div class="news-item">
      <div class="news-author">@TFJM_Mtp</div>
      <div class="news-content" v-html="news.content"></div>
      <div class="news-time">{{ news.time }}</div>
    </div>
  `
});

app.mount('#app');
