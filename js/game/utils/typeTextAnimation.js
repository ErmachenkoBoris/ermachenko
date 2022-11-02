const typeTextAnimation = (id, text, timer = 100) => {
    const elemToType = document.getElementById(id);
    const typeWord = (index) => {
        setTimeout(()=>{
            elemToType.innerHTML+=text[index];
            index++;
            if(index<text.length) {
                typeWord(index);
            }
        }, timer);
    }

    typeWord(0);
}

export default typeTextAnimation;