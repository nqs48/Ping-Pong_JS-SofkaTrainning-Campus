export function hit(a, b) {
  let hit = false;

  if (b.x + b.width >= a.x && b.x < a.x + a.width) {
    if (b.y + b.height >= a.y && b.y < a.y + a.height) hit = true;
  }
  if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
    if (b.y <= a.y && b.y + b.height >= a.y + a.height) hit = true;
  }
  if (a.x <= b.x && a.x + a.width >= b.x + b.height) {
    if (a.y <= b.y && a.y + a.height >= b.y + b.height) hit = true;
  }
  return hit;
}

export function draw(ctx, element) {
  switch (element.kind) {
    case "rectangle":
      ctx.fillRect(element.x, element.y, element.width, element.height);
      break;
    case "circle":
      ctx.beginPath();
      ctx.arc(element.x, element.y, element.radius, 0, 7);
      ctx.fill();
      ctx.closePath();
      break;
  }
}
