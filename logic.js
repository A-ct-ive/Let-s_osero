//turn ... ターンの状況を持っている変数
//0が初期状態,1が黒,-1が白
let turn = 0;
//state ... 盤面の状況を持っている二次元配列
//0が何も置いていないマス,1が黒,-1が白
let state = new Array(8);
for (let i = 0; i < 8; i++) {
  state[i] = [0, 0, 0, 0, 0, 0, 0, 0];
}

module.exports = class logic {
  //クラスは習っていないので，無視でOK
  //通信が繋がった時にする処理
  first() {
    //問題1 : オセロの初期状態を作ってみよう
    //ヒント　 state[a][b] = 1  でx軸にa,y軸にbの場所に黒の駒を置いている
    //------------------------------------------------------

    //------------------------------------------------------
    //問題2 : ターンを黒にしよう
    //------------------------------------------------------

    //------------------------------------------------------
    return state;
  }
  //盤面をクリックした時にする処理
  click(x, y) {
    if (state[x][y] == 0) {
      //クリックしたところが何も無い所で
      if (check(x, y) > 0) {
        //check()75行目を呼び出して戻り値が0より大きい時
        turn_chenge(); //turn_change()41行目を呼び出してる
      }
    }
    let ret = [state, turn];
    return ret;
  }
};

function turn_chenge() {
  // 黒を1 白を-1 何も無いところを0
  //問題3　ターンを変更してみよう　黒のターンなら白へ　白のターンなら黒へ
  //-----------------------------------------------------

  //-----------------------------------------------------
  let backup = new Array(8);
  let check_count = 0;
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[x][y] = state[x][y];
    }
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      check_count = check_count + check(x, y);
      for (let i = 0; i < 8; i++) {
        for (let ii = 0; ii < 8; ii++) {
          state[i][ii] = backup[i][ii];
        }
      }
    }
  }
  if (check_count == 0) {
    if ((turn = -1)) {
      turn = turn * -1;
    } else if ((turn = 1)) {
      turn = turn * -1;
    }
  }
}

function check(x, y) {
  let count = 0; //ひっくり返せる数
  //問題4  8方向を見にいく関数を使ってみよう
  // ヒント　revを使う
  //-------------------------
  //count = count + rev(x, y, 0, -1);　これが上を見ている

  //-------------------------
  return count;
}

function rev(x, y, add_x, add_y) {
  let backup = new Array(8);
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[x][y] = state[x][y];
    }
  }
  let reverse_num = 0;
  let turn_flg = 0;
  let xx = x;
  let yy = y;

  while (true) {
    xx = xx + add_x;
    yy = yy + add_y;
    //問題5　xxとyyがどんな状態になったらループ処理を抜けさせたい？
    //ヒント 6パターンあります! うまく書けば3パターンになります．
    //----------------------------------------------
    // if(~~~~){
    //   break
    // }

    //  if (〜〜〜〜〜) {
    //   turn_flg = 1;
    //   break;
    // }
    //----------------------------------------------
    if (state[xx][yy] == 0) {
      break;
    }

    state[xx][yy] = state[xx][yy] * -1;
    reverse_num++;
  }
  if (reverse_num > 0) {
    if (turn_flg == 0) {
      for (let i = 0; i < 8; i++) {
        for (let ii = 0; ii < 8; ii++) {
          state[i][ii] = backup[i][ii];
          reverse_num = 0;
        }
      }
    } else {
      state[x][y] = turn;
    }
  }
  return reverse_num;
}
