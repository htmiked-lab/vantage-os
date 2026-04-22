(() => {
  const STORAGE_KEY = "bdc_os_questionnaire_v1";
  const OPEN_KEY = "bdc_os_questionnaire_open_v1";
  const modulesEl = document.getElementById("modules");
  const progressBar = document.getElementById("progressBar");
  const progressCount = document.getElementById("progressCount");
  const progressTotal = document.getElementById("progressTotal");
  const saveIndicator = document.getElementById("saveIndicator");

  // ── State ──────────────────────────────────────────────
  let answers = loadAnswers();
  let openState = loadOpenState();

  function loadAnswers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch { return {}; }
  }
  function saveAnswers() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }
  function loadOpenState() {
    try { return JSON.parse(localStorage.getItem(OPEN_KEY) || "{}"); }
    catch { return {}; }
  }
  function saveOpenState() {
    localStorage.setItem(OPEN_KEY, JSON.stringify(openState));
  }

  // ── Render ─────────────────────────────────────────────
  function renderModules() {
    modulesEl.innerHTML = "";
    let totalQ = 0;

    window.MODULES.forEach((mod, i) => {
      totalQ += mod.questions.length;
      const wrap = document.createElement("section");
      wrap.className = "module";
      wrap.dataset.id = mod.id;
      // Default: open first, closed rest — unless stored otherwise
      const isOpen = openState[mod.id] !== undefined ? openState[mod.id] : i === 0;
      if (isOpen) wrap.classList.add("open");

      const head = document.createElement("div");
      head.className = "module-head";
      head.innerHTML = `
        <div class="mod-num">M${String(i + 1).padStart(2, "0")}</div>
        <div class="mod-title">${escapeHtml(mod.title)}<div style="font-size:11px;color:var(--text-dim);font-family:var(--font-body);letter-spacing:0.01em;margin-top:4px;font-weight:400;">${escapeHtml(mod.blurb || "")}</div></div>
        <div class="mod-progress" data-mod-progress="${mod.id}">— / ${mod.questions.length}</div>
        <div class="chev">▸</div>
      `;
      head.addEventListener("click", () => {
        wrap.classList.toggle("open");
        openState[mod.id] = wrap.classList.contains("open");
        saveOpenState();
      });
      wrap.appendChild(head);

      const body = document.createElement("div");
      body.className = "module-body";

      mod.questions.forEach((q, qi) => {
        const qWrap = document.createElement("div");
        qWrap.className = "q";
        qWrap.innerHTML = `
          <p class="q-prompt"><span style="color:var(--magenta);font-family:var(--font-mono);font-size:11px;margin-right:6px;">Q${i + 1}.${qi + 1}</span>${escapeHtml(q.prompt)}</p>
          ${q.hint ? `<div class="q-hint">${escapeHtml(q.hint)}</div>` : ""}
          <textarea data-qid="${q.id}" placeholder="Dictate or type. Autosaves as you go."></textarea>
          <div class="q-meta">
            <span data-wc="${q.id}">0 words</span>
            <span data-saved="${q.id}">—</span>
          </div>
        `;
        body.appendChild(qWrap);

        const ta = qWrap.querySelector("textarea");
        const val = answers[q.id] || "";
        ta.value = val;
        if (val.trim()) ta.classList.add("filled");
        updateWordCount(q.id, val);

        ta.addEventListener("input", () => onInput(q.id, ta));
      });

      wrap.appendChild(body);
      modulesEl.appendChild(wrap);
    });

    progressTotal.textContent = totalQ;
    updateAllProgress();
  }

  // ── Save / indicators ──────────────────────────────────
  let saveDebounce;
  let dirty = false;
  function onInput(qid, ta) {
    answers[qid] = ta.value;
    if (ta.value.trim()) ta.classList.add("filled");
    else ta.classList.remove("filled");
    updateWordCount(qid, ta.value);
    markDirty();
    clearTimeout(saveDebounce);
    saveDebounce = setTimeout(() => {
      saveAnswers();
      markSaved(qid);
      updateAllProgress();
    }, 180);
  }

  function markDirty() {
    dirty = true;
    saveIndicator.textContent = "saving…";
    saveIndicator.className = "save-indicator dirty";
  }
  function markSaved(qid) {
    dirty = false;
    saveIndicator.textContent = "✓ saved";
    saveIndicator.className = "save-indicator saved";
    if (qid) {
      const s = document.querySelector(`[data-saved="${qid}"]`);
      if (s) {
        s.textContent = "✓ " + new Date().toLocaleTimeString();
        setTimeout(() => { if (s) s.textContent = "saved"; }, 2000);
      }
    }
  }

  function updateWordCount(qid, text) {
    const el = document.querySelector(`[data-wc="${qid}"]`);
    if (!el) return;
    const w = (text.trim().match(/\S+/g) || []).length;
    el.textContent = w + (w === 1 ? " word" : " words");
  }

  function updateAllProgress() {
    let answered = 0, total = 0;
    window.MODULES.forEach(mod => {
      let modAnswered = 0;
      mod.questions.forEach(q => {
        total++;
        if ((answers[q.id] || "").trim().length > 0) {
          answered++;
          modAnswered++;
        }
      });
      const modEl = document.querySelector(`[data-mod-progress="${mod.id}"]`);
      if (modEl) {
        modEl.innerHTML = `<span class="${modAnswered === mod.questions.length ? "done" : ""}">${modAnswered}</span> / ${mod.questions.length}`;
      }
    });
    progressCount.textContent = answered;
    const pct = total ? (answered / total) * 100 : 0;
    progressBar.style.width = pct.toFixed(1) + "%";
  }

  // ── Controls ───────────────────────────────────────────
  document.getElementById("expandAll").addEventListener("click", () => {
    document.querySelectorAll(".module").forEach(m => {
      m.classList.add("open");
      openState[m.dataset.id] = true;
    });
    saveOpenState();
  });
  document.getElementById("collapseAll").addEventListener("click", () => {
    document.querySelectorAll(".module").forEach(m => {
      m.classList.remove("open");
      openState[m.dataset.id] = false;
    });
    saveOpenState();
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    const filled = Object.values(answers).filter(v => (v || "").trim()).length;
    const msg = filled > 0
      ? `This wipes ${filled} answered question(s) from local storage. Cannot be undone. Continue?`
      : "Nothing filled in yet. Clear anyway?";
    if (confirm(msg)) {
      answers = {};
      saveAnswers();
      renderModules();
    }
  });

  // ── Export ─────────────────────────────────────────────
  const modal = document.getElementById("modal");
  const mdOutput = document.getElementById("mdOutput");

  document.getElementById("exportBtn").addEventListener("click", () => {
    mdOutput.value = buildMarkdown();
    modal.classList.add("open");
  });
  document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });

  document.getElementById("copyMd").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(mdOutput.value);
      flashButton("copyMd", "Copied!");
    } catch {
      mdOutput.select();
      document.execCommand("copy");
      flashButton("copyMd", "Copied!");
    }
  });

  document.getElementById("downloadMd").addEventListener("click", () => {
    const blob = new Blob([mdOutput.value], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `bdc-sales-manager-os_${stamp}.md`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 100);
  });

  function flashButton(id, text) {
    const b = document.getElementById(id);
    const orig = b.textContent;
    b.textContent = text;
    setTimeout(() => { b.textContent = orig; }, 1400);
  }

  function buildMarkdown() {
    const now = new Date();
    const stamp = now.toISOString();
    let total = 0, answered = 0;
    window.MODULES.forEach(m => m.questions.forEach(q => {
      total++;
      if ((answers[q.id] || "").trim()) answered++;
    }));

    let md = "";
    md += "# BDC + Sales Manager OS\n";
    md += "\n";
    md += `_Knowledge extraction transcript — generated ${stamp}_\n`;
    md += `_${answered} of ${total} questions answered (${Math.round((answered / total) * 100)}%)_\n`;
    md += "\n";
    md += "> Raw dictation. Not edited. Intended as source material for (a) consulting proposal and (b) BDC Blueprint course.\n";
    md += "\n";
    md += "---\n\n";

    window.MODULES.forEach((mod, i) => {
      md += `## ${i + 1}. ${mod.title}\n`;
      if (mod.blurb) md += `_${mod.blurb}_\n`;
      md += "\n";
      mod.questions.forEach((q, qi) => {
        md += `### Q${i + 1}.${qi + 1} — ${q.prompt}\n`;
        if (q.hint) md += `> _Hint: ${q.hint}_\n`;
        md += "\n";
        const a = (answers[q.id] || "").trim();
        if (a) {
          md += a.split(/\n/).map(line => line.length ? line : "").join("\n") + "\n";
        } else {
          md += "_[unanswered]_\n";
        }
        md += "\n";
      });
      md += "\n";
    });

    return md;
  }

  // ── Util ───────────────────────────────────────────────
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Flush on unload
  window.addEventListener("beforeunload", (e) => {
    if (dirty) {
      saveAnswers();
    }
  });

  // Keyboard: Ctrl/Cmd+S triggers export
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      document.getElementById("exportBtn").click();
    }
    if (e.key === "Escape") modal.classList.remove("open");
  });

  // ── Boot ───────────────────────────────────────────────
  renderModules();
  markSaved();
})();
