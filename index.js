var text = 'try to guess a number...', index = 0, speed = 100;

function type () {
    if (index < text.length) {
        document.querySelector('h3').textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
    };
};

type();