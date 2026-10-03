importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.js");

function sendPatch(patch, buffers, msg_id) {
  self.postMessage({
    type: 'patch',
    patch: patch,
    buffers: buffers
  })
}

async function startApplication() {
  console.log("Loading pyodide...");
  self.postMessage({type: 'status', msg: 'Loading pyodide'})
  self.pyodide = await loadPyodide();
  self.pyodide.globals.set("sendPatch", sendPatch);
  console.log("Loaded pyodide!");
  const data_archives = [];
  for (const archive of data_archives) {
    let zipResponse = await fetch(archive);
    let zipBinary = await zipResponse.arrayBuffer();
    self.postMessage({type: 'status', msg: `Unpacking ${archive}`})
    self.pyodide.unpackArchive(zipBinary, "zip");
  }
  await self.pyodide.loadPackage("micropip");
  self.postMessage({type: 'status', msg: `Installing environment`})
  try {
    await self.pyodide.runPythonAsync(`
      import micropip
      await micropip.install(['https://cdn.holoviz.org/panel/wheels/bokeh-3.9.2-py3-none-any.whl', 'https://cdn.holoviz.org/panel/1.9.4/dist/wheels/panel-1.9.4-py3-none-any.whl', 'pyodide-http', 'joblib', 'pandas', 'scikit-learn']);
    `);
  } catch(e) {
    console.log(e)
    self.postMessage({
      type: 'status',
      msg: `Error while installing packages`
    });
  }
  console.log("Environment loaded!");
  self.postMessage({type: 'status', msg: 'Executing code'})
  try {
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\nfrom panel import state as _pn__state\nfrom panel.io.handlers import CELL_DISPLAY as _CELL__DISPLAY, display, get_figure as _get__figure\n\n_pn__state._cell_outputs['f82be227'].append("""# App de Panel (versi\xf3n WASM para GitHub Pages)\n# Se ejecuta en el navegador con Pyodide: el modelo y el transformador se descargan\n# de la misma carpeta que esta p\xe1gina y se cargan con joblib.""")\n# Carga de las dependencias que vamos a emplear\nimport pandas as pd\nimport panel as pn\nimport io\n_pn__state._cell_outputs['19730b3c'].append((pn.extension()))\nfor _cell__out in _CELL__DISPLAY:\n    _pn__state._cell_outputs['19730b3c'].append(_cell__out)\n_CELL__DISPLAY.clear()\n_fig__out = _get__figure()\nif _fig__out:\n    _pn__state._cell_outputs['19730b3c'].append(_fig__out)\n\n# Objetos de la interfaz\nalone = pn.widgets.IntInput(name='Tiempo a solas', value=1, step=1, start=0, end=11)\nsocial_events = pn.widgets.IntInput(name='Asistencia a eventos', value=5, step=1, start=0, end=10)\npanic = pn.widgets.Select(name='Stage fear', options=['Yes', 'No'])\noutside = pn.widgets.IntSlider(name='Going outside', start=0, end=7, step=1, value=2)\ndrained = pn.widgets.Select(name='Drained after socializing', options=['Yes', 'No'])\nfriends = pn.widgets.IntSlider(name='Friends circle', start=0, end=15, step=1, value=5)\npost = pn.widgets.IntSlider(name='Post frecuency', start=0, end=10, step=1, value=10)\npredecir = pn.widgets.Button(name='Predecir', button_type='primary')\nresultado = pn.widgets.StaticText(name='Resultado', value='....')\n# Descargar y cargar el modelo y el transformador\n# En Pyodide (navegador) se descarga con open_url; localmente se lee del disco.\nimport io\nimport joblib\nimport sklearn  # asegura que scikit-learn est\xe9 cargado en Pyodide\n\ndef _abrir(url):\n    try:\n        from pyodide.http import open_url\n        return io.BytesIO(open_url(url).read())\n    except ImportError:\n        return open(url, 'rb')\n\nmodelo = joblib.load(_abrir('personalidades.pkl'))\ncol_transform = joblib.load(_abrir('col_transform_personalidades.pkl'))\n\n# Imagen del sidebar (si falla, se omite)\ntry:\n    _imagen = _abrir('personalidad.jpg')\nexcept Exception:\n    _imagen = None\ndef calculadora(event):\n    X_nuevos = pd.DataFrame()\n    X_nuevos['Time_spent_Alone'] = [alone.value]\n    X_nuevos['Stage_fear'] = [panic.value]\n    X_nuevos['Social_event_attendance'] = [social_events.value]\n    X_nuevos['Going_outside'] = [outside.value]\n    X_nuevos['Drained_after_socializing'] = [drained.value]\n    X_nuevos['Friends_circle_size'] = [friends.value]\n    X_nuevos['Post_frequency'] = [post.value]\n    # Recodificamos\n    X_nuevos['Stage_fear'] = X_nuevos['Stage_fear'].replace({'Yes': 1, 'No': 0})\n    X_nuevos['Drained_after_socializing'] = X_nuevos['Drained_after_socializing'].replace({'Yes': 1, 'No': 0})\n    X_nuevos_completo = col_transform.transform(X_nuevos)\n    y_pred = modelo.predict(X_nuevos_completo)[0]\n    if y_pred == 1:\n        resultado.value = 'Tienes personalidad Extrovertida'\n    else:\n        resultado.value = 'Tienes personalidad Introvertida'\n\n# Empieza la actividad de la app\n_pn__state._cell_outputs['042e74ab'].append((predecir.on_click(calculadora)))\nfor _cell__out in _CELL__DISPLAY:\n    _pn__state._cell_outputs['042e74ab'].append(_cell__out)\n_CELL__DISPLAY.clear()\n_fig__out = _get__figure()\nif _fig__out:\n    _pn__state._cell_outputs['042e74ab'].append(_fig__out)\n\ncalculadora = pn.WidgetBox(alone, panic, social_events, outside, drained, friends, post, predecir, resultado)\n\ntemplate = pn.template.FastListTemplate(\n    title="Calculadora de Personalidades",\n    sidebar=[pn.pane.Markdown("# Personalidades"),\n             pn.pane.Markdown("### Esta app predice si una persona es Introvertida o Extrovertida a partir de sus h\xe1bitos: tiempo a solas, miedo esc\xe9nico, asistencia a eventos sociales, salidas, agotamiento social, c\xedrculo de amigos y frecuencia de publicaciones.")] +\n            ([pn.pane.JPG(_imagen)] if _imagen is not None else []),\n)\ntemplate.main.append(calculadora)\n_pn__state._cell_outputs['c3c82616'].append((template.servable()))\nfor _cell__out in _CELL__DISPLAY:\n    _pn__state._cell_outputs['c3c82616'].append(_cell__out)\n_CELL__DISPLAY.clear()\n_fig__out = _get__figure()\nif _fig__out:\n    _pn__state._cell_outputs['c3c82616'].append(_fig__out)\n\n\nawait write_doc()`)
    self.postMessage({
      type: 'render',
      docs_json: docs_json,
      render_items: render_items,
      root_ids: root_ids
    })
  } catch(e) {
    const traceback = `${e}`
    const tblines = traceback.split('\n')
    self.postMessage({
      type: 'status',
      msg: tblines[tblines.length-2]
    });
    throw e
  }
}

self.onmessage = async (event) => {
  const msg = event.data
  if (msg.type === 'rendered') {
    self.pyodide.runPythonAsync(`
    from panel.io.state import state
    from panel.io.pyodide import _link_docs_worker

    _link_docs_worker(state.curdoc, sendPatch, setter='js')
    `)
  } else if (msg.type === 'patch') {
    self.pyodide.globals.set('patch', msg.patch)
    self.pyodide.runPythonAsync(`
    from panel.io.pyodide import _convert_json_patch
    state.curdoc.apply_json_patch(_convert_json_patch(patch), setter='js')
    `)
    self.postMessage({type: 'idle'})
  } else if (msg.type === 'location') {
    self.pyodide.globals.set('location', msg.location)
    self.pyodide.runPythonAsync(`
    import json
    from panel.io.state import state
    from panel.util import edit_readonly
    if state.location:
        loc_data = json.loads(location)
        with edit_readonly(state.location):
            state.location.param.update({
                k: v for k, v in loc_data.items() if k in state.location.param
            })
    `)
  }
}

startApplication()