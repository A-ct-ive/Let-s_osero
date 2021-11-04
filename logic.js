let turn = 0; //ターンの状況を持っている変数 0が初期状態,1が黒,-1が白
let state = new Array(8); //盤面の状況を持っている配列(まだ8個の配列)
for (let i = 0; i < 8; i++) {
  state[i] = new Array(8); //二次元配列化 (ここで8*8の配列)
}
module.exports = class logic {
  //通信が繋がった時orリロード時にする処理
  first() {
    console.log("通信スタート");
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        state[i][j] = 0;
      }
    }
  //オセロの初期状態

  state[3][3] = -1;
  state[3][4] = 1;
  state[4][3] = 1;
  state[4][4] = -1;

    turn = 1;
    return state;
  }
  //盤面をクリックした時にする処理
  click(x, y) {
    console.log("今のターン" + turn);
    console.log("クリックしたx軸:" + x);
    console.log("クリックしたy軸:" + y);
    if (state[y][x] == 0) {
      //クリックしたところが何も無い所で
      if (check(x, y) > 0) {
        //function check()を呼び出して戻り値によってひっくり返せるか
        //ターンを変更
        //-----------------------------------------------------
        turn = turn * -1;
        //-----------------------------------------------------

        skip(); //コマが置けなかったらスキップをする関数
      }
    }
    let ret = [state, turn, judge];
    return ret;
  }
};

function check(x, y) {
  //クリックしたマスが何個ひっくり返すことができるのか
  let count = 0; //ひっくり返せる数
  count = count + change(x, y, 0, -1);
  count = count + change(x, y, 1, -1);
  count = count + change(x, y, 1, 0);
  count = count + change(x, y, 1, 1);
  count = count + change(x, y, 0, 1);
  count = count + change(x, y, -1, 1);
  count = count + change(x, y, -1, 0);
  count = count + change(x, y, -1, -1);
  return count;
}

function change(x, y, add_x, add_y) {
  //backupを作っておく
  let backup = new Array(8);
  for (let i = 0; i < 8; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[y][x] = state[y][x];
    }
  }
  let reverse_num = 0; //延長線上にある敵の駒
  let flag = 0; //ひっくり返せるかどうかを0 or 1で判断
  let all_x = x; //クリックしたところのx軸
  let all_y = y; //クリックしたところのy軸

  while (true) {
    //whileはbreakされない限りループする
    //ここでは一方向ずつクリックしたマスの上,右上,右，右下，下,左下,左,左上を全て見に行く
    all_x = all_x + add_x;
    all_y = all_y + add_y;

    //次に見るマスのxが0より小さい,7より大きい,yが0より小さい,yが7より大きい時break
    if (all_x < 0 || all_x > 7 || all_y < 0 || all_y > 7) {
      break;
    }
  //何もひっくり返せない時に置けない
    if (state[all_x][all_y] == 0){
    break;
    }

    //次に見るマスが自分の駒ならflagを1にしてループを抜ける
    if (state[all_y][all_x] == turn) {
      flag = 1;
      break;
    }
    state[all_y][all_x] = state[all_y][all_x] * -1; //上記のif3つを通らなかったらひっくり返す
    reverse_num++; //上記のif3つを通らなかったら何個ひっくり返せるか数える
  }

  if (reverse_num > 0) {
    //3つの条件に当てはまらないでひっくり返せる駒が1つでもある時
    if (flag == 0) {
      //延長線上に自分の駒がなければひっくり返さない(backupを復元)
      for (let i = 0; i < 8; i++) {
        for (let ii = 0; ii < 8; ii++) {
          state[i][ii] = backup[i][ii];
          reverse_num = 0;
        }
      }
    } else {
      //延長線上に自分の駒がなければひっくり返す(backupを復元しない)
      state[y][x] = turn; //クリックしたところに自分の駒を置く
    }
  }
  return reverse_num; //何個ひっくり返せるかを返す
}

function skip() {
  let backup = new Array(8);
  for (let i = 0; i < state.length; i++) {
    backup[i] = new Array(8);
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      backup[y][x] = state[y][x];
    }
  }

  let count_can = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      count_can = count_can + check(i, j);
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      state[i][j] = backup[i][j];
    }
  }
  if (count_can == 0) {
    turn = turn * -1;
  }
}
