// HTMLの要素を取得
const imageInput = document.getElementById ('imageInput');
const widthInput = document.getElementById ('widthInput');
const heightInput = document.getElementById ('heightInput');
const widthscaleInput = document.getElementById ('widthscaleInput');
const heightscaleInput = document.getElementById ('heightscaleInput');
const resizeButton = document.getElementById ('resizeButton');
const canvas = document.getElementById ('canvas');
const ctx = canvas.getContext ('2d');
const imageSizeLabel = document.getElementById ('imageSizeLabel');
const downloadLink = document.getElementById ('downloadLink');

let originalImage = new Image ();
let originalFileName = '';

// 画像を読み込んでCanvasに表示
imageInput.addEventListener ('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader ();
    reader.onload = function (e) {
      originalImage.src = e.target.result;
      originalFileName = file.name.split ('.')[0];
    };
    reader.readAsDataURL (file);
  }
});

// 画像がロードされたらCanvasに描画
originalImage.onload = function () {
  // 元の画像の幅と高さ
  const originalWidth = originalImage.width;
  const originalHeight = originalImage.height;

  // 初期表示時に画像をそのまま表示（元のサイズ）
  canvas.width = originalWidth;
  canvas.height = originalHeight;
  ctx.drawImage (originalImage, 0, 0, originalWidth, originalHeight);

  // 幅と高さの入力フィールドに元のサイズを設定
  widthInput.value = originalWidth;
  heightInput.value = originalHeight;

  imageSizeLabel.textContent = `(${originalWidth},${originalHeight})`;
};

// サイズ変更ボタンの動作
resizeButton.addEventListener ('click', function () {
  const newWidthscale = parseInt (widthscaleInput.value); // 幅の倍率（整数）
  const newHeightscale = parseInt (heightscaleInput.value); // 高さの倍率（整数）

  if (newWidthscale > 0 && newHeightscale > 0) {
    const originalWidth = originalImage.width;
    const originalHeight = originalImage.height;

    // 新しいサイズを計算
    const newWidth = originalWidth * newWidthscale;
    const newHeight = originalHeight * newHeightscale;

    // Canvasのサイズを変更
    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.imageSmoothingEnabled = false;

    // キャンバスをクリアして新しい画像を描画
    ctx.clearRect (0, 0, canvas.width, canvas.height); // キャンバスの内容を消去
    ctx.drawImage (originalImage, 0, 0, newWidth, newHeight); // 新しいサイズで画像を描画

    imageSizeLabel.textContent = `(${newWidth},${newHeight})`;

    const dataURL = canvas.toDataURL ('image/png');
    downloadLink.href = dataURL;
    const filename = `${originalFileName}_resize.png`; // 元の名前に "_resize" を追加
    downloadLink.setAttribute ('download', filename);
    downloadLink.style.display = 'inline'; // ダウンロードボタンを表示
  }
});
