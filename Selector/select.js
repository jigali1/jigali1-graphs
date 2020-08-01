let select = document.querySelector('.select');

let select__input = document.createElement('div');
select__input.className = 'select__input';
select__input.id = '0';
select__input.setAttribute('name', 'func-name');
select.prepend(select__input);

let newSpan = document.createElement('span');
newSpan.textContent = 'Выберите функцию:';
select__input.prepend(newSpan);

let ArrowImg = document.createElement('img');
ArrowImg.src = 'img/arrow-down.png';
newSpan.after(ArrowImg);

let select__list = document.createElement('ul');
select__list.className = 'select__list';
select__input.after(select__list);

const data = [
	{value: 'ax + b', id: '0'},
	{value: 'ax^2 + bx + c', id: '1'},
	{value: 'a/x + b', id: '2'},
	{value: 'a * b^x + c', id: '3'},
	{value: 'a * sin(b * x) + c', id: '4'},
	{value: 'a * cos(b * x) + c', id: '5'},
];

let className = 'select__item'

let items = data.map(item => {
	return `<li class='select__item' data-value="${item.value}" id='${item.id}'>${item.value}</li>`;
});
select__list.innerHTML = items.join('');

document.querySelector('.select__input').onclick = () => {
	document.querySelector('.select__list').classList.toggle('open');
	if (document.querySelector('.select__list').classList.contains('open')) {
		document.querySelector('img').src = 'img/arrow-up.png';
	} else {
		document.querySelector('img').src = 'img/arrow-down.png';
	}
}

document.querySelector('.select__list').onclick = () => {
	document.querySelector('.select__input').id = event.target.id;
	document.querySelector('span').textContent = event.target.dataset.value;
	document.querySelector('.select__list').classList.remove('open');
}
