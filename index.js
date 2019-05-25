window.onload = function () {
    const inputs = document.getElementsByTagName('input'); //输入框
    const cons = document.getElementById("con");//父元素
    //回车提交
    inputs[0].onkeydown = enterAdd;
    //直接提交
    inputs[1].onclick = add;
    //删除
    cons.onclick = remove;
    //修改
    cons.ondblclick = edit;

};
//提交添加
let num = 0;
function add() {
    const inputs = document.getElementsByTagName('input'); //输入框
    const template = document.getElementsByTagName("template")[0].content;
    const title_spans =template.querySelectorAll(".title span");//标题
    const content = template.querySelector(".content");//内容
    const cons = document.getElementById("con");//父元素
    if (inputs[0].value.trim() === ""){
        inputs[0].value = "";
        return false;
    }
    num++;
    title_spans[0].textContent  ="note" + num;
    content.textContent = inputs[0].value;
    let clone = document.importNode(template, true);
    cons.appendChild(clone);
    inputs[0].value = "";
}
//回车提交
function enterAdd(event) {
    let code = event.which;
    if (code === 13) {
        add();
    }
}
//点击删除
function remove(e) {
    let event = e.target;
    if(event.innerText === '×'){
        let con_num = event.parentNode.parentNode;
        con_num.parentNode.removeChild(con_num);
        num--;
        // 修改 页面中 note的序号
        let allTitle = document.querySelectorAll('.title span:first-child');
        for(let i = 1;i <= allTitle.length;i++){
            allTitle[i - 1].innerText = 'note' + i;
        }
    }
}
//修改
function edit(e) {
    let event = e.target;
    if(event.className.toLowerCase()=== 'content'){
        event.innerHTML = `<textarea>${event.innerText}</textarea>`;
        const textarea = document.getElementsByTagName("textarea")[0];
        textarea.onblur = function () {
            event.innerText = textarea.value;
            if(textarea.value === ""){
                let e = {};
                e.target =  event.parentElement.querySelector(".title span:nth-child(2)");
                remove(e);
            }
        }
    }
}
