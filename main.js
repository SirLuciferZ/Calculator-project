let insertedNumHtml = localStorage.getItem("nums");

document.querySelector(".total").innerHTML = localStorage.getItem("total")

if (!insertedNumHtml) {
    insertedNumHtml = ''
}


buttonEvent()
clearAnswer()

renderInsert()





//          catch the inserted value from pressed button

function buttonEvent() {
    document.querySelectorAll(".num").forEach((item) => {
        item.addEventListener("click", () => {
            const data = item.dataset.value
            const lastChar = insertedNumHtml.slice(-1);
            const operators = ['+', '-', '*', '/'];
            // console.log(lastTwo)
            // console.log((operators.includes(lastTwo[0], lastTwo[1])))

            if (
                lastChar.length === 1 &&
                (operators.includes(lastChar) && operators.includes(data))
            ) {
                if (lastChar == data) {
                    renderInsert();
                }
                else {
                    insertedNumHtml = insertedNumHtml.slice(0, -1) + data
                    renderInsert()
                }
            }
            else {
                insertedNumHtml += data
                firstAction()
                renderInsert();
            }

            saveToStorage()
        })
    })
}

//          render the html inside the .inserted

function renderInsert() {
    document.querySelector(".inserted").value = insertedNumHtml
}

//          clear inserted and total by pressing AC

function clearAnswer() {
    document.querySelector(".inserted").value = ''
    document.querySelector(".total").value = ''
    insertedNumHtml = ''
    const total = document.querySelector(".total")
    const insert = document.querySelector(".inserted")

    total.classList.add("up")
    total.classList.remove("down")
    insert.classList.add("down")
    insert.classList.remove("up")
    saveToStorage()
}
document.querySelector(".clear").addEventListener("click", clearAnswer)

//          get answer by pressing =

function calculateTotal() {
    try {
        const equal = eval(insertedNumHtml)

        if (equal === Infinity || equal === -Infinity) {
            document.querySelector(".total").value = 'Infinity'
        } else if (isNaN(equal)) {
            document.querySelector(".total").value = 'Error'
        } else {
            document.querySelector(".total").value = equal
        }

        const total = document.querySelector(".total")
        const insert = document.querySelector(".inserted")

        total.classList.add("down")
        total.classList.remove("up")
        insert.classList.add("up")
        insert.classList.remove("down")

        saveTotal(equal)
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        document.querySelector(".total").value = 'Error'
    }
}
document.querySelector(".equal").addEventListener("click", calculateTotal)
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculateTotal()
    }
})

//          cant start with action

function firstAction() {
    const operators = ['+', '-', '*', '/'];
    const lastChar = insertedNumHtml.slice(0, 1)
    if (insertedNumHtml.length === 1 && operators.includes(lastChar[0])) {
        document.querySelector(".total").value = "Error"
        const msg = document.getElementById("total-js")
        msg.style.opacity = "1"
        setTimeout(() => {
            msg.classList.add("hide")

        },
            2000)
        setTimeout(() => {
            clearAnswer()
        },
            2000)
    }
}

//          interactive %

function perCent() {
    let equal = eval(insertedNumHtml)
    equal /= 100
    if (equal === Infinity || equal === -Infinity) {
        document.querySelector(".total").value = 'Infinity'
    } else if (isNaN(equal)) {
        document.querySelector(".total").value = 'Error'
    } else {
        document.querySelector(".total").value = equal
    }

    const total = document.querySelector(".total")
    const insert = document.querySelector(".inserted")

    total.classList.add("down")
    total.classList.remove("up")
    insert.classList.add("up")
    insert.classList.remove("down")


}
document.querySelector(".percent").addEventListener("click", perCent)

//          interactive ()

function bracet() {
    const msg = document.querySelector(".bracet")
    if (msg.classList.contains("open")) {
        insertedNumHtml += "("
        msg.classList.remove("open")
        msg.classList.add("close")
    }
    else if (msg.classList.contains("close")) {
        insertedNumHtml += ")"
        msg.classList.remove("cloce")
        msg.classList.add("open")
    }
    renderInsert()
}
document.querySelector(".bracet").addEventListener("click", bracet)


//      save to storage

function saveToStorage() {
    localStorage.setItem('nums', insertedNumHtml)
}

function saveTotal(total) {
    localStorage.setItem("total", total)
}
