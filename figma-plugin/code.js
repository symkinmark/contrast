// Contrast — Colour Accessibility · Figma plugin (main thread)
// Bridges the web-app UI to the Figma document.

figma.showUI(__html__, { width: 1040, height: 800, themeColors: true });

function chan(n) {
  return Math.round(Math.max(0, Math.min(1, n)) * 255)
    .toString(16).padStart(2, "0");
}
function rgbToHex(c) {
  return ("#" + chan(c.r) + chan(c.g) + chan(c.b)).toUpperCase();
}
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(function (x) { return x + x; }).join("");
  return {
    r: parseInt(hex.slice(0, 2), 16) / 255,
    g: parseInt(hex.slice(2, 4), 16) / 255,
    b: parseInt(hex.slice(4, 6), 16) / 255
  };
}

// Walk nodes and collect unique solid fill + stroke colours, in document order.
function collectColors(nodes) {
  var out = [];
  var seen = {};
  function add(hex) { if (!seen[hex]) { seen[hex] = 1; out.push(hex); } }
  function paints(list) {
    if (!Array.isArray(list)) return;
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      if (p && p.type === "SOLID" && p.visible !== false) add(rgbToHex(p.color));
    }
  }
  function walk(node) {
    if ("fills" in node) paints(node.fills);
    if ("strokes" in node) paints(node.strokes);
    if ("children" in node) for (var i = 0; i < node.children.length; i++) walk(node.children[i]);
  }
  for (var i = 0; i < nodes.length; i++) walk(nodes[i]);
  return out;
}

figma.ui.onmessage = function (msg) {
  if (msg.type === "pull") {
    var sel = figma.currentPage.selection;
    var nodes = sel.length ? sel : figma.currentPage.children;
    var colors = collectColors(nodes).slice(0, 10);
    figma.ui.postMessage({ type: "colors", colors: colors });
    figma.notify(
      colors.length
        ? "Pulled " + colors.length + " colour" + (colors.length > 1 ? "s" : "") +
            (sel.length ? " from selection." : " from this page.")
        : "No solid colours found — select some layers and try again."
    );
    return;
  }

  if (msg.type === "push") {
    pushPalette(msg.colors || []);
    return;
  }

  if (msg.type === "close") figma.closePlugin();
};

function pushPalette(colors) {
  if (!colors.length) { figma.notify("Add some colours first."); return; }
  figma.loadFontAsync({ family: "Inter", style: "Medium" }).then(function () {
    var frame = figma.createFrame();
    frame.name = "Contrast palette";
    frame.layoutMode = "HORIZONTAL";
    frame.itemSpacing = 16;
    frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "AUTO";
    frame.cornerRadius = 16;
    frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

    colors.forEach(function (hex) {
      var col = hexToRgb(hex);
      var cell = figma.createFrame();
      cell.layoutMode = "VERTICAL";
      cell.itemSpacing = 8;
      cell.primaryAxisSizingMode = "AUTO";
      cell.counterAxisSizingMode = "AUTO";
      cell.fills = [];

      var sw = figma.createRectangle();
      sw.resize(128, 128);
      sw.cornerRadius = 12;
      sw.fills = [{ type: "SOLID", color: col }];
      sw.name = hex;

      var label = figma.createText();
      label.fontName = { family: "Inter", style: "Medium" };
      label.characters = hex;
      label.fontSize = 14;

      cell.appendChild(sw);
      cell.appendChild(label);
      frame.appendChild(cell);

      // also register a reusable paint style
      try {
        var style = figma.createPaintStyle();
        style.name = "Contrast/" + hex;
        style.paints = [{ type: "SOLID", color: col }];
      } catch (e) {}
    });

    figma.currentPage.appendChild(frame);
    frame.x = Math.round(figma.viewport.center.x - frame.width / 2);
    frame.y = Math.round(figma.viewport.center.y - frame.height / 2);
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    figma.notify("Added palette + " + colors.length + " colour styles to the canvas.");
  });
}
