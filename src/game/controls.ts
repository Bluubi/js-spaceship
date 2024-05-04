export let moveToRight = false;
export let moveToLeft = false;

export let startMovement = false;
document.addEventListener('keydown', (event) => {
    const code = event.code;

    if(code === 'ArrowLeft'){
        startMovement = true;
        moveToLeft = true;
        moveToRight = false;
    }

    if(code === 'ArrowRight'){
        startMovement = true;
        moveToLeft = false;
        moveToRight = true;
    }
})

document.addEventListener('keyup', ( ) => {
    startMovement = false;
})
