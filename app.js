function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener(`DOMContentLoaded`, function () {
    const board = document.querySelector(`.board`);

    var cursor = document.createElement(`cursor`);
    cursor.classList.add(`cursor`);
    board.appendChild(cursor);

    var scoreEl = document.createElement(`div`);
    var score = 0;
    scoreEl.classList.add(`score`);
    board.appendChild(scoreEl);
    scoreEl.innerText = score;


    setInterval(function () {
        const zombie = document.createElement(`div`);
        zombie.classList.add(`zombie`);

        const posBottom = randomBetween(10, 170);
        zombie.style.bottom = posBottom + `px`;

        var span = document.createElement(`span`);
        zombie.appendChild(span);
        board.appendChild(zombie);

        var time = randomBetween(4, 10)
        zombie.style.animationDuration = `0.5s, ` + time + `s`;

        var zIndex = 170 - posBottom;
        zombie.style.zIndex = zIndex;

        var scale = 0.8 + (Math.random() / 4);
        if (posBottom <= 40) {
            scale += 0.2;
        } else if (posBottom > 40 && posBottom <= 80) {

        } else if (posBottom > 80 && posBottom <= 120) {
            scale -= 0.1;
            zombie.style.filter = `blur(1px) brightness(.95)`;
        } else {
            scale -= 0.4

            zombie.style.filter = `blur(2px) brightness(.8)`;
        }


        zombie.style.transform = `scale(` + scale + `)`;

        zombie.addEventListener(`animationend`, function (e) {
            if (e.animationName === `zombieMove`) {
                this.remove();
            }
        });
        zombie.live = 3;
        zombie.addEventListener ('click', function(){
            this.live--;
            if (this.live<1){
                this.remove();
                score++;
                scoreEl.innerText = score;
            }else{
                this.querySelector(`span`).style.width = this.live * 20 +`px`;
            }
        })


    }, 500);
    board.addEventListener(`mousemove`, function (e){
        cursor.style.left = e.pageX - 68 + `px`;
        cursor.style.top = e.pageY - 68 + `px`;
    })
})