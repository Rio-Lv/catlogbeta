const BGblur = () =>{
    document.getElementById("bgImage").style.filter ='blur(10px)';
    document.getElementById("bgImage").style.opacity ='0.4';
};
const BGrmblur = ()=>{
    document.getElementById("bgImage").style.filter ='blur(0px)';
    document.getElementById("bgImage").style.opacity ='1';
};

export {BGblur,BGrmblur};