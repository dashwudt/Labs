class Drawer {
    constructor(){
        this._body = document.querySelector('body');
        this._body.innerHTML += `<div class="drawer hide"></div>`
    }

    show = (html) => {
        let drawer = document.querySelector(".drawer");
        drawer.innerHTML = html;
        drawer.classList.remove("hide");
        document.addEventListener('click', (e) => {
            if(e.target.classList[0] === "drawer") this.hide(drawer);
        })
    }
    
    hide = (drawer) => drawer.classList.add("hide");
}

class News{
    constructor(news){
        if(news.length){
            this.getNewId = this._createIdGenerator();
            this._drawer = new Drawer;
            this._news = news.map(n => {
                return {
                    id : this.getNewId(),
                    title: n.title,
                    text: n.text
                }
            })
        }else console.error("not an array passed to the constructor")
    }

    _createIdGenerator = () => {
        let id = 1;
        return () => id++;
    }

    open = (id) => {
        let currentNew = this._news.find(n => n.id === id);
        let html = `
            <div class="drawer_new">
                <div class="drawer_title" >
                    <h4>
                        ${currentNew.title}
                    </h4>
                </div>
                <div class="drawer_text" >
                    ${currentNew.title + ": " + currentNew.text}
                </div>
            </div>
        `;
        this._drawer.show(html);
    }

    getHtml = () => this._news.map(n => `
        <div class="new">
            <div class="title">
                <h4>${n.title}</h4>
            </div>
            <div class="text">
                ${n.text}
            </div>
            <div class="action">
                <button onclick="news.open(${n.id})">Открыть всплывающее окно</button>
            </div>
        </div>
    `).join('')

    addNew = (n) => {
        this._news.push({
            id : this.getNewId(),
            title: n.title,
            text: n.text
        })
    }

    deleteNew = (id) =>  this._news = this._news.filter(n => n.id !== id)
    getNews = () => this._news
}

const myNews = [
    {title:"Новость 1", text:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita amet sint harum officia veniam, illo ullam velit fuga atque explicabo a necessitatibus adipisci voluptate ipsam reiciendis quia unde ex? Explicabo necessitatibus illo nulla sequi at. Libero nam laudantium suscipit ipsum hic corrupti minus maxime, cumque consequatur aut ex tenetur voluptates?"},
    {title:"Новость 2", text:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita amet sint harum officia veniam, illo ullam velit fuga atque explicabo a necessitatibus adipisci voluptate ipsam reiciendis quia unde ex? Explicabo necessitatibus illo nulla sequi at. Libero nam laudantium suscipit ipsum hic corrupti minus maxime, cumque consequatur aut ex tenetur voluptates?"},
    {title:"Новость 3", text:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita amet sint harum officia veniam, illo ullam velit fuga atque explicabo a necessitatibus adipisci voluptate ipsam reiciendis quia unde ex? Explicabo necessitatibus illo nulla sequi at. Libero nam laudantium suscipit ipsum hic corrupti minus maxime, cumque consequatur aut ex tenetur voluptates?"}
]

let news = new News(myNews);
news.addNew({title:"Новость 4", text:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita amet sint harum officia veniam, illo ullam velit fuga atque explicabo a necessitatibus adipisci voluptate ipsam reiciendis quia unde ex? Explicabo necessitatibus illo nulla sequi at. Libero nam laudantium suscipit ipsum hic corrupti minus maxime, cumque consequatur aut ex tenetur voluptates?"})
news.deleteNew(3)

document.querySelector(".news").innerHTML = news.getHtml();
