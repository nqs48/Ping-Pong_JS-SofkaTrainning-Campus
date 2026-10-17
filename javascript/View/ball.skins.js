const TAU = Math.PI * 2;

function circle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.closePath();
}

function polygon(ctx, x, y, r, sides, rotation) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    let a = rotation + (i * TAU) / sides;
    ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
  }
  ctx.closePath();
}

function shaded(ctx, x, y, r, light, dark) {
  //radial gradient that gives the ball some volume
  let g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
  g.addColorStop(0, light);
  g.addColorStop(1, dark);
  return g;
}

function hash(i, j, k) {
  let h = (i * 374761393 + j * 668265263 + k * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}

const DISCO_TILES = ["#ffffff", "#d1f7ff", "#b8bccc", "#9aa0b5", "#6c7088", "#ff2a6d", "#05d9e8", "#f9f871"];

export const SKINS = {
  classic: {
    label: "Classic",
    glow: "#f9f871",
    shape: "square",
    draw(ctx, x, y, r) {
      ctx.fillStyle = "#f9f871";
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    },
  },

  soccer: {
    label: "Soccer",
    glow: "#ffffff",
    draw(ctx, x, y, r, angle) {
      ctx.fillStyle = shaded(ctx, x, y, r, "#ffffff", "#c9c9d6");
      circle(ctx, x, y, r);
      ctx.fill();

      ctx.save();
      circle(ctx, x, y, r);
      ctx.clip();
      ctx.fillStyle = ctx.strokeStyle = "#111";
      ctx.lineWidth = Math.max(1, r * 0.08);
      polygon(ctx, x, y, r * 0.38, 5, angle);
      ctx.fill();
      for (let i = 0; i < 5; i++) {
        let a = angle + (i * TAU) / 5;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a) * r * 0.38, y + Math.sin(a) * r * 0.38);
        ctx.lineTo(x + Math.cos(a) * r * 0.75, y + Math.sin(a) * r * 0.75);
        ctx.stroke();
        polygon(ctx, x + Math.cos(a) * r * 1.05, y + Math.sin(a) * r * 1.05, r * 0.32, 5, a + Math.PI);
        ctx.fill();
      }
      ctx.restore();
    },
  },

  tennis: {
    label: "Tennis",
    glow: "#d4ff3a",
    draw(ctx, x, y, r, angle) {
      ctx.fillStyle = shaded(ctx, x, y, r, "#f3ff8a", "#9ccc1c");
      circle(ctx, x, y, r);
      ctx.fill();

      ctx.save();
      circle(ctx, x, y, r);
      ctx.clip();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = Math.max(1, r * 0.14);
      ctx.beginPath();
      ctx.arc(-r * 1.3, 0, r, -1.2, 1.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r * 1.3, 0, r, Math.PI - 1.2, Math.PI + 1.2);
      ctx.stroke();
      ctx.restore();
    },
  },

  basket: {
    label: "Basket",
    glow: "#ff8a1e",
    draw(ctx, x, y, r, angle) {
      ctx.fillStyle = shaded(ctx, x, y, r, "#ffb35c", "#d9590b");
      circle(ctx, x, y, r);
      ctx.fill();

      ctx.save();
      circle(ctx, x, y, r);
      ctx.clip();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = "#1a0a00";
      ctx.lineWidth = Math.max(1, r * 0.09);
      ctx.beginPath();
      ctx.moveTo(-r, 0);
      ctx.lineTo(r, 0);
      ctx.moveTo(0, -r);
      ctx.lineTo(0, r);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-r * 1.25, 0, r * 0.9, -1.2, 1.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r * 1.25, 0, r * 0.9, Math.PI - 1.2, Math.PI + 1.2);
      ctx.stroke();
      ctx.restore();
    },
  },

  disco: {
    label: "Disco",
    glow: (t) => `hsl(${(t / 8) % 360}, 100%, 65%)`,
    draw(ctx, x, y, r, angle, t) {
      ctx.save();
      circle(ctx, x, y, r);
      ctx.clip();

      //mirror tiles that sparkle and scroll with the spin
      let tile = Math.max(3, r / 3);
      let shift = angle * r;
      let first = Math.floor(shift / tile);
      let offset = shift - first * tile;
      let frame = Math.floor(t / 140);
      for (let i = -1; i * tile < r * 2 + tile; i++) {
        for (let j = 0; j * tile < r * 2; j++) {
          ctx.fillStyle = DISCO_TILES[hash(i + first, j, frame) % DISCO_TILES.length];
          ctx.fillRect(x - r + i * tile - offset, y - r + j * tile, tile, tile);
        }
      }

      ctx.strokeStyle = "rgba(20, 20, 35, 0.8)";
      ctx.lineWidth = Math.max(0.5, r * 0.05);
      ctx.beginPath();
      for (let i = -1; i * tile < r * 2 + tile; i++) {
        let lx = x - r + i * tile - offset;
        ctx.moveTo(lx, y - r);
        ctx.lineTo(lx, y + r);
      }
      for (let j = 0; j * tile < r * 2; j++) {
        ctx.moveTo(x - r, y - r + j * tile);
        ctx.lineTo(x + r, y - r + j * tile);
      }
      ctx.stroke();

      let shade = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.2, x, y, r);
      shade.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      shade.addColorStop(1, "rgba(0, 0, 0, 0.55)");
      ctx.fillStyle = shade;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.restore();
    },
  },

  fire: {
    label: "Fire",
    glow: "#ff7a18",
    trail: "255, 122, 24",
    draw(ctx, x, y, r, angle, t) {
      let size = r * (1 + Math.sin(t / 60) * 0.06);
      let g = ctx.createRadialGradient(x, y, 0, x, y, size);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.3, "#fff27a");
      g.addColorStop(0.65, "#ff9a3c");
      g.addColorStop(1, "#ff2a6d");
      ctx.fillStyle = g;
      circle(ctx, x, y, size);
      ctx.fill();
    },
  },
};

export function paint_skin(ctx, skin, x, y, r, angle, t, blur = Math.max(10, r * 1.5)) {
  let color = typeof skin.glow === "function" ? skin.glow(t) : skin.glow;

  //neon glow behind the ball, then the details without blur
  ctx.save();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  if (skin.shape === "square") ctx.fillRect(x - r, y - r, r * 2, r * 2);
  else {
    circle(ctx, x, y, r);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  skin.draw(ctx, x, y, r, angle, t);
  ctx.restore();
}

export function paint_trail(ctx, skin, trail, r) {
  if (!skin.trail) return;
  for (let i = 0; i < trail.length; i++) {
    let k = (i + 1) / trail.length;
    ctx.fillStyle = `rgba(${skin.trail}, ${k * 0.45})`;
    circle(ctx, trail[i].x, trail[i].y, r * k);
    ctx.fill();
  }
}
