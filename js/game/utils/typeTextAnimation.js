const typeTextAnimation = (id, text, cbOnFinish, timer = 60) => {
    const elemToType = document.getElementById(id);
    const typeWord = (index) => {
        setTimeout(()=>{
            if(text.charAt(index) =="\n") {
                elemToType.innerHTML+="<br/>";
            } else {
                elemToType.innerHTML+=text.charAt(index);
            }
            index++;
            if(index<text.length) {
                typeWord(index);
            } else {
                cbOnFinish();
            }
        }, timer);
    }

    typeWord(0);
}

export default typeTextAnimation;