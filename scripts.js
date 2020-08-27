const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

var ULTIMO_NIVEL = 50

swal(
    'Simon dice', 
    'Bienvenido a "Simon Dice:" trata de memorizar la secuencia de colores y repítela clickeando en el color correcto.',
    'info'
)
class Juego {
    constructor(){
        this.incializar = this.incializar.bind(this)
        this.incializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    incializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        btnEmpezar.classList.toggle('hide')
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4 ))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero){
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color){
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for(let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL +1)){
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego() {
        swal('Simon dice:', 'Felicitaciones, completaste todos los niveles!', 'success')
            .then (this.incializar)
    }

    perdioElJuego() {
        swal('Simon dice:', 'Lo siento, perdiste :(', 'error')
            .then (() => {
                this.eliminarEventosClick()
                this.incializar()
            })
    }
}

function empezarJuego() {
    window.juego = new Juego
}