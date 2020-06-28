var listComponents = [];
var indexComponent = 0;

function component(index, width, height, lineWidth, lineColor, color, x, y, text = "") {
    this.index = index;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.text = text;

    this.updCtx = function() {
        ctx = area.context;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.stroke();
        
        if (this.text !== "") {
            ctx.font ="30px Arial";
            ctx.textAlign = "center";
            ctx.textBaseLine = "middle";
            ctx.fillStyle = "#000000";
            ctx.fillText(this.text, this.x + (this.width / 2), this.y + this.height);
        }

    };

    this.updPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    };

    this.update = function() {
        this.updCtx();
        this.updPos();
    };
}
