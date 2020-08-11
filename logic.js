let turn = 0; //ターンの状況を持っている変数 0が初期状態,1が黒,-1が白
let judge = "false"; //勝敗の判定 (問題6で使います)
//0が何も置いていないマス,1が黒,-1が白
let state = new Array(8); //盤面の状況を持っている配列

module.exports = class logic {
  //クラスは習っていないので，無視でOK
  //通信が繋がった時にする処理
  first() {
    for (let i = 0; i < 8; i++) {
      state[i] = [0, 0, 0, 0, 0, 0, 0, 0]; //stateに8つの要素を持たせて二次元配列化
    }

    //問題1 : オセロの初期状態を作ってみよう
    //ヒント　 state[a][b] = 1  でx軸にa,y軸にbの場所に黒の駒を置いている
    //------------------------------------------------------

    //------------------------------------------------------
    turn = 1;
    return state;
  }
  //盤面をクリックした時にする処理
  click(x, y) {
    if (state[x][y] == 0) {
      //クリックしたところが何も無い所で
      if (check(x, y) > 0) {
        //function check()を呼び出して戻り値によってひっくり返せるか
        turn_chenge(); //function turn_change()を呼び出してる
      }
    }
    let ret = [state, turn, judge];
    return ret;
  }
};

function turn_chenge() {
  // 黒を1 白を-1 何も無いところを0
  //問題2　ターンを変更してみよう　黒のターンなら白へ　白のターンなら黒へ
  //-----------------------------------------------------

  //-----------------------------------------------------
  let backup = new Array(8); //バックアップを作成
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
          state[i][ii] = backup[i][ii]; //条件に当てはまらなければバックアップ復元
        }
      }
    }
  }
  //問題5 自分のターンをスキップし，相手のターンにする
  //---------------------------

  //---------------------------
}

function check(x, y) {
  let count = 0; //ひっくり返せる数
  //問題3  8方向を見にいく関数を使ってみよう
  // ヒント　revを使う count = count + rev(x, y, 0, -1);　これが上を見ている
  //-------------------------

  //-------------------------
  return count;
}

function rev(x, y, add_x, add_y) {
  //backupを作っておく
  let backup = new Array(8);
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[x][y] = state[x][y];
    }
  }
  let reverse_num = 0; //延長線上にある敵の駒
  let flag = 0; //ひっくり返せるかどうかを0 or 1で判断
  let all_x = x;
  let all_y = y;

  while (true) {
    all_x = all_x + add_x;
    all_y = all_y + add_y;
    //問題4　all_xとall_yがどんな状態になったらループ処理を抜けさせたい？
    //ある条件の時だけflagに1を持たせる -> コマがx,yに置けるか判定をここでしている
    //ヒント 6パターンあります! うまく書けば3パターンになります．
    //----------------------------------------------
    // if(~~~~){
    //   break
    // }
    //  ある条件下の時にひっくり返せるflagを追加
    //  if (〜〜〜〜〜) {
    //   flag = 1;
    //   break;
    // }
    //----------------------------------------------

    state[all_x][all_y] = state[all_x][all_y] * -1;
    reverse_num++;
  }
  if (reverse_num > 0) {
    if (flag == 0) {
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

//問題 6 自分の駒と敵の駒の合計が64になったら終了 (応用)
