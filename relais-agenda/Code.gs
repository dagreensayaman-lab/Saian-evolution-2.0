// Relais Grind <-> Google Agenda (Google Apps Script)
// Tourne sur TON compte Google : l'appli lit et valide les tâches de l'agenda « Grind »
// sans jeton qui expire et sans reconnexion.
// Installation : voir LISEZ-MOI.md. La clé secrète se met dans Paramètres du projet > Propriétés du script (nom : KEY).

var CAL_NAME = 'Grind';

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function calId_() {
  var cals = CalendarApp.getCalendarsByName(CAL_NAME);
  if (!cals.length) throw new Error('agenda Grind introuvable');
  return cals[0].getId();
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    var key = PropertiesService.getScriptProperties().getProperty('KEY');
    if (!key || p.key !== key) return out_({ error: 'key' });
    var id = calId_();

    if (p.action === 'list') {
      var res = Calendar.Events.list(id, {
        timeMin: p.from, timeMax: p.to,
        singleEvents: true, orderBy: 'startTime', maxResults: 250
      });
      var items = (res.items || [])
        .filter(function (ev) { return ev.status !== 'cancelled'; })
        .map(function (ev) {
          var priv = (ev.extendedProperties && ev.extendedProperties.private) || {};
          var title = ev.summary || '';
          return { id: ev.id, summary: title, start: ev.start,
                   done: priv.grindDone === '1' || title.indexOf('✅') === 0 };
        });
      return out_({ items: items });
    }

    if (p.action === 'done' && p.id) {
      var cur = Calendar.Events.get(id, p.id);
      var clean = (cur.summary || '').replace(/^✅\s*/, '');
      Calendar.Events.patch({
        summary: '✅ ' + clean, colorId: '2',
        extendedProperties: { private: { grindDone: '1' } }
      }, id, p.id);
      return out_({ ok: true });
    }

    return out_({ error: 'action' });
  } catch (err) {
    var m = String(err);
    return out_({ error: /Not Found|404|deleted|Resource has been/i.test(m) ? 'notfound' : m.slice(0, 120) });
  }
}
