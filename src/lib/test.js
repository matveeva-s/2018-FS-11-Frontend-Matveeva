const say = function func() {
  const div = document.createElement('div');
  div.innerHTML = '<strong>Hello teacher</strong>, have a nice day :)';
  div.classList.add('mydiv');
  document.body.appendChild(div);
};

export default say;
