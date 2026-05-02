// falkor-school v1.3.0 — Phase 69: full week PE lesson planner
// Endpoints:
//   GET  /health          — version check
//   GET  /summary         — context for Falkor agent
//   GET  /pe-advisor      — outdoor/indoor recommendation
//   GET  /weather         — current conditions at WPS
//   GET  /calendar        — today/week calendar events
//   POST /lesson-plan     — single AI-generated lesson plan
//   POST /lesson-week     — full 5-day week plan (NEW)

const VERSION = '1.3.0';
const WORKER_NAME = 'falkor-school';
const WPS_LAT = -37.8594;
const WPS_LON = 144.8750;
const AI_URL = 'https://asgard-ai.luckdragon.io';
const BRAIN_URL = 'https://falkor-brain.luckdragon.io';
const CALENDAR_URL = 'https://falkor-calendar.luckdragon.io';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Pin',
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...CORS } });
}

function pinOk(request, env) {
  const pin = request.headers.get('X-Pin') || '';
  if (!env.AGENT_PIN) return true;
  return pin === env.AGENT_PIN;
}

const PE_CURRICULUM = {
  athletics: ['sprints 50m/100m', 'long jump', 'high jump', 'shot put', 'discus', 'relay'],
  games: ['basketball', 'netball', 'soccer', 'AFL', 'touch football', 'cricket', 'volleyball'],
  fitness: ['circuit training', 'beep test', 'yoga', 'gymnastics', 'swimming'],
  dance: ['creative movement', 'cultural dance', 'hip hop', 'aerobics'],
  outdoor: ['cross-country running', 'orienteering', 'fitness walk', 'adventure play'],
};

// Vic Curriculum strands for PE
const VIC_STRANDS = {
  'F-2': {
    movement: 'VCHPEM001–VCHPEM006: fundamental movement skills, locomotor skills',
    understanding: 'VCHPEU001–VCHPEU002: safe participation, body awareness',
  },
  '1-2': {
    movement: 'VCHPEM001–VCHPEM006: fundamental movement skills, locomotor skills',
    understanding: 'VCHPEU001–VCHPEU002: safe participation, body awareness',
  },
  '3-4': {
    movement: 'VCHPEM007–VCHPEM014: specialised movement skills, game play, athletics',
    understanding: 'VCHPEU005–VCHPEU008: health benefits of activity, fair play',
  },
  '5-6': {
    movement: 'VCHPEM015–VCHPEM022: complex movement skills, tactics and strategies',
    understanding: 'VCHPEU009–VCHPEU012: physical activity guidelines, leadership',
  },
};

function getCurriculum(yearLevel) {
  if (!yearLevel || yearLevel.toLowerCase().includes('found') || yearLevel.includes('F')) return VIC_STRANDS['F-2'];
  if (yearLevel.includes('1') || yearLevel.includes('2')) return VIC_STRANDS['1-2'];
  if (yearLevel.includes('3') || yearLevel.includes('4')) return VIC_STRANDS['3-4'];
  return VIC_STRANDS['5-6'];
}

function assessPEConditions(w) {
  if (!w) return { suitable: null, reasons: [], indoor_alternatives: [], verdict: 'Weather data unavailable' };
  const issues = [];
  const warnings = [];
  const uv = w.uv || 0;
  const temp = w.temp || 20;
  const maxTemp = w.max || temp;
  const rainChance = w.rain_chance || 0;
  const windKmh = w.wind_kmh || 0;
  const condition = (w.condition || '').toLowerCase();
  if (uv >= 11) issues.push({ factor: 'UV', value: uv, note: 'Extreme UV — cancel outdoor lesson (DET policy)' });
  else if (uv >= 8) issues.push({ factor: 'UV', value: uv, note: 'Very high UV — hats mandatory, consider indoor' });
  if (condition.includes('thunder') || condition.includes('storm')) issues.push({ factor: 'Lightning', value: condition, note: 'Thunderstorm — mandatory indoor' });
  if (condition.includes('rain') || rainChance >= 70) issues.push({ factor: 'Rain', value: rainChance + '%', note: 'High rain probability — slipping hazard' });
  if (maxTemp >= 35) issues.push({ factor: 'Heat', value: maxTemp + 'C', note: 'Extreme heat — cancel outdoor (DET heat policy)' });
  if (temp <= 5) issues.push({ factor: 'Cold', value: temp + 'C', note: 'Very cold — hypothermia risk' });
  if (windKmh >= 55) issues.push({ factor: 'Wind', value: windKmh + 'km/h', note: 'Dangerous wind — debris risk' });
  if (uv >= 6 && uv < 8) warnings.push({ factor: 'UV', value: uv, note: 'High UV — hats and sunscreen required' });
  if (maxTemp >= 30 && maxTemp < 35) warnings.push({ factor: 'Heat', value: maxTemp + 'C', note: 'Hot day — water breaks every 10-15min' });
  if (rainChance >= 40 && rainChance < 70) warnings.push({ factor: 'Rain chance', value: rainChance + '%', note: 'Some rain risk — indoor backup plan ready' });
  if (windKmh >= 30 && windKmh < 55) warnings.push({ factor: 'Wind', value: windKmh + 'km/h', note: 'Strong wind — avoid throwing activities' });
  const suitable = issues.length === 0;
  const indoor_alternatives = ['Circuit training in the gym','Gymnastics / movement skills on mats','Basketball skills (gym)','Dance / creative movement','Yoga and mindfulness','Beep test or pacer run (indoors)'];
  let verdict = '';
  if (suitable && warnings.length === 0) verdict = 'Good conditions for outdoor PE. No concerns.';
  else if (suitable) verdict = 'Outdoor PE OK with precautions.';
  else verdict = 'Recommend indoor PE — ' + issues.map(i => i.factor).join(', ') + ' not suitable.';
  return { suitable, issues, warnings, indoor_alternatives: suitable ? [] : indoor_alternatives, verdict };
}

