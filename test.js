(function () {
    document.addEventListener("DOMContentLoaded", function(event) {
        get_Data();
    });
})();

let dmdData = [];

function get_Data() {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1lKUxLBsW7Ci-SpJxiwGu0jiCJJMa33kG79rXMKxloWc/values/News_Data?alt=json&key=AIzaSyAz3KfkQvT7PWdhRYklVk7N4LLLCQr22W4').then(function(response) {
        return response.json();
    }).then(function(result){
        let data = result.values;
        let items = [];

        for (let i in data) {
            if (i > 0) {
                let item = {};
                item.name = data[i];
                items.push(item);
            }
        }

        dmdData = items;
        render_eport()
    }).catch(function(err) {
        // 錯誤處理
    });
}

function render_eport() {
    const dataContainer = document.getElementById('main') // 放入資料
    const paginationContainer = document.getElementById('pagination'); //建立按鈕都地方
    const itemsPerPage = 5; // 每頁顯示的資料數
    const buttonsToShow = 5; // 顯示的分頁按鈕數量

    // 總共的資料
    const totalData = dmdData

    // 計算總頁數
    const totalPages = Math.ceil(totalData.length / itemsPerPage);

    // 初始化頁面
    function init() {
        const currentPage = 1;
        showPage(currentPage); // 顯示第一頁
        generatePaginationButtons(currentPage); // 生成分頁按鈕
    }

    // 顯示指定頁面的資料
    function showPage(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalData.length);
        const currentPageData = totalData.slice(startIndex, endIndex);

        renderData(currentPageData);
        updatePaginationButtons(pageNumber);
    }
    
    // 渲染資料到畫面
    function renderData(dmdData) {
        dataContainer.innerHTML = ''; // 清空容器

        dmdData.forEach(function (item, index, array) {
            let tr = document.createElement("tr");
            let date = document.createElement("td")
            date.classList.add("date")
            date.innerText = item.name[0]
    
            let main = document.createElement("td")
            main.innerHTML = item.name[1] + "<br>" + item.name[2]
    
            let dataLink = document.createElement("a")
            dataLink.setAttribute("href", item.name[4])
            dataLink.innerHTML = "<br>" + "相關鏈接"
    
            if(item.name[3] === 'FALSE'){
                dataLink.style.display = "none"
            }
    
            dataContainer.append(tr);
            tr.append(date);
            tr.append(main);
            main.append(dataLink);
        });
    }

    // 生成分頁按鈕
    function generatePaginationButtons(currentPage) {
        paginationContainer.innerHTML = ''; // 清空容器

        const currentGroup = Math.ceil(currentPage / buttonsToShow);

        // 計算當前組的起始和結束位置
        const start = (currentGroup - 1) * buttonsToShow + 1;
        const end = Math.min(start + buttonsToShow - 1, totalPages);

        for (let i = start; i <= end; i++) {
            const button = document.createElement('button');
            button.classList.add("btnPage")
            button.textContent = `${i}`;

            // 使用另一個變數保存當前的 i
            const currentPageNumber = i;

            // 如果是當前頁，添加 'active' 類別
            if (i === currentPage) {
                button.classList.add('activeBtn');
            }

            button.addEventListener('click', () => handlePaginationClick(i));
            paginationContainer.appendChild(button);
        }
    }

    // 點擊分頁按鈕的處理函數
    function handlePaginationClick(pageNumber) {
        showPage(pageNumber);
        updatePaginationButtons(pageNumber);
        
        // 在這裡添加回到最上方的效果
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 更新分頁按鈕的狀態
    function updatePaginationButtons(currentPage) {
        const buttons = paginationContainer.getElementsByTagName('button');

        // 確保按鈕數組的長度足夠
        if (buttons.length >= currentPage) {
            // 移除所有按鈕的選中狀態
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('activeBtn');
            }

            // 將當前頁面的按鈕設置為選中狀態
            buttons[currentPage - 1].classList.add('activeBtn');
        }
    }

    // 初始化
    init();
}



// --------------- banner ---------------
(function () {
    document.addEventListener("DOMContentLoaded", function(event) {
        get_banner();
    });
})();

let bannerData = [];

function get_banner() {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1lKUxLBsW7Ci-SpJxiwGu0jiCJJMa33kG79rXMKxloWc/values/Banner_Data?alt=json&key=AIzaSyAz3KfkQvT7PWdhRYklVk7N4LLLCQr22W4').then(function(response) {
        return response.json();
    }).then(function(result){
        let data = result.values;
        let items = [];

        for (let i in data) {
            if (i > 0) {
                let item = {};
                item.name = data[i];
                items.push(item);
            }
        }

        bannerData = items;
        render_banner()
    }).catch(function(err) {
        // 錯誤處理
    });
}

function render_banner() {
    const banner1 = document.getElementById('banner_1')
    const banner2 = document.getElementById('banner_2')
    const banner3 = document.getElementById('banner_3')

    bannerData.forEach(function (item, index, array) {
        banner1.setAttribute("src", item.name[0])
        banner2.setAttribute("src", item.name[1])
        banner3.setAttribute("src", item.name[2])
    });
}



// --------------- event ---------------
(function () {
    document.addEventListener("DOMContentLoaded", function(event) {
        get_event();
    });
})();

let eventData = [];

function get_event() {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1lKUxLBsW7Ci-SpJxiwGu0jiCJJMa33kG79rXMKxloWc/values/Event_Data?alt=json&key=AIzaSyAz3KfkQvT7PWdhRYklVk7N4LLLCQr22W4').then(function(response) {
        return response.json();
    }).then(function(result){
        let data = result.values;
        let items = [];

        for (let i in data) {
            if (i > 0) {
                let item = {};
                item.name = data[i];
                items.push(item);
            }
        }

        eventData = items;
        render_event()
    }).catch(function(err) {
        // 錯誤處理
    });
}

function render_event() {
    const eventMain = document.getElementById('eventMain')

    eventData.forEach(function (item, index, array) {
        const col = document.createElement("div");
        col.classList.add("col-6", "col-md-6", "col-lg-3", "mt-5")

        const card = document.createElement("div");
        card.classList.add("card")
        card.setAttribute("style", "height: auto;")

        const img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid")
        img.setAttribute("src", item.name[3])

        const text = document.createElement("div");
        text.classList.add("card-body")

        const title = document.createElement("h4");
        title.classList.add("card-title")
        title.innerText = item.name[0]

        const content = document.createElement("p");
        content.classList.add("card-text")
        content.innerText = item.name[1]

        const date = document.createElement("p");
        date.classList.add("card-text")
        date.innerText = item.name[2]

        eventMain.append(col);
        col.append(card);
        card.append(img);
        card.append(text);
        text.append(title);
        text.append(content);
        text.append(date);
    });
}
