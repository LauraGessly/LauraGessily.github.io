class Obj {
  frame = 1;
  timer = 0;

  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  desenha() {
    var img = new Image();
    img.src = this.image;
    pincel.drawImage(img, this.x, this.y, this.width, this.height);
  }

  animation(name) {
    this.timer += 1;
    if (this.timer > 8) {
      this.timer = 0;
      this.frame += 1;
    }
    if (this.frame > 4) {
      this.frame = 1;
    }
    this.image = "IMG/" + name + this.frame + ".png";
  }

  collide(obj) {
    return (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    );
  }
}

class Abelha extends Obj {
  dir = 0;
  move() {
    this.x += this.dir;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > 900) this.x = 900 - this.width;
  }
}

class Aranha extends Obj {
  move(speed = 6) {
    this.y += speed;
    if (this.y > 720) {
      this.y = -100;
      this.x = Math.random() * (900 - this.width);
    }
  }
}

class BG extends Obj {
  move(speed, limit, pos) {
    this.y += speed;
    if (this.y >= limit) {
      this.y = pos;
    }
  }
}

class Flower extends Obj {
  move(speed = 5) {
    this.y += speed;
    if (this.y > 720) {
      this.y = -Math.random() * 400 - 60;
      this.x = Math.random() * (900 - this.width);
    }
  }
}