async function callClaude(apiKey, prompt, maxTokens = 1500) {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!resp.ok) throw new Error('Claude API ' + resp.status);
  const data = await resp.json();
  return data.content?.[0]?.text || '';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    if (path === '/health') return json({ ok: true, worker: WORKER_NAME, version: VERSION });
    if (!pinOk(request, env)) return json({ ok: false, error: 'Unauthorized' }, 401);

    // ── Weather ──────────────────────────────────────────────────────────────
    if (path === '/weather') {
      const r = await fetch(AI_URL + '/weather?lat=' + WPS_LAT + '&lon=' + WPS_LON, { headers: { 'X-Pin': env.AGENT_PIN || '' } });
      if (!r.ok) return json({ ok: false, error: 'Weather fetch failed' }, 502);
      return json(await r.json());
    }

    // ── PE Advisor ────────────────────────────────────────────────────────────
    if (path === '/pe-advisor') {
      const weatherResp = await fetch(AI_URL + '/weather?lat=' + WPS_LAT + '&lon=' + WPS_LON, { headers: { 'X-Pin': env.AGENT_PIN || '' } }).catch(() => null);
      if (!weatherResp || !weatherResp.ok) return json({ ok: false, error: 'Weather unavailable — assume indoor to be safe' });
      const w = await weatherResp.json();
      const c = w.current || {};
      const today = w.today || {};
      const assessment = assessPEConditions({ uv: c.uv, temp: c.temp, max: today.max || c.temp, rain_chance: c.rain_chance, wind_kmh: c.wind_kmh, condition: c.condition });
      const calResp = await fetch(CALENDAR_URL + '/week', { headers: { 'X-Pin': env.AGENT_PIN || '' } }).catch(() => null);
      const calData = calResp ? await calResp.json().catch(() => null) : null;
      const weekEvents = (calData?.ok && calData?.events ? calData.events : []).filter(e => {
        const t = (e.title || '').toLowerCase();
        return t.includes('pe') || t.includes('sport') || t.includes('cross') || t.includes('carnival');
      });
      return json({
        ok: true, school: 'Williamstown Primary School',
        date: new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Australia/Melbourne' }),
        current_conditions: { temp: c.temp, max: today.max, condition: c.condition, uv: c.uv, uv_category: c.uv >= 11 ? 'Extreme' : c.uv >= 8 ? 'Very High' : c.uv >= 6 ? 'High' : c.uv >= 3 ? 'Moderate' : 'Low', rain_chance: c.rain_chance, wind_kmh: c.wind_kmh },
        recommendation: assessment.suitable ? 'OUTDOOR' : 'INDOOR',
        verdict: assessment.verdict, stop_factors: assessment.issues, caution_factors: assessment.warnings,
        indoor_alternatives: assessment.indoor_alternatives, pe_calendar_this_week: weekEvents,
        sunscreen_required: (c.uv || 0) >= 3, hat_required: (c.uv || 0) >= 6, water_breaks_required: (today.max || c.temp || 0) >= 28,
      });
    }

    // ── Summary ───────────────────────────────────────────────────────────────
    if (path === '/summary') {
      const [weatherResp, calResp] = await Promise.all([
        fetch(AI_URL + '/weather?lat=' + WPS_LAT + '&lon=' + WPS_LON, { headers: { 'X-Pin': env.AGENT_PIN || '' } }).catch(() => null),
        fetch(CALENDAR_URL + '/today', { headers: { 'X-Pin': env.AGENT_PIN || '' } }).catch(() => null),
      ]);
      const weather = weatherResp && weatherResp.ok ? await weatherResp.json().catch(() => null) : null;
      const calData = calResp && calResp.ok ? await calResp.json().catch(() => null) : null;
      const c = weather?.current;
      const today = weather?.today;
      const calEvents = calData?.ok && calData?.events ? calData.events : [];
      const assessment = weather ? assessPEConditions({ uv: c?.uv, temp: c?.temp, max: today?.max, rain_chance: c?.rain_chance, wind_kmh: c?.wind_kmh, condition: c?.condition }) : { suitable: null, verdict: 'Weather unavailable' };
      return json({
        ok: true, school: 'Williamstown Primary School', teacher: 'Paddy Gallivan — PE',
        weather: weather ? { temp: c.temp, feels_like: c.feels_like, condition: c.condition, uv: c.uv, wind_kmh: c.wind_kmh, rain_chance: c.rain_chance, max: today?.max, min: today?.min } : null,
        pe_recommendation: assessment.suitable === null ? 'UNKNOWN' : assessment.suitable ? 'OUTDOOR' : 'INDOOR',
        pe_verdict: assessment.verdict, pe_suitable: assessment.suitable,
        curriculum_areas: Object.keys(PE_CURRICULUM),
        calendar_today: calEvents,
        calendar_summary: calEvents.length > 0 ? calEvents.map(e => e.allDay ? e.title : e.time + ': ' + e.title).join(', ') : 'No events today',
      });
    }

    // ── Calendar proxy ────────────────────────────────────────────────────────
    if (path === '/calendar' || path === '/today' || path === '/week') {
      const calPath = path === '/calendar' ? '/today' : path;
      const r = await fetch(CALENDAR_URL + calPath, { headers: { 'X-Pin': env.AGENT_PIN || '' } }).catch(() => null);
      if (!r || !r.ok) return json({ ok: false, error: 'Calendar unavailable' }, 502);
      return json(await r.json());
    }

    // ── Single Lesson Plan ────────────────────────────────────────────────────
    if (path === '/lesson-plan' && method === 'POST') {
      if (!env.ANTHROPIC_API_KEY) return json({ ok: false, error: 'ANTHROPIC_API_KEY missing' }, 500);
      const body = await request.json().catch(() => ({}));
      const { year_level, duration = 45, focus, outdoor } = body;
      const weather = await fetch(AI_URL + '/weather?lat=' + WPS_LAT + '&lon=' + WPS_LON, { headers: { 'X-Pin': env.AGENT_PIN || '' } }).then(r => r.ok ? r.json() : null).catch(() => null);
      const c = weather?.current;
      const assessment = weather ? assessPEConditions({ uv: c?.uv, temp: c?.temp, max: weather?.today?.max, rain_chance: c?.rain_chance, wind_kmh: c?.wind_kmh, condition: c?.condition }) : { suitable: true };
      const goOutdoor = outdoor !== false && assessment.suitable;
      const weatherNote = weather ? 'Current: ' + c.temp + 'C, ' + c.condition + ', UV ' + c.uv + ', wind ' + c.wind_kmh + 'km/h. ' + assessment.verdict : 'Weather unavailable';
      const curriculum = getCurriculum(year_level);
      const prompt = 'Create a ' + duration + '-minute PE lesson plan for Williamstown Primary School.\nYear level: ' + (year_level || 'Mixed F-6') + '\nFocus: ' + (focus || 'General fitness and fundamental movement skills') + '\nSetting: ' + (goOutdoor ? 'Outdoor' : 'Indoor hall') + '\nWeather: ' + weatherNote + '\nVic Curriculum: ' + curriculum.movement + '\n\nStructure (use these exact headings):\nWARM-UP (5-8 min)\nSKILL FOCUS (20-25 min)\nAPPLICATION GAME (10-15 min)\nCOOL-DOWN (3-5 min)\nEQUIPMENT NEEDED\nLEARNING OUTCOMES\n\nBe specific and practical for primary school. No emojis.';
      const plan = await callClaude(env.ANTHROPIC_API_KEY, prompt, 1200);
      await fetch(BRAIN_URL + '/remember', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Pin': env.AGENT_PIN || '' }, body: JSON.stringify({ text: 'PE Lesson Plan (' + (year_level || 'Mixed') + ', ' + duration + 'min): ' + plan.slice(0, 300), category: 'school', tags: ['pe', 'lesson-plan'] }) }).catch(() => {});
      return json({ ok: true, plan, weather_note: weatherNote, year_level: year_level || 'Mixed', duration, outdoor: goOutdoor, pe_verdict: assessment.verdict });
    }

    // ── Week Lesson Planner (Phase 69) ────────────────────────────────────────
    if (path === '/lesson-week' && method === 'POST') {
      if (!env.ANTHROPIC_API_KEY) return json({ ok: false, error: 'ANTHROPIC_API_KEY missing' }, 500);
      const body = await request.json().catch(() => ({}));
      const { year_level, duration = 45, theme, equipment = [], class_size = 25 } = body;

      const weather = await fetch(AI_URL + '/weather?lat=' + WPS_LAT + '&lon=' + WPS_LON, { headers: { 'X-Pin': env.AGENT_PIN || '' } }).then(r => r.ok ? r.json() : null).catch(() => null);
      const c = weather?.current;
      const assessment = weather ? assessPEConditions({ uv: c?.uv, temp: c?.temp, max: weather?.today?.max, rain_chance: c?.rain_chance, wind_kmh: c?.wind_kmh, condition: c?.condition }) : { suitable: true };
      const goOutdoor = assessment.suitable !== false;
      const weatherNote = weather ? c.temp + 'C, ' + c.condition + ', UV ' + c.uv + '. ' + assessment.verdict : 'Weather unknown';
      const curriculum = getCurriculum(year_level);
      const equipList = equipment.length > 0 ? equipment.join(', ') : 'standard PE shed (balls, cones, bibs, hoops, ropes)';

      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const prompts = days.map((day, i) => {
        const dayTheme = theme || (['Fundamental Movement Skills', 'Ball Skills', 'Fitness & Athletics', 'Team Games', 'Skill Consolidation'][i]);
        return 'Day ' + (i+1) + ' (' + day + ') — ' + dayTheme;
      });

      const masterPrompt = 'Create a 5-day PE week plan for Williamstown Primary School.\nYear level: ' + (year_level || 'Mixed F-6') + '\nClass size: ' + class_size + ' students\nLesson duration: ' + duration + ' minutes each\nWeekly theme: ' + (theme || 'Progressive skill development') + '\nAvailable equipment: ' + equipList + '\nWeather context: ' + weatherNote + '\nVic Curriculum links: ' + curriculum.movement + '\n\nFor each day provide:\nDAY [N] — [FOCUS]\nWarm-up: (one sentence)\nMain activity: (2-3 sentences, specific drills/games)\nGame: (one sentence)\nEquipment: (list)\nVic Curriculum: (one code + descriptor)\n\nDays:\n' + prompts.join('\n') + '\n\nBe practical, varied, and progressive across the week. No emojis. Keep each day concise.';

      const rawPlan = await callClaude(env.ANTHROPIC_API_KEY, masterPrompt, 2000);

      // Parse into structured days
      const dayBlocks = [];
      const dayRegex = /DAY\s+(\d+)[^\n]*\n([\s\S]*?)(?=DAY\s+\d+|$)/gi;
      let match;
      while ((match = dayRegex.exec(rawPlan)) !== null) {
        const dayNum = parseInt(match[1]);
        const content = match[2].trim();
        const lines = content.split('\n').filter(l => l.trim());
        const dayObj = { day: dayNum, name: days[dayNum - 1] || 'Day ' + dayNum, raw: content, sections: {} };
        let currentSection = '';
        let currentLines = [];
        for (const line of lines) {
          const sectionMatch = line.match(/^(Warm-up|Main activity|Game|Equipment|Vic Curriculum):\s*(.*)/i);
          if (sectionMatch) {
            if (currentSection) dayObj.sections[currentSection] = currentLines.join(' ').trim();
            currentSection = sectionMatch[1].toLowerCase().replace(' ', '_');
            currentLines = sectionMatch[2] ? [sectionMatch[2]] : [];
          } else if (currentSection) {
            currentLines.push(line.trim());
          }
        }
        if (currentSection) dayObj.sections[currentSection] = currentLines.join(' ').trim();
        dayBlocks.push(dayObj);
      }

      return json({
        ok: true,
        year_level: year_level || 'Mixed F-6',
        duration,
        theme: theme || 'Progressive skill development',
        week_of: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Melbourne' }),
        outdoor_recommended: goOutdoor,
        weather_note: weatherNote,
        days: dayBlocks.length > 0 ? dayBlocks : [{ day: 1, name: 'Full Week', raw: rawPlan, sections: {} }],
        raw_plan: rawPlan,
        curriculum_links: curriculum,
      });
    }

    return json({ error: 'Not found', path }, 404);
  },
};
