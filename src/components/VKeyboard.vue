<template>
    <div v-if="true || virtualKeyboard" ref="keyboard" class="virtualKeyboard">
        <div @mousemove="moveKeyboard($event)" @mousedown="startMoveKeyboard()" @mouseup="stopMoveKeyboard()" class="virtualKeyboardHeader">
            <div>English</div>
            <div>
            <span @click="closeKeyboard()" class="material-icons clickable">
                close
            </span>
            </div>
        </div>
        <div class="keysRow">
            <div @click="inputWords += isShift ?
            '~'
            :
            '`'; reactiveTranslate()" class="key">{{
            isShift ?
            '~'
            :
            '`'
            }}</div>
            <div @click="setInputWords(isShift ?
            '!'
            :
            '1'); reactiveTranslate()" class="key">{{
            isShift ?
            '!'
            :
            '1'
            }}</div>
            <div @click="inputWords += isShift ?
            '@'
            :
            '2'; reactiveTranslate()" class="key">{{
            isShift ?
            '@'
            :
            '2'
            }}</div>
            <div @click="inputWords += isShift ?
            '#'
            :
            '3'; reactiveTranslate()" class="key">{{
            isShift ?
            '#'
            :
            '3'
            }}</div>
            <div @click="inputWords += isShift ?
            '$'
            :
            '4'; reactiveTranslate()" class="key">{{
            isShift ?
            '$'
            :
            '4'
            }}</div>
            <div @click="inputWords += isShift ?
            '%'
            :
            '5'; reactiveTranslate()" class="key">{{
            isShift ?
            '%'
            :
            '5'
            }}</div>
            <div @click="inputWords += isShift ?
            '^'
            :
            '6'; reactiveTranslate()" class="key">{{
            isShift ?
            '^'
            :
            '6'
            }}</div>
            <div @click="inputWords += isShift ?
            '&'
            :
            '7'; reactiveTranslate()" class="key">{{
            isShift ?
            '&'
            :
            '7'
            }}</div>
            <div @click="inputWords += isShift ?
            '*'
            :
            '8'; reactiveTranslate()" class="key">{{
            isShift ?
            '*'
            :
            '8'
            }}</div>
            <div @click="inputWords += isShift ?
            '('
            :
            '9'; reactiveTranslate()" class="key">{{
            isShift ?
            '('
            :
            '9'
            }}</div>
            <div @click="inputWords += isShift ?
            ')'
            :
            '0'; reactiveTranslate()" class="key">{{
            isShift ?
            ')'
            :
            '0'
            }}</div>
            <div @click="inputWords += isShift ?
            '_'
            :
            '-'; reactiveTranslate()" class="key">{{
            isShift ?
            '_'
            :
            '-'
            }}</div>
            <div @click="inputWords += isShift ?
            '+'
            :
            '='; reactiveTranslate()" class="key">{{
            isShift ?
            '+'
            :
            '='
            }}</div>
            <div @click="inputWords.length >= 1 ? inputWords = inputWords.substring(0, inputWords.length - 1) : inputWords = ''" class="backSpaceKey key">
            <span class="material-icons">
                backspace
            </span>
            </div>
        </div>
        <div class="keysRow">
            <div @click="inputWords += 'q'; reactiveTranslate();" class="key">q</div>
            <div @click="inputWords += 'w'; reactiveTranslate();" class="key">w</div>
            <div @click="inputWords += 'e'; reactiveTranslate();" class="key">e</div>
            <div @click="inputWords += 'r'; reactiveTranslate();" class="key">r</div>
            <div @click="inputWords += 't'; reactiveTranslate();" class="key">t</div>
            <div @click="inputWords += 'y'; reactiveTranslate()" class="key">y</div>
            <div @click="inputWords += 'u'; reactiveTranslate()" class="key">u</div>
            <div @click="inputWords += 'i'; reactiveTranslate()" class="key">i</div>
            <div @click="inputWords += 'o'; reactiveTranslate()" class="key">o</div>
            <div @click="inputWords += 'p'; reactiveTranslate()" class="key">p</div>
            <div @click="inputWords += isShift ?
            '{'
            :
            '['; reactiveTranslate()" class="key">{{
            isShift ?
            '{'
            :
            '['
            }}</div>
            <div @click="inputWords += isShift ?
            '}'
            :
            ']'; reactiveTranslate()" class="key">{{
            isShift ?
            '}'
            :
            ']'
            }}</div>
            <div @click="inputWords += isShift ?
            '|'
            :
            '\\'; reactiveTranslate()" class="key">{{
            isShift ?
            '|'
            :
            '\\'
            }}</div>
        </div>
        <div class="keysRow">
            <div @click="homePress()" :class="{ keyHold: isHome, homeKey: true, key: true }">
            <span class="material-icons">
                home
            </span>
            </div>
            <div @click="inputWords += 'a'; reactiveTranslate()" class="key">a</div>
            <div @click="inputWords += 's'; reactiveTranslate()" class="key">s</div>
            <div @click="inputWords += 'd'; reactiveTranslate()" class="key">d</div>
            <div @click="inputWords += 'f'; reactiveTranslate()" class="key">f</div>
            <div @click="inputWords += 'g'; reactiveTranslate()" class="key">g</div>
            <div @click="inputWords += 'h'; reactiveTranslate()" class="key">h</div>
            <div @click="inputWords += 'j'; reactiveTranslate()" class="key">j</div>
            <div @click="inputWords += 'k'; reactiveTranslate()" class="key">k</div>
            <div @click="inputWords += 'l'; reactiveTranslate()" class="key">l</div>
            <div @click="inputWords += isShift ?
            ':'
            :
            ';'; reactiveTranslate()" class="key">{{
            isShift ?
            ':'
            :
            ';'
            }}</div>
            <div @click="inputWords += (isShift ?
            '\u0022'
            :
            '\''); reactiveTranslate()" class="key">{{
            isShift ?
            '\"'
            :
            '\''
            }}</div>
        </div>
        <div class="keysRow">
            <div @click="shiftPress()" :class="{ shiftKey: true, key: true, keyHold: isShift }">
            <span class="material-icons">
                file_upload
            </span>
            </div>
            <div @click="inputWords += 'z'; reactiveTranslate()" class="key">z</div>
            <div @click="inputWords += 'x'; reactiveTranslate()" class="key">x</div>
            <div @click="inputWords += 'c'; reactiveTranslate()" class="key">c</div>
            <div @click="inputWords += 'v'; reactiveTranslate()" class="key">v</div>
            <div @click="inputWords += 'b'; reactiveTranslate()" class="key">b</div>
            <div @click="inputWords += 'n'; reactiveTranslate()" class="key">n</div>
            <div @click="inputWords += 'm'; reactiveTranslate()" class="key">m</div>
            <div @click="inputWords += isShift ?
            '<'
            :
            ','; reactiveTranslate()" class="key">{{
            isShift ?
            '\u003c'
            :
            ','
            }}</div>
            <div @click="inputWords += isShift ?
            '>'
            :
            '.'; reactiveTranslate()" class="key">{{
            isShift ?
            '>'
            :
            '.'
            }}</div>
            <div @click="inputWords += isShift ?
            '?'
            :
            '/'; reactiveTranslate()" class="key">{{
            isShift ?
            '?'
            :
            '/'
            }}</div>
            <div @click="shiftPress()" :class="{ shiftKey: true, key: true, keyHold: isShift }">
            <span class="material-icons">
                file_upload
            </span>
            </div>
        </div>
        <div class="keysRow">
            <div class="key ctrlAltKey">Ctrl + Alt</div>
            <div @click="inputWords += ' '" class="key spaceKey"></div>
            <div class="key ctrlAltKey">Ctrl + Alt</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VKeyboard',
    data() {
        return {
            // virtualKeyboard: false,
            isHome: false,
            keyboardIsMove: false,
            isShift: false,
            // inputWords: ''
        }
    },
    computed: {
        async inputWords() {
            console.log(`inputWords: ${this.inputWords}`)
            return this.inputWords
        }
    },
    emits: [
        'closeKeyboard'
    ],
    methods: {
        setInputWords(char) {
            console.log(`inputWords: ${this.inputWords} char: ${char}`)
        },
        closeKeyboard(){
           this.$emit('closeKeyboard')
        },
        reactiveTranslate() {

        },
        moveKeyboard(event){
            if(this.keyboardIsMove) {
                this.$refs.keyboard.style.top
                this.$refs.keyboard.style = `
                    position: absolute;
                    top: ${event.y - 35}px;
                    left: ${event.x - 35}px;
                ` 
            }      
        },
        startMoveKeyboard(){
            if(!this.keyboardIsMove) {
                this.keyboardIsMove = true
            }
        },
        stopMoveKeyboard(){
            this.keyboardIsMove = false
        },
    }
}
</script>
<style scoped>
    .virtualKeyboard {
    box-sizing: border-box;
    padding: 15px;
    position: absolute;
    top: 250px;
    left: 0px;
    width: 700px;
    height: 300px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(175, 175, 175);
    border-radius: 8px;
  }

  .keysRow {
    display: flex;
    justify-content: center;
  }

  .key {
    user-select: none;
    cursor: pointer;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(240, 240, 240);
    width: 35px;
    height: 35px;
    border: 1px solid rgb(175, 175, 175);
    border-radius: 8px;
  }

  .key:hover {
    box-shadow: 0px 0px 5px rgb(200, 200, 200);
  }

  .key:active {
    box-shadow: inset 0px 0px 5px rgb(200, 200, 200);
  }

  .spaceKey {
    width: 50%;
  }

  .shiftKey {
    width: 15%;
  }

  .ctrlAltKey {
    width: 15%;
  }

  .virtualKeyboardHeader {
    user-select: none;
    cursor: move;
    display: flex;
    justify-content: space-between;
  }
</style>