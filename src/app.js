const textChangeListener = (event) => {
	let id = event.target.id;
	let text = event.target.value;

	// id === 'topLineText' ? (window.topLineText = text) : (window.bottomLineText = text);
	if (id == 'topLineText') {
		window.topLineText = text;
	} else {
		window.bottomLineText = text;
	}

	redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
};

const redrawMeme = (image, topLine, bottomLine) => {
	let canvas = document.querySelector('canvas');
	let ctx = canvas.getContext('2d');
	if (image != null) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	ctx.font = '30pt Impact';
	ctx.textAlign = 'center';
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 3;
	ctx.fillStyle = 'white';

	if (topLine != null) {
		ctx.fillText(topLine, canvas.width / 2, 40);
		ctx.strokeText(topLine, canvas.width / 2, 40);
	}

	if (bottomLine != null) {
		ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
		ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
	}
};

const saveFile = () => {
	let canvas = document.querySelector('canvas');
	let dataURL = canvas.toDataURL('image/jpeg', 1.0);
	downloadImage(dataURL, 'meme.jpeg');
};

const downloadImage = (data, filename = 'untitled.jpeg') => {
	let a = document.createElement('a');
	a.href = data;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
};

const handleFileSelect = (event) => {
	let file = event.target.files[0];

	let reader = new FileReader();

	reader.addEventListener('load', (fileObject) => {
		let data = fileObject.target.result;

		let image = new Image();

		image.addEventListener('load', function () {
			window.imageSrc = this;
			redrawMeme(window.imageSrc, null, null);
		});

		image.src = data;
		console.log(fileObject.target.result);
	});
	reader.readAsDataURL(file);
};

window.topLineText = '';
window.bottomLineText = '';
let input1 = document.getElementById('topLineText');
let input2 = document.getElementById('bottomLineText');
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document.getElementById('file').addEventListener('change', handleFileSelect, false);
document.querySelector('button').addEventListener('click', saveFile, false);
